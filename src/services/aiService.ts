import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: (process as any).env.GEMINI_API_KEY 
});

export interface ShowInsight {
  latestNews: string;
  criticConsensus: string;
  realTimeFacts: string[];
  whyWatchNow: string;
}

export async function getShowInsights(showName: string): Promise<ShowInsight | null> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide real-time insights for the TV show "${showName}". 
      Include the latest news, what critics are saying right now, some interesting real-time facts (like current ratings or awards), and a compelling reason to watch it today.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT" as any,
          properties: {
            latestNews: { type: "STRING" as any },
            criticConsensus: { type: "STRING" as any },
            realTimeFacts: { 
              type: "ARRAY" as any,
              items: { type: "STRING" as any }
            },
            whyWatchNow: { type: "STRING" as any }
          },
          required: ["latestNews", "criticConsensus", "realTimeFacts", "whyWatchNow"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    return null;
  } catch (error) {
    console.error("Error fetching AI insights:", error);
    return null;
  }
}
