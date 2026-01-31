
import { GoogleGenAI } from "@google/genai";

/**
 * 家装管家小智的 AI 服务
 */

const getAiClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGeminiResponse = async (userMessage: string) => {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: `你是一个专业的家装管家。名字叫'小智'。
擅长：1.装修建议 2.建材分析 3.避坑指南。请用亲切专业的口吻回答。`,
        tools: [{ googleSearch: {} }],
        temperature: 0.7,
      },
    });
    return response.text || "抱歉，我现在有点走神。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "遇到了一点技术波折，请稍后再试。";
  }
};

/**
 * AI 图像生成与编辑服务
 * @param prompt 描述词
 * @param base64Image 可选的参考图（用于以图绘图）
 */
export const generateDesignImage = async (prompt: string, base64Image?: string) => {
  try {
    const ai = getAiClient();
    const parts: any[] = [];
    
    if (base64Image) {
      // 提取 base64 数据部分
      const data = base64Image.split(',')[1] || base64Image;
      parts.push({
        inlineData: {
          data: data,
          mimeType: "image/jpeg"
        }
      });
      parts.push({ text: `Modify this interior design based on: ${prompt}. Maintain the spatial structure but update materials, furniture, and lighting to high-end architectural photography quality.` });
    } else {
      parts.push({ text: `A professional high-quality interior design photo of: ${prompt}, photorealistic, 8k resolution, architectural photography style, trendy home decor.` });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts },
      config: {
        imageConfig: {
          aspectRatio: "3:4"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data returned");
  } catch (error) {
    console.error("Image Generation Error:", error);
    throw error;
  }
};
