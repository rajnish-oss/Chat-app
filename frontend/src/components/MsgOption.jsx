import React from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { RiArrowDropDownLine } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { deleteMsg, fetchMessage } from '../redux/slice/socketSlice.js';

const MsgOption = ({msgId,chatId}) => {
    const dispatch = useDispatch()
  return (
    <div className='text-gray-800 hover:text-blue-300 transition transform hover:-translate-x-2 h-2 mt-[-12px]'>
     <Menu>
         <MenuButton > <RiArrowDropDownLine className='text-3xl'/> </MenuButton>
         <MenuItems anchor="bottom end" className="relative z-50 bg-[#0B0C14] text-blue-100 w-35 p-2 rounded-2xl border-2 border-[#262b46] flex flex-col" >
           {/* <MenuItem>
             <button className="data-focus:bg-white/5 rounded-2xl my-1 flex justify-center" >
               AI persona
             </button>
           </MenuItem>
           <MenuItem>
             <a className="data-focus:bg-white/5 rounded-2xl my-1 flex justify-center " href="/support">
               Support
             </a>
           </MenuItem> */}
           <MenuItem>
             <button className="data-focus:bg-white/5 data-focus:text-red-500 rounded-2xl my-1 flex justify-center " onClick={()=>dispatch(deleteMsg(msgId)).unwrap().then(()=>dispatch(fetchMessage(chatId)))}>
               Delete
             </button>
           </MenuItem>
         </MenuItems>
       </Menu> 
    </div>
  )
}

export default MsgOption
