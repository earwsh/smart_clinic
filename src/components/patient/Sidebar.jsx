import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaHome, 
  FaSignInAlt, 
  FaCalendarCheck, 
  FaUserMd, 
  FaPoll, 
  FaIdCard 
} from 'react-icons/fa';

const Sidebar = () => {
  const menuItems = [
    { icon: <FaHome />, label: 'صفحه اصلی', path: '/' },
    { icon: <FaSignInAlt />, label: 'ورود / ثبت نام', path: '/login' },
    { icon: <FaCalendarCheck />, label: 'نوبت‌دهی آنلاین', path: '/appointments' },
    { icon: <FaUserMd />, label: 'مشاوره و توصیه سلامت', path: '/consult' },
    { icon: <FaPoll />, label: 'نظرسنجی بیماران', path: '/survey' },
    { icon: <FaIdCard />, label: 'بیوگرافی و رزومه', path: '/bio' },
  ];

  return (
    <aside className="hidden md:flex w-72 h-full flex-col items-center py-8 z-50 relative">
      {/* بک‌گراند شیشه‌ای سایدبار */}
      <div className="absolute inset-0 bg-gradient-to-b from-pastel-blue/90 to-pastel-purple/90 backdrop-blur-lg border-l border-white/50 -z-10"></div>
      
      {/* پروفایل دکتر */}
      <div className="flex flex-col items-center mb-6 w-full px-6 group">
        <div className="w-32 h-32 rounded-full p-1 border-2 border-pastel-gold mb-4 relative overflow-hidden shadow-lg bg-white">
          <img 
            src="https://ui-avatars.com/api/?name=Dr+Naseh&background=E3F2FD&color=37474F&size=200" 
            alt="دکتر ناصح یوسفی" 
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <h1 className="text-xl font-bold text-gray-800 mb-1">دکتر ناصح یوسفی</h1>
        <p className="text-sm text-gray-500 mb-4">متخصص طب فیزیکی و توانبخشی</p>
        
        {/* خط جداکننده */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-pastel-gold to-transparent opacity-50"></div>
      </div>

      {/* منو نویگیشن */}
      <nav className="w-full flex-1 overflow-y-auto px-4 custom-scrollbar">
        <ul className="space-y-3">
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink 
                to={item.path}
                className={({ isActive }) => `
                  w-full flex items-center p-3 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-white/80 border-r-4 border-pastel-gold text-pastel-gold font-bold shadow-sm' 
                    : 'text-gray-600 hover:bg-white/60'
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

      {/* فوتر */}
      <div className="w-full px-6 py-4 text-center text-xs text-gray-400">
        <p>Design by Professional Dev</p>
        <p className="mt-1">نسخه ۱.۱.۰</p>
      </div>
    </aside>
  );
};

export default Sidebar;