import { GoogleGenerativeAI } from "@google/generative-ai";

export const embedding = async (text) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ 
    model: 'embedding-001'
  });

  try {
    const result = await model.embedContent(text);
    console.log(result)
    return result.embedding;
    
  } catch (error) {
    console.error("Embedding error:", error);
    throw new Error("Failed to generate embeddings");
  }
};
