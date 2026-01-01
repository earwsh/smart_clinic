import React, { useState, useEffect } from 'react';
import api from '../../api/axios'; // اینستنس اکسیس شما
import { 
  FaUserCheck, FaCashRegister, FaCalendarPlus, FaMapMarkerAlt, 
  FaBirthdayCake, FaArrowRight, FaClock, FaCheckCircle, FaTimes, FaSync 
} from 'react-icons/fa';

const AdminReception = () => {
  // --- States for API Integration ---
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [todayQueue, setTodayQueue] = useState([]);
  
  // --- UI States ---
  const [showPanel, setShowPanel] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [formData, setFormData] = useState({ birthDate: '', category: '', address: '' });

  // ۱. دریافت لیست صف مراجعین امروز (GET)
  const fetchQueue = async () => {
    try {
      setLoading(true);
      const res = await api.get('/reception/today-queue');
      setTodayQueue(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Queue API Error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  const handleOpenPanel = (patient) => {
    setSelectedPatient(patient);
    setIsPaid(patient.paymentStatus === 'paid'); // اگر از قبل پرداخت شده باشد
    setFormData({ 
      birthDate: patient.birthDate || '', 
      category: patient.category || 'دیسک کمر (L4-L5)', 
      address: patient.address || '' 
    });
    setShowPanel(true);
  };

  // ۲. ثبت پرداخت هزینه ویزیت (POST)
  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      setActionLoading(true);
      await api.post(`/reception/${selectedPatient.id}/pay`, {
        amount: 250000,
        method: 'POS' // کارتخوان مطب
      });
      setIsPaid(true);
      setActionLoading(false);
    } catch (err) {
      alert("خطا در ثبت پرداخت");
      setActionLoading(false);
    }
  };

  // ۳. اتمام پذیرش و خروج از صف (PATCH/PUT)
  const handleFinalSubmit = async () => {
    try {
      setActionLoading(true);
      await api.patch(`/reception/complete/${selectedPatient.id}`, formData);
      
      // حذف از لیست صف در فرانت‌اِند
      setTodayQueue(prev => prev.filter(p => p.id !== selectedPatient.id));
      setShowPanel(false);
      setActionLoading(false);
    } catch (err) {
      alert("خطا در نهایی‌سازی پذیرش");
      setActionLoading(false);
    }
  };

  return (
    <div className="relative h-[calc(100vh-140px)] overflow-hidden flex animate-fade-in bg-[#FDFBF7]">
      
      {/* بخش اصلی: لیست بیماران در صف */}
      <div className={`flex-1 p-4 transition-all duration-500 overflow-y-auto custom-scrollbar ${showPanel ? 'md:mr-[450px] opacity-40 blur-sm' : ''}`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 px-2">
          <div>
            <h1 className="text-2xl font-black text-gray-800 flex items-center gap-3 italic">
              <FaUserCheck className="text-trust-green" /> Reception & Queue
            </h1>
            <p className="text-[10px] text-gray-400 mt-1 font-black uppercase tracking-widest italic">Live patient management system</p>
          </div>
          <button 
            onClick={fetchQueue}
            className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 font-black text-trust-green flex items-center gap-3 text-xs active:scale-95 transition-all"
          >
            <FaClock className={loading ? 'animate-spin' : 'animate-pulse'} /> 
            {new Date().toLocaleDateString('fa-IR')}
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-6">
            <div className="w-12 h-12 border-4 border-trust-green border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-black text-gray-300 uppercase tracking-tighter">Syncing queue data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-24">
            {todayQueue.map((patient) => (
              <div 
                key={patient.id} 
                onClick={() => handleOpenPanel(patient)}
                className={`bg-white p-7 rounded-[40px] border transition-all duration-500 group cursor-pointer flex justify-between items-center shadow-sm hover:shadow-2xl ${selectedPatient?.id === patient.id ? 'border-trust-green ring-[12px] ring-green-50 shadow-green-100' : 'border-gray-50'}`}
              >
                <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-[24px] flex flex-col items-center justify-center font-black text-lg font-mono border-2 transition-all ${selectedPatient?.id === patient.id ? 'bg-trust-green text-white border-trust-green shadow-xl shadow-green-200' : 'bg-gray-50 text-gray-400 border-transparent'}`}>
                    <span className="text-[9px] opacity-40 mb-0.5 uppercase">Time</span>
                    {patient.time}
                  </div>
                  <div>
                    <h3 className="font-black text-gray-800 text-lg italic">{patient.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                       <span className={`w-2 h-2 rounded-full ${patient.source === 'سایت' ? 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]' : 'bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.5)]'}`}></span>
                       <span className="text-[10px] text-gray-400 font-black italic uppercase">Source: {patient.source}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 text-gray-300 p-4 rounded-2xl group-hover:bg-trust-green group-hover:text-white transition-all shadow-inner group-hover:shadow-green-100">
                   <FaArrowRight className="text-sm" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* سایدبار پذیرش (Slide-over) */}
      <div 
        className={`fixed top-0 right-0 h-full bg-white shadow-[-30px_0_60px_rgba(0,0,0,0.08)] z-[100] transition-all duration-700 ease-in-out border-l border-gray-100 flex flex-col w-full md:w-[450px] ${showPanel ? 'translate-x-0' : 'translate-x-full opacity-0'}`}
      >
        <div className="p-10 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center shrink-0">
          <div>
            <h2 className="font-black text-2xl text-gray-800 italic uppercase tracking-tighter">Check-in</h2>
            <p className="text-[10px] text-trust-green font-black mt-1 uppercase tracking-widest">{selectedPatient?.name} • Appt: {selectedPatient?.time}</p>
          </div>
          <button 
            onClick={() => setShowPanel(false)}
            className="p-4 bg-white text-gray-300 hover:text-red-500 rounded-2xl shadow-sm transition-all border border-gray-100 active:scale-90"
          >
            <FaTimes />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
          
          <div className="space-y-6">
             <div className="space-y-2 text-right">
                <label className="text-[10px] font-black text-gray-400 pr-2 uppercase italic tracking-widest">Patient Birth Date</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={formData.birthDate}
                    onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                    placeholder="۱۳۷۰/۰۱/۰۱" 
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 pr-14 outline-none font-black text-gray-700 focus:bg-white focus:ring-4 focus:ring-trust-green/5 transition-all" 
                  />
                  <FaBirthdayCake className="absolute right-6 top-6 text-gray-200" />
                </div>
             </div>

             <div className="space-y-2 text-right">
                <label className="text-[10px] font-black text-gray-400 pr-2 uppercase italic tracking-widest">Medical Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 outline-none font-black text-gray-700 cursor-pointer focus:bg-white transition-all appearance-none"
                >
                  <option>دیسک کمر (L4-L5)</option>
                  <option>آرتروز پیشرفته زانو</option>
                  <option>مشاوره توانبخشی</option>
                </select>
             </div>

             <div className="space-y-2 text-right">
                <label className="text-[10px] font-black text-gray-400 pr-2 uppercase italic tracking-widest">Address / Notes</label>
                <textarea 
                  rows="3" 
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="آدرس یا ملاحظات پذیرش..." 
                  className="w-full bg-gray-50 border border-gray-100 rounded-3xl p-6 outline-none font-bold text-gray-600 resize-none focus:bg-white transition-all"
                ></textarea>
             </div>
          </div>

          {/* بخش وضعیت مالی */}
          <div className={`p-8 rounded-[40px] border-2 transition-all duration-700 relative overflow-hidden ${isPaid ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200 border-dashed shadow-xl shadow-amber-500/5'}`}>
             <div className="flex justify-between items-center mb-8 relative z-10">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 italic">Visit Fee</span>
                  <span className="text-3xl font-black text-gray-800 font-mono tracking-tighter">250,000 <span className="text-xs font-bold text-gray-400 uppercase">T</span></span>
                </div>
                <div className="w-14 h-14 bg-white rounded-[22px] flex items-center justify-center text-trust-green shadow-sm border border-gray-100">
                  <FaCashRegister size={24} />
                </div>
             </div>
             <button 
              onClick={handlePayment}
              disabled={isPaid || actionLoading}
              className={`w-full py-5 rounded-[22px] font-black text-sm flex items-center justify-center gap-3 transition-all relative z-10 ${isPaid ? 'bg-green-600 text-white shadow-none' : 'bg-gray-900 text-white shadow-2xl hover:bg-black active:scale-95'}`}
             >
               {actionLoading ? <FaSync className="animate-spin" /> : (isPaid ? <><FaCheckCircle size={18} /> Payment Verified</> : <><FaCheckCircle size={18} /> Confirm Payment</>)}
             </button>
          </div>

          {/* رزرو مراجعه بعدی */}
          <div className="p-8 bg-blue-50/40 rounded-[40px] border border-blue-100/50">
             <h4 className="font-black text-gray-800 text-xs mb-6 flex items-center gap-3 italic">
               <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shadow-sm"><FaCalendarPlus size={16} /></div>
               Schedule Follow-up
             </h4>
             <div className="grid grid-cols-2 gap-4">
               {['۳ ماه دیگر', '۶ ماه دیگر', 'سال آینده', 'تاریخ انتخابی'].map(item => (
                 <button key={item} className="p-4 bg-white border border-blue-50 rounded-2xl text-[10px] font-black text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-95 italic">
                   {item}
                 </button>
               ))}
             </div>
          </div>
        </div>

        {/* فوتر سایدبار */}
        <div className="p-10 bg-white border-t border-gray-50 shrink-0">
           <button 
            onClick={handleFinalSubmit}
            disabled={actionLoading}
            className="w-full bg-trust-green text-white py-5 rounded-[26px] font-black flex items-center justify-center gap-4 hover:bg-emerald-700 transition-all shadow-2xl shadow-green-200 active:scale-95 italic text-sm"
           >
             {actionLoading ? <FaSync className="animate-spin" /> : <>Complete & Close <FaArrowRight /></>}
           </button>
        </div>
      </div>

      {/* Overlay برای تمرکز روی سایدبار */}
      {showPanel && (
        <div 
          className="fixed inset-0 bg-gray-900/10 backdrop-blur-[4px] z-[90] cursor-pointer" 
          onClick={() => setShowPanel(false)}
        ></div>
      )}

    </div>
  );
};

export default AdminReception;