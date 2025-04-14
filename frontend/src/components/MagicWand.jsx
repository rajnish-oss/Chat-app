import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { SlMagicWand } from "react-icons/sl";
import { FaUser } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { BsUpload } from "react-icons/bs";
import CreateChat from './CreateChat';
import { useState } from 'react';

export default function MagicWand() {
    const [newChat,setNewChat] = useState(false)

  return (
    <div className="fixed w-52 ">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold text-white   focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
          <SlMagicWand className='text-xl transition duration-100 ease-out data-[closed]:rotate-90' />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-fit origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10" onClick={()=>setNewChat(true)}>
              <FaUser/>
              New Chat
            </button>
          </MenuItem>
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              <FaUsers/>
              New Group Chat
        </button>
          </MenuItem>
          <div className="my-1 h-px bg-white/5" />
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            <BsUpload />
              Update profile photo
        </button>
          </MenuItem>
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            <BiLogOut />
              Logout
        </button>
          </MenuItem>
        </MenuItems>
      </Menu>

      {newChat?<CreateChat setNewChat={setNewChat} />:""}
    </div>
  )
}