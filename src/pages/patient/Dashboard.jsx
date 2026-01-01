import React from 'react';
import { 
  FaCalendarCheck, 
  FaCommentMedical, 
  FaWallet, 
  FaArrowLeft, 
  FaClock, 
  FaUserMd 
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="max-w-6xl mx-auto animate-fade-in space-y-8">
      
      {/* بخش خوش‌آمدگویی */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-trust-green to-[#065f46] text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">سلام، علی عزیز 👋</h1>
          <p className="text-green-100 opacity-90">به پنل سلامت خود خوش آمدید. امروز چه کاری می‌توانیم برایتان انجام دهیم؟</p>
        </div>
        <div className="relative z-10 mt-4 md:mt-0">
          <span className="inline-block bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg text-sm font-bold border border-white/30">
            📅 امروز: ۱۴ دی ۱۴۰۴
          </span>
        </div>
      </div>

      {/* کارت‌های وضعیت (Stats Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* کارت نوبت فعال */}
        <div className="glass-panel p-6 rounded-2xl border-r-4 border-r-trust-green flex items-center justify-between hover:translate-y-[-5px] transition-transform duration-300">
          <div>
            <p className="text-gray-500 text-sm font-bold mb-1">نوبت‌های فعال</p>
            <h3 className="text-3xl font-bold text-gray-800">۱ نوبت</h3>
          </div>
          <div className="w-12 h-12 bg-trust-green-light rounded-full flex items-center justify-center text-trust-green text-xl">
            <FaCalendarCheck />
          </div>
        </div>

        {/* کارت پیام‌ها */}
        <div className="glass-panel p-6 rounded-2xl border-r-4 border-r-pastel-gold flex items-center justify-between hover:translate-y-[-5px] transition-transform duration-300">
          <div>
            <p className="text-gray-500 text-sm font-bold mb-1">پیام‌های جدید</p>
            <h3 className="text-3xl font-bold text-gray-800">۳ پیام</h3>
          </div>
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-pastel-gold text-xl">
            <FaCommentMedical />
          </div>
        </div>

        {/* کارت کیف پول */}
        <div className="glass-panel p-6 rounded-2xl border-r-4 border-r-pastel-blue flex items-center justify-between hover:translate-y-[-5px] transition-transform duration-300">
          <div>
            <p className="text-gray-500 text-sm font-bold mb-1">اعتبار کیف پول</p>
            <h3 className="text-3xl font-bold text-gray-800">۵۰۰,۰۰۰ <span className="text-sm font-normal text-gray-400">تومان</span></h3>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-pastel-accent text-xl">
            <FaWallet />
          </div>
        </div>
      </div>

      {/* بخش اصلی: نوبت بعدی و دسترسی سریع */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* نوبت بعدی (بزرگ) */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-white/60">
          <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span className="w-2 h-6 bg-trust-green rounded-full"></span>
              نوبت پیش‌رو
            </h3>
            <Link to="/appointments" className="text-sm text-trust-green font-bold hover:underline flex items-center gap-1">
              مدیریت نوبت‌ها <FaArrowLeft />
            </Link>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center gap-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-2 h-full bg-trust-green"></div>
            
            {/* تاریخ */}
            <div className="flex flex-col items-center justify-center bg-trust-green-light text-trust-green w-full md:w-24 h-24 rounded-2xl">
              <span className="text-3xl font-bold">۱۶</span>
              <span className="font-bold">دی</span>
            </div>

            {/* جزئیات */}
            <div className="flex-1 text-center md:text-right">
              <h4 className="text-lg font-bold text-gray-800 mb-2">ویزیت حضوری - دکتر ناصح یوسفی</h4>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1"><FaClock className="text-pastel-gold" /> ساعت ۱۷:۳۰</span>
                <span className="flex items-center gap-1"><FaUserMd className="text-pastel-accent" /> متخصص طب فیزیکی</span>
              </div>
            </div>

            {/* دکمه اقدام */}
            <button className="bg-trust-green text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-trust-green/20 hover:bg-opacity-90 transition-all">
              جزئیات نوبت
            </button>
          </div>

          {/* نوبت‌های اخیر (لیست ساده) */}
          <div className="mt-8">
             <h4 className="text-sm font-bold text-gray-400 mb-4">نوبت‌های تکمیل شده اخیر</h4>
             <div className="space-y-3">
               {[1, 2].map((item) => (
                 <div key={item} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl hover:bg-white transition-colors border border-transparent hover:border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                      <span className="text-gray-700 font-medium">مشاوره آنلاین (درد گردن)</span>
                    </div>
                    <span className="text-xs text-gray-400">۱۰ آذر ۱۴۰۴</span>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* دسترسی سریع */}
        <div className="glass-panel p-6 rounded-3xl border border-white/60 h-fit">
          <h3 className="text-xl font-bold text-gray-800 mb-6">دسترسی سریع</h3>
          <div className="grid grid-cols-1 gap-4">
            <Link to="/appointments" className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:border-trust-green hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-trust-green-light text-trust-green flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                <FaCalendarCheck />
              </div>
              <div className="text-right">
                <h5 className="font-bold text-gray-800">دریافت نوبت جدید</h5>
                <p className="text-xs text-gray-400">ویزیت حضوری یا آنلاین</p>
              </div>
            </Link>

            <button className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:border-pastel-gold hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-pastel-gold flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                <FaCommentMedical />
              </div>
              <div className="text-right">
                <h5 className="font-bold text-gray-800">مشاوره متنی</h5>
                <p className="text-xs text-gray-400">گفتگو با پزشک</p>
              </div>
            </button>

             <button className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:border-pastel-blue hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-pastel-accent flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                <FaUserMd />
              </div>
              <div className="text-right">
                <h5 className="font-bold text-gray-800">پرونده پزشکی</h5>
                <p className="text-xs text-gray-400">سوابق و نسخه‌ها</p>
              </div>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;