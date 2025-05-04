import express from 'express'
import mongoose from 'mongoose'
import User from '../model/user_model.js'
import {asyncHandler} from '../utils/asyncHandler.js'
import { ApiError } from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { uploadToCloudinary } from '../utils/cloudinary.js'

const generateAccessAndRefreshToken = async(userId) =>{
   try {
      const user = await User.findById(userId)

      const accessToken= user.generateAccessToken()
      const refreshToken = user.generateRefreshToken()

      user.refreshToken = refreshToken
      await user.save({validateBeforeSave:false})

      return {accessToken,refreshToken}
   } catch (error) {
      throw new ApiError(
         401,
         "something wrong in generateAccessAndRefreshToken",
         error
      )
   }
}

export const register = asyncHandler(async(req,res)=>{
     const {username,email,password,fullName} = req.body

     if(!username||!email||!password||!fullName){
      throw new ApiError(
         402,
         "no data found from req.body"
      )
     }

     const existedUser = await User.findOne({
      $or:[{username},{email}]
     })

     if(existedUser){
      throw new ApiError(
         401,
         "user already exist"
      )
     }

     const user = await User.create({
        username,
        fullName,
        email,
        password,
        avatar: null
     })
    
     console.log("user id is",user._id)
     const {refreshToken,accessToken} = await generateAccessAndRefreshToken(user._id)
     user.refreshToken = refreshToken
     await user.save({validateBeforeSave:false})

     const createdUser = await User.findById(user._id).select("-password -refreshToken")

     if(!createdUser){
        throw new ApiError(
            401,
            "user not register"
        )
     }

     const option = {
      httpOnly:true,
      secure:false
     }

     if(!refreshToken || !accessToken){
      throw new ApiError(
         200,
         "tokes not generated"
      )
     }

     return res.status(200)
     .cookie("refreshToken",refreshToken,option)
     .cookie("accessToken",accessToken,option)
     .json(
      new ApiResponse(
         200,
         createdUser,
         "user registered successfully"
      )
     )
})

export const login = asyncHandler(async(req,res)=>{
   const {username,email,password} = req.body

   if([username,email,password].some((field) => field.trim() == "")){
      throw new ApiError(
         402,
         "no data found from req.body"
      )
     }

     const user = await User.findOne({
      $or:[{username},{email}]
     })

     if(!user){
      throw new ApiError(
         402,
         "user doesnt exist, register first"
      )
     }

     const checkedPassword = await user.matchPassword(password)

     if(!checkedPassword){
      throw new ApiError(
         402,
         "incorrect credential try again"
      )
     }

     const {refreshToken,accessToken} = await generateAccessAndRefreshToken(user._id)

     if(!refreshToken || !accessToken){
      throw new ApiError(
         200,
         "tokes not generated"
      )
     }

     const loggedInUser = await User.findById(user._id).select("-refreshToken -password")

     const option = {
      httpOnly:true,
      secure:false
     }

     

     res.status(200)
     .cookie("refreshToken",refreshToken,option)
     .cookie("accessToken",accessToken,option)
     .json(
         new ApiResponse(
            200,
            loggedInUser,
            "user logged in successfully"
         )
     )
})

export const getAllUser = asyncHandler(async(req,res)=>{
      const users = await User.find().select("-password -refreshToken")

      res.status(200).json(
         new ApiResponse(
            200,
            users,
            "all user sent"
         )
      )
})

export const uploadAvatar = asyncHandler(async(req,res)=>{
   console.log(req.files.avatar[0].path)
   const avatarPath = req.files.avatar[0].path
   const userId = req.user._id

   if(!avatarPath){
      throw new ApiError(
         400,
         "avatar path missing"
      )
   }

    const avatar = await uploadToCloudinary(avatarPath)
    const user = await User.findById(userId)

    user.avatar = avatar
    await user.save({validateBeforeSave:false})

    res.status(200).json(
      new ApiResponse(
      200,
      user.avatar,
      "profile photo updated")
    )
})

export const logout = asyncHandler(async(req,res)=>{
   const userId = req.user._Id

   if(!userId){
      throw new ApiError(
         400,
         "userID missing"
      )
   }

   const user = await User.findByIdand
})