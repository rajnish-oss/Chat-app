import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axiosInstance from '../axiosInstance'

export const storeMessage = createAsyncThunk(
    'msg/storeMessage',async(data,{rejectWithValue})=>{
        try {
            const res = await axiosInstance.post("message/sendmsg",data,{
                withCredentials:true
            })
    
            return res.data
        } catch (error) {
            return rejectWithValue(error.reponse.data.message)
        }
    }
)

const initialState ={
    msg:""
}



const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
          //
          .addCase(storeMessage.fulfilled,(state,action)=>{
            state.msg = action.payload
            })
          
          
    }
})

export default messageSlice.reducer