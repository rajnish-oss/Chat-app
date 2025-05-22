import Message from '../model/message_model.js'
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { embedding } from '../utils/embedding.js'
import { askGemini } from '../utils/geminiClient.js';
import Persona from '../model/persona_model.js';
import { buildPrompt } from '../utils/prompBuilder.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import {chroma,getCollection} from '../utils/chroma.js'

export const createAI = asyncHandler(async(req,res) =>{
     const {AIname,role,chatId} = req.body
     const userId = req.user._id

     if(!AIname || !role){
      throw new ApiError(
        400,
        "data missing in createAI"
      )
     }

     const existingAI = await Persona.findOne({name:AIname})

     if(!existingAI){
      const AI = await Persona.create({
        chatId:chatId,
        name:AIname,
        role:role,
        createdBy:userId
      })

      res.status(200).json(
        new ApiResponse(
          200,
          AI,
          "AI created and called successfully"
        )
       )
      
     }else{
       res.status(200).json(
        new ApiResponse(
          200,
          existingAI,
          "AI called successfully"
        )
       )
     }
}) 

export const saveAndIndexMessage = async({chat,sender,content,aiSender}) =>{
   const saved = await Message.create({
    sender,
    content,
    chat,
    aiSender
   })


   
   const embed = await embedding(saved.content)
   const batch = embed.values

   const coll = await getCollection();
   await coll.upsert({
     ids:saved._id.toString(),
     embeddings:batch,
     metadatas: [{
       chatId:    saved.chat.toString(),
       timestamp: saved.createdAt.toISOString(),
       text:      saved.content
     }]
   });

   const result = await Message.findById(saved._id).populate("sender","username email")
   .populate("aiSender","name role")
      .populate({
        path:"chat",populate:{path:"users",select:"username email"}
      })
 
   return result;
}



export const handleAIResponse = async (chatId, userMessage) => {
  const prompt = await buildPrompt(chatId, userMessage);
  const aiResponse = await askGemini(prompt);

  const aiMessage = {
    chat: chatId,
    sender: 'AI_BOT_USER_ID',
    text: aiResponse,
    isBot: true,
  };

  return await saveAndIndexMessage(aiMessage);
};