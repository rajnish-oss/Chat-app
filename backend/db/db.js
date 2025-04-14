import mongoose from "mongoose";

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("mongoDB connected successfully")
    } catch (error) {
        console.log("mongoDB connection failed",error)
    }
}

export default connectDB