import mongoose,{Schema} from "mongoose";

const notiSchema = new mongoose.Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    chat:{
        type:Schema.Types.ObjectId,
        ref:"Chat"
    },
    lastMessage:{
        type:Schema.Types.ObjectId,
        ref:"Message"
    },
    unReadCount:{
        type:Number,
        default:0
    }
})

const Notification = mongoose.model("Notification",notiSchema)
export default Notification