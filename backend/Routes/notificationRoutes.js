import express from 'express'
import { manageNotification, notiRead } from '../controller/noti_controller.js'
const routes = express.Router()

routes.post("/noti",manageNotification)
      .put("/notiRead",notiRead)

export default routes