import {createAsyncThunk,createSlice,isRejectedWithValue} from '@reduxjs/toolkit'
import axiosInstance from '../axiosInstance';
import { useReducer } from 'react';
import uploadPf from '../../components/UploadPf';

export const registerUser = createAsyncThunk(
    'auth/registerUser',async(userData,{rejectWithValue})=>{
        try {
            const res = await axiosInstance.post("user/register",userData,{
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
            const res = await axiosInstance.post("user/login",userData,{
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

export const getAllUser = createAsyncThunk(
    'auth/getAllUser',async(_,{rejectWithValue})=>{
         try {
            const res = await axiosInstance.get("user/getUsers",{
                withCredentials:true
            })

            return res.data
         } catch (error) {
            console.log(error)
         }
    }
)

export const uploadAvatar = createAsyncThunk(
    'auth/uploadAvatar',async(formData,{rejectWithValue})=>{
        try {
            const res = await axiosInstance.post("user/uploadPf",formData,{
                withCredentials:true
            })

            console.log(res.data)
            return res.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data.message)
        }
    }
)



const initialState = {
    user: JSON.parse(localStorage.getItem("auth")) || null,
    allUser: [],
    avatar: null,
    status:"idle",
    error:null
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout:(state,action)=>{
            state.user = null
        }
    },
    extraReducers:(builder)=>{
        builder
          //register
          .addCase(registerUser.pending,(state)=>{
            state.isLoading = true
          })
          .addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading = false,
            state.isSccusses = true,
            state.user = action.payload.data,
            console.log(action.payload.data)
            
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
          .addCase(uploadAvatar.fulfilled,(state,action)=>{
            
            const url = action.payload.data[0].url
            console.log(url)
            state.user.avatar = url
            const storedUser = JSON.parse(localStorage.getItem("auth"))
            console.log(storedUser)
            if(storedUser){
                storedUser.avatar = url
                localStorage.setItem("auth", JSON.stringify(storedUser));
            }
          })
          .addCase(getAllUser.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.allUser = action.payload
          })
          .addCase(getAllUser.rejected,(state,action)=>[
            console.log(action.payload)
          ])
    }
})

export const {logout} = authSlice.actions;

export default authSlice.reducer;