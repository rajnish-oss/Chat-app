import express from 'express'
import { addUser, createGC, getAllChats, OnOchat, removeUser, renameGC, sendAttachment, userLeft } from '../controller/chat_controller.js'
import auth from '../middleware/auth_middleware.js'
import { upload } from '../middleware/multer_middleware.js';

const routes = express.Router()

routes.post("/OnOchat",auth,OnOchat)
      .get("/getChats",auth,getAllChats)
      .post("/createGC",auth,createGC)
      .put("/renameGC",auth,renameGC)
      .post("/addUser",auth,addUser)
      .put("/removeUser",auth,removeUser)
      .put("/userLeft",auth,userLeft)
      .put("/attachment/:chatId",upload.fields([{
                 name:"media",
                 maxCount:10
            }]),sendAttachment)

export default routes