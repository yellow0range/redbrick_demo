
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // 加载当前模式下的环境变量
  // process.cwd() 获取项目根目录，'' 表示加载所有前缀的变量（包括 VITE_ 和非前缀变量）
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // 优先级：VITE_API_KEY > API_KEY > 空字符串
      // 使用 JSON.stringify 确保变量被正确转化为字符串字面量
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY || env.API_KEY || '')
    }
  };
});
