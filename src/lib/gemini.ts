import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "";

export const ai = new GoogleGenAI({ apiKey });

export const getGeminiModel = (modelName = "gemini-3-flash-preview") => {
  return ai.models.generateContent({
    model: modelName,
    contents: "", // This is just a helper, actual calls will pass contents
  });
};

export async function generateAiResponse(prompt: string, systemInstruction?: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        systemInstruction,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Lo siento, hubo un error procesando tu solicitud.";
  }
}
