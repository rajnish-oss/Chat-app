import React,{useEffect} from 'react'
import {Socket} from '../components/Socket'
import { useDispatch } from 'react-redux'
import {
    newMessageReceived,
    userTyping,
    userStoppedTyping,
  } from '../redux/slice/socketSlice.js'

const useSocket = () => {
    const dispatch = useDispatch()
    console.log("useSocket")
    useEffect(()=>{
        Socket.connect()

        Socket.on("received message",(message)=>{
            console.log("this  useSocket",message)
            dispatch(newMessageReceived(message))
            console.log("this is from useSocket",message.content)
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
    }, [dispatch]);
}

export default useSocket