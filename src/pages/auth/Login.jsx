import React, { useState } from 'react';
import { FaUser, FaLock, FaMobileAlt, FaArrowLeft, FaGoogle, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // مدیریت حالت ورود یا ثبت‌نام

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-pastel-bg">
      
      {/* پترن پس‌زمینه (مثل بقیه صفحات) */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-100 z-0"></div>
      
      {/* دایره‌های تزیینی پشت فرم */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-trust-green/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-pastel-gold/20 rounded-full blur-3xl"></div>

      {/* کارت اصلی */}
      <div className="glass-panel w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl relative z-10 animate-fade-in min-h-[600px]">
        
        {/* بخش سمت راست: فرم‌ها */}
        <div className="p-8 md:p-12 flex flex-col justify-center bg-white/60 backdrop-blur-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-trust-green-light text-trust-green mb-4 shadow-inner">
              <FaShieldAlt className="text-3xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {isLogin ? 'خوش‌آمدید' : 'ساخت حساب کاربری'}
            </h2>
            <p className="text-gray-500 text-sm">
              {isLogin ? 'برای استفاده از خدمات وارد شوید' : 'اطلاعات خود را برای ثبت‌نام وارد کنید'}
            </p>
          </div>

          <form className="space-y-5">
            {!isLogin && (
              <div className="relative group">
                <FaUser className="absolute right-4 top-4 text-gray-400 group-focus-within:text-trust-green transition-colors" />
                <input 
                  type="text" 
                  placeholder="نام و نام خانوادگی" 
                  className="w-full pl-4 pr-12 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-trust-green focus:ring-2 focus:ring-trust-green/20 transition-all text-gray-700 font-medium"
                />
              </div>
            )}
            
            <div className="relative group">
              <FaMobileAlt className="absolute right-4 top-4 text-gray-400 group-focus-within:text-trust-green transition-colors" />
              <input 
                type="tel" 
                placeholder="شماره موبایل" 
                className="w-full pl-4 pr-12 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-trust-green focus:ring-2 focus:ring-trust-green/20 transition-all text-gray-700 font-bold tracking-wider"
                dir="ltr"
              />
            </div>

            <div className="relative group">
              <FaLock className="absolute right-4 top-4 text-gray-400 group-focus-within:text-trust-green transition-colors" />
              <input 
                type="password" 
                placeholder="رمز عبور" 
                className="w-full pl-4 pr-12 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-trust-green focus:ring-2 focus:ring-trust-green/20 transition-all text-gray-700"
                dir="ltr"
              />
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <a href="#" className="text-xs text-trust-green font-bold hover:underline">
                  رمز عبور را فراموش کرده‌اید؟
                </a>
              </div>
            )}

            <button className="w-full bg-trust-green text-white font-bold py-3.5 rounded-xl shadow-lg shadow-trust-green/30 hover:bg-opacity-90 hover:-translate-y-1 transition-all duration-300">
              {isLogin ? 'ورود به حساب' : 'ثبت نام رایگان'}
            </button>
          </form>

          <div className="mt-8 flex items-center gap-4">
            <div className="h-px bg-gray-300 flex-1"></div>
            <span className="text-gray-400 text-xs">یا ورود با</span>
            <div className="h-px bg-gray-300 flex-1"></div>
          </div>

          <button className="w-full mt-4 flex items-center justify-center gap-3 bg-white border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition-colors text-gray-600 font-bold text-sm">
            <FaGoogle className="text-red-500" />
            حساب گوگل
          </button>

          <div className="mt-8 text-center text-sm">
            <span className="text-gray-500">
              {isLogin ? 'حساب کاربری ندارید؟' : 'قبلاً ثبت‌نام کرده‌اید؟'}
            </span>
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="mr-2 text-trust-green font-bold hover:underline"
            >
              {isLogin ? 'ثبت نام کنید' : 'وارد شوید'}
            </button>
          </div>
        </div>

        {/* بخش سمت چپ: تصویر و متن */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-trust-green to-[#065f46] text-white relative overflow-hidden">
          {/* پترن‌های تزیینی روی رنگ سبز */}
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')] opacity-10"></div>
          
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4 leading-tight">
              نوبت‌دهی آسان،<br/>درمان مطمئن
            </h3>
            <p className="text-green-100 leading-relaxed opacity-90 text-justify">
              به سامانه هوشمند دکتر ناصح یوسفی خوش آمدید. با ایجاد حساب کاربری می‌توانید سوابق پزشکی خود را مدیریت کنید و بدون معطلی نوبت بگیرید.
            </p>
          </div>

          <div className="relative z-10 mt-10">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex -space-x-2 space-x-reverse">
                   <div className="w-8 h-8 rounded-full bg-yellow-200 border-2 border-trust-green"></div>
                   <div className="w-8 h-8 rounded-full bg-blue-200 border-2 border-trust-green"></div>
                   <div className="w-8 h-8 rounded-full bg-pink-200 border-2 border-trust-green"></div>
                </div>
                <span className="text-xs font-bold text-white">+۱۲۰۰ بیمار راضی</span>
              </div>
              <p className="text-xs text-green-50">"بهترین تجربه نوبت‌دهی که تا به حال داشتم. خیلی سریع و دقیق!"</p>
            </div>
            
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-white hover:translate-x-1 transition-transform">
              بازگشت به صفحه اصلی <FaArrowLeft />
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Login;