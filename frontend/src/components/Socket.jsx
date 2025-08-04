import { io } from "socket.io-client";

const URL = "https://chat-app-v34y.onrender.com"; 
export const Socket = io(URL,{
  withCredentials:true
});
