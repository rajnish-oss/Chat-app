import {createAsyncThunk,createSlice,isRejectedWithValue} from '@reduxjs/toolkit'
import axios from 'axios'
const URL = 'http://localhost:8800/api/chat/'

export const createChat = createAsyncThunk(
  'chat/createChat',async(chatData,{rejectWithValue})=>{
    try {
      const res = await axios.post(URL + 'OnOchat',chatData,{
        withCredentials:true,
      })

      if(!res.data){
        throw new Error("data missing in createChat")
      }

      return res.data
    } catch (error) {
      console.log(error)
      rejectWithValue(error.response.data.message)
    }
  }
)

export const getAllChats = createAsyncThunk(
    'chat/getAllChat',async(__,{rejectWithValue})=>{
        try {
            const res = await axios.get(URL + "getChats",{
                withCredentials:true
            })
              
            console.log(res.data)
            return res.data
        } catch (error) {
            console.log(error)
            rejectWithValue(error.response.data.message)
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
    }
})

export default chatSlice.reducer