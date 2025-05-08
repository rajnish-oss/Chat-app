import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
const URL = 'http://192.168.1.147:8800/api/message/'

export const fetchMessage = createAsyncThunk(
    'socket/fetchMessage',async(id,{rejectWithValue})=>{
        try {
            const res = await axios.get(URL + "getMsg/"+id,{
                withCredentials:true
            })
    
            return res.data
        } catch (error) {
            return rejectWithValue(error.reponse.data.message)
        }
    }
)

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
            if(!state.typingUsers.includes(action.payload)){
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
    },
    extraReducers:(builder)=>{
        builder
        //
        .addCase(fetchMessage.fulfilled,(state,action)=>{
            state.messages = action.payload.data
        })
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
