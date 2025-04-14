import Notification from "../model/notification_model.js"
import {asyncHandler }from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import User from '../model/user_model.js'
import Message from '../model/message_model.js'
import Chat from "../model/chat_model.js"


export const manageNotification = asyncHandler(async(req,res)=>{
    const {sender_id,chat_id,msg_id} = req.body

    if(!sender_id || !chat_id || !msg_id){
        throw new ApiError(
            400,
            "some parameters are missing"
        )
    }

    let notification = await Notification.findOne({user:sender_id,chat:chat_id})

    if(notification){
        notification.unReadCount += 1,
        notification.lastMessage = msg_id,
        await notification.save()
    }else{
            notification = await Notification.create({
            user:sender_id,
            chat:chat_id,
            lastMessage:msg_id,
            unReadCount:1
        })
    }

    const resNotification = await Notification.findById(notification._id).populate([
        {path:"user",select:"-password -refreshToken"},
        {path:"chat",select:"-password -refreshToken"},
        {path:"lastMessage",select:"-password -refreshToken"}
    ])

    res.status(200).json(
        new ApiResponse(
            200,
            resNotification,
            "notification created"
        )
    )
})

export const notiRead = asyncHandler(async(req,res)=>{
    const {user_id,chat_id} = req.body

    if(!user_id || !chat_id){
        throw new ApiError(
            400,
            "data missing from req.body"
        )
    }

    const noti = await Notification.findOneAndUpdate({
        user:user_id,
        chat:chat_id
    },{unReadCount:0})

    res.status(200).json(
        new ApiResponse(
            200,
            noti,
            "user read notification"
        )
    )
})