
import React, { useState, useEffect, useRef } from 'react';
import { CONTENT_TABS, GUIDE_POOL, DECORATION_GUIDE_TREE } from '../constants';
import { GuideItem } from '../types';

interface GuidePageProps {
  onBack: () => void;
  onArticleClick?: (id: string) => void;
}

const GuidePage: React.FC<GuidePageProps> = ({ onBack, onArticleClick }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [showTreeMenu, setShowTreeMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [categoryVisible, setCategoryVisible] = useState(true);
  const [pullDownDistance, setPullDownDistance] = useState(0);
  
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['prep']));
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [loadingArticleId, setLoadingArticleId] = useState<string | null>(null);
  
  const [displayItems, setDisplayItems] = useState<GuideItem[]>([]);

  const lastScrollY = useRef(0);
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);

  useEffect(() => {
    handleTabRefresh('all');
  }, []);

  useEffect(() => {
    if (activeTab) {
      handleTabRefresh(activeTab);
    }
  }, [activeTab]);

  const handleTabRefresh = (tabId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      let source = [...GUIDE_POOL];
      if (tabId !== 'all' && tabId !== 'recommend') {
        const tabName = CONTENT_TABS.find(t => t.id === tabId)?.name;
        source = source.filter(item => item.category === tabName);
      }
      
      const shuffled = source.sort(() => 0.5 - Math.random());
      const finalItems = shuffled.length >= 20 ? shuffled.slice(0, 20) : Array(20).fill(null).map((_, i) => shuffled[i % shuffled.length]);
      
      setDisplayItems(finalItems);
      setIsLoading(false);
    }, 400);
  };

  const toggleSection = (id: string) => {
    const newSections = new Set(expandedSections);
    if (newSections.has(id)) newSections.delete(id);
    else newSections.add(id);
    setExpandedSections(newSections);
  };

  const toggleNode = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); 
    const newNodes = new Set(expandedNodes);
    if (newNodes.has(id)) newNodes.delete(id);
    else newNodes.add(id);
    setExpandedNodes(newNodes);
  };

  const openArticle = (id: string) => {
    if (onArticleClick) {
      onArticleClick(id);
    } else {
      setLoadingArticleId(id);
      setTimeout(() => {
        setLoadingArticleId(null);
      }, 400);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (pageContainerRef.current?.scrollTop === 0) startY.current = e.touches[0].pageY;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (pageContainerRef.current?.scrollTop === 0) {
      const diff = e.touches[0].pageY - startY.current;
      if (diff > 0) setPullDownDistance(Math.min(diff * 0.4, 80));
    }
  };
  const handleTouchEnd = () => {
    if (pullDownDistance > 60) {
      setIsRefreshing(true);
      setPullDownDistance(60);
      setTimeout(() => { handleTabRefresh(activeTab); setIsRefreshing(false); setPullDownDistance(0); }, 1000);
    } else setPullDownDistance(0);
  };

  return (
    <div 
      ref={pageContainerRef}
      onScroll={(e) => {
        const current = e.currentTarget.scrollTop;
        if (current - lastScrollY.current > 10 && current > 100) setCategoryVisible(false);
        else if (current - lastScrollY.current < -15) setCategoryVisible(true);
        lastScrollY.current = current;
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="h-screen bg-[#F8F9FB] flex flex-col relative overflow-y-auto hide-scrollbar"
    >
      <div className="absolute w-full flex items-center justify-center overflow-hidden transition-all duration-300" style={{ height: `${pullDownDistance}px`, opacity: pullDownDistance > 0 ? 1 : 0 }}>
        <div className="flex items-center space-x-2 text-red-500 font-bold text-[10px]">
          {isRefreshing ? <div className="w-3 h-3 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div> : <i className="fas fa-arrow-down"></i>}
          <span>{isRefreshing ? 'AI 正在分析装修灵感' : '下拉刷新内容'}</span>
        </div>
      </div>

      <div className="sticky top-0 z-[60] bg-white px-4 py-3 flex items-center space-x-3 shadow-sm">
        <button onClick={onBack} className="text-gray-400 active:scale-90"><i className="fas fa-chevron-left"></i></button>
        <div className="flex-grow relative">
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-[10px]"></i>
          <input type="text" placeholder="搜索 100,000+ 篇装修秘籍..." className="w-full bg-gray-100 rounded-full py-1.5 pl-8 pr-4 text-xs focus:outline-none" />
        </div>
      </div>

      <div className={`sticky top-[52px] z-50 bg-white border-b border-gray-50 flex items-center transition-all duration-300 ${categoryVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="relative flex-grow overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          <div className="flex overflow-x-auto hide-scrollbar px-4 py-3 space-x-6 scroll-smooth snap-x">
            {CONTENT_TABS.map((tab) => (
              <button 
                key={tab.id} 
                onClick={() => setActiveTab(tab.id)} 
                className={`whitespace-nowrap text-sm snap-start transition-all relative pb-1.5 ${
                  activeTab === tab.id ? 'text-red-600 font-black scale-105' : 'text-gray-400 font-medium'
                }`}
              >
                {tab.name} 
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-red-600 rounded-full animate-fade-in"></span>
                )}
              </button>
            ))}
          </div>
        </div>
        <button onClick={() => setShowTreeMenu(true)} className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-white border-l border-gray-50 text-gray-400 shadow-[-5px_0_10px_rgba(255,255,255,1)]">
          <i className="fas fa-bars-staggered"></i>
        </button>
      </div>

      <div className="p-4 flex-grow mb-24 min-h-screen">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-3">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-2xl aspect-[4/5] animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {displayItems.map((item, idx) => (
              <div 
                key={`${item.id}-${idx}`} 
                onClick={() => openArticle(item.id)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm animate-fade-in-up active:scale-95 transition-transform"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <img src={item.cover} className="w-full aspect-[4/5] object-cover bg-gray-50" loading="lazy" />
                <div className="p-2.5">
                  <h3 className="text-[11px] font-bold text-gray-800 line-clamp-2 h-8 leading-relaxed mb-2">{item.title}</h3>
                  <div className="flex items-center justify-between text-[9px] text-gray-400">
                    <div className="flex items-center space-x-1 min-w-0">
                      <img src={item.authorAvatar} className="w-3.5 h-3.5 rounded-full border border-gray-50" />
                      <span className="truncate">{item.author}</span>
                    </div>
                    <span><i className="far fa-heart mr-0.5"></i>{item.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showTreeMenu && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end justify-center" onClick={() => setShowTreeMenu(false)}>
          <div className="bg-white w-full rounded-t-[2.5rem] h-[90vh] flex flex-col animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="px-6 pt-8 pb-4 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-black text-gray-900 flex items-center">
                    <i className="fas fa-map-marked-alt text-red-600 mr-2"></i>装修百科导航
                  </h3>
                  <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-bold">12 MAJOR CATEGORIES · PROFESSIONAL GUIDE</p>
                </div>
                <button onClick={() => setShowTreeMenu(false)} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400"><i className="fas fa-times"></i></button>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto p-4 space-y-3 hide-scrollbar bg-gray-50/50">
              {DECORATION_GUIDE_TREE.map((section) => (
                <div key={section.id} className="rounded-3xl bg-white shadow-sm overflow-hidden border border-gray-100">
                  <button 
                    onClick={() => toggleSection(section.id)}
                    className={`w-full p-4 flex items-center justify-between transition-colors ${expandedSections.has(section.id) ? 'bg-red-50/20' : ''}`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base transition-all ${expandedSections.has(section.id) ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                        <i className={`fas ${section.icon}`}></i>
                      </div>
                      <span className={`font-black text-sm ${expandedSections.has(section.id) ? 'text-red-600' : 'text-gray-800'}`}>{section.title}</span>
                    </div>
                    <i className={`fas fa-chevron-down text-[10px] transition-transform duration-300 ${expandedSections.has(section.id) ? 'rotate-180 text-red-600' : 'text-gray-300'}`}></i>
                  </button>

                  {expandedSections.has(section.id) && (
                    <div className="px-3 pb-4 space-y-1.5 animate-fade-in bg-white">
                      {section.nodes.map((node) => (
                        <div key={node.id} className="relative">
                          <div 
                            className={`flex items-center justify-between py-2.5 px-3 rounded-xl transition-all active:bg-gray-50 ${expandedNodes.has(node.id) ? 'bg-gray-50/50' : ''}`}
                            onClick={() => openArticle(node.id)}
                          >
                            <div className="flex items-center space-x-3 flex-grow truncate">
                              <div className={`w-1 h-1 rounded-full flex-shrink-0 ${node.importance === 'primary' ? 'bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.5)]' : 'bg-gray-200'}`}></div>
                              <span className={`text-[12px] truncate ${node.importance === 'primary' ? 'font-black text-gray-800' : 'font-medium text-gray-600'}`}>{node.title}</span>
                            </div>
                            
                            {node.children && node.children.length > 0 && (
                              <button 
                                onClick={(e) => toggleNode(e, node.id)}
                                className={`ml-2 w-6 h-6 rounded-lg flex items-center justify-center transition-all ${expandedNodes.has(node.id) ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-400'}`}
                              >
                                <i className={`fas ${expandedNodes.has(node.id) ? 'fa-minus' : 'fa-plus'} text-[8px]`}></i>
                              </button>
                            )}
                          </div>

                          {node.children && expandedNodes.has(node.id) && (
                            <div className="mt-1 ml-7 pl-4 border-l border-gray-100 space-y-2 animate-fade-in pb-2">
                              {node.children.map((child) => (
                                <div 
                                  key={child.id}
                                  onClick={() => openArticle(child.id)}
                                  className="py-1.5 text-[11px] text-gray-400 hover:text-red-500 flex items-center justify-between"
                                >
                                  <span className="truncate">{child.title}</span>
                                  <i className="fas fa-chevron-right text-[7px] opacity-30"></i>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-6 bg-white border-t text-center">
              <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest italic">Professionalism · Efficiency · Beauty</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuidePage;
