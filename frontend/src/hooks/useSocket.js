import React,{useEffect} from 'react'
import {Socket} from '../components/Socket'
import { useDispatch } from 'react-redux'
import {
    newMessageReceived,
    userTyping,
    userStoppedTyping,
    fetchMessage,
  } from '../redux/slice/socketSlice.js'
  import { storeMessage } from '../redux/slice/msgSlice.js'

const useSocket = ({userID,selectedUser,selectedChatId}) => {
    const dispatch = useDispatch()
    useEffect(()=>{
        Socket.connect()

        

        Socket.emit('setup', userID)
        Socket.emit('join chat',selectedUser)
        
        Socket.on("received message",(message)=>{
            console.log(message)
            console.log("log",userID,selectedUser)
            dispatch(newMessageReceived(message))
            dispatch(storeMessage(message))
           
        })

        Socket.on("aiMsg",(msg)=>{   
            console.log(msg)
            dispatch(newMessageReceived(msg))

           dispatch(fetchMessage(selectedChatId))
            dispatch(storeMessage(msg))
        })

        Socket.on("stop typing",(message)=>{
            dispatch(userStoppedTyping(message.sender))
        })
    

    return () => {
        Socket.off("received message");
        Socket.off("aiMsg");
        Socket.off("stop typing");
        Socket.disconnect();
      };
    }, [dispatch,userID,selectedUser]);
}

export default useSocket