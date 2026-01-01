import React, { useState, useEffect } from 'react';
import api from '../../api/axios'; // اینستنس اکسیس شما
import { FaCalendarAlt, FaClock, FaChevronLeft, FaCheckCircle, FaShieldAlt, FaSync } from 'react-icons/fa';

const Appointments = () => {
  // --- States for API Integration ---
  const [loading, setLoading] = useState(true);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [availableDays, setAvailableDays] = useState([]); // روزهای دارای ظرفیت از بک‌اِند
  const [timeSlots, setTimeSlots] = useState([]); // ساعت‌های موجود برای روز انتخاب شده
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const months = [
    { name: 'دی', year: '۱۴۰۴', days: 30, startOffset: 2 },
    { name: 'بهمن', year: '۱۴۰۴', days: 30, startOffset: 4 },
    { name: 'اسفند', year: '۱۴۰۴', days: 29, startOffset: 6 },
  ];

  // ۱. دریافت روزهای دارای ظرفیت در ماه انتخاب شده (GET)
  useEffect(() => {
    const fetchMonthAvailability = async () => {
      try {
        setLoading(true);
        // ارسال نام ماه یا شماره ماه به سرور
        const response = await api.get('/appointments/availability', {
          params: { month: months[selectedMonth].name, year: months[selectedMonth].year }
        });
        setAvailableDays(response.data); // انتظار می‌رود آرایه‌ای از اعداد باشد: [1, 5, 8]
        setLoading(false);
      } catch (err) {
        console.error("Error fetching availability:", err);
        setLoading(false);
      }
    };
    fetchMonthAvailability();
  }, [selectedMonth]);

  // ۲. دریافت ساعت‌های خالی برای روز انتخاب شده (GET)
  useEffect(() => {
    if (!selectedDay) return;
    const fetchTimeSlots = async () => {
      try {
        setSlotsLoading(true);
        const response = await api.get('/appointments/slots', {
          params: { 
            day: selectedDay, 
            month: months[selectedMonth].name,
            year: months[selectedMonth].year 
          }
        });
        setTimeSlots(response.data); // آرایه‌ای از استرینگ‌ها: ["16:00", "16:30"]
        setSlotsLoading(false);
      } catch (err) {
        console.error("Error fetching slots:", err);
        setSlotsLoading(false);
      }
    };
    fetchTimeSlots();
  }, [selectedDay, selectedMonth]);

  // ۳. ثبت نهایی نوبت در دیتابیس (POST)
  const handleFinalBooking = async () => {
    if (!selectedDay || !selectedSlot) return;
    
    try {
      setSlotsLoading(true);
      const bookingPayload = {
        day: selectedDay,
        month: months[selectedMonth].name,
        year: months[selectedMonth].year,
        time: selectedSlot,
        service: 'General Visit' // می‌تواند از یک استیت دیگر بیاید
      };

      const response = await api.post('/appointments/book', bookingPayload);
      
      alert(`نوبت شما با موفقیت برای تاریخ ${selectedDay} ${months[selectedMonth].name} ثبت گردید.`);
      // هدایت کاربر به داشبورد یا صفحه نوبت‌های من
      setSlotsLoading(false);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "متاسفانه این نوبت در همین لحظه توسط شخص دیگری رزرو شد.";
      alert(errorMsg);
      setSlotsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in pb-10 px-4 bg-[#FDFBF7]">
      
      {/* هدر بخش نوبت‌دهی */}
      <div className="glass-panel p-8 rounded-3xl flex flex-col md:flex-row justify-between items-center mb-8 border border-white/80 shadow-sm">
        <div className="text-center md:text-right mb-6 md:mb-0">
          <h2 className="text-2xl font-black text-gray-800 flex items-center justify-center md:justify-start gap-3">
            <FaCalendarAlt className="text-trust-green" /> نوبت‌دهی آنلاین
          </h2>
          <p className="text-gray-500 text-sm mt-2 font-medium italic">Smart scheduling based on physician availability</p>
        </div>
        
        <div className="bg-trust-green/5 text-trust-green px-6 py-3 rounded-2xl text-xs font-black flex items-center gap-3 border border-trust-green/10">
          <span className="w-2.5 h-2.5 bg-trust-green rounded-full animate-ping"></span>
          <FaShieldAlt className="text-lg" /> Secure Booking System
        </div>
      </div>

      {/* انتخابگر ماه */}
      <div className="bg-white p-5 rounded-[32px] mb-8 overflow-x-auto shadow-sm border border-gray-50">
        <div className="flex gap-4 min-w-max px-2">
          {months.map((m, index) => (
            <button
              key={index}
              onClick={() => { setSelectedMonth(index); setSelectedDay(null); setSelectedSlot(null); }}
              className={`flex flex-col items-center justify-center p-5 w-36 rounded-2xl transition-all duration-300 border-2 ${
                selectedMonth === index 
                ? 'bg-trust-green text-white shadow-xl shadow-green-100 border-trust-green scale-105' 
                : 'bg-gray-50 text-gray-500 border-transparent hover:bg-white hover:border-trust-green/30'
              }`}
            >
              <span className="text-lg font-black italic">{m.name}</span>
              <span className="text-[10px] font-bold opacity-70 tracking-widest mt-1 uppercase">{m.year}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* بخش تقویم ماهانه */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-gray-50 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
             <h3 className="font-black text-gray-800 italic">Select Visit Date</h3>
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">{months[selectedMonth].name} {months[selectedMonth].year}</span>
          </div>
          
          <div className="grid grid-cols-7 gap-4 mb-6 text-center text-[11px] font-black text-gray-300 uppercase italic">
            <div>Sat</div><div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div className="text-red-300">Fri</div>
          </div>

          <div className="grid grid-cols-7 gap-3">
            {Array.from({ length: months[selectedMonth].startOffset }).map((_, i) => (
              <div key={`empty-${i}`} className="p-2"></div>
            ))}

            {loading ? (
               <div className="col-span-7 py-20 flex flex-col items-center justify-center text-gray-300 gap-3">
                  <FaSync className="animate-spin text-2xl" />
                  <span className="text-[10px] font-black uppercase italic">Syncing Calendar...</span>
               </div>
            ) : (
              Array.from({ length: months[selectedMonth].days }).map((_, i) => {
                const dayNum = i + 1;
                const isFriday = (months[selectedMonth].startOffset + i) % 7 === 6; 
                const hasCapacity = availableDays.includes(dayNum);
                
                return (
                  <button
                    key={dayNum}
                    disabled={isFriday || !hasCapacity}
                    onClick={() => { setSelectedDay(dayNum); setSelectedSlot(null); }}
                    className={`h-12 md:h-14 rounded-2xl flex items-center justify-center font-black text-sm transition-all duration-300 border-2 ${
                      isFriday || !hasCapacity
                        ? 'bg-gray-50 border-transparent text-gray-200 cursor-not-allowed opacity-40' 
                        : selectedDay === dayNum
                          ? 'bg-trust-green border-trust-green text-white shadow-lg scale-110 z-10' 
                          : 'bg-white border-gray-50 text-gray-700 hover:border-trust-green hover:text-trust-green hover:bg-green-50/30 shadow-sm'
                    }`}
                  >
                    {dayNum}
                  </button>
                );
              })
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-6 text-[9px] font-black text-gray-400 border-t border-gray-50 pt-6 uppercase italic tracking-widest">
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-md bg-white border-2 border-trust-green"></span> Available</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-md bg-trust-green shadow-sm"></span> Selected</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-md bg-gray-100"></span> Fully Booked</div>
          </div>
        </div>

        {/* بخش انتخاب ساعت */}
        <div className="bg-white p-8 rounded-[40px] flex flex-col h-fit border border-gray-50 shadow-sm relative overflow-hidden min-h-[450px]">
          <div className="text-center mb-8">
            <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] italic">Daily Schedule</span>
            <span className="block text-2xl font-black text-trust-green mt-3 h-10 italic">
              {selectedDay ? `${selectedDay} ${months[selectedMonth].name}` : '---'}
            </span>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar pr-1">
            {!selectedDay ? (
              <div className="text-center text-gray-300 py-16 flex flex-col items-center gap-5">
                <div className="w-16 h-16 bg-gray-50 rounded-[24px] flex items-center justify-center shadow-inner">
                   <FaChevronLeft className="animate-bounce-slow text-xl text-gray-200" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest italic pr-6 text-center">Please select a date <br/> to see available slots</span>
              </div>
            ) : slotsLoading ? (
               <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-300 font-black italic text-xs uppercase">
                  <FaSync className="animate-spin text-xl" />
                  Loading Slots...
               </div>
            ) : (
              timeSlots.map((time, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSlot(time)}
                  className={`w-full p-4 border rounded-[22px] flex justify-between items-center transition-all duration-300 font-bold ${
                    selectedSlot === time
                      ? 'bg-trust-green text-white border-trust-green shadow-xl scale-[0.98]'
                      : 'bg-gray-50 border-transparent hover:border-trust-green/30 text-gray-600 hover:bg-white shadow-sm'
                  }`}
                >
                  <span className="flex items-center gap-4 font-mono tracking-tighter text-lg italic">
                    <FaClock className={selectedSlot === time ? 'text-white' : 'text-trust-green/40'} />
                    {time}
                  </span>
                  {selectedSlot === time && <FaCheckCircle className="animate-fade-in" />}
                </button>
              ))
            )}
          </div>

          <button 
            onClick={handleFinalBooking}
            disabled={!selectedDay || !selectedSlot || slotsLoading}
            className={`w-full mt-10 font-black py-5 rounded-[24px] shadow-2xl transition-all duration-500 flex items-center justify-center gap-4 text-xs uppercase italic tracking-widest ${
              selectedDay && selectedSlot 
                ? 'bg-gray-900 text-white shadow-gray-300 hover:bg-black active:scale-95' 
                : 'bg-gray-50 text-gray-200 cursor-not-allowed border border-gray-100'
            }`}
          >
            {slotsLoading ? <FaSync className="animate-spin" /> : <FaCheckCircle className="text-lg" />}
            Confirm Appointment
          </button>
          
          <div className="mt-6 text-center">
             <p className="text-[9px] text-gray-300 font-black leading-relaxed px-6 uppercase italic tracking-tighter">By confirming, you agree to our clinic policy regarding arrival time and cancellations.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Appointments;