
import React from 'react';

interface DetailPageProps {
  onBack: () => void;
}

const DetailPage: React.FC<DetailPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="sticky top-0 z-50 bg-white px-4 py-3 flex items-center border-b">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-full active:bg-gray-100">
          <i className="fas fa-chevron-left text-gray-600"></i>
        </button>
        <h1 className="flex-grow text-center font-bold text-gray-800 pr-8">装修档案：幸福里1号院</h1>
      </div>

      <div className="p-4 space-y-4">
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="text-lg font-bold mb-4 flex items-center">
            <i className="fas fa-info-circle text-red-600 mr-2"></i>基本信息
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">项目地址</span>
              <span className="font-medium">幸福里1号院 2-1-802</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">装修风格</span>
              <span className="font-medium">现代奶油风</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">房屋面积</span>
              <span className="font-medium">128㎡ (三室两厅)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">合同总价</span>
              <span className="text-red-600 font-bold">¥188,000</span>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="text-lg font-bold mb-4 flex items-center">
            <i className="fas fa-tasks text-red-600 mr-2"></i>工程进度
          </h2>
          <div className="relative pl-6 border-l-2 border-red-100 space-y-8">
            <div className="relative">
              <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-red-600 border-4 border-red-100"></div>
              <div>
                <p className="text-sm font-bold text-gray-800">水电改造 (进行中)</p>
                <p className="text-xs text-gray-400 mt-1">当前阶段已完成 40%，正在进行隐蔽工程验收准备。</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-green-500"></div>
              <div>
                <p className="text-sm font-bold text-gray-800">拆改工程 (已完成)</p>
                <p className="text-xs text-gray-400 mt-1">2024-10-15 完成，通过墙体改造验收。</p>
              </div>
            </div>
            <div className="relative opacity-40">
              <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-gray-300"></div>
              <p className="text-sm font-bold text-gray-400">泥木工程 (待开始)</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="text-lg font-bold mb-4 flex items-center">
            <i className="fas fa-users text-red-600 mr-2"></i>服务团队
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center text-center">
              <img src="https://i.pravatar.cc/100?u=d1" className="w-12 h-12 rounded-full mb-2" />
              <p className="text-xs font-bold">李设计师</p>
              <p className="text-[10px] text-gray-400">首席设计师</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <img src="https://i.pravatar.cc/100?u=d2" className="w-12 h-12 rounded-full mb-2" />
              <p className="text-xs font-bold">张工头</p>
              <p className="text-[10px] text-gray-400">工程负责人</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <img src="https://i.pravatar.cc/100?u=d3" className="w-12 h-12 rounded-full mb-2" />
              <p className="text-xs font-bold">王监理</p>
              <p className="text-[10px] text-gray-400">质量保障</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DetailPage;
