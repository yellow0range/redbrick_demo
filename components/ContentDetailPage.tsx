
import React, { useState, useEffect } from 'react';
import { PRODUCTS, ARTICLES } from '../constants';
import ProductCard from './ProductCard';

interface ContentDetailPageProps {
  id: string;
  onBack: () => void;
}

const ContentDetailPage: React.FC<ContentDetailPageProps> = ({ id, onBack }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  // 模拟数据获取 - 已更新图片链接以匹配奶油风主题
  const mockContent = {
    title: "奶油风装修全攻略：配色、材质与避坑指南",
    author: "家居设计师 Lily",
    authorAvatar: "https://i.pravatar.cc/100?u=lily",
    date: "2024-10-25",
    abstract: "奶油风不仅是刷个漆那么简单，它对色温、光影以及材质的统一性有着极高的要求。本文将带你从硬装到软装全方位拆解。",
    videoUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    videoPoster: "https://images.unsplash.com/photo-1616489953149-755e149d3ed8?auto=format&fit=crop&w=800&q=80",
    tags: ["奶油风", "装修灵感", "色彩搭配", "小户型"],
    sections: [
      { type: 'text', content: "第一步：确定底色。奶油风的核心在于'同色系'，建议选择珍珠白或云朵灰作为基础，避免冷色调的介入。" },
      { type: 'image', url: "https://images.unsplash.com/photo-1616489953149-755e149d3ed8?auto=format&fit=crop&w=800&q=80" },
      { type: 'text', content: "第二步：材质平衡。为了增加空间的层次感，可以加入原木、藤编或者羊羔绒等天然材质。" },
      { type: 'gallery', images: [
          "https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
        ]
      },
      { type: 'text', content: "避坑指南：千万不要选择高反光的亮面砖，它会瞬间破坏奶油色的朦胧感。建议选择柔光砖或哑光砖。" }
    ]
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* 顶部导航 */}
      <div className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md border-b shadow-sm' : 'bg-transparent'}`}>
        <button 
          onClick={onBack}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isScrolled ? 'bg-gray-100 text-gray-800' : 'bg-black/20 text-white'}`}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <div className={`flex items-center space-x-2 transition-opacity ${isScrolled ? 'opacity-100' : 'opacity-0'}`}>
          <img src={mockContent.authorAvatar} className="w-6 h-6 rounded-full" />
          <span className="text-xs font-bold text-gray-800 truncate max-w-[120px]">{mockContent.title}</span>
        </div>
        <button className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isScrolled ? 'bg-gray-100 text-gray-800' : 'bg-black/20 text-white'}`}>
          <i className="fas fa-share-alt"></i>
        </button>
      </div>

      {/* 视频区域 */}
      <div className="relative w-full aspect-video bg-black overflow-hidden group">
        <video 
          src={mockContent.videoUrl} 
          poster={mockContent.videoPoster}
          className="w-full h-full object-cover"
          controls
        />
      </div>

      <div className="px-5 py-6">
        {/* 文章头 */}
        <h1 className="text-2xl font-black text-gray-900 leading-tight mb-4">{mockContent.title}</h1>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <img src={mockContent.authorAvatar} className="w-10 h-10 rounded-full border border-gray-100" />
            <div>
              <p className="text-sm font-bold text-gray-800">{mockContent.author}</p>
              <p className="text-[10px] text-gray-400">{mockContent.date}</p>
            </div>
          </div>
          <button className="bg-red-600 text-white text-xs font-bold px-5 py-2 rounded-full active:scale-95 transition-transform shadow-lg shadow-red-200">
            关注
          </button>
        </div>

        {/* 摘要 */}
        <div className="bg-gray-50 rounded-2xl p-4 border-l-4 border-red-600 mb-8 italic text-gray-600 text-sm leading-relaxed">
          {mockContent.abstract}
        </div>

        {/* 内容主体 */}
        <div className="space-y-6">
          {mockContent.sections.map((section, idx) => {
            if (section.type === 'text') {
              return <p key={idx} className="text-gray-700 text-base leading-loose tracking-wide">{section.content}</p>;
            }
            if (section.type === 'image') {
              return <img key={idx} src={section.url} className="w-full rounded-2xl shadow-sm" />;
            }
            if (section.type === 'gallery' && section.images) {
              return (
                <div key={idx} className="relative group">
                  <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar space-x-3 pb-2" onScroll={(e) => {
                    const scrollLeft = e.currentTarget.scrollLeft;
                    const width = e.currentTarget.offsetWidth;
                    setActiveGalleryIndex(Math.round(scrollLeft / width));
                  }}>
                    {section.images.map((img, iIdx) => (
                      <img key={iIdx} src={img} className="w-[85vw] flex-shrink-0 snap-center rounded-2xl" />
                    ))}
                  </div>
                  <div className="flex justify-center mt-3 space-x-1.5">
                    {section.images.map((_, iIdx) => (
                      <div key={iIdx} className={`h-1.5 rounded-full transition-all ${activeGalleryIndex === iIdx ? 'w-4 bg-red-600' : 'w-1.5 bg-gray-200'}`} />
                    ))}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* 关键词标签 */}
        <div className="mt-10 flex flex-wrap gap-2">
          {mockContent.tags.map(tag => (
            <span key={tag} className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-[11px] font-bold"># {tag}</span>
          ))}
        </div>
      </div>

      {/* 相关内容推荐 */}
      <section className="mt-10 bg-gray-50 py-10">
        <div className="px-5 mb-6 flex items-center justify-between">
          <h2 className="text-lg font-black text-gray-900">相关内容</h2>
          <span className="text-xs text-red-600 font-bold">更多推荐 <i className="fas fa-chevron-right ml-1"></i></span>
        </div>
        <div className="flex overflow-x-auto hide-scrollbar space-x-4 px-5">
          {ARTICLES.map(article => (
            <div key={article.id} className="flex-shrink-0 w-64 bg-white rounded-2xl shadow-sm overflow-hidden active:scale-95 transition-transform">
              <img src={article.cover} className="w-full h-32 object-cover" />
              <div className="p-4">
                <h4 className="font-bold text-gray-800 line-clamp-2 h-10 mb-2 leading-tight">{article.title}</h4>
                <div className="flex items-center justify-between text-[10px] text-gray-400">
                  <span><i className="far fa-eye mr-1"></i>{article.views}</span>
                  <span>1.2k 点赞</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 相关商品推荐 */}
      <section className="mt-10 px-5 mb-20">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-black text-gray-900">相关商品</h2>
          <span className="text-xs text-red-600 font-bold">进入商城 <i className="fas fa-chevron-right ml-1"></i></span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {PRODUCTS.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 底部交互条 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-5 py-3 flex items-center space-x-4 z-[60] pb-[calc(env(safe-area-inset-bottom)+12px)] shadow-[0_-5px_15px_rgba(0,0,0,0.03)]">
        <div className="flex-grow bg-gray-100 rounded-full py-2.5 px-4 text-xs text-gray-400">
          说点什么...
        </div>
        <div className="flex items-center space-x-6 text-gray-600">
          <div className="flex flex-col items-center">
            <i className="far fa-heart text-lg"></i>
            <span className="text-[8px] mt-0.5">点赞</span>
          </div>
          <div className="flex flex-col items-center">
            <i className="far fa-star text-lg"></i>
            <span className="text-[8px] mt-0.5">收藏</span>
          </div>
          <div className="flex flex-col items-center relative">
            <i className="far fa-comment-dots text-lg"></i>
            <span className="text-[8px] mt-0.5">评论</span>
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[7px] w-3 h-3 rounded-full flex items-center justify-center font-bold">9</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDetailPage;
