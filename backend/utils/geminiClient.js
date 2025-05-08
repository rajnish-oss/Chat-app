import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv'
dotenv.config()
const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function askGemini(prompt) {
  const res = await gemini.models.generateContent({
    model:'gemini-2-flash',
    prompt,
    maxTokens:  512,
    temperature: 0.7
  });
  console.log(res)
  return res.text;
}


