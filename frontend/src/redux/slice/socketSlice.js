import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
    name:"socket",
    initialState:{
        messages:[],
        users:[],
        typingUsers:[]
    },
    reducers:{
        newMessageReceived:(state,action)=>{
            console.log(action.payload)
            state.messages.push(action.payload)
        },
        userTyping:(state,action)=>{
            if(state.typingUsers.includes(action.payload)){
                state.typingUsers.push(action.payload)
            }
        },
        userStoppenTyping:(state,action)=>{
            state.typingUsers = state.typingUsers.filter((u) => u !== action.payload)
        },
        setUsers:(state,action)=>{
            state.users = action.payload
        },
        clearChat:(state)=>{
            state.messages = []
            state.typingUsers = []
        }
    }
})

export const {
    newMessageReceived,
    userTyping,
    userStoppedTyping,
    setUsers,
    clearChat,
  } = socketSlice.actions;
  
  export default socketSlice.reducer;
