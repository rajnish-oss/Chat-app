import mongoose, { mongo, Schema } from "mongoose";
import User from './user_model.js'

const messageSchema = new mongoose.Schema({
    sender:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    content:{
        type:String,
        required:true
    },
    chat:{
        type:Schema.Types.ObjectId,
        ref:"Chat"
    }
},{
    timestamps:true
})

const Message = mongoose.model("Message",messageSchema)
export default Message