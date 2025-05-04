import React,{useEffect} from 'react'
import {Socket} from '../components/Socket'
import { useDispatch } from 'react-redux'
import {
    newMessageReceived,
    userTyping,
    userStoppedTyping,
  } from '../redux/slice/socketSlice.js'
  import { storeMessage } from '../redux/slice/msgSlice.js'

const useSocket = ({userID,selectedUser}) => {
    const dispatch = useDispatch()
    useEffect(()=>{
        Socket.connect()


        Socket.emit('setup', userID)
        Socket.emit('join chat',selectedUser)
        
        Socket.on("received message",(message)=>{
        
            dispatch(newMessageReceived(message))
            dispatch(storeMessage(message))
           
        })

        Socket.on("typing",(message)=>{
            dispatch(userTyping(message.sender))
        })

        Socket.on("stop typing",(message)=>{
            dispatch(userStoppedTyping(message.sender))
        })
    

    return () => {
        Socket.off("received message");
        Socket.off("typing");
        Socket.off("stop typing");
        Socket.disconnect();
      };
    }, [dispatch,userID]);
}

export default useSocket