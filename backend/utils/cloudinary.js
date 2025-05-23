import {v2 as cloudinary} from "cloudinary"
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_SECRET
})

const uploadToCloudinary = async(localFilePath) =>{
    try {
        if(!localFilePath)return null

        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto",
            transformation: [
                { width: 500, height: 500, crop: "thumb", gravity: "face" } // crop square around face
              ]
        })
         
         fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
         fs.unlinkSync(localFilePath)
        console.error("error in cloudinary",error)
        return null
    }
}

export {uploadToCloudinary}