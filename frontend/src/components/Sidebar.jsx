import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {getAllChats} from '../redux/slice/chatSlice.js'
import MagicWand from './MagicWand';
import { Socket } from './Socket.jsx';

const Sidebar = ({selectedChatId,setSelectedChatId}) => {
   
  const user = useSelector((state)=>state.auth.user)
  const {data,success} = useSelector((state)=>state.chat.chat)

 const dispatch = useDispatch()

 useEffect(()=>{
   if(selectedChatId){
    console.log(selectedChatId)
    Socket.emit('setup', selectedChatId)
        console.log("setupworking")
   }
 },[selectedChatId])

  useEffect(()=>{
    dispatch(getAllChats())
  },[user,dispatch])

  return (
    <div className='bg-[#0b1730] w-[30vw] h-[95vh] relative left-3 inline-block rounded-xl p-2 xl:w-sm'>
     <div className="flex items-center p-2 ml-2 relative">
      <span className='pf inline-block bg-white h-15 w-15 rounded-full'></span>
      <div className="flex flex-col mx-4">
        <span className='text-white text-3xl mb-3'>{user.fullName}</span>
        <span className='text-white font-light text-sm bg-blue-700 w-fit rounded-2xl px-0.5'>{user.username}</span>
      </div>
      <div className="absolute right-10 top-7">
           <MagicWand  />
      </div>
     </div>

      <div className="">
        {success && data.map((chat) => {
          return(
          <div className="flex items-center mx-4 my-5 p-3 bg-blue-950 " onClick={()=>setSelectedChatId(chat._id)}  key={chat._id}>
            <span className='h-10 w-10 inline-block rounded-full bg-white'></span>
            <span className='text-white text-xl mx-4'>{chat.name}</span>
          </div>
        )})}
      </div>
    </div>
  )
}

export default Sidebar
