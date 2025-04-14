import { io } from "socket.io-client";

const URL = "http://localhost:8800"; 
export const Socket = io(URL,{
  withCredentials:true
});
