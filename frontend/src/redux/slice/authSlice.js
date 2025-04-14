import {createAsyncThunk,createSlice,isRejectedWithValue} from '@reduxjs/toolkit'
import axios from 'axios'
import { useReducer } from 'react';
const URL = 'http://localhost:8800/api/user/'

export const registerUser = createAsyncThunk(
    'auth/registerUser',async(userData,{rejectWithValue})=>{
        try {
            const res = await axios.post(URL + "register",userData,{
                headers:{
                    "Content-Type":"application/json",
                },
                withCredentials:true
            });

            console.log(res.data)

            if(!res.data){
                throw new Error("Invalid registration response")
            }

            return res.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response?.data?.message)
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/loginUser',async(userData,{rejectWithValue})=>{
        try {
            const res = await axios.post(URL + "login",userData,{
                withCredentials:true
            })
    
            console.log(res.data)
            if(!res.data){
                throw new Error("data missing in loginUser")
            }
    
            return res.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data.message)
        }
    }
)

const initialState = {
    user: JSON.parse(localStorage.getItem("auth")) || null,
    status:"idle",
    error:null
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
          //register
          .addCase(registerUser.pending,(state)=>{
            state.isLoading = true
          })
          .addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading = false,
            state.isSccusses = true,
            state.user = action.payload.data
            localStorage.setItem('auth', JSON.stringify(action.payload.data))
          })
          .addCase(registerUser.rejected,(state,action)=>{
            state.isLoading = false,
            state.error = true,
            state.message = action.payload
          })

          .addCase(loginUser.pending,(state)=>{
            state.isLoading = true
          })
          .addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading = false,
            state.isSccusses = true,
            state.user = action.payload.data
            localStorage.setItem('auth', JSON.stringify(action.payload.data))
          })
          .addCase(loginUser.rejected,(state,action)=>{
            state.isLoading = false,
            state.error = action.payload,
            state.message = action.payload
          })
    }
})


export default authSlice.reducer;