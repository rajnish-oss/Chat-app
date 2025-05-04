import {createAsyncThunk,createSlice,isRejectedWithValue} from '@reduxjs/toolkit'
import axiosInstance from '../axiosInstance'
import { act } from 'react'

export const createChat = createAsyncThunk(
  'chat/createChat',async(chatData,{rejectWithValue})=>{
    try {
      const res = await axiosInstance.post('chat/OnOchat',chatData,{
        withCredentials:true,
      })

      if(!res.data){
        throw new Error("data missing in createChat")
      }

      return res.data
    } catch (error) {
      console.error(error.response.data)
      rejectWithValue(error.response.data.message)
    }
  }
)

export const getAllChats = createAsyncThunk(
    'chat/getAllChat',async(__,{rejectWithValue})=>{
        try {
            const res = await axiosInstance.get( "chat/getChats",{
                withCredentials:true
            })
              
        
            return res.data
        } catch (error) {
            console.log(error)
            rejectWithValue(error.response.data.message)
        }
    }
)

export const createGchat = createAsyncThunk(
  'chat/createGchat',async(data,{rejectWithValue})=>{
    try {
      const res = await axiosInstance.post("chat/createGC",data,{
        withCredentials:true,
        headers:{
          'Content-Type': 'multipart/form-data',
        }
      })

      return res.data
    } catch (error) {
      console.error(error.response)
    }
  }
)

export const GCdp = createAsyncThunk(
  'chat/GCdp',async(data,{rejectWithValue})=>{
    try {
      const res = await axiosInstance.post("chat/GCdp",data,{
        withCredentials:true
      })

      return res.data
    } catch (error) {
      console.error(error.response)
    }
  }
)

export const userLeft = createAsyncThunk(
  'chat/userLeft',async(data,{rejectWithValue})=>{
    try {
      const res = await axiosInstance.put('chat/userLeft',data,{
        withCredentials:true
      })

      return res.data
    } catch (error) {
      console.error(error)
    }
  }
)

const initialState = {
    chat : [],
    status : 'idle',
    error : null
}

const chatSlice = createSlice({
    name:"chat",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
      builder

      .addCase(createChat.pending,(state)=>{
        state.status = "loading"
      })
      .addCase(createChat.fulfilled,(state,action)=>{
        state.status = "succeded",
        console.log(action.payload)
        state.chat = action.payload
      })
      .addCase(createChat.rejected,(state,action)=>{
        state.status = "failled",
        state.error = action.payload
      })
      .addCase(getAllChats.pending,(state)=>{
        state.status = "loading"
      })
      .addCase(getAllChats.fulfilled,(state,action)=>{
        state.status = "succeded",
        state.chat = action.payload
      })
      .addCase(getAllChats.rejected,(state,action)=>{
        state.status = "failled",
        state.error = action.payload
      })
      .addCase(createGchat.fulfilled,(state,action)=>{
        state.status = "succeded",
        state.chat = action.payload
      })
      .addCase(GCdp.fulfilled,(state,action)=>{
        state.status = "succeded",
        console.log(JSON.parse(JSON.stringify(state.chat)))
      })
      .addCase(userLeft.fulfilled,(state,action)=>{
        state.status = "succeded" 
      })
    }
})

export const {changeChatName} = chatSlice.actions
export default chatSlice.reducer