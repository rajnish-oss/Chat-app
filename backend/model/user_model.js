import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import {ApiError} from "../utils/ApiError.js"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    fullName:{
        type:String,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
       type:[{
        url:String,
        path:String
       }],
       default:[]
    },
    refreshToken:{
        type:String,
        index:true
    }
},{timestamps: true})



userSchema.pre("save",async function(next){
    
        if(!this.isModified("password")){
            console.log("password is not modified")
            return next()
        }
    
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password,salt)

        next()
    } catch (error) {
        throw new ApiError(
            400,
            "error whil e bcrypt",
            error
        )
    }
})

userSchema.methods.matchPassword = async function(enteredPassoword){
    return await bcrypt.compare(enteredPassoword,this.password)
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"1d"
        }
    )
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id : this._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"7d"
        }
    )
}

const User = mongoose.model("User",userSchema)
export default User