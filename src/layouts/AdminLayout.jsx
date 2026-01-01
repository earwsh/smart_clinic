import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden font-sans bg-gray-50 text-gray-800">
      
      {/* سایدبار ادمین */}
      <AdminSidebar />

      {/* محتوای اصلی */}
      <main className="flex-1 relative h-full overflow-hidden flex flex-col bg-[#F3F4F6]">
        
        {/* هدر بالای صفحه (مخصوص ادمین) */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-10">
          <h2 className="text-xl font-bold text-gray-700">پنل مدیریت کلینیک</h2>
          <div className="flex items-center gap-4">
             <span className="text-sm text-gray-500">امروز: ۱۴ دی ۱۴۰۴</span>
             <button className="bg-trust-green/10 text-trust-green p-2 rounded-lg hover:bg-trust-green hover:text-white transition-colors">
               🔔 <span className="text-xs font-bold">3</span>
             </button>
          </div>
        </header>

        {/* محل رندر شدن صفحات ادمین */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 scroll-smooth">
           <Outlet />
        </div>

      </main>
    </div>
  );
};

export default AdminLayout;