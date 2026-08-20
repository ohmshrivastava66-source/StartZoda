
import { GoogleGenAI } from "@google/genai";

// AI insight service following @google/genai guidelines
export const getAIInsights = async (prompt: string) => {
  try {
    // Correct initialization: Always use direct process.env.API_KEY
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are 'Zoda AI', a friendly and expert financial educator for young investors in the Indian stock market. Explain complex concepts simply, analyze trades for risk, and encourage long-term thinking. Avoid giving direct buy/sell financial advice, instead focusing on educational reasoning.",
        temperature: 0.7,
      },
    });
    // Correct property access: use .text instead of .text()
    return response.text;
  } catch (error) {
    console.error("AI Insight Error:", error);
    return "I'm having trouble thinking right now. Let's try again in a bit!";
  }
};
