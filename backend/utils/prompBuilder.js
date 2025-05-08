import Message from '../model/message_model.js'
import Persona from '../model/persona_model.js'
import {embedding} from './embedding.js'
import {getCollection} from './chroma.js'

export const buildPrompt = async(chat,senderId,content) => {
    const persona = await Persona.findOne({chatId:chat._id})
    const intro = persona ? `System : you are a human with name ${persona.name},You are ${persona.role} and master of this field` : ""

    const recent = await Message.find({ chat:chat._id }).sort({ timestamp: -1 }).limit(20);
    const recentText = recent.reverse().map(m => `${m.sender === senderId ? 'User' : 'AI'}: ${m.text}`).join('\n');

    const coll = await getCollection();
    const genEmbedding = await embedding(content);
    const { metadatas } = await coll.query({ 
        queryEmbeddings: [ genEmbedding ],
        nResults:5,
        where:{ chat:chat._id } }).then(r => r[0]);
  
    const memory = metadatas.length ? 'Relevant past excerpts:\n' + metadatas.map(md => `- (${new Date(md.timestamp).toLocaleString()}): ${md.text}`  ).join('\n') + '\n\n' : '';

    return intro + memory + recentText + `User: ${content}\nAI:`;
}
