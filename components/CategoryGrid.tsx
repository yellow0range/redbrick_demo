
import React from 'react';
// Corrected: MAIN_NAV is the exported member from constants, not CATEGORIES
import { MAIN_NAV } from '../constants';

const CategoryGrid: React.FC = () => {
  return (
    // Updated grid-cols-5 to grid-cols-4 to match the number of items in MAIN_NAV
    <div className="grid grid-cols-4 gap-y-4 px-2 py-5 bg-white mt-3 mx-4 rounded-2xl shadow-sm border border-gray-50">
      {MAIN_NAV.map((cat) => (
        <div 
          key={cat.id} 
          className="flex flex-col items-center justify-center space-y-1.5 active:scale-95 transition-transform"
        >
          <div className="w-11 h-11 rounded-full bg-red-50 flex items-center justify-center text-red-600">
            <i className={`fas ${cat.icon} text-base`}></i>
          </div>
          <span className="text-[10px] text-gray-600 font-medium">{cat.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;
