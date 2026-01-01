import React, { useState } from 'react';
import api from '../../api/axios'; // اینستنس اکسیس شما
import { FaPoll, FaStar, FaRegStar, FaPaperPlane, FaCheckCircle, FaSmile, FaSync } from 'react-icons/fa';

const Survey = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // وضعیت امتیازها و کامنت (آماده برای API)
  const [ratings, setRatings] = useState({
    waitingTime: 0,
    doctorBehavior: 0,
    clinicCleanliness: 0,
    treatmentResult: 0
  });
  const [comment, setComment] = useState('');

  const handleRate = (category, rate) => {
    setRatings(prev => ({ ...prev, [category]: rate }));
  };

  // تابع ارسال نظرسنجی به سرور (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // اعتبارسنجی اولیه: حداقل یک مورد باید امتیازدهی شده باشد
    if (Object.values(ratings).every(v => v === 0)) {
      alert("لطفاً حداقل به یکی از موارد امتیاز دهید.");
      return;
    }

    try {
      setLoading(true);
      const surveyPayload = {
        ...ratings,
        comment,
        submittedAt: new Date().toISOString()
      };
      
      // ارسال داده‌ها به بک‌اِند
      await api.post('/patient/survey', surveyPayload);

      setSubmitted(true);
      setLoading(false);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "خطا در ثبت نظر. لطفا دوباره تلاش کنید.";
      alert(errorMsg);
      setLoading(false);
    }
  };

  const StarRating = ({ category, value }) => (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleRate(category, star)}
          className={`text-2xl transition-all duration-300 transform hover:scale-125 ${
            star <= value ? 'text-trust-green shadow-trust-green/10' : 'text-gray-200'
          }`}
        >
          {star <= value ? <FaStar /> : <FaRegStar />}
        </button>
      ))}
    </div>
  );

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto mt-20 text-center animate-fade-in p-4">
        <div className="bg-white p-12 rounded-[40px] border border-gray-100 flex flex-col items-center shadow-sm">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-trust-green text-5xl mb-6 shadow-inner animate-bounce-slow">
            <FaCheckCircle />
          </div>
          <h2 className="text-3xl font-black text-gray-800 mb-4 italic tracking-tight">Your feedback is recorded!</h2>
          <p className="text-gray-400 font-bold mb-10 leading-loose italic">سپاسگزاریم. نظرات شما مستقیماً توسط تیم مدیریت بررسی شده و به ما در ارتقای کیفیت درمان کمک می‌کند.</p>
          <button 
            onClick={() => { setSubmitted(false); setRatings({waitingTime:0, doctorBehavior:0, clinicCleanliness:0, treatmentResult:0}); setComment(''); }}
            className="bg-gray-900 text-white px-12 py-5 rounded-[22px] font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:bg-black transition-all active:scale-95 italic"
          >
            Submit Another Feedback
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-12 px-4 bg-[#FDFBF7]">
      
      {/* هدر نظرسنجی */}
      <div className="bg-white p-12 rounded-[50px] border border-gray-50 mb-10 text-center relative overflow-hidden shadow-sm">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-trust-green via-emerald-400 to-trust-green"></div>
        <div className="w-24 h-24 bg-green-50 rounded-[35px] flex items-center justify-center mx-auto mb-8 text-trust-green shadow-inner">
           <FaPoll size={40} />
        </div>
        <h2 className="text-3xl font-black text-gray-800 mb-4 italic uppercase tracking-tighter">Experience Survey</h2>
        <p className="text-gray-400 font-bold text-sm italic">نظر شما، نقشه راه ما برای بهبود سلامت جامعه است.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* دسته‌بندی‌های امتیازدهی */}
        {[
          { key: 'waitingTime', label: 'Waiting Experience', sub: 'آیا نوبت شما مطابق زمان اعلام شده انجام شد؟' },
          { key: 'doctorBehavior', label: 'Staff & Physician Conduct', sub: 'میزان رضایت از نحوه پاسخگویی و راهنمایی پرسنل' },
          { key: 'clinicCleanliness', label: 'Sanitation & Hygiene', sub: 'آیا محیط انتظار و اتاق‌های معاینه از نظر بهداشتی مطلوب بود؟' },
          { key: 'treatmentResult', label: 'Treatment Effectiveness', sub: 'میزان اثربخشی مشاوره‌ها و اقدامات درمانی اولیه' },
        ].map((item) => (
          <div key={item.key} className="bg-white p-10 rounded-[35px] border border-gray-50 flex flex-col md:flex-row justify-between items-center gap-8 hover:shadow-xl transition-all group">
            <div className="text-center md:text-right">
              <h3 className="font-black text-gray-800 mb-2 group-hover:text-trust-green transition-colors italic">{item.label}</h3>
              <p className="text-[11px] text-gray-400 font-bold italic tracking-wide">{item.sub}</p>
            </div>
            <StarRating category={item.key} value={ratings[item.key]} />
          </div>
        ))}

        {/* توضیحات تکمیلی */}
        <div className="bg-white p-10 rounded-[45px] border border-gray-50 shadow-sm">
          <label className="block font-black text-gray-800 mb-6 flex items-center gap-4 italic uppercase tracking-widest text-xs">
            <FaSmile className="text-pastel-gold" /> Additional Comments & Suggestions
          </label>
          <textarea
            rows="5"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="هرگونه پیشنهاد یا انتقادی که به ما در ارائه خدمات بهتر کمک می‌کند را اینجا بنویسید..."
            className="w-full bg-gray-50 border border-transparent rounded-[32px] p-8 font-bold text-gray-700 focus:bg-white focus:border-trust-green/20 focus:ring-4 focus:ring-trust-green/5 transition-all outline-none resize-none leading-relaxed italic"
          ></textarea>
        </div>

        {/* دکمه ارسال نهایی */}
        <button 
          type="submit"
          disabled={loading}
          className={`w-full py-6 rounded-[28px] font-black text-xs uppercase tracking-[0.3em] shadow-2xl transition-all flex items-center justify-center gap-5 italic ${loading ? 'bg-gray-100 text-gray-400' : 'bg-trust-green text-white hover:bg-emerald-700 hover:-translate-y-1 active:scale-95 shadow-green-100'}`}
        >
          {loading ? (
            <FaSync className="animate-spin" />
          ) : (
            <>
              <FaPaperPlane className="rtl:-rotate-90 text-sm" />
              Submit and Complete Survey
            </>
          )}
        </button>

      </form>
    </div>
  );
};

export default Survey;