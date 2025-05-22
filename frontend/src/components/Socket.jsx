import { io } from "socket.io-client";

const URL = "http://192.168.1.102:8800"; 
export const Socket = io(URL,{
  withCredentials:true
});
