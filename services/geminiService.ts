
import { GoogleGenAI } from "@google/genai";

/**
 * 家装管家小智的 AI 服务
 */

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("MISSING_API_KEY");
  }
  return new GoogleGenAI({ apiKey });
};

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
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    if (error.message === "MISSING_API_KEY") {
      return "⚠️ 错误：未检测到 API Key。请在 Vercel 环境变量中配置 VITE_API_KEY 并重新部署。";
    }
    
    // 处理网络或权限错误
    const errMsg = error.toString();
    if (errMsg.includes("403")) {
      return "🚫 权限错误 (403)：你的 API Key 无效，或者未开启 Gemini 3 访问权限。";
    } else if (errMsg.includes("TypeError") || errMsg.includes("Failed to fetch")) {
      return "🌐 网络错误：无法连接到 Google AI 服务器。如果你在国内，请开启代理工具后再试。";
    }
    
    return `遇到了一点技术波折 (${error.message || '未知错误'})，请稍后再试。`;
  }
};

/**
 * AI 图像生成与编辑服务
 */
export const generateDesignImage = async (prompt: string, base64Image?: string) => {
  try {
    const ai = getAiClient();
    const parts: any[] = [];
    
    if (base64Image) {
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
  } catch (error: any) {
    console.error("Image Generation Error:", error);
    throw error;
  }
};
