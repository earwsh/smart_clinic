// src/layouts/PatientLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/patient/Sidebar';

const PatientLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden font-sans bg-pastel-bg text-pastel-text">
      
      {/* سایدبار (کامپوننت جدا شده) */}
      <Sidebar />

      {/* محتوای اصلی صفحه */}
      <main className="flex-1 relative h-full overflow-hidden flex flex-col bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
        
        {/* دکمه منو موبایل (فعلاً فقط ظاهرش رو گذاشتم) */}
        <div className="md:hidden absolute top-4 right-4 z-50">
          <button className="p-2 bg-white rounded-full shadow-lg text-pastel-gold">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* محل رندر شدن صفحات مختلف (مثل داشبورد، نوبت‌دهی و...) */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 pb-24 relative scroll-smooth">
           <Outlet />
        </div>

      </main>
    </div>
  );
};

export default PatientLayout;