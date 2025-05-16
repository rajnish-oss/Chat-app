import React,{useState,useEffect,useRef} from 'react'
import { FiPaperclip } from "react-icons/fi";
import { IoIosSend } from "react-icons/io";
import {useSelector,useDispatch} from 'react-redux'
import {Socket} from '../components/Socket'
import useSocket from '../hooks/useSocket.js';
import { fetchMessage } from '../redux/slice/socketSlice.js';
import styled from 'styled-components'
import moment from 'moment'
import ChatOption from '../components/ChatOption.jsx';
import MsgOption from '../components/MsgOption.jsx';

const MessageArea = ({selectedChatId,setSelectedChatId,sidebar,setSidebar}) => {
    const [message,setMessage] = useState("")
    const bottomRef = useRef(null)
    const sender = useSelector((state)=> state.auth.user) 
    const {data} = useSelector((state)=>state.chat.chat) 
    const {messages,status} = useSelector((state)=>state.socket)
    const dispatch = useDispatch()
    const userID = sender._id
    userID && useSocket({userID,selectedChatId})
    const [chatName,setChatName] = useState("")
    const [chatDP,setChatDP] = useState("")
    const [typerGuy,setTyperGuy] = useState("")


    const handleSendMessage = () => {
      
        if(!message.trim() && !Array.isArray(sender))return

        const currentChat = data.filter((user)=> selectedChatId === user._id)
        const users = currentChat.map((user)=>user.users)
                                 
        if(!Array.isArray(users[0])) return
         const datax = {
            chat:{
                _id:selectedChatId,
                users: users[0].map((user)=>( {_id:user._id}))
            },
            sender:{_id:sender._id},
            content:message,
         }
        Socket.emit("new Message",datax)
        
        setMessage("")
        }

        let time = useRef(null)

        const handleTyping = (e) => {
  setMessage(e.target.value)

  const tyData = {
    room: selectedChatId,
    typer: sender
  }

  if (!typerGuy) {
    Socket.emit("typing", tyData)
  }


  if (time.current) {
    clearTimeout(time.current)
  }

  time.current = setTimeout(() => {
    Socket.emit("stop typing", {room: selectedChatId,typer:sender})
    setTyperGuy("")
  }, 1000)
}


        useEffect(()=>{
          try {
            console.log("typer",typerGuy)
            Socket.on("typing-Broad",({room,typer})=>{
               if(room === selectedChatId){
                   typer._id !== sender._id ? setTyperGuy(typer) : setTyperGuy("")
                }
        })

        Socket.on('aiTyping',(aiName,ack)=>{
          console.log("aiName",aiName)
          ack("hi there konichiwa")
          setTyperGuy(aiName)
        })

        console.log("logging this",Socket.on('aiTyping',(aiName)=>{
          console.log("aiName",aiName)
          setTyperGuy(aiName)
        }))

          } catch (error) {
            console.log(error)
          }
         
       
          Socket.on("stop typing...",(room)=>{
            setTyperGuy("")
          })
      },[selectedChatId,message])

    useEffect(()=>{
      if(selectedChatId){
      
        const currentChat = data.filter((user)=> selectedChatId === user._id)
       
        const chatname = currentChat[0].isGroup ? currentChat[0].name : currentChat[0].users.find((u)=>u._id !== sender._id).username
        const dp = currentChat[0].isGroup ? currentChat[0]?.attachments?.url : (() => {
              const otherUser = currentChat[0].users.find((u) => u._id !== sender._id);
               return Array.isArray(otherUser?.avatar) && otherUser.avatar.length > 0
               ? otherUser.avatar[0].url
               : "./public/defaultdp.jpg";
               })();

        setChatDP(dp)
        setChatName(chatname)
        dispatch(fetchMessage(selectedChatId))
    
      }
    },[selectedChatId,dispatch,status === "success"])

    useEffect(() => {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      
    }, [messages]);
    
  return (
    <div className={`flex items-center justify-center px-2 py-2 min-h-screen relative ${sidebar?"z-[-1]":"z-10"} `}>
      <div className='bg-[#0B0C14]  z-0 border-[#0F111C] border-4 md:w-[65vw] w-[80vw] xl:w-[72vw] mx-auto h-[95vh] md:h-[95vh] rounded-lg md:rounded-2xl relative flex flex-col m-2'>
      {selectedChatId ? (<>
      <header className="w-full h-20 flex px-2 items-center relative justify-between border-b-2 border-blue-300">
        <div className=" flex items-center">
          <span>
            <img src={chatDP} alt="pf" className='h-12 w-12 bg-cover rounded-full border-2 border-zinc-300 '/>
          </span>
          <span className='text-white mx-4'>
            {chatName}
          </span>
        </div>
          
          <span className='text-white  text-2xl relative z-20'>
           <ChatOption chatID={selectedChatId} />
          </span>
      </header>
        
        <Main className=" flex-row p-2 md:p-4 overflow-y-scroll scrollbar relative h-[70vh]">
          {messages.map((msg)=>(
             <div  className={`flex ${(msg.sender ? msg?.sender?._id !== sender._id : "iejfsof") ? "justify-start" : "justify-end"}`}  key={msg._id}>
              {/* {console.log(msg)} */}
              <span className={`
              max-w-65  md:max-w-70 break-words items-start flex flex-col lg:max-w-lg px-2 py-2 rounded-lg w-fit relative my-2
              ${(msg.sender ? msg?.sender?._id !== sender._id : "iejfsof") ? 
                'bg-[#1D3053] text-white rounded-bl-none items-end' : 
                `bg-white/5 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-br-none shadow-sm `
              }
            `}>
             
              <div className='w-full flex items-center justify-between'>
                <span className='text-[12px] text-[#4FD1C5]'>{ msg.aiSender ? msg.aiSender.name : msg?.sender?.username}</span>
                <span className=''><MsgOption msgId={msg._id} chatId={selectedChatId} /></span>
               </div>
                {msg.content}
                <span className="text-[12px] text-gray-500 self-end ml-4">
                  {moment(msg.createdAt).format('h:mm a')}
                </span>
              </span>
             </div>
          ))} 
          {typerGuy && <div className="flex justify-start flex-col bg-[#1D3053] text-white rounded-lg p-2 w-fit pr-4 ">
            {console.log(typerGuy)}
            <span className='text-[12px] text-[#4FD1C5]'>
              {typerGuy ? typerGuy.username : ""}
            </span>
            <span>typing...</span>
          </div>}
          <div ref={bottomRef} />

        </Main>
        
        <footer className='absolute bottom-2 md:bottom-4 left-0 right-0 px-2 md:px-4 flex justify-evenly items-center w-full'>
          <div className="bg-white/5 p-2 md:p-3 rounded-full">
            <FiPaperclip className='text-lg md:text-xl text-white' />
          </div>
          
          <div className="flex-1 mx-2 md:mx-4">
            <input 
              type="text"
              value={message}
              name='message'
              placeholder='Send message'
              className='bg-white/5 p-2 md:p-4 w-full rounded-xl md:rounded-2xl placeholder:text-blue-100 text-blue-100 outline-none text-sm md:text-base'
              onChange={(e) => handleTyping(e)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
          </div>
          
          <div 
            className="bg-white/5 p-2 md:p-3 rounded-full cursor-pointer"
            onClick={handleSendMessage}
          >
            <IoIosSend className='text-lg md:text-xl text-white' />
          </div>
        </footer></>) : ( <div className='w-full h-full flex items-center justify-center'>
          <span className='text-5xl text-blue-50 align-middle'>Select chat</span>
        </div>
        )}
      </div>
    </div>
  )
}

export default MessageArea

const Main = styled.div`
    overflow-y: scroll;
    scrollbar-width:none;
`