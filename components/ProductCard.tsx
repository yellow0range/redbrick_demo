
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col active:opacity-90 transition-opacity">
      <div className="relative aspect-square">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        {product.tag && (
          <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-red-600 text-white text-[10px] rounded font-bold">
            {product.tag}
          </div>
        )}
      </div>
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="text-sm text-gray-800 line-clamp-2 leading-snug font-medium mb-2">
          {product.name}
        </h3>
        <div className="mt-auto">
          <div className="flex items-baseline space-x-1">
            <span className="text-xs text-red-600 font-bold">¥</span>
            <span className="text-lg text-red-600 font-bold">{product.price}</span>
            <span className="text-[9px] text-gray-400 ml-1">起</span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-[10px] text-gray-400">{product.sales}人付款</span>
            <button className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] flex items-center justify-center">
              立即购
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
