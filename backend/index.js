import express from 'express'
import cors from 'cors'
import {createServer} from 'http'
import connectDB from './db/db.js'
import routes from './Routes/main.js'
import dotenv from 'dotenv'
dotenv.config()
import { Server } from 'socket.io'
import cookieParser from 'cookie-parser'
import { errorMiddleware } from './middleware/error_middleware.js'
import { saveAndIndexMessage } from './controller/chroma_controller.js';
import { buildPrompt } from './utils/prompBuilder.js';
import { askGemini } from './utils/geminiClient.js';
import Persona from './model/persona_model.js'

const app = express()
const server = createServer(app)

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin:["http://localhost:3000","https://chat-app-xi-ten-95.vercel.app"],
    methods:["GET","POST","DELETE","PUT"],
    credentials: true,
}))
app.use("/api",routes)

const io = new Server(server,{
    cors:{
        origin:["http://localhost:3000","https://chat-app-xi-ten-95.vercel.app"],
        credentials:true
    }}
)

io.on("connection",(socket)=>{
    console.log("a user connected",socket.id)

    socket.on("setup",(userId)=>{
        socket.join(userId)
        socket.emit("user joined",userId)
        console.log("user joinded",userId)
     })

    socket.on("join chat",(room)=>{
        socket.join(room)
        socket.emit("user joined room",room)
    })

    socket.on("typing",({room,typer})=>{
        console.log("typer connected",room,typer)
        socket.broadcast.emit("typing-Broad",{room,typer})
    })

    socket.on("stop typing",({room})=>{
        console.log("typer dis connected",room)
        socket.broadcast.emit("stop typing...",room)
    })


    socket.on("new Message", async (newMessage) => {
        const chat = newMessage.chat;
        const senderId = newMessage.sender._id;
        const content = newMessage.content;
      console.log(newMessage)
        if (!chat?.users) return;
    
        const userMsg = await saveAndIndexMessage({
            chat: chat._id,
            sender: senderId,
            content: content
        });
    
        chat.users.forEach((user) => {
            if (user._id === senderId) {
                socket.emit("received message", userMsg);  
            } else {
                socket.to(user._id).emit("received message", userMsg);
            }
        });
    
        // AI Trigger
        const personas = await Persona.find({ chatId: chat._id });
        if (!personas) return;

        personas.map(async(persona)=>{
        const aiName = persona.name;
        
        console.log(content)
        if (content.toLowerCase().includes(aiName.toLowerCase())) {
            io.to(chat._id).emit('aiTyping',aiName,(ack)=>{
                console.log("ack is looged",ack)
            })
            console.log("log this",chat._id,aiName,(ack)=>{
                console.log("ack is looged",ack)
            })
            console.log("logging this",socket.broadcast.emit('aiTyping',aiName))
            const prompt = await buildPrompt(persona,chat, senderId, content);
            console.log("prompt",prompt)
            const aiText = await askGemini(prompt);
   
            const aiMsg = await saveAndIndexMessage({
                chat: chat._id,
                aiSender: persona,
                content: aiText
            });
            socket.emit("aiMsg",aiMsg)
        }})
    });
    

     socket.on("disconnect",()=>{
        console.log("a user disconnected",socket.id)
    })
})

connectDB()
server.listen(process.env.PORT,(req,res)=>{
    console.log(`app listening to port`)
})
app.use(errorMiddleware)
