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

const app = express()
const server = createServer(app)

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin:["http://localhost:3000","http://192.168.1.110:3000"],
    methods:["GET","POST","DELETE","PUT"],
    credentials: true,
}))
app.use("/api",routes)

const io = new Server(server,{
    cors:{
        origin:["http://localhost:3000","http://192.168.1.110:3000"],
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

    socket.on("typing",(room)=>{
        socket.in(room).emit("typing...")
    })

    socket.on("stop typing",(room)=>{
        socket.in(room).emit("stop typing...")
    })

    socket.on("new Message",(newMessage)=>{
        console.log("messagedata",newMessage)
        const chat = newMessage.chat
        console.log(newMessage)
        if(!chat.users){
            return
        }

        chat.users.forEach((user)=>{
            if(user._id === newMessage.sender._id){
               socket.emit("received message",newMessage)
            }else{
                 socket.to(user._id).emit("received message",newMessage)
            }    
        })
        
    })

     socket.on("disconnect",()=>{
        console.log("a user disconnected",socket.id)
    })
})

connectDB()
server.listen(process.env.PORT,(req,res)=>{
    console.log(`app listening to port`)
})
app.use(errorMiddleware)