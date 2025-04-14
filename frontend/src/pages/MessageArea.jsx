import React,{useState,useEffect} from 'react'
import { FiPaperclip } from "react-icons/fi";
import { IoIosSend } from "react-icons/io";
import {useSelector,useDispatch} from 'react-redux'
import {Socket} from '../components/Socket'
import useSocket from '../hooks/useSocket.js';

const MessageArea = ({selectedChatId,setSelectedChatId}) => {
    useSocket()
    const [message,setMessage] = useState("")
    const sender = useSelector((state)=> state.auth.user) 
    const {data} = useSelector((state)=>state.chat.chat) 
    const check = useSelector((state)=>state.socket)
    console.log(check)
    console.log(data)  
    const handleSendMessage = () => {
        if(!message.trim() && !Array.isArray(sender))return

        const currentChat = data.filter((user)=> selectedChatId === user._id)
        console.log(currentChat)
        const users = currentChat.map((user)=>user.users)
                                 
        console.log(users[0])
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

  return (
    <div className='flex items-center justify-center'>
       <div className='bg-[#0b1730] w-[72vw] ml-6 h-[95vh] rounded-2xl incline-block'>
        <header>

        </header>
        <main>

        </main>
        <footer className='absolute bottom-4 justify-evenly flex items-center w-[72vw] min-h-10 max-h-fit'>
            <div className=" bg-white/5 h-fit w-fit p-4 rounded-full ">
            <FiPaperclip className='text-xl text-white '/>
            </div>
            <div className="">
                <input 
                type="text"
                value={message}
                name='message'
                placeholder='send message'
                className='bg-white/5 p-4 w-230 rounded-2xl placeholder:text-blue-100 text-blue-100 '
                onChange={(e)=> setMessage(e.target.value)}/>
            </div>
            <div className=" bg-white/5 h-fit w-fit p-4 rounded-full" onClick={handleSendMessage}>
                 <IoIosSend className='text-xl text-white' />
            </div>
        </footer>
       </div>
    </div>
  )
}

export default MessageArea
