import mongoose, { mongo, Schema } from "mongoose";

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
    },
    aiSender:{
        type:Schema.Types.ObjectId,
        ref:"Persona",
        required:false
    }
},{
    timestamps:true
})

const Message = mongoose.model("Message",messageSchema)
export default Message