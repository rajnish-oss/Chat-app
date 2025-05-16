import Message from "../model/message_model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import{ uploadToCloudinary} from "../utils/cloudinary.js"
import Chat from "../model/chat_model.js"


export const sendMessage = asyncHandler(async(req,res)=>{
      const {sender,content,chat} = req.body

      if(!sender || !content || !chat){
        throw new ApiError(
            400,
            "missing info in message controller"
        )
      }

      const message = await Message.create({
        sender,
        content,
        chat
      })

      const newMessage = await message.populate([
        {path:"sender", select:"username email"},
        {path:"chat" ,populate:{path:"users",select:"username email"}}
      ])

      res.status(200).json(
        new ApiResponse(
            200,
            newMessage,
            "message sent"
        )
      )
})

export const getAllMessage = asyncHandler(async(req,res)=>{
    const chatId = req.params.chatId

    if (!chatId) {
        throw new ApiError(400, "Chat ID is required");
      }

      const messages = await Message.find({chat:chatId})
      .populate("aiSender","name role")
      .populate("sender","username email")
      .populate({
        path:"chat",populate:{path:"users",select:"username email"}
      })

      if(!messages){
        throw new ApiError(
          200,
          "message is not found"
        )
      }

      res.status(200).json(
        new ApiResponse(
         200,
        messages,
        "all messages fetched"   
        )
      )
})

export const deleteMsg = asyncHandler(async(req,res)=>{
  const msgId = req.params.msgId

  if (!msgId) {
      throw new ApiError(400, "Chat ID is required");
    }

    const deletedMessages = await Message.findByIdAndDelete(msgId)

    console.log(deletedMessages)

    res.status(200).json(
      new ApiResponse(
       200,
       msgId,
      "message deleted"   
      )
    )
})

