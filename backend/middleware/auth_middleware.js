import jwt from 'jsonwebtoken'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import User from '../model/user_model.js'

const auth = asyncHandler(async(req,res,next) =>{
    const refreshToken = req?.cookies?.refreshToken

    if(!refreshToken){
        throw new ApiError(
            501,
            "refreshToken not found, check auth middleware"
        )
    }

    const checkToken = jwt.verify(refreshToken,process.env.JWT_SECRET)

    if(!checkToken){
        throw new ApiError(
            402,
            "token not correct"
        )
    }

    const user = await User.findOne({refreshToken})

    if(!user){
        throw new ApiError(
            501,
            "user not found"
        )
    }
    console.log("id is",user._id)
    req.user = user
    next()
})

export default auth