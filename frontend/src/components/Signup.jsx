import React, { useState,useEffect } from 'react'
import styled from 'styled-components'
import Textbox from './Textbox'
import { useForm } from 'react-hook-form';
import { registerUser } from '../redux/slice/authSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Signup = ({setNewUser}) => {
  const user = useSelector((state)=>state.auth.user)
  console.log(user)
  const { register, handleSubmit,watch,formState: { errors }, } = useForm();
  const [backendError,setBackendError] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const password = watch("password")

  useEffect(()=>{
     user 
  },[user])

  const submitHandler = async(data) => {
    try {
    await dispatch(registerUser(data)).unwrap()
                .then(()=>navigate("/chat"))
    } catch (error) {
      console.log(error)
       setBackendError(error.message)
    }
   
  }

  return (
    <Body>
      <div className="sub">
        <div className="font-extrabold text-xl mb-4">Welcome ! <br/> Create account now</div>
        <form action="" onSubmit={handleSubmit(submitHandler)}>
          <Textbox
         name="username"
         label="username"
         placeholder="enter your username"
         type="text"
         className=" shadow-md shadow-cyan-950  placeholder:text-[#1c2c5089] text-[#1c2c50] outline-2 outline-[#050C1A]"
         register={register("username",{required:"username required"})}
         error={errors.username?errors.username.message:""}
        />
        <Textbox
         name="full Name"
         label="fullName"
         placeholder="enter your fullName"
         type="text"
         className=" shadow-md shadow-cyan-950  placeholder:text-[#1c2c5089] text-[#1c2c50] outline-2 outline-[#050C1A]"
         register={register("fullName",{required:"fullName required"})}
         error={errors.fullName?errors.fullName.message:""}
        />
         <Textbox
         name="email"
         label="email"
         placeholder="enter email"
         type="email"
         className=" shadow-md shadow-cyan-950  placeholder:text-[#1c2c5089] text-[#1c2c50] outline-2 outline-[#050C1A]"
         register={register("email",{required:"email required"})}
         error={errors.email?errors.email.message:""}
        />
        <Textbox
         name="password"
         label="password"
         placeholder="enter password"
         type="password"
         className=" shadow-md shadow-cyan-950  placeholder:text-[#1c2c5089] text-[#1c2c50] outline-2 outline-[#050C1A]"
         register={register("password",{required:"password required"})}
         error={errors.password?errors.password.message:""}
        />
        <Textbox
         name="confirmPassword"
         label="confirmPassword"
         placeholder="confirm Password"
         type="password"
         className=" shadow-md shadow-cyan-950  placeholder:text-[#1c2c5089] text-[#1c2c50] outline-2 outline-[#050C1A]"
         register={register("confirmPassword",{required:"confirmPassword required",validate:value => value === password || "password does not match"})}
         error={errors.confirmPassword?errors.confirmPassword.message:""}
        />


        <div className='inline-block relative text-sm text-gray-200 cursor-pointer' onClick={()=>setNewUser(false)}>Already have a account? sign In</div>


        {backendError && <div className="text-red-400">{backendError}</div>}
        <div className="mt-2 w-full h-auto flex justify-end ">
          <button type='submit' className='subBtn h-10 w-15 p-1 rounded-xl'>
             Submit
        </button>
        </div>
        
        </form>
      </div>
    </Body>
  )
}

const Body = styled.div`
  .sub{
    /* background: transparent; */
    box-shadow: #B7CEFF; 
    width: 25rem;
    border-radius: 2rem;
    padding: 2rem;
    height: auto ;
    position: relative;
    z-index: 1;
  }

  .sub::before{
      content: '';
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg,#151A41 20%,#254893b9 ,#3a1374 );
      display: block;
      filter: blur(5px);
      height: 100%;
      z-index: -1;
    }

  .subBtn{
    background: linear-gradient(135deg,#3AB6B1,#4F5FE9);
  }
  .subBtn:hover{
    background: linear-gradient(135deg,#3ab6b29a,#4f5ee985);
    color: #b3a7a7af;
  }

  @media (min-width:600px) {
    .sub{
      bottom: 2rem;
      
    }
  }
`

export default Signup
