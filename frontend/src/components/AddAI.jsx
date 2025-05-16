import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {createAI} from '../redux/slice/AISlice.js'

const AddAI = ({chatID,setAddAi}) => {
  const [AIname,setAIName] = useState("")
  const [role,setRole] = useState("")
  const dispatch = useDispatch()
 console.log(chatID)
  const AIdata = () => {
    if(AIname && role && chatID){
      const data = {
      AIname:AIname,
      role:role,
      chatId:chatID
    }
    dispatch(createAI(data))
    setAddAi(false)
    } 
  }

  return (
    <div className='inline-block bg-[#0f192b] absolute z-50 p-4 rounded-2xl right-0 top-10 w-[15vw]  '>
      <span className='flex justify-center items-center flex-col gap-2'>
      <input
       type="text"
       name="aiName"
      placeholder="enter name of AI"
       className="outline-blue-400 w-[12vw] items-center text-center border-0 rounded-2xl placeholder:text-xl bg-[#1e2b43]"
       onChange={(e) => setAIName(e.target.value)}
      />
      <input
      type="text"
      name="role"
      placeholder="enter role of AI"
      className="outline-blue-400 w-fit max-w-[12vw] items-center text-center border-0 rounded-2xl placeholder:text-xl text-md bg-[#1e2b43]" 
      onChange={(e) => setRole(e.target.value)}
      />
      <button className='text-xl px-2 rounded-2xl bg-blue-600' onClick={()=>AIdata()}>
        Submit
      </button>
      </span>
      
    </div>
  )
}

export default AddAI
