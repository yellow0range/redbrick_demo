
import { defineComponent, ref, reactive, onMounted } from 'vue';
import { GoogleGenAI } from "@google/genai";

// 模拟数据
const CATEGORIES = [
  { id: 1, name: '装修指南', icon: 'fa-book' },
  { id: 2, name: '建材评测', icon: 'fa-vial' },
  { id: 3, name: '案例赏析', icon: 'fa-layer-group' },
  { id: 4, name: '装修故事', icon: 'fa-home' },
];

const PRODUCTS = [
  { id: 1, name: '哑光防滑柔光大理石瓷砖 800x800', price: 88, sales: '5k+', img: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=400' },
  { id: 2, name: '北欧简约全铜客厅吊灯 变色光', price: 1299, sales: '800', img: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400' },
  { id: 3, name: '智能恒温淋浴花洒套装 黑色', price: 2199, sales: '300', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400' },
  { id: 4, name: '全屋定制欧松板衣柜 环保等级ENF', price: 899, sales: '1k+', img: 'https://images.unsplash.com/photo-1611486212354-9174095f9c42?w=400' },
];

export default defineComponent({
  setup() {
    const activeTab = ref('home');
    const isAiOpen = ref(false);
    const messages = reactive([
      { role: 'model', text: '您好！我是小智，正在为您规划装修方案吗？' }
    ]);
    const userInput = ref('');
    const isTyping = ref(false);

    const switchTab = (tab) => {
      activeTab.value = tab;
    };

    const callGemini = async () => {
      if (!userInput.value.trim() || isTyping.value) return;
      
      const userText = userInput.value;
      messages.push({ role: 'user', text: userText });
      userInput.value = '';
      isTyping.value = true;

      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: userText,
          config: {
            systemInstruction: "你是一个专业的家装管家小智。回答亲切、专业，擅长建材避坑指南。"
          }
        });
        messages.push({ role: 'model', text: response.text || "小智开小差了..." });
      } catch (e) {
        messages.push({ role: 'model', text: "连接 AI 失败，请检查 API Key 状态。" });
      } finally {
        isTyping.value = false;
      }
    };

    return () => (
      <div class="min-h-screen bg-[#F8F9FB] pb-24 font-sans text-gray-900">
        {/* Header */}
        <header class="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100 px-4 py-3 flex items-center space-x-3">
          <div class="text-red-600 font-black text-xl"><i class="fas fa-hammer"></i></div>
          <div class="flex-grow relative">
            <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm"></i>
            <input 
              type="text" 
              placeholder="搜索装修主材、灯具..." 
              class="w-full bg-gray-100 rounded-full py-2 pl-9 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
            />
          </div>
          <button onClick={() => isAiOpen.value = true} class="relative active:scale-90 transition-transform">
            <i class="far fa-comment-dots text-lg text-gray-500"></i>
            <span class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
        </header>

        {/* Home Content */}
        {activeTab.value === 'home' && (
          <main class="animate-fade-in">
            {/* Banner */}
            <div class="px-4 mt-3">
              <div class="h-40 rounded-3xl overflow-hidden shadow-sm relative group">
                <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex flex-col justify-end p-4">
                  <h3 class="text-white font-bold text-sm">双11家装狂欢：满3000减500</h3>
                  <p class="text-white/80 text-[10px]">全国 500+ 城市配送安装</p>
                </div>
              </div>
            </div>

            {/* Nav Grid */}
            <div class="grid grid-cols-4 gap-4 px-6 py-6 bg-white mt-4 mx-4 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              {CATEGORIES.map(cat => (
                <div key={cat.id} class="flex flex-col items-center space-y-2 active:scale-95 transition-transform cursor-pointer">
                  <div class="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600">
                    <i class={`fas ${cat.icon} text-lg`}></i>
                  </div>
                  <span class="text-[10px] text-gray-600 font-bold">{cat.name}</span>
                </div>
              ))}
            </div>

            {/* AI Shortcut */}
            <div class="px-4 mt-4">
              <div 
                onClick={() => isAiOpen.value = true}
                class="bg-gradient-to-r from-red-600 to-red-500 p-[1px] rounded-2xl shadow-lg shadow-red-100"
              >
                <div class="bg-white rounded-[15px] p-4 flex items-center space-x-3 active:bg-gray-50 transition-colors">
                  <div class="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white shadow-md">
                    <i class="fas fa-robot"></i>
                  </div>
                  <div class="flex-grow">
                    <div class="text-xs font-black">管家小智</div>
                    <div class="text-[10px] text-gray-400">“全屋定制用什么板材最环保？”</div>
                  </div>
                  <div class="bg-red-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg">咨询AI</div>
                </div>
              </div>
            </div>

            {/* Products */}
            <section class="mt-8 px-4">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-base font-black flex items-center">
                  <span class="w-1 h-4 bg-red-600 rounded-full mr-2"></span>好物精选
                </h2>
                <span class="text-[10px] text-gray-400">全部 <i class="fas fa-chevron-right ml-1"></i></span>
              </div>
              <div class="grid grid-cols-2 gap-3 pb-8">
                {PRODUCTS.map(p => (
                  <div key={p.id} class="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm active:opacity-90 transition-opacity">
                    <img src={p.img} class="w-full aspect-square object-cover" />
                    <div class="p-3">
                      <h4 class="text-[11px] font-bold text-gray-800 line-clamp-2 leading-tight mb-3 h-8">{p.name}</h4>
                      <div class="flex items-end justify-between">
                        <div>
                          <span class="text-[8px] text-red-600 font-bold">¥</span>
                          <span class="text-sm text-red-600 font-black">{p.price}</span>
                        </div>
                        <span class="text-[9px] text-gray-300">{p.sales}人付款</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        )}

        {/* Footer Tabs */}
        <nav class="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 px-8 py-3 flex justify-between items-center z-50 pb-[calc(env(safe-area-inset-bottom)+12px)] shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
          {[
            { id: 'home', label: '首页', icon: 'fa-house' },
            { id: 'cart', label: '商城', icon: 'fa-shopping-bag' },
            { id: 'my', label: '我', icon: 'fa-user' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => switchTab(tab.id)}
              class={`flex flex-col items-center space-y-1 transition-all ${activeTab.value === tab.id ? 'text-red-600 scale-110' : 'text-gray-400'}`}
            >
              <i class={`fas ${tab.icon} text-lg`}></i>
              <span class="text-[10px] font-bold">{tab.label}</span>
              {activeTab.value === tab.id && <div class="w-1 h-1 bg-red-600 rounded-full"></div>}
            </button>
          ))}
        </nav>

        {/* Floating AI Bubble */}
        <button 
          onClick={() => isAiOpen.value = true}
          class="fixed right-4 bottom-28 w-14 h-14 bg-red-600 rounded-full shadow-xl shadow-red-200 flex items-center justify-center text-white z-40 hover:scale-110 active:scale-90 transition-all animate-bounce"
        >
          <i class="fas fa-headset text-2xl"></i>
        </button>

        {/* AI Modal */}
        {isAiOpen.value && (
          <div class="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-end animate-fade-in" onClick={() => isAiOpen.value = false}>
            <div 
              class="w-full bg-white rounded-t-[2.5rem] h-[80vh] flex flex-col animate-slide-up"
              onClick={e => e.stopPropagation()}
            >
              <div class="px-6 py-5 border-b flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white text-lg"><i class="fas fa-robot"></i></div>
                  <div>
                    <h3 class="font-black text-sm">家装管家小智</h3>
                    <p class="text-[10px] text-green-500 font-bold uppercase tracking-wider">AI Studio Online</p>
                  </div>
                </div>
                <button onClick={() => isAiOpen.value = false} class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                  <i class="fas fa-times"></i>
                </button>
              </div>

              <div class="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50/50 hide-scrollbar">
                {messages.map((m, i) => (
                  <div key={i} class={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div class={`max-w-[85%] px-4 py-3 rounded-2xl text-[13px] shadow-sm leading-relaxed ${
                      m.role === 'user' ? 'bg-red-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {isTyping.value && (
                  <div class="flex justify-start">
                    <div class="bg-white px-4 py-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-100">
                      <div class="flex space-x-1 animate-pulse"><div class="w-1.5 h-1.5 bg-red-600 rounded-full"></div><div class="w-1.5 h-1.5 bg-red-600 rounded-full"></div><div class="w-1.5 h-1.5 bg-red-600 rounded-full"></div></div>
                    </div>
                  </div>
                )}
              </div>

              <div class="p-4 bg-white border-t pb-[calc(env(safe-area-inset-bottom)+12px)]">
                <div class="flex items-center space-x-3">
                  <input 
                    v-model={userInput.value}
                    onKeypress={e => e.key === 'Enter' && callGemini()}
                    placeholder="问问装修避坑指南..."
                    class="flex-grow bg-gray-100 rounded-2xl py-3 px-4 text-sm focus:outline-none"
                  />
                  <button 
                    onClick={callGemini}
                    disabled={!userInput.value.trim()}
                    class="w-11 h-11 bg-red-600 text-white rounded-2xl flex items-center justify-center disabled:opacity-50"
                  >
                    <i class="fas fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
});
