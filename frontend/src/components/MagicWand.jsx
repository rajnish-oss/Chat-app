import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { SlMagicWand } from "react-icons/sl";
import { FaUser } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { BsUpload } from "react-icons/bs";
import CreateChat from './CreateChat';
import { useEffect, useState } from 'react';
import {getAllUser, logout} from '../redux/slice/authSlice'
import { useDispatch, useSelector } from 'react-redux';
import UploadPf from './UploadPf';
import CreateGchat from './CreateGchat';

export default function MagicWand() {
    const [newChat,setNewChat] = useState(false)
    const [upload,setUpload] = useState(false)
    const [gChat,setGChat] = useState(false)
    const dispatch = useDispatch()
    const users = useSelector((state)=>state.auth.allUser)
    console.log(users)

    useEffect(()=>{
      dispatch(getAllUser())
    },[gChat,newChat])

    const handleLogout = () =>{
      dispatch(logout())
    }

  return (
    <div className="w-52 absolute z-50 ">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold text-white   focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
          <SlMagicWand className='text-xl transition duration-100 ease-out data-[closed]:rotate-90' />
        </MenuButton>

        <MenuItems
          as='div'
          transition
          anchor="bottom end"
          className="w-fit relative z-50 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10" onClick={()=>setNewChat(true)}>
              <FaUser/>
              New Chat
            </button>
          </MenuItem>
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10" onClick={()=>setGChat(true)}>
              <FaUsers/>
              New Group Chat
        </button>
          </MenuItem>
          <div className="my-1 h-px bg-white/5" />
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10" onClick={()=>setUpload(true)}>
            <BsUpload />
              Update profile photo
        </button>
          </MenuItem>
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10" onClick={()=>handleLogout()}>
            <BiLogOut />
              Logout
        </button>
          </MenuItem>
        </MenuItems>
      </Menu>

      {newChat?<CreateChat setNewChat={setNewChat} />:""}
      {upload?<UploadPf setUpload={setUpload} />:""}
      {gChat?<CreateGchat setGChat={setGChat} users={users} />:""}
    </div>
  )
}