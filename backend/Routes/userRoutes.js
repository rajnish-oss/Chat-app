import express from 'express'
import { getAllUser, login, register, uploadAvatar } from "../controller/user_controller.js";
import { upload } from '../middleware/multer_middleware.js';
import auth from '../middleware/auth_middleware.js';
import {errorMiddleware} from '../middleware/error_middleware.js'

const routes = express.Router()

routes.post("/register",errorMiddleware,register)
      .post("/login",errorMiddleware,login)
      .get("/getUsers",getAllUser)
      .post("/uploadPf",auth,
            upload.fields([{
                  name:"avatar",
                  maxCount:1
            }])
            ,uploadAvatar)

export default routes