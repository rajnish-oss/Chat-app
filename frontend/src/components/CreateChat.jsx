import React,{useState} from 'react'
import Textbox from './Textbox'
import { useForm } from 'react-hook-form'
import { createChat } from '../redux/slice/chatSlice.js'
import { useDispatch, useSelector } from 'react-redux';
import { IoMdClose } from "react-icons/io";

const CreateChat = ({setNewChat}) => {
    const { register, handleSubmit,reset,formState: { errors }, } = useForm();
    const dispatch = useDispatch()
    const [backendError,setBackendError] = useState("")

    const submitHandler = async(data) =>{
       try {
        await dispatch(createChat(data)).unwrap()
        .then(reset())
        setNewChat(false)
       } catch (error) {
          setBackendError(error)
       }
    }

  return (
    <div className='w-fit h-fit border-white/5 bg-white/5 p-4 rounded-2xl relative z-50 right-47'>
      <form action="" className='relative' onSubmit={handleSubmit(submitHandler)}>

      <IoMdClose className='absolute right-0 text-xl text-white' onClick={()=> setNewChat(false)}/>
      
      <Textbox
         name="username"
         label="username"
         placeholder="enter username"
         type="text"
         className="!w-50 shadow-md shadow-cyan-950  placeholder:text-[#1c2c5089] text-[#1c2c50] outline-2 outline-[#050C1A]"
         register={register("username",{required:"username required"})}
         error={errors.username?errors.username.message:""}
        />
        {backendError && <div className="text-red-400">{backendError}</div>}
        <button className='bg-blue-500 p-1 rounded-2xl relative left-32'>
          Add User
        </button>
      </form>
    </div>
  )
}

export default CreateChat
