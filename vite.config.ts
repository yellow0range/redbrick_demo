
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // 加载环境变量，包括非 VITE_ 前缀的变量
  const env = loadEnv(mode, process.cwd(), '');
  
  const apiKey = env.VITE_API_KEY || env.API_KEY || '';
  
  // 在构建终端打印 Key 的前 4 位（如果存在），用于排查 Vercel 构建环境是否拿到了 Key
  if (apiKey) {
    console.log(`[Vite Build] API Key detected (prefix: ${apiKey.substring(0, 4)}...)`);
  } else {
    console.warn(`[Vite Build] WARNING: No API Key found in environment variables!`);
  }

  return {
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(apiKey)
    }
  };
});
