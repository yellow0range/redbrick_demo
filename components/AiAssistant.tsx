
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
  
  // 检查 API Key 状态
  const isApiKeyConfigured = !!process.env.API_KEY && process.env.API_KEY !== '';

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
        { role: 'model', text: '⚠️ 检测到 API Key 未配置或无效。请检查环境变量 VITE_API_KEY 是否设置正确，并确保已重新部署。', timestamp: new Date() }
      ]);
      setInputValue('');
      return;
    }

    const userMsg: Message = { role: 'user', text: inputValue, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    const response = await getGeminiResponse(inputValue);
    
    setMessages(prev => [...prev, { role: 'model', text: response, timestamp: new Date() }]);
    setIsTyping(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed right-4 bottom-24 w-12 h-12 bg-red-600 rounded-full shadow-lg shadow-red-600/30 flex items-center justify-center text-white z-40 animate-bounce transition-all hover:scale-110 active:scale-90"
      >
        <i className="fas fa-headset text-xl"></i>
        {/* 状态小圆点 */}
        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${isApiKeyConfigured ? 'bg-green-500' : 'bg-amber-500'}`}></div>
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
                    <h3 className="font-bold">家装管家小智</h3>
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase ${isApiKeyConfigured ? 'bg-green-500/20 text-green-200' : 'bg-amber-500/20 text-amber-200'}`}>
                      {isApiKeyConfigured ? 'Online' : 'Key Missing'}
                    </span>
                  </div>
                  <p className="text-[10px] opacity-80">专业建材咨询 · 方案建议</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-black/10">
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50/50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-red-600 text-white rounded-br-none' 
                      : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white px-4 py-2 rounded-2xl rounded-bl-none shadow-sm border border-gray-100">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t bg-white flex items-center space-x-3 pb-[calc(env(safe-area-inset-bottom)+16px)]">
              <div className="flex-grow relative">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={isApiKeyConfigured ? "咨询主材、软装或工艺..." : "请先配置 API Key..."}
                  className="w-full bg-gray-100 rounded-full py-2.5 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>
              <button 
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center disabled:opacity-50 active:scale-95 transition-all"
              >
                <i className="fas fa-paper-plane text-sm"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AiAssistant;
