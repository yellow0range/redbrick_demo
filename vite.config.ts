import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // 1. 加载当前目录下所有环境文件
  const env = loadEnv(mode, process.cwd(), '');
  
  // 2. 尝试从多个可能的位置提取 API Key
  // 优先级：loadEnv 捕获的 VITE_ 前缀 > 纯 API_KEY > 系统进程中的变量
  const apiKey = env.VITE_API_KEY || env.API_KEY || process.env.VITE_API_KEY || process.env.API_KEY || "";
  
  // 3. 在构建日志中输出状态（Vercel 构建时可见）
  if (apiKey && apiKey.length > 5) {
    console.log(`[Vite Build] SUCCESS: API Key found. Length: ${apiKey.length}. Starts with: ${apiKey.substring(0, 4)}...`);
  } else {
    console.warn(`[Vite Build] CRITICAL WARNING: API Key is empty! Make sure VITE_API_KEY is set in your Vercel Project Settings.`);
  }

  return {
    plugins: [react()],
    define: {
      // 这里的定义会在构建阶段将代码中的 process.env.API_KEY 替换为实际的字符串常量
      'process.env.API_KEY': JSON.stringify(apiKey)
    },
    build: {
      sourcemap: false,
      chunkSizeWarningLimit: 1000,
    }
  };
});