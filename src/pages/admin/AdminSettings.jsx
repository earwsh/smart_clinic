import React, { useState } from 'react';
import { 
  FaCog, 
  FaUserCog, 
  FaLock, 
  FaBell, 
  FaHospital, 
  FaSave, 
  FaCamera,
  FaGlobeAmericas
} from 'react-icons/fa';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="animate-fade-in pb-10 max-w-5xl mx-auto">
      
      {/* هدر صفحه */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaCog className="text-trust-green" />
          تنظیمات سیستم
        </h1>
        <p className="text-sm text-gray-400 mt-1">مدیریت اطلاعات مطب، حساب کاربری و امنیت</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* منوی تب‌ها (سمت راست) */}
        <div className="w-full lg:w-64 space-y-2">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all ${activeTab === 'profile' ? 'bg-trust-green text-white shadow-lg shadow-trust-green/20' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
          >
            <FaUserCog /> پروفایل پزشک
          </button>
          <button 
            onClick={() => setActiveTab('clinic')}
            className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all ${activeTab === 'clinic' ? 'bg-trust-green text-white shadow-lg shadow-trust-green/20' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
          >
            <FaHospital /> اطلاعات مطب
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all ${activeTab === 'security' ? 'bg-trust-green text-white shadow-lg shadow-trust-green/20' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
          >
            <FaLock /> امنیت
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all ${activeTab === 'notifications' ? 'bg-trust-green text-white shadow-lg shadow-trust-green/20' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
          >
            <FaBell /> اطلاع‌رسانی
          </button>
        </div>

        {/* محتوای تنظیمات (سمت چپ) */}
        <div className="flex-1 bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
          
          {/* تب پروفایل */}
          {activeTab === 'profile' && (
            <div className="animate-fade-in space-y-6">
              <div className="flex flex-col items-center mb-8">
                <div className="relative group">
                  <img src="https://ui-avatars.com/api/?name=Dr+Naseh&background=E3F2FD&color=047857&size=150" className="w-32 h-32 rounded-full border-4 border-gray-50 shadow-md object-cover" alt="" />
                  <button className="absolute bottom-1 right-1 bg-trust-green text-white p-2 rounded-full border-2 border-white hover:scale-110 transition-transform shadow-lg">
                    <FaCamera className="text-sm" />
                  </button>
                </div>
                <h3 className="mt-4 font-bold text-gray-800">تغییر تصویر پروفایل</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2 mr-2">نام و نام خانوادگی</label>
                  <input type="text" defaultValue="دکتر ناصح یوسفی" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:border-trust-green outline-none font-bold text-gray-700" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2 mr-2">شماره نظام پزشکی</label>
                  <input type="text" defaultValue="۱۲۳۴۵۶" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:border-trust-green outline-none font-bold text-gray-700" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-400 mb-2 mr-2">بیوگرافی کوتاه (نمایش در سایت)</label>
                  <textarea rows="4" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:border-trust-green outline-none font-bold text-gray-700 resize-none" defaultValue="متخصص طب فیزیکی و توانبخشی با بیش از ۱۵ سال سابقه..."></textarea>
                </div>
              </div>
            </div>
          )}

          {/* تب اطلاعات مطب */}
          {activeTab === 'clinic' && (
            <div className="animate-fade-in space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2 mr-2">آدرس مطب</label>
                  <input type="text" defaultValue="تهران، ولیعصر، ساختمان پزشکان سینا" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:border-trust-green outline-none font-bold text-gray-700" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2 mr-2">تلفن ثابت</label>
                    <input type="tel" defaultValue="02188881234" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:border-trust-green outline-none font-bold text-gray-700 dir-ltr text-right" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2 mr-2">لینک گوگل مپ</label>
                    <input type="text" placeholder="https://maps.google.com/..." className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:border-trust-green outline-none font-bold text-gray-700 dir-ltr text-right" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* تب امنیت */}
          {activeTab === 'security' && (
            <div className="animate-fade-in space-y-6">
              <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-2xl mb-6">
                 <p className="text-xs text-yellow-700 font-bold leading-relaxed">توصیه امنیتی: برای حفظ امنیت پرونده‌های بیماران، رمز عبور خود را هر ۳ ماه یکبار تغییر دهید و از رمزهای پیچیده استفاده کنید.</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2 mr-2">رمز عبور فعلی</label>
                  <input type="password" underline className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:border-trust-green outline-none font-bold text-gray-700" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2 mr-2">رمز عبور جدید</label>
                  <input type="password" underline className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:border-trust-green outline-none font-bold text-gray-700" />
                </div>
              </div>
            </div>
          )}

          {/* دکمه ذخیره (ثابت در همه تب‌ها) */}
          <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end">
            <button className="bg-trust-green text-white px-10 py-3.5 rounded-2xl font-bold shadow-lg shadow-trust-green/30 hover:bg-emerald-700 hover:-translate-y-1 transition-all flex items-center gap-2">
              <FaSave /> ذخیره تغییرات نهایی
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminSettings;