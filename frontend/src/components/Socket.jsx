import { io } from "socket.io-client";

const URL = "https://bo-chat.onrender.com"; 
export const Socket = io(URL,{
  withCredentials:true
});
