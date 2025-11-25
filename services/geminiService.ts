import { GoogleGenAI } from "@google/genai";
import { AI_SYSTEM_INSTRUCTION } from "../constants";

let aiClient: GoogleGenAI | null = null;

// Initialize the client lazily. Prefer VITE_ env var (available to Vite builds via import.meta.env).
// In production (Vercel) make sure the build environment has `VITE_GEMINI_API_KEY` set.
const getClient = (): GoogleGenAI => {
  if (!aiClient) {
    // Prefer the Vite public env var. Fall back to process.env.GEMINI_API_KEY if present (e.g. server-side).
    const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) {
      console.error("Gemini API key is missing. Set VITE_GEMINI_API_KEY (preferred) in build env or GEMINI_API_KEY in server env.");
      throw new Error("Gemini API key not found");
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

export const sendMessageToGemini = async (
  message: string,
  history: { role: 'user' | 'model'; parts: { text: string }[] }[]
): Promise<string> => {
  try {
    const ai = getClient();
    
    // We create a new chat session for simplicity in this demo, 
    // but typically you'd maintain the chat object if maintaining long state.
    // Here we pass the history manually to simulate state if needed, 
    // or just rely on a single turn for simple QA.
    
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: AI_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history
    });

    const response = await chat.sendMessage({
      message: message
    });

    return response.text || "Desculpe, não consegui processar sua resposta no momento.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    // Helpful message for deployed app to indicate missing key vs runtime error
    if ((error as any).message && /(API Key not found|Gemini API key not found)/i.test((error as any).message)) {
      return "Configuração de IA ausente — a chave da API não foi encontrada no build. Verifique as variáveis de ambiente no provedor de hospedagem e redeploy.";
    }
    return "Estou tendo dificuldades técnicas no momento. Por favor, tente novamente mais tarde.";
  }
};