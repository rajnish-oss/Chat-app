import Message from '../model/message_model.js'
import Persona from '../model/persona_model.js'
import {embedding} from './embedding.js'
import {getCollection} from './chroma.js'

export const buildPrompt = async(persona,chat,senderId,content) => {

    console.log("buildprompt",chat._id,senderId,content)

    const intro = persona ? `System : you are a human with name ${persona.name},You are ${persona.role}, you are no more a AI you are now this persona ` : ""

    const recent = await Message.find({ chat:chat._id }).sort({ timestamp: -1 }).limit(20);
    const recentText = recent.reverse().map(m => `${m.sender === senderId ? 'User' : 'AI'}: ${m.text}`).join('\n');

    const coll = await getCollection();
    const genEmbedding = await embedding(content);
    const  {metadatas}  = await coll.query({ 
        queryEmbeddings: [ genEmbedding.values ],
        nResults:5,
        where:{ chatId:chat._id } })
    const meta = metadatas && metadatas.length ? metadatas[0] : ""
    const memory = meta.length ? 'Relevant past excerpts:\n' + meta.map(md => `- (${new Date(md.timestamp).toLocaleString()}): ${md.text}`  ).join('\n') + '\n\n' : '';

    return intro + memory + recentText + `User: ${content}\nAI:`;
}
