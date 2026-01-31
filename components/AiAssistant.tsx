import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { getGeminiResponse } from '../services/geminiService';

interface AiAssistantProps {
  externalOpenTrigger?: { open: boolean; initialMsg?: string };
  onExternalClose?: () => void;
}

const SUGGESTED_QUESTIONS = [
  "水路走顶好还是走地好？",
  "如何分配装修预算？",
  "奶油风怎么配色避坑？",
  "卫生间防水怎么做？",
  "全屋定制选哪种板材？"
];

const AiAssistant: React.FC<AiAssistantProps> = ({ externalOpenTrigger, onExternalClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: '你好！我是你的家装管家小智，正在规划您的装修方案吗？', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // 获取构建时注入的 API Key
  const apiKey = process.env.API_KEY;
  const isApiKeyConfigured = !!apiKey && apiKey !== '' && apiKey !== '""' && apiKey !== 'undefined' && apiKey !== 'null';

  // 处理外部唤起
  useEffect(() => {
    if (externalOpenTrigger?.open) {
      setIsOpen(true);
      if (externalOpenTrigger.initialMsg) {
        setInputValue(externalOpenTrigger.initialMsg);
      }
    }
  }, [externalOpenTrigger]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleClose = () => {
    setIsOpen(false);
    if (onExternalClose) onExternalClose();
  };

  const handleSend = async (textOverride?: string) => {
    const text = textOverride || inputValue;
    if (!text.trim() || isTyping) return;
    
    if (!isApiKeyConfigured) {
      setMessages(prev => [...prev, 
        { role: 'user', text: text, timestamp: new Date() },
        { 
          role: 'model', 
          text: '⚠️ 状态：由于未检测到有效的 API Key，我暂时无法回答您的问题。\n\n💡 修复建议：您反馈说已经改了 VITE_API_KEY，请确保在 Vercel 中点击了 "Redeploy" 按钮以重新构建应用。', 
          timestamp: new Date() 
        }
      ]);
      setInputValue('');
      return;
    }

    const userMsg: Message = { role: 'user', text: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await getGeminiResponse(text);
      setMessages(prev => [...prev, { role: 'model', text: response, timestamp: new Date() }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: '❌ 小智连接中断，请检查网络或 API Key 权限。', timestamp: new Date() }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* 悬浮球按钮 */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed right-4 bottom-24 w-12 h-12 bg-red-600 rounded-full shadow-lg shadow-red-600/30 flex items-center justify-center text-white z-40 animate-bounce transition-all hover:scale-110 active:scale-90"
      >
        <i className="fas fa-headset text-xl"></i>
        <div className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm ${isApiKeyConfigured ? 'bg-green-500' : 'bg-amber-500'}`}></div>
      </button>

      {/* 聊天窗口对话框 (提问窗口) */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-sm animate-fade-in" onClick={handleClose}>
          <div 
            className="w-full max-w-md bg-white rounded-t-[2.5rem] shadow-2xl flex flex-col h-[85vh] animate-slide-up overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 头部 */}
            <div className="px-6 py-4 border-b flex items-center justify-between bg-red-600 text-white">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center relative">
                  <i className="fas fa-user-tie text-xl"></i>
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-red-600 ${isApiKeyConfigured ? 'bg-green-500' : 'bg-amber-400'}`}></div>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-black text-sm tracking-tight">家装管家小智</h3>
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase ${isApiKeyConfigured ? 'bg-green-500/30 text-white' : 'bg-amber-400 text-amber-900'}`}>
                      {isApiKeyConfigured ? 'Online' : 'Check Config'}
                    </span>
                  </div>
                  <p className="text-[10px] opacity-80">智能语义识别 · 2024专业库</p>
                </div>
              </div>
              <button onClick={handleClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20">
                <i className="fas fa-times text-xs"></i>
              </button>
            </div>

            {/* 消息展示区 */}
            <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50/50 hide-scrollbar">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-[13px] shadow-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-red-600 text-white rounded-br-none' 
                      : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                  }`}>
                    {msg.text.split('\n').map((line, i) => <div key={i}>{line}</div>)}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-100">
                    <div className="flex space-x-1.5">
                      <div className="w-1.5 h-1.5 bg-red-600/30 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-red-600/60 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 提问窗口的交互窗口/输入区域 */}
            <div className="bg-white p-4 border-t space-y-3 pb-[calc(env(safe-area-inset-bottom)+16px)]">
              {/* 预设问题建议 */}
              <div className="flex overflow-x-auto hide-scrollbar space-x-2 pb-1">
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <button 
                    key={i}
                    onClick={() => handleSend(q)}
                    className="flex-shrink-0 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-full text-[10px] text-gray-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all active:scale-95"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* 输入框核心窗口 */}
              <div className="flex items-center space-x-3">
                <div className="flex-grow relative">
                  <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={isApiKeyConfigured ? "想问什么尽管说..." : "⚠️ 请先 Redeploy 应用"}
                    className="w-full bg-gray-100 border-none rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex space-x-2 text-gray-400">
                    <i className="fas fa-microphone text-xs hover:text-red-500 transition-colors"></i>
                  </div>
                </div>
                <button 
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim() || isTyping}
                  className="w-11 h-11 rounded-2xl bg-red-600 text-white flex items-center justify-center disabled:opacity-30 disabled:grayscale shadow-lg shadow-red-200 active:scale-90 transition-all"
                >
                  <i className="fas fa-paper-plane text-sm"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AiAssistant;