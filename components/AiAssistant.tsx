
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { getGeminiResponse } from '../services/geminiService';

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: '你好！我是你的家装管家小智，正在规划您的装修方案吗？', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // 获取构建时注入的 API Key
  const apiKey = process.env.API_KEY;
  // 排除掉构建工具可能注入的占位符字符串
  const isApiKeyConfigured = !!apiKey && apiKey !== '' && apiKey !== '""' && apiKey !== 'undefined' && apiKey !== 'null';

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;
    
    if (!isApiKeyConfigured) {
      setMessages(prev => [...prev, 
        { role: 'user', text: inputValue, timestamp: new Date() },
        { 
          role: 'model', 
          text: '⚠️ 状态：由于未检测到有效的 API Key，我暂时无法回答您的问题。\n\n💡 修复方案：\n1. 请在 Vercel 项目设置中添加变量 VITE_API_KEY\n2. 变量保存后，点击 Vercel 顶部的 "Deployments" 菜单\n3. 找到最近的一次记录，点击右侧三个点选择 "Redeploy"（必须重新构建才能注入 Key）。', 
          timestamp: new Date() 
        }
      ]);
      setInputValue('');
      return;
    }

    const userMsg: Message = { role: 'user', text: inputValue, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await getGeminiResponse(inputValue);
      setMessages(prev => [...prev, { role: 'model', text: response, timestamp: new Date() }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: '❌ 小智连接中断，请检查网络或 API Key 权限。', timestamp: new Date() }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed right-4 bottom-24 w-12 h-12 bg-red-600 rounded-full shadow-lg shadow-red-600/30 flex items-center justify-center text-white z-40 animate-bounce transition-all hover:scale-110 active:scale-90"
      >
        <i className="fas fa-headset text-xl"></i>
        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white shadow-sm ${isApiKeyConfigured ? 'bg-green-500' : 'bg-amber-500'}`}></div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm animate-fade-in" onClick={() => setIsOpen(false)}>
          <div 
            className="w-full max-w-md bg-white rounded-t-3xl shadow-2xl flex flex-col h-[80vh] animate-slide-up overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b flex items-center justify-between bg-red-600 text-white">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <i className="fas fa-user-tie text-xl"></i>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-sm">家装管家小智</h3>
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase ${isApiKeyConfigured ? 'bg-green-500 text-white' : 'bg-amber-400 text-amber-900'}`}>
                      {isApiKeyConfigured ? 'Online' : 'Setup Required'}
                    </span>
                  </div>
                  <p className="text-[10px] opacity-80">专业建材咨询 · 方案建议</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-black/10">
                <i className="fas fa-times text-xs"></i>
              </button>
            </div>

            <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50/50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-[13px] shadow-sm ${
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
                  <div className="bg-white px-4 py-2 rounded-2xl rounded-bl-none shadow-sm border border-gray-100">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-red-600/30 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-red-600/60 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t bg-white flex items-center space-x-3 pb-[calc(env(safe-area-inset-bottom)+16px)]">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isApiKeyConfigured ? "咨询主材、软装或工艺..." : "请先 Redeploy 以注入 Key..."}
                className="flex-grow bg-gray-100 rounded-full py-2.5 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
              />
              <button 
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center disabled:opacity-40"
              >
                <i className="fas fa-paper-plane text-xs"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AiAssistant;
