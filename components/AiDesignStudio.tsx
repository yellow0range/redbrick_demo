
import React, { useState, useRef } from 'react';
import { generateDesignImage } from '../services/geminiService';

interface AiDesignStudioProps {
  onBack: () => void;
}

const PRESETS = ["现代奶油风", "极简工业风", "法式复古", "日式原木", "轻奢极简"];

const AiDesignStudio: React.FC<AiDesignStudioProps> = ({ onBack }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 检查 API Key 状态
  const isApiKeyConfigured = !!process.env.API_KEY && process.env.API_KEY !== '';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReferenceImage(reader.result as string);
        setPrompt("以此为蓝图进行精装修，风格调整为" + (prompt || "现代奶油风"));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async (p?: string) => {
    const finalPrompt = p || prompt;
    if (!finalPrompt.trim()) return;

    if (!isApiKeyConfigured) {
      setError("未检测到 API Key，请在环境变量中设置 VITE_API_KEY。");
      return;
    }
    
    setIsGenerating(true);
    setError(null);
    try {
      const imageUrl = await generateDesignImage(finalPrompt, referenceImage || undefined);
      setGeneratedImage(imageUrl);
    } catch (err) {
      setError("AI 创作遇到了阻碍，请确认您的 Key 是否有效且有图片生成权限。");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white pb-24 selection:bg-red-500/30">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-50 bg-[#0A0A0B]/80 backdrop-blur-xl px-4 py-4 flex items-center justify-between border-b border-white/5">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center active:scale-90 transition-transform">
          <i className="fas fa-arrow-left text-sm"></i>
        </button>
        <div className="text-center">
          <h1 className="font-black text-sm tracking-widest uppercase">AI Design Studio</h1>
          <p className="text-[8px] text-red-500 font-bold tracking-tighter">PREMIUM RENDER ENGINE</p>
        </div>
        <button onClick={() => {setGeneratedImage(null); setReferenceImage(null); setPrompt(''); setError(null);}} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center active:scale-90">
          <i className="fas fa-redo-alt text-xs"></i>
        </button>
      </div>

      <div className="p-6">
        {/* 展示区 */}
        <div className="relative group">
          <div className="relative aspect-[3/4] bg-white/[0.02] rounded-[2.5rem] overflow-hidden border border-white/10 flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:border-red-500/30">
            {isGenerating ? (
              <div className="text-center p-10 animate-fade-in">
                <div className="relative w-20 h-20 mx-auto mb-8">
                  <div className="absolute inset-0 border-4 border-red-500/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                  <i className="fas fa-magic absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500 animate-pulse"></i>
                </div>
                <p className="text-sm font-black text-white tracking-widest uppercase">Space Mapping...</p>
                <p className="text-[10px] text-gray-500 mt-2">正在通过 Gemini 2.5 像素级渲染</p>
              </div>
            ) : generatedImage ? (
              <img src={generatedImage} className="w-full h-full object-cover animate-fade-in" />
            ) : referenceImage ? (
              <div className="relative w-full h-full">
                <img src={referenceImage} className="w-full h-full object-cover opacity-50 grayscale" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
                  <div className="bg-red-600 px-4 py-1 rounded-full text-[10px] font-black mb-4 animate-bounce">蓝图已就位</div>
                  <p className="text-sm font-bold">输入您想要的风格，AI 将为您改造空间</p>
                </div>
              </div>
            ) : (
              <div className="text-center p-10">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-camera-retro text-2xl text-gray-600"></i>
                </div>
                {!isApiKeyConfigured && (
                  <div className="mb-4 bg-amber-500/20 border border-amber-500/50 p-3 rounded-xl">
                    <p className="text-[10px] text-amber-500 font-black uppercase tracking-widest">Warning: API Key Missing</p>
                    <p className="text-[9px] text-amber-200/70 mt-1">请先完成环境变量配置并重新部署</p>
                  </div>
                )}
                <p className="text-sm font-bold text-gray-400">选择一张照片或直接描述</p>
                <p className="text-[10px] text-gray-600 mt-2">支持毛坯房一键精装修</p>
              </div>
            )}
          </div>

          {/* 参考图小窗预览 */}
          {referenceImage && generatedImage && !isGenerating && (
            <div className="absolute bottom-6 left-6 w-20 h-24 rounded-xl border-2 border-white/20 overflow-hidden shadow-2xl animate-slide-up bg-black">
              <img src={referenceImage} className="w-full h-full object-cover opacity-80" />
              <div className="absolute top-0 left-0 bg-black/60 text-[8px] px-1 font-bold">BEFORE</div>
            </div>
          )}
        </div>

        {/* 控制面板 */}
        <div className="mt-8 space-y-6">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className={`flex-1 py-3 rounded-2xl border flex items-center justify-center space-x-2 transition-all ${referenceImage ? 'bg-red-600/10 border-red-600 text-red-500' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
            >
              <i className="fas fa-upload text-xs"></i>
              <span className="text-xs font-black uppercase tracking-tighter">{referenceImage ? '已上传参考图' : '上传空间照片'}</span>
            </button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          </div>

          <div className="flex overflow-x-auto hide-scrollbar space-x-2 pb-2">
            {PRESETS.map(p => (
              <button 
                key={p} 
                onClick={() => { setPrompt(`将此空间改造为: ${p}`); handleGenerate(`将此空间改造为: ${p}`); }}
                className="px-4 py-2 whitespace-nowrap rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold hover:bg-red-600 hover:border-red-600 transition-all active:scale-95"
              >
                {p}
              </button>
            ))}
          </div>

          <div className="relative">
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="描述您的设计愿景..."
              className="w-full bg-white/[0.03] border border-white/10 rounded-[1.5rem] p-5 text-sm focus:outline-none focus:border-red-600 min-h-[120px] transition-all placeholder:text-gray-700"
            />
            {error && <p className="absolute -bottom-6 left-2 text-red-500 text-[10px] animate-pulse"><i className="fas fa-exclamation-triangle mr-1"></i>{error}</p>}
          </div>

          <button 
            onClick={() => handleGenerate()}
            disabled={isGenerating || !prompt.trim() || !isApiKeyConfigured}
            className="w-full py-5 bg-red-600 rounded-[1.5rem] font-black text-sm flex items-center justify-center space-x-3 shadow-2xl shadow-red-900/40 active:scale-[0.98] disabled:opacity-30 transition-all uppercase tracking-widest"
          >
            <i className="fas fa-sparkles"></i>
            <span>{!isApiKeyConfigured ? 'Waiting for API Key' : referenceImage ? '开始空间改造' : '生成 AI 方案'}</span>
          </button>
        </div>

        <div className="mt-10 px-4 py-6 bg-white/[0.02] rounded-3xl border border-white/5">
          <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">AI Engine Specs</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isApiKeyConfigured ? 'bg-green-500' : 'bg-gray-700'}`}></div>
              <span className="text-[9px] text-gray-400 font-bold uppercase">{isApiKeyConfigured ? '2.5 Flash Image Active' : 'Engine Offline'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-1.5 h-1.5 rounded-full ${isApiKeyConfigured ? 'bg-red-500' : 'bg-gray-700'}`}></div>
              <span className="text-[9px] text-gray-400 font-bold uppercase">HD Render Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiDesignStudio;
