import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/patient/Sidebar';
import { FaBars, FaTimes } from 'react-icons/fa';

const PatientLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // تابع تغییر وضعیت سایدبار در موبایل
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden font-sans bg-[#FDFBF7] text-gray-800">
      
      {/* سایدبار (مدیریت نمایش در دسکتاپ و موبایل) */}
      <div className={`
        fixed inset-y-0 right-0 z-[100] transform transition-transform duration-300 md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
      `}>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* محتوای اصلی صفحه */}
      <main className="flex-1 relative h-full overflow-hidden flex flex-col bg-[#FDFBF7]">
        
        {/* هدر مخصوص موبایل */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-100 shadow-sm z-50">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-6 bg-trust-green rounded-full"></div>
            <span className="font-black text-gray-800 text-sm">پنل سلامت دکتر ناصح</span>
          </div>
          <button 
            onClick={toggleSidebar}
            className="p-2.5 bg-gray-50 rounded-xl text-trust-green shadow-inner border border-gray-100 active:scale-95 transition-all"
          >
            {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {/* پترن پس‌زمینه (Cube Pattern) */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>

        {/* محل رندر شدن صفحات مختلف با اسکرول اختصاصی */}
        <div className="flex-1 overflow-y-auto p-5 md:p-10 lg:p-12 pb-24 relative scroll-smooth custom-scrollbar">
           <div className="max-w-6xl mx-auto">
              <Outlet />
           </div>
        </div>

        {/* لایه تیره برای بستن سایدبار در موبایل */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90] md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

      </main>
    </div>
  );
};

export default PatientLayout;