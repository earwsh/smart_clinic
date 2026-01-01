import React, { useState } from 'react';
import { FaPoll, FaStar, FaRegStar, FaPaperPlane, FaCheckCircle, FaSmile } from 'react-icons/fa';

const Survey = () => {
  const [submitted, setSubmitted] = useState(false);
  
  // وضعیت امتیازها (پیش‌فرض ۰)
  const [ratings, setRatings] = useState({
    waitingTime: 0,
    doctorBehavior: 0,
    clinicCleanliness: 0,
    treatmentResult: 0
  });

  const [comment, setComment] = useState('');

  // تابع تغییر امتیاز
  const handleRate = (category, rate) => {
    setRatings(prev => ({ ...prev, [category]: rate }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // اینجا در آینده به API وصل می‌شود
    setSubmitted(true);
  };

  // کامپوننت ستاره ساز
  const StarRating = ({ category, value }) => (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleRate(category, star)}
          className={`text-2xl transition-all duration-200 transform hover:scale-125 ${
            star <= value ? 'text-pastel-gold' : 'text-gray-300'
          }`}
        >
          {star <= value ? <FaStar /> : <FaRegStar />}
        </button>
      ))}
    </div>
  );

  // اگر فرم ارسال شده باشد، پیام تشکر نشان بده
  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto mt-20 text-center animate-fade-in">
        <div className="glass-panel p-12 rounded-3xl border border-white/60 flex flex-col items-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-trust-green text-5xl mb-6 shadow-lg animate-bounce-slow">
            <FaCheckCircle />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">نظر شما ثبت شد!</h2>
          <p className="text-gray-500 mb-8">از اینکه وقت گذاشتید و به بهبود خدمات ما کمک کردید متشکریم.</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="text-trust-green font-bold hover:underline"
          >
            بازگشت به نظرسنجی
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-12">
      
      {/* هدر */}
      <div className="glass-panel p-8 rounded-3xl border border-white/60 mb-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-trust-green via-pastel-gold to-trust-green"></div>
        <FaPoll className="text-5xl text-trust-green mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">نظرسنجی خدمات</h2>
        <p className="text-gray-500">نظر شما برای ما ارزشمند است و به بهبود کیفیت درمان کمک می‌کند.</p>
      </div>

      {/* فرم سوالات */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* سوال ۱: زمان انتظار */}
        <div className="glass-panel p-6 rounded-2xl border border-white/60 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-right">
            <h3 className="font-bold text-gray-800 mb-1">مدت زمان انتظار</h3>
            <p className="text-xs text-gray-400">آیا نوبت شما سر وقت انجام شد؟</p>
          </div>
          <StarRating category="waitingTime" value={ratings.waitingTime} />
        </div>

        {/* سوال ۲: برخورد پزشک */}
        <div className="glass-panel p-6 rounded-2xl border border-white/60 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-right">
            <h3 className="font-bold text-gray-800 mb-1">برخورد پزشک و پرسنل</h3>
            <p className="text-xs text-gray-400">نحوه پاسخگویی و راهنمایی چطور بود؟</p>
          </div>
          <StarRating category="doctorBehavior" value={ratings.doctorBehavior} />
        </div>

        {/* سوال ۳: نظافت */}
        <div className="glass-panel p-6 rounded-2xl border border-white/60 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-right">
            <h3 className="font-bold text-gray-800 mb-1">نظافت و محیط مطب</h3>
            <p className="text-xs text-gray-400">آیا محیط انتظار و اتاق درمان تمیز بود؟</p>
          </div>
          <StarRating category="clinicCleanliness" value={ratings.clinicCleanliness} />
        </div>

        {/* باکس توضیحات متنی */}
        <div className="glass-panel p-6 rounded-2xl border border-white/60">
          <label className="block font-bold text-gray-800 mb-3 flex items-center gap-2">
            <FaSmile className="text-pastel-gold" />
            توضیحات تکمیلی (اختیاری)
          </label>
          <textarea
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="اگر پیشنهاد یا انتقادی دارید، اینجا بنویسید..."
            className="w-full bg-white/50 border border-gray-200 rounded-xl p-4 focus:outline-none focus:border-trust-green focus:bg-white transition-all resize-none"
          ></textarea>
        </div>

        {/* دکمه ارسال */}
        <button 
          type="submit"
          className="w-full bg-trust-green text-white font-bold py-4 rounded-xl shadow-lg hover:bg-opacity-90 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 text-lg"
        >
          <FaPaperPlane className="rtl:-rotate-90" />
          ثبت نظر
        </button>

      </form>
    </div>
  );
};

export default Survey;