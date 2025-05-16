import React,{useEffect, useState} from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { BiLogOut } from "react-icons/bi";
import { useDispatch,useSelector } from 'react-redux';
import { userLeft } from '../redux/slice/chatSlice.js';
import { getAllChats } from '../redux/slice/chatSlice.js';
import AddAI from './AddAI.jsx';



const ChatOption = ({chatID}) => {
   const { status } = useSelector((state) => state.chat.chat);
   const [addAi,setAddAi] = useState(false)

    const dispatch = useDispatch()

    const handleLeaveChat = () => {
      dispatch(userLeft({ chatId: chatID })).unwrap()
      .then(() => {if (status === "succeded") {
        dispatch(getAllChats());
        console.log("dispatched")
      }})
    }


  return (
    <div className="">
    <Menu>
    <MenuButton><BsThreeDotsVertical/></MenuButton>
    <MenuItems anchor="bottom end" className="relative flex flex-col z-50 bg-[#0B0C14] text-blue-100 w-35 p-2 rounded-2xl border-2 border-[#262b46]" >
      <MenuItem>
        <button className="data-focus:bg-white/5 rounded-2xl my-1 flex justify-center" onClick={()=>setAddAi(true)}>
          AI persona
        </button>
      </MenuItem>
      <MenuItem>
        <a className="data-focus:bg-white/5 rounded-2xl my-1 flex justify-center " href="/support">
          Support
        </a>
      </MenuItem>
      <MenuItem>
        <button className="data-focus:bg-white/5 data-focus:text-red-600 rounded-2xl my-1 flex justify-center items-center" onClick={() => handleLeaveChat()}>
        <BiLogOut className='mr-2'/>
          Leave Chat
        </button>
      </MenuItem>
    </MenuItems>
  </Menu>
  {addAi ? <AddAI setAddAi={setAddAi} chatID={chatID} /> : ""}
  </div>
  )
}

export default ChatOption
