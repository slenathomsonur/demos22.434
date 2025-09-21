
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. Siri feature will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const askSiri = async (prompt: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "I can't connect to my services right now. Please make sure the API key is configured.";
  }
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are a helpful and slightly witty desktop assistant named Siri, part of Dem OS.",
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I ran into a problem trying to answer that. Please check the console for details.";
  }
};
