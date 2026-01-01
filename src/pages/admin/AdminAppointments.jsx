import React, { useState, useEffect } from 'react';
import api from '../../api/axios'; // ایمپورت کردن اینستنس اکسیس
import { 
  FaCalendarAlt, FaPlus, FaGlobe, FaPhoneAlt, FaTrashAlt,
  FaCog, FaClock, FaChevronLeft, FaChevronRight,
  FaFileMedical, FaTimes, FaCheckCircle, FaSave, FaSync
} from 'react-icons/fa';

const AdminAppointments = () => {
  // --- States for API ---
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- UI States ---
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('1404-10-18');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [newPatient, setNewPatient] = useState({ fullName: '', phone: '' });

  // ۱. دریافت لیست نوبت‌ها از سرور (GET)
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // فراخوانی API: /api/v1/appointments?date=1404-10-18
      const response = await api.get(`/appointments`, {
        params: { date: selectedDate }
      });
      
      setAppointments(response.data); 
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "خطا در دریافت لیست نوبت‌ها از سرور");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [selectedDate]);

  // ۲. لغو نوبت (DELETE)
  const handleCancelAppointment = async (id) => {
    if (window.confirm("آیا از لغو این نوبت اطمینان دارید؟")) {
      try {
        await api.delete(`/appointments/${id}`);
        // بروزرسانی لوکال لیست برای سرعت بیشتر UX
        setAppointments(prev => prev.filter(app => app.id !== id));
      } catch (err) {
        alert("خطا در لغو نوبت: " + (err.response?.data?.message || "مشکل شبکه"));
      }
    }
  };

  // ۳. ثبت نوبت دستی (POST)
  const handleManualBooking = async () => {
    if (!newPatient.fullName || !newPatient.phone) {
      alert("لطفا اطلاعات بیمار را کامل وارد کنید");
      return;
    }

    try {
      setLoading(true);
      const bookingData = {
        ...newPatient,
        time: selectedSlot,
        date: selectedDate,
        source: 'manual'
      };

      await api.post('/appointments', bookingData);
      
      // بستن مودال و تازه‌سازی لیست
      setShowBookingModal(false);
      setSelectedSlot(null);
      setNewPatient({ fullName: '', phone: '' });
      fetchAppointments();
      
    } catch (err) {
      alert("خطا در ثبت نوبت: " + (err.response?.data?.message || "مشکل در سرور"));
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6 p-2 bg-[#FDFBF7]">
      
      {/* بخش اصلی: لیست نوبت‌ها */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="flex justify-between items-center mb-6 px-4">
          <div>
            <h2 className="text-2xl font-black text-gray-800 flex items-center gap-3 italic">
              <span className="w-3 h-3 bg-trust-green rounded-full shadow-lg shadow-green-200"></span>
              لیست مراجعین امروز
            </h2>
            <p className="text-[10px] text-gray-400 mt-1 font-black uppercase tracking-widest italic">Date Reference: {selectedDate}</p>
          </div>
          <button 
            onClick={fetchAppointments}
            className="p-3 bg-white border border-gray-100 rounded-2xl text-trust-green hover:shadow-md transition-all active:scale-95"
          >
            <FaSync className={loading ? 'animate-spin' : ''} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2 pb-24">
          {loading ? (
              <div className="flex flex-col items-center justify-center h-64 space-y-4">
                 <div className="w-12 h-12 border-4 border-trust-green border-t-transparent rounded-full animate-spin"></div>
                 <p className="text-xs font-black text-gray-400 italic">Syncing with Server...</p>
              </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-8 rounded-[35px] text-center font-black border border-red-100 italic text-sm">
               {error}
            </div>
          ) : appointments.length > 0 ? (
            appointments.map((app) => (
              <div key={app.id} className="bg-white p-6 rounded-[35px] border border-gray-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
                <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                  {/* ساعت */}
                  <div className="min-w-[110px] md:border-l border-gray-100 pl-6 text-center">
                    <span className="text-3xl font-black text-gray-800 font-mono tracking-tighter">{app.time}</span>
                    <div className="mt-2 inline-block px-3 py-1 rounded-lg bg-green-50 text-trust-green text-[9px] font-black uppercase tracking-tighter">Confirmed</div>
                  </div>

                  {/* اطلاعات بیمار */}
                  <div className="flex-1 flex items-center gap-5">
                    <div className="relative">
                       <img src={app.avatar || `https://ui-avatars.com/api/?name=${app.patient}&background=random`} className="w-16 h-16 rounded-[22px] object-cover shadow-inner border-2 border-white" />
                       <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${app.source === 'online' ? 'bg-blue-500' : 'bg-amber-500'}`}></div>
                    </div>
                    <div className="text-right">
                      <h3 className="text-lg font-black text-gray-800 italic">{app.patient}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] font-black text-gray-400 bg-gray-50 px-2 py-1 rounded-md">{app.phone}</span>
                        <span className="text-[10px] text-trust-green font-black italic uppercase tracking-widest">{app.service}</span>
                      </div>
                    </div>
                  </div>

                  {/* دکمه‌ها */}
                  <div className="flex gap-2">
                    <button className="p-4 bg-gray-50 text-gray-400 rounded-2xl hover:bg-trust-green hover:text-white transition-all shadow-sm active:scale-90" title="پرونده بیمار"><FaFileMedical/></button>
                    <button onClick={() => handleCancelAppointment(app.id)} className="p-4 bg-red-50 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-90" title="لغو نوبت"><FaTrashAlt/></button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-24 text-gray-300 bg-white rounded-[40px] border-2 border-dashed border-gray-100 font-black italic">
               هیچ نوبتی برای این تاریخ ثبت نشده است.
            </div>
          )}
        </div>
      </div>

      {/* ستون ابزارها: تقویم */}
      <div className="w-full lg:w-85 space-y-6 shrink-0 order-first lg:order-last">
        <div className="bg-white p-8 rounded-[40px] border border-gray-50 shadow-sm">
           <div className="flex justify-between items-center mb-8">
              <button className="p-2 text-gray-300 hover:text-trust-green transition-colors"><FaChevronRight/></button>
              <span className="font-black text-gray-800 italic uppercase tracking-tighter">دی ماه ۱۴۰۴</span>
              <button className="p-2 text-gray-300 hover:text-trust-green transition-colors"><FaChevronLeft/></button>
           </div>
           <div className="grid grid-cols-7 gap-3 text-center">
              {['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'].map(day => <span key={day} className="text-[10px] font-black text-gray-300">{day}</span>)}
              {[...Array(30)].map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setSelectedDate(`1404-10-${i+1}`)} 
                  className={`w-9 h-9 rounded-2xl text-[11px] font-black transition-all flex items-center justify-center ${selectedDate === `1404-10-${i+1}` ? 'bg-trust-green text-white shadow-xl shadow-green-100 scale-110' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  {i+1}
                </button>
              ))}
           </div>
        </div>

        <div className="bg-gray-900 p-8 rounded-[40px] shadow-2xl space-y-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-trust-green/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-trust-green/20 transition-all"></div>
            <div className="relative z-10">
              <h3 className="text-white font-black text-xs flex items-center gap-2 mb-6 italic uppercase tracking-widest"><FaCog className="text-pastel-gold animate-spin-slow"/> Management Tools</h3>
              <button onClick={() => setShowBookingModal(true)} className="w-full bg-trust-green text-white py-5 rounded-[22px] font-black text-xs flex items-center justify-center gap-3 shadow-xl hover:bg-emerald-600 transition-all active:scale-95">
                <FaPlus size={12}/> ثبت نوبت دستی (تلفنی)
              </button>
              <button className="w-full bg-white/5 text-gray-400 py-5 rounded-[22px] font-black text-xs border border-white/5 hover:bg-white/10 transition-all mt-4 italic uppercase">
                Setup Working Hours
              </button>
            </div>
        </div>
      </div>

      {/* مودال ثبت نوبت دستی */}
      {showBookingModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-md animate-fade-in">
          <div className="bg-white w-full max-w-4xl rounded-[50px] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] animate-zoom-in border border-white/20">
              <div className="p-10 flex-1 overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-3xl font-black text-gray-800 italic uppercase tracking-tighter flex items-center gap-4">
                    <div className="w-2 h-10 bg-trust-green rounded-full"></div> انتخاب زمان
                  </h3>
                  <button onClick={() => setShowBookingModal(false)} className="p-4 bg-gray-50 rounded-2xl text-gray-400 hover:text-red-500 transition-all active:scale-90"><FaTimes/></button>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                    {[...Array(12)].map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => setSelectedSlot(`16:${i*15 === 0 ? '00' : i*15}`)} 
                        className={`py-5 rounded-[24px] border-2 font-black font-mono transition-all text-sm ${selectedSlot === `16:${i*15 === 0 ? '00' : i*15}` ? 'bg-trust-green text-white border-trust-green shadow-xl shadow-green-100 scale-95' : 'bg-white text-gray-400 border-gray-50 hover:border-trust-green/20'}`}
                      >
                        ۱۶:{i*15 === 0 ? '۰۰' : i*15}
                      </button>
                    ))}
                </div>
              </div>
              
              {selectedSlot && (
                <div className="w-full md:w-96 bg-gray-50/50 p-10 border-r border-gray-100 flex flex-col justify-between backdrop-blur-sm">
                   <div className="space-y-6">
                      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                         <p className="text-[10px] font-black text-gray-400 uppercase italic">Selected Slot</p>
                         <h4 className="font-black text-trust-green text-2xl font-mono">{selectedSlot}</h4>
                      </div>
                      <div className="space-y-3">
                        <input 
                          type="text" 
                          placeholder="نام مراجع" 
                          value={newPatient.fullName}
                          onChange={(e) => setNewPatient({...newPatient, fullName: e.target.value})}
                          className="w-full p-5 bg-white rounded-[22px] outline-none shadow-sm border border-transparent focus:border-trust-green/20 font-black text-sm" 
                        />
                        <input 
                          type="tel" 
                          placeholder="شماره تماس" 
                          value={newPatient.phone}
                          onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                          className="w-full p-5 bg-white rounded-[22px] outline-none shadow-sm border border-transparent focus:border-trust-green/20 font-black text-sm text-left font-mono" 
                        />
                      </div>
                   </div>
                   <button 
                    onClick={handleManualBooking}
                    className="w-full bg-gray-900 text-white py-5 rounded-[24px] font-black mt-8 hover:bg-black transition-all flex items-center justify-center gap-3 shadow-2xl active:scale-95"
                   >
                     <FaSave size={14}/> تایید و ثبت نهایی
                   </button>
                </div>
              )}
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminAppointments;