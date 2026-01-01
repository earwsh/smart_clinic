import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaChartPie, 
  FaCalendarAlt, 
  FaUserInjured, 
  FaComments, 
  FaWallet, 
  FaCog,
  FaSignOutAlt,
  FaUserCheck,
} from 'react-icons/fa';

const AdminSidebar = () => {
  const menuItems = [
    { icon: <FaChartPie />, label: 'داشبورد مدیریتی', path: '/admin' },
    { icon: <FaCalendarAlt />, label: 'مدیریت نوبت‌ها', path: '/admin/appointments' },
    { icon: <FaUserCheck />, label: 'پذیرش و صف مراجعین', path: '/admin/reception' }, // اضافه شد
    { icon: <FaUserInjured />, label: 'لیست بیماران', path: '/admin/patients' },
    { icon: <FaComments />, label: 'مشاوره و پیام‌ها', path: '/admin/chats' },
    { icon: <FaWallet />, label: 'امور مالی', path: '/admin/finance' },
    { icon: <FaCog />, label: 'تنظیمات سیستم', path: '/admin/settings' },

  ];

  return (
    <aside className="hidden md:flex w-72 h-full flex-col items-center py-8 z-50 relative">
      {/* پس‌زمینه متفاوت برای ادمین (سبز تیره) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#064e3b] to-[#065f46] shadow-2xl -z-10"></div>
      
      {/* پروفایل دکتر */}
      <div className="flex flex-col items-center mb-8 w-full px-6">
        <div className="w-24 h-24 rounded-full p-1 border-2 border-pastel-gold mb-3 relative bg-white/10 backdrop-blur-sm">
          <img 
            src="https://ui-avatars.com/api/?name=Dr+Naseh&background=E3F2FD&color=047857&size=200" 
            alt="Admin" 
            className="w-full h-full rounded-full object-cover"
          />
          <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-2 border-[#064e3b] rounded-full"></div>
        </div>
        <h1 className="text-lg font-bold text-white mb-1">دکتر ناصح یوسفی</h1>
        <p className="text-xs text-green-200 bg-white/10 px-3 py-1 rounded-full">مدیر سیستم</p>
      </div>

      {/* منو */}
      <nav className="w-full flex-1 overflow-y-auto px-4 custom-scrollbar">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink 
                to={item.path}
                end={item.path === '/admin'} // فقط برای صفحه اصلی exact باشه
                className={({ isActive }) => `
                  w-full flex items-center p-3 rounded-xl transition-all duration-200 font-medium
                  ${isActive 
                    ? 'bg-white text-trust-green shadow-lg translate-x-2' 
                    : 'text-green-100 hover:bg-white/10 hover:translate-x-1'
                  }
                `}
              >
                <span className="ml-3 text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* دکمه خروج */}
      <div className="w-full px-6 mt-4">
        <button className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-red-500/20 text-red-200 hover:bg-red-500 hover:text-white transition-all border border-red-500/30">
          <FaSignOutAlt />
          خروج از پنل
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;