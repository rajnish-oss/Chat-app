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
        chatId,
        AIname,
        role,
        userId
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

export const saveAndIndexMessage = async({chat,sender,content}) =>{
   const saved = await Message.create({
    sender,
    content,
    chat
   })
   console.log("main data",chat,sender,content)
   
   console.log("saved._id",saved._id.toString())
   const embed = await embedding(saved.content)
   const batch = embed.values
   console.log("batch",batch)
   const timeStamp = saved.createdAt.toISOString()

   const coll = await getCollection();
   await coll.upsert([{
     id:saved._id.toString(),
     embeddings:batch,
     documents:[
      "this is about AI chat bots"
     ],
     metadata: {
       chatId:    saved.chat,
       timestamp: timeStamp,
       text:      saved.content
     }
   }]);
 
   return saved;
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