
import React, { useState, useEffect } from 'react';
import SearchHeader from './components/SearchHeader';
import BannerCarousel from './components/BannerCarousel';
import ProductCard from './components/ProductCard';
import TabBar from './components/TabBar';
import AiAssistant from './components/AiAssistant';
import GuidePage from './components/GuidePage';
import DetailPage from './components/DetailPage';
import ContentDetailPage from './components/ContentDetailPage';
import AiDesignStudio from './components/AiDesignStudio';
import { PRODUCTS, ARTICLES, MAIN_NAV, ANNOUNCEMENTS } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [currentPage, setCurrentPage] = useState<'home' | 'guide' | 'detail' | 'contentDetail' | 'studio'>('home');
  const [selectedContentId, setSelectedContentId] = useState<string | null>(null);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [selectedAnnIndex, setSelectedAnnIndex] = useState(0);
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'content') setCurrentPage('guide');
    else if (tabId === 'home') setCurrentPage('home');
  };

  const navigateToContent = (id: string) => {
    setSelectedContentId(id);
    setCurrentPage('contentDetail');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAnnouncementIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const openAnnouncement = (index: number) => {
    setSelectedAnnIndex(index);
    setShowAnnouncementModal(true);
  };

  const renderContent = () => {
    if (currentPage === 'studio') {
      return <AiDesignStudio onBack={() => setCurrentPage('home')} />;
    }

    if (currentPage === 'guide' || activeTab === 'content') {
      return <GuidePage onBack={() => { setActiveTab('home'); setCurrentPage('home'); }} onArticleClick={navigateToContent} />;
    }

    if (currentPage === 'detail') {
      return <DetailPage onBack={() => setCurrentPage('home')} />;
    }

    if (currentPage === 'contentDetail') {
      return <ContentDetailPage id={selectedContentId || ''} onBack={() => setCurrentPage('guide')} />;
    }

    return (
      <main className="max-w-md mx-auto">
        <SearchHeader />
        
        {/* 装修进度卡片 */}
        <div className="px-4 py-3 bg-white mt-1">
          <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl p-4 text-white shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
            <div className="flex justify-between items-start mb-3 relative z-10">
              <div>
                <h2 className="text-base font-bold">我的装修：幸福里1号院</h2>
                <p className="text-[10px] opacity-80">当前进度：水电改造阶段</p>
              </div>
              <div 
                onClick={() => setCurrentPage('detail')} 
                className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-[10px] cursor-pointer active:scale-95 transition-all backdrop-blur-sm border border-white/20"
              >
                详细信息
              </div>
            </div>
            <div className="flex items-center space-x-4 relative z-10">
              <div className="flex-1">
                <div className="h-2 bg-black/10 rounded-full overflow-hidden">
                  <div className="w-[35%] h-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] rounded-full transition-all duration-1000"></div>
                </div>
                <div className="flex justify-between mt-1.5 text-[9px] font-medium">
                  <span>已完成 35%</span>
                  <span>预计竣工 11-20</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI 设计生成快捷入口 */}
        <div className="px-4 mt-4">
          <div 
            onClick={() => setCurrentPage('studio')}
            className="bg-gray-900 rounded-2xl p-4 flex items-center justify-between border border-white/5 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-gray-200"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white">
                <i className="fas fa-wand-sparkles text-lg"></i>
              </div>
              <div>
                <h3 className="text-white text-sm font-black">AI 灵感设计室</h3>
                <p className="text-gray-500 text-[9px]">输入描述，AI 帮您画出装修蓝图</p>
              </div>
            </div>
            <i className="fas fa-chevron-right text-gray-700 text-xs"></i>
          </div>
        </div>

        {/* 公告栏 */}
        <div className="px-4 py-2.5 bg-white flex items-center space-x-3 overflow-hidden border-b border-gray-50 mt-3">
          <div className="text-red-600 bg-red-50 px-2 py-0.5 rounded text-[10px] font-extrabold italic tracking-tighter">HOT</div>
          <div 
            className="flex-grow overflow-hidden relative h-5 cursor-pointer"
            onClick={() => openAnnouncement(currentAnnouncementIndex)}
          >
            {ANNOUNCEMENTS.map((ann, idx) => (
              <div 
                key={ann.id} 
                className={`text-[11px] text-gray-600 absolute w-full transition-all duration-700 ease-in-out flex items-center ${
                  idx === currentAnnouncementIndex ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}
              >
                <span className="truncate flex-grow">{ann.title}</span>
                <i className="fas fa-chevron-right text-[8px] text-gray-300 ml-2"></i>
              </div>
            ))}
          </div>
        </div>

        <BannerCarousel />

        <div className="grid grid-cols-5 gap-2 px-2 py-6 bg-white mt-3 mx-4 rounded-3xl shadow-sm border border-gray-50/50">
          {MAIN_NAV.map((item) => (
            <div 
              key={item.id} 
              onClick={() => item.target === 'guide' && handleTabChange('content')} 
              className="flex flex-col items-center space-y-2 active:scale-90 transition-transform group"
            >
              <div className="w-11 h-11 rounded-2xl bg-gray-50 flex items-center justify-center text-red-600 group-hover:bg-red-50 transition-colors shadow-sm">
                <i className={`fas ${item.icon} text-lg`}></i>
              </div>
              <span className="text-[10px] text-gray-700 font-bold tracking-tight">{item.name}</span>
            </div>
          ))}
        </div>

        <section className="mt-6 px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900 flex items-center">
              <span className="w-1 h-4 bg-red-600 rounded-full mr-2"></span>
              可能关心的内容
            </h2>
            <span className="text-[10px] text-gray-400">查看更多 <i className="fas fa-chevron-right ml-0.5"></i></span>
          </div>
          <div className="flex space-x-3 overflow-x-auto hide-scrollbar pb-2">
            {ARTICLES.map((article) => (
              <div 
                key={article.id} 
                onClick={() => navigateToContent(article.id.toString())}
                className="flex-shrink-0 w-48 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-50 active:scale-95 transition-transform"
              >
                <img src={article.cover} className="w-full h-24 object-cover" />
                <div className="p-2">
                  <p className="text-[11px] font-bold text-gray-800 line-clamp-2 leading-tight h-7">{article.title}</p>
                  <div className="mt-2 flex items-center text-[9px] text-gray-400">
                    <i className="far fa-eye mr-1"></i> {article.views}阅读
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 拼团聚惠 */}
        <section className="mt-6 px-4">
          <div className="bg-red-50 rounded-2xl p-4 border border-red-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded font-black italic">拼团聚惠</div>
                <span className="text-xs font-bold text-red-800">全屋定制 2人起拼</span>
              </div>
              <div className="flex space-x-1">
                <div className="bg-white px-1 rounded text-[10px] text-red-600 font-bold border border-red-200">23</div>
                <span className="text-[10px] text-red-400">:</span>
                <div className="bg-white px-1 rounded text-[10px] text-red-600 font-bold border border-red-200">59</div>
                <span className="text-[10px] text-red-400">:</span>
                <div className="bg-white px-1 rounded text-[10px] text-red-600 font-bold border border-red-200">54</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {PRODUCTS.filter(p => p.tag === '拼团' || p.id === '1').slice(0, 2).map(product => (
                <div key={product.id} className="bg-white rounded-xl p-2 flex space-x-2 shadow-sm border border-red-50">
                  <img src={product.image} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex flex-col justify-between overflow-hidden">
                    <p className="text-[10px] font-bold text-gray-800 truncate">{product.name}</p>
                    <div>
                      <span className="text-xs font-black text-red-600">¥{product.price}</span>
                      <p className="text-[8px] text-gray-400 line-through">¥{product.originalPrice || (product.price + 50)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 精选列表 */}
        <section className="mt-8 px-4 mb-10">
          <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center">
            <i className="fas fa-fire-alt text-red-600 mr-2"></i>
            好物精选
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 公告弹窗 */}
        {showAnnouncementModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6 animate-fade-in" onClick={() => setShowAnnouncementModal(false)}>
            <div className="bg-white w-full max-w-sm rounded-[2rem] overflow-hidden shadow-2xl animate-slide-up" onClick={e => e.stopPropagation()}>
              <div className="bg-red-600 p-6 text-white relative">
                <button onClick={() => setShowAnnouncementModal(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20"><i className="fas fa-times"></i></button>
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md"><i className="fas fa-bullhorn text-xl"></i></div>
                <h3 className="text-lg font-black leading-tight">{ANNOUNCEMENTS[selectedAnnIndex].title}</h3>
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-600 leading-relaxed mb-8">{ANNOUNCEMENTS[selectedAnnIndex].content}</div>
                <div className="border-t border-gray-100 pt-6">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">更多公告动态</h4>
                  <div className="space-y-3">
                    {ANNOUNCEMENTS.map((ann, idx) => (
                      <div key={ann.id} onClick={() => setSelectedAnnIndex(idx)} className={`flex items-center space-x-3 p-2 rounded-xl transition-all cursor-pointer ${selectedAnnIndex === idx ? 'bg-red-50 text-red-600' : 'hover:bg-gray-50 text-gray-500'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${selectedAnnIndex === idx ? 'bg-red-600' : 'bg-gray-300'}`}></div>
                        <span className="text-[11px] font-bold truncate flex-grow">{ann.title}</span>
                        <i className="fas fa-arrow-right text-[8px] opacity-40"></i>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 text-center">
                <button onClick={() => setShowAnnouncementModal(false)} className="w-full py-3 bg-red-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-red-100 active:scale-95 transition-transform">我知道了</button>
              </div>
            </div>
          </div>
        )}
      </main>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] pb-24">
      {renderContent()}
      <AiAssistant />
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default App;
