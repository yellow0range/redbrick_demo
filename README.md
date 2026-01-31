
# GeminiShop 家居建材馆 - 部署说明

这是一个基于 React 19 + Tailwind CSS + Google Gemini API 构建的高性能移动端电商首页。

## 🚀 快速发布指南

### 选项 A：使用 Vercel (推荐)
Vercel 是托管 Vite 项目最简单、最快的方式。

1. **推送代码**：将项目推送到 GitHub 仓库。
2. **导入项目**：在 [Vercel 控制台](https://vercel.com/new) 导入仓库。
3. **设置环境变量**：在部署设置中找到 **Environment Variables**，添加：
   - `VITE_API_KEY` = `你的 Gemini API 密钥`
4. **部署**：点击部署，等待约 30 秒即可在线访问。

### 选项 B：使用 Netlify
1. **新建站点**：在 [Netlify](https://app.netlify.com/start) 选择从 GitHub 导入。
2. **构建设置**：
   - Build Command: `npm run build`
   - Publish directory: `dist`
3. **设置环境变量**：在 `Site settings` -> `Environment variables` 中添加 `VITE_API_KEY`。

### 选项 C：手动构建并托管
1. **本地构建**：
   ```bash
   npm run build
   ```
2. **获取产物**：构建完成后会生成 `dist` 文件夹。
3. **托管**：将 `dist` 文件夹内的内容上传到任何静态服务器（如阿里云 OSS、腾讯云 COS 或自己的 Nginx 服务器）。

## 🛠️ 技术配置说明

- **环境变量**：本项目通过 `vite.config.ts` 进行了特殊配置。在生产环境中，它会寻找 `VITE_API_KEY`。
- **跨域处理**：由于是纯前端项目，调用 Gemini API 会存在跨域问题。建议在生产环境中使用域名访问，Gemini API 已对常见的托管域名有良好的支持。

## 📁 目录结构
- `/components`: 核心 UI 组件。
- `/services`: 处理 AI 逻辑的服务层。
- `constants.tsx`: 包含 12 大分类和 200+ 文章标题的内容池。
- `types.ts`: 数据模型定义。
