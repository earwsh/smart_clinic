import React, { useState } from 'react';
import { 
  FaUserCheck, FaCashRegister, FaCalendarPlus, FaMapMarkerAlt, 
  FaBirthdayCake, FaArrowRight, FaClock, FaCheckCircle, FaTimes 
} from 'react-icons/fa';

const AdminReception = () => {
  const [showPanel, setShowPanel] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isPaid, setIsPaid] = useState(false);

  const [todayQueue, setTodayQueue] = useState([
    { id: 101, name: 'حسین احمدی', time: '16:00', source: 'سایت', status: 'waiting' },
    { id: 102, name: 'مریم کمالی', time: '16:30', source: 'تلفنی', status: 'waiting' },
    { id: 103, name: 'رضا علوی', time: '17:15', source: 'دکتریاب', status: 'waiting' },
  ]);

  const handleOpenPanel = (patient) => {
    setSelectedPatient(patient);
    setIsPaid(false);
    setShowPanel(true);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setIsPaid(true);
  };

  const handleFinalSubmit = () => {
    setTodayQueue(prev => prev.filter(p => p.id !== selectedPatient.id));
    setShowPanel(false);
  };

  return (
    <div className="relative h-[calc(100vh-120px)] overflow-hidden flex animate-fade-in">
      
      {/* بخش اصلی: لیست بیماران */}
      <div className={`flex-1 p-4 transition-all duration-500 overflow-y-auto custom-scrollbar ${showPanel ? 'md:ml-[400px] opacity-50 blur-[2px]' : ''}`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <FaUserCheck className="text-trust-green" /> پذیرش و صف مراجعین
            </h1>
            <p className="text-sm text-gray-500 mt-1">مدیریت مراجعین حضوری مطب</p>
          </div>
          <div className="bg-white px-5 py-2 rounded-2xl shadow-sm border border-gray-100 font-bold text-trust-green flex items-center gap-2">
            <FaClock /> ۱۸ دی ۱۴۰۴
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {todayQueue.map((patient) => (
            <div 
              key={patient.id} 
              className={`bg-white p-6 rounded-[32px] border transition-all duration-300 group cursor-pointer ${selectedPatient?.id === patient.id ? 'border-trust-green ring-4 ring-green-50' : 'border-gray-100 hover:shadow-xl'}`}
              onClick={() => handleOpenPanel(patient)}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg font-mono border transition-colors ${selectedPatient?.id === patient.id ? 'bg-trust-green text-white' : 'bg-gray-50 text-gray-700'}`}>
                    {patient.time}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{patient.name}</h3>
                    <span className="text-xs text-gray-400 font-bold">منبع: {patient.source}</span>
                  </div>
                </div>
                <button className="bg-gray-50 text-trust-green p-3 rounded-xl group-hover:bg-trust-green group-hover:text-white transition-all">
                   <FaArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* سایدبار پذیرش (Slide-over Panel) */}
      <div 
        className={`fixed top-0 left-0 h-full bg-white shadow-2xl z-[100] transition-transform duration-500 ease-in-out border-r border-gray-100 flex flex-col w-full md:w-[450px] ${showPanel ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* هدر سایدبار */}
        <div className="p-6 bg-gray-50/80 border-b border-gray-100 flex justify-between items-center shrink-0">
          <div>
            <h2 className="font-black text-xl text-gray-800">جزئیات پذیرش</h2>
            <p className="text-xs text-gray-400 font-bold mt-1 uppercase tracking-tighter">{selectedPatient?.name}</p>
          </div>
          <button 
            onClick={() => setShowPanel(false)}
            className="p-3 bg-white text-gray-400 hover:text-red-500 rounded-2xl shadow-sm transition-all border border-gray-100"
          >
            <FaTimes />
          </button>
        </div>

        {/* محتوای سایدبار (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          
          {/* بخش ۱: اطلاعات ضروری */}
          <div className="space-y-5">
             <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 pr-2">تاریخ تولد</label>
                <div className="relative">
                  <input type="text" placeholder="۱۴۰۴/۱۰/۱۸" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 pr-12 outline-none font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-trust-green/10 transition-all" />
                  <FaBirthdayCake className="absolute right-4 top-4 text-gray-300" />
                </div>
             </div>

             <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 pr-2">نوع عارضه (دسته بیماری)</label>
                <select className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none font-bold text-gray-700 cursor-pointer appearance-none">
                  <option>دیسک کمر (L4-L5)</option>
                  <option>آرتروز زانو</option>
                  <option>آسیب ورزشی</option>
                </select>
             </div>

             <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 pr-2">آدرس سکونت</label>
                <textarea rows="2" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none font-bold text-gray-700 resize-none"></textarea>
             </div>
          </div>

          {/* بخش ۲: وضعیت مالی */}
          <div className={`p-6 rounded-[28px] border-2 transition-all duration-500 ${isPaid ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-100 border-dashed'}`}>
             <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-black text-gray-500 uppercase">هزینه ویزیت</span>
                <span className="bg-white px-3 py-1 rounded-lg text-sm font-black text-gray-800 shadow-sm font-mono">250,000 T</span>
             </div>
             <button 
              onClick={handlePayment}
              disabled={isPaid}
              className={`w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 transition-all ${isPaid ? 'bg-green-600 text-white shadow-none' : 'bg-trust-green text-white shadow-lg shadow-green-200 hover:-translate-y-1'}`}
             >
               {isPaid ? <><FaCheckCircle /> پرداخت با موفقیت ثبت شد</> : <><FaCashRegister /> تایید دریافت وجه</>}
             </button>
          </div>

          {/* بخش ۳: نوبت‌های بعدی */}
          <div className="p-6 bg-blue-50/30 rounded-[28px] border border-blue-100">
             <h4 className="font-black text-gray-800 text-sm mb-4 flex items-center gap-2">
               <FaCalendarPlus className="text-blue-500" /> رزرو مراجعه بعدی
             </h4>
             <div className="grid grid-cols-2 gap-2">
               {['۳ ماه دیگر', '۶ ماه دیگر', 'سال آینده', 'تاریخ انتخابی'].map(item => (
                 <button key={item} className="p-3 bg-white border border-blue-50 rounded-xl text-[10px] font-black text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
                   {item}
                 </button>
               ))}
             </div>
          </div>
        </div>

        {/* دکمه نهایی پایانی */}
        <div className="p-6 bg-white border-t border-gray-100 shrink-0">
           <button 
            onClick={handleFinalSubmit}
            className="w-full bg-gray-900 text-white py-4 rounded-[20px] font-black flex items-center justify-center gap-3 hover:bg-gray-800 transition-all shadow-xl"
           >
             تکمیل نهایی و بستن <FaArrowRight />
           </button>
        </div>
      </div>

      {/* لایه تیره پس‌زمینه (زمانی که سایدبار باز است) */}
      {showPanel && (
        <div 
          className="fixed inset-0 bg-transparent z-[90] cursor-pointer" 
          onClick={() => setShowPanel(false)}
        ></div>
      )}

    </div>
  );
};

export default AdminReception;