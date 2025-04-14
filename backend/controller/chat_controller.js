import Chat from '../model/chat_model.js'
import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import User from '../model/user_model.js'
import { uploadToCloudinary } from '../utils/cloudinary.js'

export const OnOchat = asyncHandler(async(req,res)=>{
    const userId = req.user._id
    const{username} = req.body

    if(!username){
        throw new ApiError(
            401,
            "need userId to access chat"
        )
    }

    const user = await User.findOne({username:username})

    const chat = await Chat.findOne({
        isGroup:false,
        users:{$all:[user._id,userId]},
    })
    .populate("users","-password")
    .populate("lastmessage")

    const isChat = await User.populate(chat,{
        path:"lastmessage.sender",
        select:"username email"
    })

    if(isChat){
        return res.status(200).json(
            new ApiResponse(
                200,
                isChat,
                "chat fetched successfully"
            )
        )
    }

    const chatData = await Chat.create({
        name:username,
        isGroup:false,
        users:[user._id,userId]
    })

    const fullChat = await Chat.findOne({
        _id:chatData._id
    }).populate("users","-password")

    res.status(200).json(
        new ApiResponse(
            200,
            fullChat,
            "new chat created"
        )
    )
})

export const getAllChats = asyncHandler(async(req,res)=>{
   const userId = req.user._id
   console.log(userId)
   if(!userId){
    throw new ApiError(
        400,
        "user not found"
    )
   }

   const chats = await Chat.find({
    users:{$in:[userId]}
   })
   .populate("users","-password")
   .populate("admin","username email")
   .populate({
    path:"lastmessage",
    populate:{
        path:"sender",
        select:"username email"
    }
   })
  
   const sortedChats = chats.sort((a,b)=>b.updatedAt - a.updatedAt)
   
   res.status(200).json(
    new ApiResponse(
        200,
        sortedChats,
        "all chats fetched successfully"
    )
   )
})

export const createGC = asyncHandler(async(req,res)=>{
    const {name,users_id} = req.body
    const userId = req.user._id

    if(!name || !users_id){
        throw new ApiError(
            401,
            "not enough data check createGC"
        )
    }

    const GC = await Chat.create({
        name,
        isGroup : true,
        admin:userId,
        users:[userId] 
    }
    )

        GC.users.push(...users_id)

    await GC.save({validateBeforeSave:false})

    console.log(GC.users)
    if(GC.users.length < 2){
        throw new ApiError(
            400,
            "add more users group"
        )
    }

    const fullGC = await Chat.findById(GC._id)
    .populate("users","username email")
    .populate("admin","username email")

    if(GC){
        return res.status(200)
        .json(
            new ApiResponse(
                200,
                fullGC,
                "group chat build successfully"
            )
        )
    }
})

export const renameGC = asyncHandler(async(req,res)=>{
    const {chatId,name} = req.body
    const userId = req.user._id

    if(!chatId || !name){
        throw new ApiError(
            400,
            "missing data check renameGC"
        )
    }


    const chat = await Chat.findById(chatId)
    
    const popChat = await chat.populate(
        {path:"admin",select:"-password"}
    )

    if(popChat.admin._id.toString() === userId.toString()){
        chat.name = name 
        await chat.save({validateBeforeSave:false})
    }else{
        throw new ApiError(
            403,
            "only admin can change GC name"
        )
    }

    res.status(200).json(
        new ApiResponse(
            200,
            chat,
            "name update successfully"
        )
    )
})

export const addUser = asyncHandler(async(req,res)=>{
    const {username,email,chatId} = req.body
    const userId = req.user._id

    if( !username||!email||!chatId ){
        throw new ApiError(
            401,
            "missing data in addUser"
        )
    }

    const chat = await Chat.findById(chatId)
                 .populate("users","-password")
                 .populate("admin","-password")

    const user = await User.findOne({
        $or:[{username},{email}]
    })

    if(!user){
        throw new ApiError(
            402,
            "user not found"
        )
    }

    if(chat.admin._id.toString() !== userId.toString()){
        throw new ApiError(
            400,
            "only admin can add users"
        )
    }
    
    const userExist = chat.users.some(users=>
        users._id.toString() === user._id.toString() 
    )

    if(userExist){
        throw new ApiError(
            402,
            "user already exist"
        )
    }

    chat.users.push(user._id)
    await chat.save({validateBeforeSave:false})

    const newChat = await chat.populate("users","-password")
                              .populate("admin","-password")
    
    res.status(200).json(
        new ApiResponse(200,
        newChat,
        "new user added")
    )
})

export const removeUser = asyncHandler(async(req,res)=>{
    const {users_id,chatId} = req.body
    const userId = req.user._id

    if( !users_id||!chatId ){
        throw new ApiError(
            401,
            "missing data in removeUser"
        )
    }

    const chat = await Chat.findById(chatId)
                 .populate("users","-password")
                 .populate("admin","-password")

   

    if(chat.admin._id.toString() !== userId.toString()){
        throw new ApiError(
            400,
            "only admin can add users"
        )
    }
    
    const userExist = chat.users.some(user=>
        user._id !== users_id
    )

    if(!userExist){
        throw new ApiError(
            404,
            "no such user found"
        )
    }

    chat.users.pull(users_id)
    await chat.save({validateBeforeSave:false})

    // const newChat = await chat.populate("users","-password")
    //                           .populate("admin","-password")
    
    res.status(200).json(
        new ApiResponse(200,
        chat,
        "user removed successfully")
    )
})

export const userLeft = asyncHandler(async(req,res)=>{
    const {chatId} = req.body
    const userId = req.user._id

    if(!chatId ){
        throw new ApiError(
            401,
            "check userLeft"
        )
    }

    const chat = await Chat.findById(chatId)
                 .populate("users","-password")
                 .populate("admin","-password")

    chat.users.pull(userId)
    await chat.save({validateBeforeSave:false})

    const newChat = await chat.populate("users","-password")
                              .populate("admin","-password")
    
    res.status(200).json(
        new ApiResponse(200,
        newChat,
        "user left successfully")
    )
})

export const sendAttachment = asyncHandler(async(req,res)=>{
    const file = req.files.media
    const chat = req.params.chatId
  
    if(!file){
      throw new ApiError(
        400,
        "file is missing from req body"
      )
    }

    const media = await Promise.all(
         file.map((file)=> uploadToCloudinary(file.path))
    )
  
    const msg = await Chat.findById(chat)
  
    msg.attachments.push(...media)
    await msg.save()
    res.status(200).json(
      new ApiResponse(
        200,
        msg,
        "attachment sent"
      )
    )
  })