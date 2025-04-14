import mongoose,{mongo,Schema}from "mongoose";
import User from './user_model.js'
import Message from "./message_model.js";

const chatSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    isGroup:{
        type:Boolean,
        required:true,
        default:false
    },
    attachments:[{
        type:{url:String,
            path:String}
        ,
        default:[]
    }],
    lastmessage:{
        type:Schema.Types.ObjectId,
        ref:"Message"
    },
    users:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    admin:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})

const Chat = mongoose.model("Chat",chatSchema)
export default Chat