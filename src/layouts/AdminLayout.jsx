import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import { FaBell, FaSync } from 'react-icons/fa';

const AdminLayout = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // ۱. دریافت اطلاعات اولیه هدر (مثل تعداد اعلان‌ها) از API
  useEffect(() => {
    const fetchHeaderData = async () => {
      // const res = await fetch('/api/v1/admin/header-stats');
      // const data = await res.json();
      setNotificationCount(3); // دیتای نمونه
    };
    fetchHeaderData();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden font-sans bg-[#FDFBF7] text-gray-800">
      
      {/* سایدبار ادمین (سمت راست - RTL) */}
      <AdminSidebar />

      {/* محتوای اصلی */}
      <main className="flex-1 relative h-full overflow-hidden flex flex-col bg-[#F8F9FA]">
        
        {/* هدر بالای صفحه (مخصوص ادمین) */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-10 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <div className="w-2 h-8 bg-trust-green rounded-full"></div>
            <h2 className="text-xl font-black text-gray-800">پنل مدیریت دکتر ناصح یوسفی</h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Today's Date</span>
              <span className="text-sm font-bold text-gray-600">۱۴ دی ۱۴۰۴</span>
            </div>

            <button className="relative group p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-trust-green hover:bg-green-50 transition-all duration-300 border border-transparent hover:border-green-100">
              <FaBell className="text-xl" />
              {notificationCount > 0 && (
                <span className="absolute top-2 right-2 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-lg flex items-center justify-center border-2 border-white shadow-lg animate-bounce">
                  {notificationCount}
                </span>
              )}
            </button>
            
            {/* دکمه رفرش سریع دیتا (برای منشی/دکتر) */}
            <button 
              onClick={() => window.location.reload()} 
              className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-all border border-transparent"
              title="بروزرسانی داده‌ها"
            >
              <FaSync className={`text-lg ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </header>

        {/* محل رندر شدن صفحات ادمین با اسکرول اختصاصی */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar scroll-smooth">
           <div className="max-w-7xl mx-auto">
              <Outlet />
           </div>
        </div>

      </main>
    </div>
  );
};

export default AdminLayout;