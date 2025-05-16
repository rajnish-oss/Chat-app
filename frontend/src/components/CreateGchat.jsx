import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createGchat } from '../redux/slice/chatSlice.js'
import useSocket from '../hooks/useSocket.js'

const CreateGchat = ({users}) => {
    const [user,setUser] = useState("")
    const [selectedUser,setSelectedUser] = useState([])
    const [nameGroup,setNameGroup] = useState(false)
    const [GCname,setGCname] = useState("")
    const [dpPath,setDpPath] = useState("")
    const dispatch = useDispatch()
    
    const filterData = users.data && users.data.filter((u)=> u.username.toLowerCase().includes(user.toLowerCase()) )
    console.log(selectedUser)

    const handleCheckbox = (value) => {
      if(selectedUser.includes(value)){
        const v = selectedUser.filter((u)=>u !== value)
        setSelectedUser(v)
      }else{
        setSelectedUser([...selectedUser,value])
      }
    }
    
    const handleSubmit = () => {
      const formData = new FormData();
  formData.append("name", GCname);
  formData.append("users_id", JSON.stringify(selectedUser)); // if array
  formData.append("dp", dpPath); // this should be a File (object

  dispatch(createGchat(formData));
    }
    
    useEffect(()=>{
       console.log(dpPath)
    },[GCname,dpPath])
    const submitDP = () =>{
      // dispatch(GCdp())
      console.log("hi")
    }
    
    selectedUser &&  useSocket(selectedUser) && console.log("selectedUser")

  return (
    <div className='inline-block bg-[#0f192b] absolute z-50 p-4 rounded-2xl w-[35vw] '>
      { !nameGroup ? (<div className="">
        <input
         type="text"
         label="search"
         value={user}
         className='w-full bg-blue-100 rounded-4xl p-2 outline-blue-400'
         placeholder='search user..'
         onChange={(e)=> setUser(e.target.value)}
         />
      
      <div className="overflow-x-scroll h-[30vh] w-full my-1" style={{scrollbarWidth:'none' }}>
        {filterData.map((u)=>
      <div className=" my-2 flex justify-between bg-white/15 px-4 p-2 rounded-4xl text-blue-50" key={u._id}>
        <span>{u.username}</span>
        <span>
          <input
           type="checkbox"
           checked={selectedUser.includes(u._id)}
           onChange={(e)=>handleCheckbox(u._id)}
           />
        </span>
      </div>)}
      </div>
      <button className='w-full bg-blue-600 rounded-3xl' onClick={()=>setNameGroup(true)}>NEXT</button>
      </div>
      ) : (
        <div className="flex flex-col items-center">
           <div className="bg-white inline-block h-20 w-40">
            <img src="" alt="" />
            <input
              type="file"
              id="fileInput"
              className="hidden" 
              onChange={(e) => setDpPath(e.target.files[0])}
            />
           <label
            htmlFor="fileInput"
            className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            
           >
           Upload
           </label>
           </div>
           <span className=' w-full bg-gray-400 h-0.5 my-2'></span>
           <div className=" flex flex-col items-center">
            <input 
            type="text"
            name="GC name"
            placeholder='enter group name'
            className='bg-blue-100 px-1 rounded-2xl text-center outline-blue-600'
            onChange={(e)=>setGCname(e.target.value)}
             />
             <button className='mt-2 w-2/4 rounded-2xl bg-blue-600' onClick={()=> handleSubmit()}>SUBMIT</button>
           </div>
        </div>
      )
      }
      
    </div>
  )
}

export default CreateGchat
