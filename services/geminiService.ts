import { GoogleGenAI } from "@google/genai";

/**
 * 家装管家小智的 AI 服务
 */

const getAiClient = () => {
  // 构建阶段会被 vite.config.ts 的 define 替换
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === '' || apiKey === '""') {
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
        systemInstruction: `你是一个专业的家装管家，名字叫'小智'。
擅长：1.装修建议 2.建材分析 3.避坑指南。请用亲切专业的口吻回答。`,
        tools: [{ googleSearch: {} }],
        temperature: 0.7,
      },
    });

    if (!response.text) {
      return "小智现在无法生成内容，请尝试换个问题。";
    }

    return response.text;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    const errMsg = error.toString();
    
    if (errMsg.includes("MISSING_API_KEY")) {
      return "⚠️ 智能助理未激活：请在 Vercel 中配置 VITE_API_KEY 环境变量并点击 Redeploy 重新构建。";
    }
    
    if (errMsg.includes("403")) {
      return "🚫 访问受限 (403)：请确认您的 Google AI 账号已开通付费配额（Pay-as-you-go）并启用了 Generative Language API。";
    }

    if (errMsg.includes("fetch") || errMsg.includes("NetworkError")) {
      return "🌐 网络波动：无法连接到 AI 服务器，请刷新页面。";
    }
    
    return `遇到了一些小状况：${error.message || '请稍后再试'}`;
  }
};

/**
 * AI 图像生成服务
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
      parts.push({ text: `基于这张图片进行空间改造：${prompt}。保持结构，提升材质质感。` });
    } else {
      parts.push({ text: `A high-end interior design rendering of: ${prompt}, photorealistic.` });
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

    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
      const content = candidates[0].content;
      if (content && content.parts) {
        const imagePart = content.parts.find(p => p.inlineData);
        if (imagePart && imagePart.inlineData) {
          return `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`;
        }
      }
    }
    
    throw new Error("AI 未能成功生成图片。");
  } catch (error: any) {
    console.error("Image Gen Error:", error);
    throw error;
  }
};