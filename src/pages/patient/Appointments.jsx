import React, { useState } from 'react';
import { FaCalendarAlt, FaClock, FaChevronLeft, FaCheckCircle, FaShieldAlt } from 'react-icons/fa';

const Appointments = () => {
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const months = [
    { name: 'دی', year: '۱۴۰۴', days: 30, startOffset: 2 },
    { name: 'بهمن', year: '۱۴۰۴', days: 30, startOffset: 4 },
    { name: 'اسفند', year: '۱۴۰۴', days: 29, startOffset: 6 },
  ];

  const timeSlots = ["16:00", "16:30", "17:00", "17:30", "18:00", "18:30"];

  return (
    <div className="max-w-6xl mx-auto animate-fade-in pb-10">
      
      {/* هدر */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center mb-6 border border-white/60 shadow-sm">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaCalendarAlt className="text-trust-green" /> {/* آیکون تقویم هم سبز شد */}
            نوبت‌دهی آنلاین
          </h2>
          <p className="text-gray-500 text-sm mt-1">انتخاب هوشمند زمان بر اساس برنامه پزشک</p>
        </div>
        
        <div className="bg-trust-green-light text-trust-green px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 border border-green-200 shadow-sm">
          <span className="w-2 h-2 bg-trust-green rounded-full animate-pulse"></span>
          <FaShieldAlt className="text-lg" />
          سیستم متصل و ایمن
        </div>
      </div>

      {/* انتخابگر ماه - اصلاح شده با رنگ سبز */}
      <div className="glass-panel p-4 rounded-2xl mb-6 overflow-x-auto">
        <div className="flex gap-4 min-w-max px-2">
          {months.map((m, index) => (
            <button
              key={index}
              onClick={() => { setSelectedMonth(index); setSelectedDay(null); }}
              className={`
                flex flex-col items-center justify-center p-4 w-32 rounded-xl transition-all duration-300 cursor-pointer border
                ${selectedMonth === index 
                  ? 'bg-trust-green text-white shadow-lg transform scale-105 border-trust-green' // تغییر به سبز تیره
                  : 'bg-white text-gray-600 border-gray-100 hover:border-trust-green hover:shadow-md'
                }
              `}
            >
              <span className="text-lg font-bold">{m.name}</span>
              <span className="text-xs opacity-80">{m.year}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* تقویم - اصلاح شده با رنگ سبز */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/60">
          <h3 className="font-bold text-gray-700 mb-4 border-b border-gray-100 pb-2">
            روزهای ماه ({months[selectedMonth].name} {months[selectedMonth].year})
          </h3>
          
          <div className="grid grid-cols-7 gap-2 mb-4 text-center text-sm font-bold text-gray-400">
            <div>ش</div><div>ی</div><div>د</div><div>س</div><div>چ</div><div>پ</div><div>ج</div>
          </div>

          <div className="grid grid-cols-7 gap-2 md:gap-3">
            {Array.from({ length: months[selectedMonth].startOffset }).map((_, i) => (
              <div key={`empty-${i}`} className="p-2"></div>
            ))}

            {Array.from({ length: months[selectedMonth].days }).map((_, i) => {
              const dayNum = i + 1;
              const isFriday = (months[selectedMonth].startOffset + i) % 7 === 6; 
              
              return (
                <button
                  key={dayNum}
                  disabled={isFriday}
                  onClick={() => setSelectedDay(dayNum)}
                  className={`
                    p-3 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-200 border-2
                    ${isFriday 
                      ? 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed' 
                      : selectedDay === dayNum
                        ? 'bg-trust-green border-trust-green text-white shadow-md transform scale-105' // تغییر به سبز تیره
                        : 'bg-white border-green-50 text-gray-700 hover:border-trust-green hover:text-trust-green hover:bg-trust-green-light'
                    }
                  `}
                >
                  {dayNum}
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap gap-4 text-xs text-gray-500 border-t border-gray-100 pt-4">
            <div className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-white border border-trust-green"></span> دارای ظرفیت</div>
            {/* اصلاح رنگ راهنما */}
            <div className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-trust-green"></span> انتخاب شده</div>
            <div className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-gray-100 border border-gray-200"></span> تعطیل/پر</div>
          </div>
        </div>

        {/* لیست ساعت‌ها - سبز شده */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col h-full bg-white/80 border border-white/60">
          <div className="text-center mb-6">
            <span className="block text-gray-400 text-sm">نوبت‌های موجود برای</span>
            <span className="block text-xl font-bold text-trust-green mt-1 h-8"> {/* تغییر رنگ متن تاریخ */}
              {selectedDay ? `${selectedDay} ${months[selectedMonth].name}` : '...'}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2 max-h-[400px]">
            {!selectedDay ? (
              <div className="text-center text-gray-400 mt-10 flex flex-col items-center">
                <FaChevronLeft className="mb-2 animate-bounce-slow" />
                لطفاً یک روز را انتخاب کنید
              </div>
            ) : (
              timeSlots.map((time, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSlot(time)}
                  className={`
                    w-full p-3 border rounded-xl flex justify-between items-center transition-all duration-200 group
                    ${selectedSlot === time
                      ? 'bg-trust-green text-white border-trust-green shadow-md'
                      : 'bg-white border-gray-100 hover:border-trust-green hover:bg-trust-green-light text-gray-600'
                    }
                  `}
                >
                  <span className="font-bold flex items-center gap-2">
                    <FaClock className={selectedSlot === time ? 'text-white' : 'text-trust-green'} />
                    {time}
                  </span>
                  {selectedSlot === time && <FaCheckCircle />}
                </button>
              ))
            )}
          </div>

          <button 
            className={`
              w-full mt-4 font-bold py-3 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2
              ${selectedDay && selectedSlot 
                ? 'bg-trust-green text-white hover:bg-opacity-90 translate-y-0 opacity-100' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed translate-y-4 opacity-0'
              }
            `}
          >
            <FaCheckCircle />
            ثبت نهایی نوبت
          </button>
        </div>

      </div>
    </div>
  );
};

export default Appointments;