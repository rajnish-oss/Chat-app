import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {uploadAvatar} from '../redux/slice/authSlice'
import { IoMdClose } from "react-icons/io";

const UploadPf = ({setUpload}) => {
    const dispatch = useDispatch()
    const [file,setFile] = useState("")

    const handleUpload = () =>{
        const formData = new FormData()
        formData.append("avatar",file)
        const res = dispatch(uploadAvatar(formData))
        const url = res.payload.data.avatar[0].url
        setUpload(false)
    }

  return (
    <div className='w-fit h-30 border-white/5 bg-white/5 p-4 rounded-2xl relative z-50 right-60 top-5'>
      <IoMdClose className='absolute right-2 top-2 text-xl text-white' onClick={()=> setUpload(false)}/>
        <div className="relative mt-4 mr-2">
          <input type="file" onChange={(e) => setFile(e.target.files[0])} className='bg-blue-300 w-60 p-1 rounded-xl '/>
      <div className="w-full relative">
        <button className='absolute right-0 bg-blue-600 text-white p-1 rounded-2xl my-2' onClick={()=> handleUpload()}>upload</button>
      </div>
        </div>
      
    </div>
  )

}

export default UploadPf
