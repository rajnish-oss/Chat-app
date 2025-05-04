import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {getAllChats,changeChatName} from '../redux/slice/chatSlice.js'
import MagicWand from './MagicWand';
import { Socket } from './Socket.jsx';
import { GiHamburgerMenu } from "react-icons/gi";
import { HiArrowLongLeft } from "react-icons/hi2";

const Sidebar = ({selectedChatId,setSelectedChatId,sidebar,setSidebar}) => {
   
 const {user} = useSelector((state)=>state.auth)
 const {data,success} = useSelector((state)=>state.chat.chat)
 console.log(data)
 const dispatch = useDispatch()

 useEffect(()=>{
    dispatch(getAllChats())
 },[sidebar,user])

  return (<div className='relative flex items-center'>
    <div className={`h-[95vh] rounded-r-xl w-10 bg-[#0B0C14] border-[#0F111C] border-2 md:hidden ${sidebar?' hidden' : 'md:hidden inline-block'}`}>
    <span className='w-full flex justify-center mt-3 text-xl text-blue-50' onClick={()=>setSidebar(!sidebar)}>
    <GiHamburgerMenu />
    
    </span>
   </div>
    <div className={`bg-[#0B0C14] border-[#0F111C] border-4 left-2 w-full xl:w-[25vw] md:w-[30vw] h-[95vh] relative ${sidebar?'md:hidden inline-block' : 'md:inline-block hidden'} rounded-xl p-2`}>
     <div className="flex items-center p-2 ml-2 relative">
        <img src={user.avatar} alt="pf" className='inline-block bg-white h-15 w-15 rounded-full' />
      <div className="flex flex-col mx-4">
        <span className='text-white text-3xl mb-3'>{user.fullName}</span>
        <span className='text-white font-light text-sm bg-blue-700 w-fit rounded-2xl px-0.5'>{user.username}</span>
      </div>
      <div className="relative z-30 right-0 bottom-4">
           <MagicWand />
      </div>
     </div>

      <div className="overflow-x-scroll md:h-[73vh] h-[70vh] " style={{scrollbarWidth:'none'}}>
        { success && Array.isArray(data) && data.map((chat) => {
          const otherUser = chat.users.find((users) => user._id !== users._id)
          console.log(chat)
          return(
          <div className={`flex items-center mx-4 my-5 p-2 rounded-4xl ${selectedChatId === chat._id ? "bg-white/15" : " bg-white/5"}  `} onClick={()=>{setSelectedChatId(chat._id) ; setSidebar(false)}}  key={chat._id}>
            <span className='inline-block rounded-full bg-white'>
              <img src={chat.isGroup ? chat?.attachments?.url : Array.isArray(otherUser?.avatar) && otherUser.avatar.length > 0 ? otherUser.avatar[0].url : "./public/defaultdp.jpg"} alt="cp" className='rounded-full bg-cover h-10 w-10 border-2 border-zinc-300'/> 
            </span>
            <span className='text-white text-xl mx-4'>{ chat.isGroup ? chat.name : otherUser.username}</span>
          </div>
        )})}
      </div>

      <footer className='absolute bottom-0 left-8' >
        <span className={`text-white text-2xl font-extralight ${!sidebar?' hidden' : 'md:hidden inline-block'}`} onClick={() =>setSidebar(false)}>
         <HiArrowLongLeft /> 
        </span>
      </footer>
    </div>
    </div>
  )
}

export default Sidebar
