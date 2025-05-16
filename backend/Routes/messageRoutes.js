import express from 'express'
import { deleteMsg, getAllMessage, sendMessage } from '../controller/msg_controller.js'
import auth from '../middleware/auth_middleware.js'


const routes = express.Router()

routes.post("/sendmsg",auth,sendMessage)
      .get("/getMsg/:chatId",auth,getAllMessage)
      .delete("/deleteMsg/:msgId",deleteMsg)

export default routes