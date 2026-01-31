
import { GoogleGenAI } from "@google/genai";

/**
 * 家装管家小智的 AI 服务
 */

const getAiClient = () => {
  // 生产环境下由 vite.config.ts 注入
  const apiKey = process.env.API_KEY;
  if (!apiKey || apiKey === '') {
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
    console.error("Gemini API Error Details:", error);
    
    const errMsg = error.toString();
    
    if (errMsg.includes("MISSING_API_KEY")) {
      return "⚠️ 错误：环境变量中未配置 API Key。请在 Vercel 项目设置中添加 VITE_API_KEY。";
    }
    
    if (errMsg.includes("403")) {
      return "🚫 访问拒绝 (403)：Key 可能无效，或者您没有为该项目开启 'Generative Language API'。请前往 Google Cloud 控制台检查。";
    }
    
    if (errMsg.includes("400")) {
      return "❌ 请求错误 (400)：通常是因为 API Key 格式错误或模型名称不支持。";
    }

    if (errMsg.includes("fetch") || errMsg.includes("NetworkError")) {
      return "🌐 网络波动：无法连接到 AI 服务器。请检查您的网络代理设置。";
    }
    
    return `遇到了一些技术挑战：${error.message || '未知错误'}`;
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
      parts.push({ text: `基于这张图片进行空间改造：${prompt}。保持结构，提升材质质感，风格为高端建筑摄影风格。` });
    } else {
      parts.push({ text: `A professional interior design photo of: ${prompt}, photorealistic, high-end furniture, soft lighting.` });
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

    const imagePart = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
    if (imagePart?.inlineData) {
      return `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`;
    }
    
    throw new Error("No image returned from AI");
  } catch (error: any) {
    console.error("Image Gen Error:", error);
    throw error;
  }
};
