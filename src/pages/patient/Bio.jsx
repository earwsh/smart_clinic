import React from 'react';
import { 
  FaUserMd, 
  FaGraduationCap, 
  FaAward, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaInstagram, 
  FaTelegramPlane, 
  FaLinkedinIn 
} from 'react-icons/fa';

const Bio = () => {
  return (
    // ارتفاع فیکس متناسب با فضای خالی (مشابه صفحه چت)
    <div className="h-[calc(100vh-140px)] flex flex-col animate-fade-in">
      
      {/* هدر پروفایل (ثابت - بدون تغییر اندازه) */}
      <div className="glass-panel p-6 rounded-3xl border border-white/60 mb-6 relative overflow-hidden shrink-0">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-trust-green to-[#065f46]"></div>
        
        <div className="relative flex flex-col md:flex-row items-center md:items-end gap-6 pt-8 px-4">
          <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white z-10 shrink-0">
            <img 
              src="https://ui-avatars.com/api/?name=Dr+Naseh&background=E3F2FD&color=047857&size=256" 
              alt="دکتر ناصح یوسفی" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 text-center md:text-right mb-2 md:mb-0">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">دکتر ناصح یوسفی</h1>
            <p className="text-trust-green font-bold text-sm flex items-center justify-center md:justify-start gap-2">
              <FaUserMd />
              متخصص طب فیزیکی و توانبخشی
            </p>
          </div>

          <div className="flex gap-3 mb-2">
            <a href="#" className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-trust-green hover:text-white transition-all shadow-sm">
              <FaInstagram />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-500 hover:text-white transition-all shadow-sm">
              <FaTelegramPlane />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-700 hover:text-white transition-all shadow-sm">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* محتوای پایین (شبکه‌بندی شده و اسکرول داخلی) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* ستون راست: اطلاعات (با اسکرول داخلی) */}
        <div className="lg:col-span-1 flex flex-col gap-6 overflow-y-auto custom-scrollbar pl-1">
          
          <div className="glass-panel p-5 rounded-2xl border border-white/60 shrink-0">
            <h3 className="font-bold text-gray-800 mb-3 border-b border-gray-100 pb-2 text-sm">درباره پزشک</h3>
            <p className="text-gray-600 text-sm leading-loose text-justify">
              با بیش از ۱۵ سال تجربه در زمینه تشخیص و درمان غیرجراحی بیماری‌های اسکلتی-عضلانی. تمرکز اصلی من بر روی درمان دیسک کمر، آرتروز مفاصل و آسیب‌های ورزشی با استفاده از جدیدترین متدهای روز دنیاست.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-white/60 shrink-0">
            <h3 className="font-bold text-gray-800 mb-3 border-b border-gray-100 pb-2 text-sm">اطلاعات مطب</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-trust-green mt-1 shrink-0">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <span className="block font-bold text-gray-700 text-xs">آدرس:</span>
                  <p className="text-xs text-gray-500 mt-1">تهران، خیابان ولیعصر، بالاتر از پارک ساعی، کوچه ۳۴، ساختمان پزشکان سینا</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-trust-green mt-1 shrink-0">
                  <FaPhoneAlt />
                </div>
                <div>
                  <span className="block font-bold text-gray-700 text-xs">تلفن:</span>
                  <p className="text-xs text-gray-500 mt-1 dir-ltr text-right">۰۲۱ - ۸۸ ۸۸ ۱۲ ۳۴</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 rounded-xl overflow-hidden border border-gray-200 h-32 bg-gray-100 relative group cursor-pointer">
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400 font-bold text-xs group-hover:bg-gray-300 transition-colors">
                <FaMapMarkerAlt className="mr-2" />
                نمایش روی نقشه
              </div>
            </div>
          </div>
        </div>

        {/* ستون چپ: تایم‌لاین (با اسکرول داخلی مستقل) */}
        <div className="lg:col-span-2 h-full min-h-0">
          <div className="glass-panel p-6 rounded-2xl border border-white/60 h-full overflow-y-auto custom-scrollbar">
            <h3 className="font-bold text-gray-800 mb-6 text-lg sticky top-0 bg-white/80 backdrop-blur-md p-2 rounded-lg z-10">سوابق تحصیلی و شغلی</h3>
            
            <div className="relative border-r-2 border-gray-200 mr-3 space-y-8 pb-4">
              
              {/* آیتم ۱ */}
              <div className="relative pr-8">
                <div className="absolute top-0 -right-[9px] w-4 h-4 rounded-full bg-trust-green border-4 border-white shadow-sm"></div>
                <div className="bg-white/50 p-4 rounded-xl border border-white hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-800">تخصص طب فیزیکی و توانبخشی</h4>
                    <span className="text-xs bg-trust-green-light text-trust-green px-2 py-1 rounded-md font-bold">۱۳۹۰ - ۱۳۹۴</span>
                  </div>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <FaGraduationCap className="text-pastel-gold" />
                    دانشگاه علوم پزشکی تهران
                  </p>
                  <p className="text-xs text-gray-400 mt-2">رتبه برتر بورد تخصصی کشور</p>
                </div>
              </div>

              {/* آیتم ۲ */}
              <div className="relative pr-8">
                <div className="absolute top-0 -right-[9px] w-4 h-4 rounded-full bg-pastel-gold border-4 border-white shadow-sm"></div>
                <div className="bg-white/50 p-4 rounded-xl border border-white hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-800">دوره فلوشیپ درد</h4>
                    <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-md font-bold">۱۳۹۶</span>
                  </div>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <FaAward className="text-pastel-gold" />
                    تورنتو، کانادا
                  </p>
                </div>
              </div>

              {/* آیتم ۳ */}
              <div className="relative pr-8">
                <div className="absolute top-0 -right-[9px] w-4 h-4 rounded-full bg-blue-400 border-4 border-white shadow-sm"></div>
                <div className="bg-white/50 p-4 rounded-xl border border-white hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-800">موسس کلینیک درد پردیس</h4>
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-md font-bold">۱۳۹۸ - تاکنون</span>
                  </div>
                  <p className="text-sm text-gray-500 text-justify mt-1">
                    راه اندازی اولین مرکز جامع توانبخشی هوشمند در منطقه...
                  </p>
                </div>
              </div>

               {/* آیتم ۴ (برای تست اسکرول) */}
               <div className="relative pr-8">
                <div className="absolute top-0 -right-[9px] w-4 h-4 rounded-full bg-gray-400 border-4 border-white shadow-sm"></div>
                <div className="bg-white/50 p-4 rounded-xl border border-white hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-800">پزشک عمومی</h4>
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-md font-bold">۱۳۸۵ - ۱۳۹۰</span>
                  </div>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <FaGraduationCap className="text-pastel-gold" />
                    دانشگاه شیراز
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Bio;