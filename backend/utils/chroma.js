import { ChromaClient } from "chromadb";

const chroma = new ChromaClient({
    url:"http://127.0.0.1:8000"
});
const COLLECTION = 'chat_memories'

const getCollection = async() => {
    try{
        return await chroma.getOrCreateCollection({
            name:COLLECTION})
    }catch(error){
        console.log(error)
        return await chroma.createCollection(COLLECTION)
    } 
}

export {getCollection,chroma}