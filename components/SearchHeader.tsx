
import React from 'react';

const SearchHeader: React.FC = () => {
  return (
    <div className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md px-4 py-3 flex items-center space-x-3 border-b border-gray-100">
      <div className="text-red-600 font-bold text-xl flex-shrink-0">
        <i className="fas fa-hammer mr-1"></i>
      </div>
      <div className="flex-grow relative">
        <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
        <input 
          type="text" 
          placeholder="搜索装修主材、灯具..." 
          className="w-full bg-gray-100 rounded-full py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
        />
      </div>
      <div className="flex-shrink-0 flex items-center space-x-4 text-gray-600">
        <i className="far fa-comment-dots text-lg"></i>
      </div>
    </div>
  );
};

export default SearchHeader;
