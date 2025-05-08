import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axiosInstance from '../axiosInstance'

export const createAI = createAsyncThunk(
    'AI/createAI',async(data,{rejectWithValue})=>{
        try {
            const res = await axiosInstance.post('/ai/createAI',data,{
                withCredentials:true
            })

            return res.data
        } catch (error) {
            console.error(error.response)
            rejectWithValue(error.response.data.message)
        }
    }
)

const initialState = ({
    AI:"",
    status:"idle",
    error:null
})

const AISlice = createSlice({
    name:"AI",
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(createAI.fulfilled,(state,action)=>{
        state.AI = action.payload
    })
  }
})

export default AISlice.reducer
