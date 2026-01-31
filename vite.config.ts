
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // 允许在代码中使用 process.env.API_KEY，将其映射到 Vite 的环境变量
    'process.env.API_KEY': JSON.stringify(process.env.VITE_API_KEY || '')
  }
});
