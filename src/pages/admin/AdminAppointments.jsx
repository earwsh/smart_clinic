import React, { useState } from 'react';
import { 
  FaCalendarAlt, 
  FaPlus, 
  FaGlobe, 
  FaPhoneAlt, 
  FaTrashAlt,
  FaCog,
  FaClock,
  FaUser,
  FaChevronLeft,
  FaChevronRight,
  FaFileMedical,
  FaTimes,
  FaCheckCircle,
  FaSave,
  FaPen
} from 'react-icons/fa';

const AdminAppointments = () => {
  // --- مدیریت استیت‌ها ---
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('1404-10-18');

  // استیت‌های مودال ثبت نوبت
  const [bookingDate, setBookingDate] = useState('1404-10-18');
  const [selectedSlot, setSelectedSlot] = useState(null);

  // داده‌های نوبت‌ها (Dummy Data)
  const [appointments, setAppointments] = useState([
    { id: 1, patient: 'علی رضایی', service: 'ویزیت حضوری', time: '16:00', status: 'booked', source: 'online', phone: '09121111111', avatar: 'https://ui-avatars.com/api/?name=Ali+Rezaei&background=E3F2FD' },
    { id: 2, patient: 'مریم کمالی', service: 'مشاوره تلفنی', time: '16:30', status: 'booked', source: 'phone', phone: '09122222222', avatar: 'https://ui-avatars.com/api/?name=Maryam+Kamali&background=F3E5F5' },
    { id: 3, patient: 'حسین احمدی', service: 'نوار عصب', time: '17:15', status: 'cancelled', source: 'online', phone: '09123333333', avatar: 'https://ui-avatars.com/api/?name=Hossein+Ahmadi&background=E8F5E9' },
    { id: 4, patient: 'سارا نبوی', service: 'تزریق مفصل', time: '18:00', status: 'booked', source: 'phone', phone: '09124444444', avatar: 'https://ui-avatars.com/api/?name=Sara+Nabavi&background=FFF3E0' },
  ]);

  // تنظیمات برنامه کاری (Dummy Schedule)
  const [schedule, setSchedule] = useState({
    'شنبـه':      { active: true,  start: '16:00', end: '20:00', interval: 30 },
    'یکشنبـه':    { active: true,  start: '16:00', end: '20:00', interval: 30 },
    'دوشنبـه':    { active: true,  start: '16:00', end: '20:00', interval: 30 },
    'سه‌شنبـه':   { active: true,  start: '13:00', end: '19:00', interval: 30 },
    'چهارشنبـه':  { active: true,  start: '16:00', end: '20:00', interval: 30 },
    'پنج‌شنبـه':  { active: false, start: '09:00', end: '13:00', interval: 20 },
    'جمعـه':      { active: false, start: '00:00', end: '00:00', interval: 0 },
  });

  // --- توابع کمکی ---
  const handleCancel = (id) => {
    if (window.confirm("آیا نوبت لغو شود؟")) {
      setAppointments(prev => prev.map(app => app.id === id ? { ...app, status: 'cancelled' } : app));
    }
  };

  const handleScheduleChange = (day, field, value) => {
    setSchedule(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }));
  };

  // تولید اسلات‌های زمانی برای مودال ثبت نوبت
  const generateSlotsForDate = (dateString) => {
    // برای دمو فرض می‌کنیم تنظیمات سه‌شنبه را می‌خواند
    const daySettings = schedule['سه‌شنبـه']; 
    if (!daySettings.active) return [];

    let slots = [];
    const toMinutes = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
    const toTimeStr = (m) => { const h = Math.floor(m / 60); const min = m % 60; return `${h.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`; };
    
    let current = toMinutes(daySettings.start);
    const end = toMinutes(daySettings.end);

    while (current < end) {
      const timeLabel = toTimeStr(current);
      const isTaken = appointments.some(app => app.time === timeLabel && app.status !== 'cancelled'); // شرط ساده شده برای دمو
      slots.push({ time: timeLabel, taken: isTaken });
      current += parseInt(daySettings.interval);
    }
    return slots;
  };

  return (
    <div className="h-[calc(100vh-100px)] animate-fade-in flex flex-col lg:flex-row gap-6 p-2">
      
      {/* ========================================================= */}
      {/* ستون چپ: لیست نوبت‌ها (بخش اصلی)                          */}
      {/* ========================================================= */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-transparent">
        
        {/* هدر لیست */}
        <div className="flex justify-between items-center mb-4 px-2">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="w-3 h-3 bg-trust-green rounded-full animate-pulse"></span>
              لیست مراجعین امروز
            </h2>
            <p className="text-xs text-gray-400 mt-1">۴ نوبت ثبت شده برای {selectedDate}</p>
          </div>
          <div className="hidden sm:block bg-white px-4 py-2 rounded-xl text-sm font-bold text-gray-600 border border-gray-100 shadow-sm">
            شروع نوبت‌دهی: ۱۶:۰۰
          </div>
        </div>

        {/* لیست کارت‌ها */}
        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2 pb-20">
          {appointments.map((app) => (
            <div 
              key={app.id} 
              className={`
                relative bg-white p-5 rounded-[24px] border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-trust-green/30 group
                ${app.status === 'cancelled' ? 'opacity-60 bg-gray-50' : ''}
              `}
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                
                {/* 1. ساعت (بزرگ و بولد) */}
                <div className="flex flex-col items-center justify-center min-w-[90px] md:border-l border-gray-100 pl-0 md:pl-6 h-full border-b md:border-b-0 pb-4 md:pb-0 mb-4 md:mb-0 w-full md:w-auto">
                  <span className="text-3xl font-black text-gray-800 font-mono tracking-tighter">{app.time}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md mt-1 ${app.status === 'cancelled' ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-600'}`}>
                    {app.status === 'cancelled' ? 'لغو شده' : 'فعال'}
                  </span>
                </div>

                {/* 2. اطلاعات بیمار */}
                <div className="flex-1 w-full text-center md:text-right">
                  <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 mb-2">
                    <img src={app.avatar} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" alt="" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{app.patient}</h3>
                      <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
                        {/* بج منبع */}
                        {app.source === 'online' ? (
                          <span className="flex items-center gap-1 text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md font-bold border border-blue-100">
                            <FaGlobe /> سایت
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] bg-purple-50 text-purple-600 px-2 py-0.5 rounded-md font-bold border border-purple-100">
                            <FaPhoneAlt /> تلفنی
                          </span>
                        )}
                        <span className="text-[10px] text-gray-400">|</span>
                        <span className="text-[10px] text-gray-500 font-bold">{app.service}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-500 mt-3 md:mt-1 bg-gray-50 md:bg-transparent p-2 md:p-0 rounded-lg">
                    <span className="flex items-center gap-1"><FaPhoneAlt className="text-gray-300 text-xs" /> <span className="dir-ltr">{app.phone}</span></span>
                  </div>
                </div>

                {/* 3. دکمه‌ها */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-center mt-2 md:mt-0">
                  <button 
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-gray-600 font-bold text-sm hover:bg-trust-green hover:text-white transition-all shadow-sm border border-gray-200 hover:border-trust-green"
                    title="مشاهده جزئیات پرونده"
                  >
                    <FaFileMedical />
                    <span className="hidden xl:inline">مشاهده پرونده</span>
                  </button>
                  
                  {app.status !== 'cancelled' && (
                    <button 
                      onClick={() => handleCancel(app.id)}
                      className="p-3 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all border border-red-100 group/trash"
                      title="لغو نوبت"
                    >
                      <FaTrashAlt className="group-hover/trash:shake" />
                    </button>
                  )}
                </div>

              </div>
            </div>
          ))}
          
          {appointments.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              هنوز نوبتی برای امروز ثبت نشده است.
            </div>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* ستون راست: پنل ابزار (تقویم و دکمه‌ها)                    */}
      {/* ========================================================= */}
      <div className="w-full lg:w-[320px] xl:w-[350px] flex flex-col gap-6 shrink-0 order-first lg:order-last">
        
        {/* 1. تقویم کوچک */}
        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 text-center">
          <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-2 mb-6">
            <button className="p-2 hover:bg-white rounded-xl transition-all shadow-sm text-gray-400 hover:text-gray-800"><FaChevronRight /></button>
            <span className="font-bold text-gray-800 text-sm">دی ماه ۱۴۰۴</span>
            <button className="p-2 hover:bg-white rounded-xl transition-all shadow-sm text-gray-400 hover:text-gray-800"><FaChevronLeft /></button>
          </div>
          
          <div className="grid grid-cols-7 gap-2 mb-2 text-xs text-gray-400 font-bold">
            <span>ش</span><span>ی</span><span>د</span><span>س</span><span>چ</span><span>پ</span><span>ج</span>
          </div>
          <div className="grid grid-cols-7 gap-2">
             {[...Array(30)].map((_, i) => (
               <button 
                key={i} 
                className={`
                  w-8 h-8 rounded-lg text-sm font-bold flex items-center justify-center transition-all
                  ${i+1 === 18 ? 'bg-trust-green text-white shadow-lg shadow-green-500/30' : 'text-gray-600 hover:bg-gray-100'}
                `}
               >
                 {i+1}
               </button>
             ))}
          </div>
        </div>

        {/* 2. عملیات سریع */}
        <div className="bg-gray-800 text-white p-6 rounded-[32px] shadow-xl shadow-gray-400/20 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          
          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-1 flex items-center gap-2"><FaCog className="text-pastel-gold" /> پنل مدیریت</h3>
            <p className="text-xs text-gray-400 mb-6">دسترسی سریع به تنظیمات</p>
            
            <button 
              onClick={() => setShowBookingModal(true)}
              className="w-full bg-trust-green hover:bg-emerald-600 text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg transition-all transform hover:-translate-y-1 group"
            >
              <div className="bg-white/20 p-2 rounded-lg group-hover:rotate-90 transition-transform"><FaPlus /></div>
              ثبت نوبت دستی
            </button>

            <button 
              onClick={() => setShowSettingsModal(true)}
              className="w-full bg-white/10 hover:bg-white/20 text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all mt-2 border border-white/10"
            >
              <FaClock />
              ساعات کاری
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* مودال ۱: ثبت نوبت دستی (Grid View)                        */}
      {/* ========================================================= */}
      {showBookingModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#F3F4F6] w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[600px] animate-fade-in relative">
            
            <button onClick={() => setShowBookingModal(false)} className="lg:hidden absolute top-4 left-4 z-50 bg-white p-2 rounded-full shadow-md text-gray-600"><FaTimes /></button>

            {/* ستون راست (ساعت‌ها) */}
            <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaCalendarAlt className="text-trust-green" /> ثبت نوبت جدید
              </h3>
              
              <div className="flex items-center gap-3 mb-6 bg-white p-3 rounded-2xl shadow-sm border border-gray-200 w-fit">
                  <span className="font-bold text-gray-500 text-sm">تاریخ:</span>
                  <input type="date" value={bookingDate} onChange={(e) => {setBookingDate(e.target.value); setSelectedSlot(null);}} className="font-bold text-gray-800 outline-none bg-transparent" />
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 pb-24 lg:pb-0">
                {generateSlotsForDate(bookingDate).map((slot, idx) => (
                  <button
                    key={idx}
                    disabled={slot.taken}
                    onClick={() => setSelectedSlot(slot.time)}
                    className={`
                      relative h-16 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 border
                      ${slot.taken 
                        ? 'bg-gray-100 border-gray-200 text-gray-300 cursor-not-allowed' 
                        : selectedSlot === slot.time
                          ? 'bg-trust-green border-trust-green text-white shadow-xl scale-105 z-10 ring-4 ring-green-100'
                          : 'bg-white border-gray-200 text-gray-600 hover:border-trust-green hover:shadow-md'
                      }
                    `}
                  >
                    <span className="font-bold text-lg font-mono">{slot.time}</span>
                    {selectedSlot === slot.time && <FaCheckCircle className="absolute -top-2 -right-2 text-white bg-green-600 rounded-full" />}
                  </button>
                ))}
              </div>
            </div>

            {/* ستون چپ (فرم) */}
            <div className={`
                w-full lg:w-96 bg-white border-t lg:border-t-0 lg:border-r border-gray-200 p-8 flex flex-col shadow-2xl z-20 
                fixed lg:relative bottom-0 left-0 right-0 lg:bottom-auto rounded-t-3xl lg:rounded-none transition-transform duration-300
                ${!selectedSlot ? 'translate-y-full lg:translate-y-0 lg:translate-x-full lg:hidden' : 'translate-y-0 lg:translate-x-0'}
            `}>
                <div className="flex-1">
                   <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                      <h4 className="text-xl font-bold text-gray-800">اطلاعات بیمار</h4>
                      <span className="bg-green-50 text-trust-green px-3 py-1 rounded-lg font-mono font-bold text-lg border border-green-100">{selectedSlot}</span>
                   </div>
                   <div className="space-y-5">
                     <div><label className="block text-xs font-bold text-gray-500 mb-2">نام و نام خانوادگی</label><input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 font-bold text-gray-700 focus:bg-white focus:border-trust-green outline-none transition-all" /></div>
                     <div><label className="block text-xs font-bold text-gray-500 mb-2">شماره تماس</label><input type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 font-bold text-gray-700 focus:bg-white focus:border-trust-green outline-none transition-all dir-ltr text-right" /></div>
                   </div>
                </div>
                <button onClick={() => {alert('ثبت شد'); setShowBookingModal(false)}} className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-gray-800 transition-all text-lg flex items-center justify-center gap-2 mt-4"><FaSave /> ثبت نهایی</button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* مودال ۲: تنظیمات ساعت کاری (Table Layout)                 */}
      {/* ========================================================= */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-4xl flex flex-col overflow-hidden animate-fade-in shadow-2xl">
             <div className="bg-gray-50 p-6 border-b border-gray-200 flex justify-between items-center">
              <div><h3 className="font-bold text-xl text-gray-800 flex items-center gap-2"><FaCog className="text-gray-500" /> تنظیم برنامه هفتگی</h3></div>
              <button onClick={() => setShowSettingsModal(false)} className="bg-white p-2 rounded-full shadow-sm text-gray-500 hover:text-red-500 transition-colors"><FaTimes /></button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar max-h-[70vh]">
              <div className="hidden md:grid grid-cols-12 gap-4 mb-4 px-4 text-xs font-bold text-gray-400 border-b pb-2">
                <div className="col-span-3">روز هفته</div>
                <div className="col-span-2">وضعیت</div>
                <div className="col-span-2">شروع</div>
                <div className="col-span-2">پایان</div>
                <div className="col-span-3">مدت نوبت</div>
              </div>

              <div className="space-y-2">
                {Object.keys(schedule).map((day) => (
                  <div key={day} className={`p-4 rounded-2xl border transition-all ${schedule[day].active ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-100 opacity-60'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      <div className="col-span-3 font-bold text-gray-800">{day}</div>
                      <div className="col-span-2">
                         <input type="checkbox" checked={schedule[day].active} onChange={(e) => handleScheduleChange(day, 'active', e.target.checked)} className="w-5 h-5 accent-trust-green cursor-pointer" />
                      </div>
                      {schedule[day].active && (
                        <>
                          <div className="col-span-2"><input type="time" value={schedule[day].start} onChange={(e) => handleScheduleChange(day, 'start', e.target.value)} className="w-full bg-gray-50 border rounded-lg p-2 text-center" /></div>
                          <div className="col-span-2"><input type="time" value={schedule[day].end} onChange={(e) => handleScheduleChange(day, 'end', e.target.value)} className="w-full bg-gray-50 border rounded-lg p-2 text-center" /></div>
                          <div className="col-span-3">
                             <select className="w-full bg-gray-50 border rounded-lg p-2"><option>۳۰ دقیقه</option><option>۲۰ دقیقه</option></select>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end">
               <button onClick={() => setShowSettingsModal(false)} className="bg-gray-900 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-gray-800 transition-all flex items-center gap-2"><FaSave /> ذخیره تغییرات</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminAppointments;