
import React from 'react';

interface TabBarProps {
  activeTab: string;
  onTabChange: (id: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: '首页', icon: 'fa-house' },
    { id: 'content', label: '内容', icon: 'fa-book-open' },
    { id: 'products', label: '商品', icon: 'fa-box-open' },
    { id: 'profile', label: '我', icon: 'fa-user' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-100 px-6 py-2 flex justify-between items-center z-[60] pb-[calc(env(safe-area-inset-bottom)+8px)] shadow-[0_-1px_10px_rgba(0,0,0,0.02)]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex flex-col items-center space-y-1 transition-all flex-1 ${
            activeTab === tab.id ? 'text-red-600 scale-105' : 'text-gray-400'
          }`}
        >
          <i className={`fas ${tab.icon} text-lg`}></i>
          <span className="text-[10px] font-bold">{tab.label}</span>
          {activeTab === tab.id && (
            <div className="w-1 h-1 bg-red-600 rounded-full mt-0.5"></div>
          )}
        </button>
      ))}
    </div>
  );
};

export default TabBar;
