import express from 'express'
import userRoutes from './userRoutes.js'
import chatRoutes from './chatRoutes.js'
import messageRoutes from './messageRoutes.js'
import notificationRoutes from './notificationRoutes.js'

const route = express.Router()

route.use("/user",userRoutes)
     .use("/message",messageRoutes)
     .use("/chat",chatRoutes)
     .use("/notification",notificationRoutes)
//      .use("/uploads")

export default route     