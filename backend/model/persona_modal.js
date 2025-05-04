import mongoose, { Schema } from 'mongoose'

const PersonaSchema = new mongoose.Schema({
    chatId:[{
        type:String,
        required:true
    }],
    name:{
        type:String,
        default:"rex"
    },
    role:{
        type:String,
        default:"helpful assistanse"
    },
    createdAtBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

const Persona = mongoose.model("persona",PersonaSchema)
export default Persona