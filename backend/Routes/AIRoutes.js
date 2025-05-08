import express from 'express'
import auth from '../middleware/auth_middleware.js'
import { createAI } from '../controller/chroma_controller.js'

const router = express.Router()

router.post("/createAI",auth,createAI)

export default router