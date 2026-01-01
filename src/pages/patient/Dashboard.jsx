import React, { useState, useEffect } from 'react';
import api from '../../api/axios'; // اینستنس اکسیس شما
import { 
  FaCalendarCheck, FaCommentMedical, FaWallet, 
  FaArrowLeft, FaClock, FaUserMd, FaSync 
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // --- States for API Integration ---
  const [loading, setLoading] = useState(true);
  const [patientData, setPatientData] = useState({
    name: '',
    activeAppointments: 0,
    newMessages: 0,
    walletBalance: 0,
    nextAppointment: null,
    recentHistory: []
  });

  // ۱. دریافت اطلاعات کلی داشبورد بیمار از سرور (GET)
  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      // فراخوانی اندپوینت اختصاصی داشبورد بیمار
      const response = await api.get('/patient/dashboard');
      
      setPatientData(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Dashboard API Error:", err);
      // در صورت بروز خطا، لودینگ متوقف شود تا کاربر دیتای کش شده یا خالی را ببیند
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  if (loading) return (
    <div className="h-[60vh] flex flex-col items-center justify-center text-gray-300">
      <FaSync className="animate-spin text-4xl mb-6 text-trust-green" />
      <p className="font-black italic uppercase tracking-widest text-xs">Syncing Health Profile...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto animate-fade-in space-y-8 p-2 bg-[#FDFBF7]">
      
      {/* بخش خوش‌آمدگویی پویا */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-trust-green to-[#047857] text-white p-10 rounded-[45px] shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 group-hover:scale-110 transition-transform duration-1000"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-black mb-3 italic tracking-tight">سلام، {patientData.name || 'کاربر'} عزیز 👋</h1>
          <p className="text-green-50 font-bold opacity-90 italic">به پنل سلامت خود خوش آمدید. آماده خدمت‌رسانی هستیم.</p>
        </div>
        <div className="relative z-10 mt-6 md:mt-0">
          <span className="inline-block bg-white/20 backdrop-blur-xl px-6 py-3 rounded-2xl text-[10px] font-black border border-white/30 shadow-inner uppercase tracking-widest italic">
             {new Date().toLocaleDateString('fa-IR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
      </div>

      {/* کارت‌های آمار (Stats Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[35px] border-r-[12px] border-trust-green flex items-center justify-between shadow-sm hover:shadow-2xl transition-all group">
          <div>
            <p className="text-gray-400 text-[10px] font-black mb-1 uppercase tracking-tighter italic">Active Bookings</p>
            <h3 className="text-3xl font-black text-gray-800 font-mono tracking-tighter">{patientData.activeAppointments} <span className="text-[10px] font-bold text-gray-400 italic">Slots</span></h3>
          </div>
          <div className="w-16 h-16 bg-green-50 text-trust-green rounded-3xl flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-12 transition-all shadow-inner">
            <FaCalendarCheck />
          </div>
        </div>

        <div className="bg-white p-8 rounded-[35px] border-r-[12px] border-amber-400 flex items-center justify-between shadow-sm hover:shadow-2xl transition-all group">
          <div>
            <p className="text-gray-400 text-[10px] font-black mb-1 uppercase tracking-tighter italic">New Messages</p>
            <h3 className="text-3xl font-black text-gray-800 font-mono tracking-tighter">{patientData.newMessages} <span className="text-[10px] font-bold text-gray-400 italic">Mail</span></h3>
          </div>
          <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-3xl flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-12 transition-all shadow-inner">
            <FaCommentMedical />
          </div>
        </div>

        <div className="bg-white p-8 rounded-[35px] border-r-[12px] border-blue-400 flex items-center justify-between shadow-sm hover:shadow-2xl transition-all group">
          <div>
            <p className="text-gray-400 text-[10px] font-black mb-1 uppercase tracking-tighter italic">Wallet Balance</p>
            <h3 className="text-2xl font-black text-gray-800 font-mono tracking-tighter">{patientData.walletBalance.toLocaleString()} <span className="text-[10px] font-bold text-gray-400 italic">T</span></h3>
          </div>
          <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-3xl flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-12 transition-all shadow-inner">
            <FaWallet />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pb-10">
        
        {/* بخش نوبت پیش‌رو (EHR Snapshot) */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[50px] border border-gray-50 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-center mb-12 pb-6 border-b border-gray-50">
            <h3 className="text-xl font-black text-gray-800 flex items-center gap-4 italic uppercase tracking-tighter">
              <div className="w-2 h-10 bg-trust-green rounded-full shadow-lg shadow-green-100"></div>
              Upcoming Clinical Visit
            </h3>
            <Link to="/appointments" className="text-[10px] text-trust-green font-black hover:underline flex items-center gap-2 uppercase tracking-[0.2em] italic">
              Manage Appts <FaArrowLeft />
            </Link>
          </div>

          {patientData.nextAppointment ? (
            <div className="bg-gray-50/50 border border-gray-100 rounded-[40px] p-10 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden group hover:bg-white hover:shadow-2xl transition-all duration-700">
              <div className="absolute top-0 right-0 w-3 h-full bg-trust-green"></div>
              
              <div className="flex flex-col items-center justify-center bg-trust-green text-white w-full md:w-32 h-32 rounded-[35px] shadow-2xl shadow-green-100 transition-transform group-hover:scale-110">
                <span className="text-5xl font-black font-mono tracking-tighter">{patientData.nextAppointment.day}</span>
                <span className="font-black text-xs uppercase italic mt-1">{patientData.nextAppointment.month}</span>
              </div>

              <div className="flex-1 text-center md:text-right">
                <h4 className="text-2xl font-black text-gray-800 mb-4 italic tracking-tight">{patientData.nextAppointment.doctor}</h4>
                <div className="flex flex-wrap justify-center md:justify-start gap-8 text-[11px] text-gray-400 font-black italic uppercase tracking-widest">
                  <span className="flex items-center gap-2"><FaClock className="text-amber-400" /> Time: {patientData.nextAppointment.time}</span>
                  <span className="flex items-center gap-2"><FaUserMd className="text-blue-400" /> {patientData.nextAppointment.specialty}</span>
                </div>
              </div>

              <button className="bg-gray-900 text-white px-12 py-5 rounded-[22px] font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:bg-black transition-all active:scale-95 italic">
                View Details
              </button>
            </div>
          ) : (
            <div className="py-24 text-center text-gray-300 font-black italic uppercase tracking-widest border-2 border-dashed border-gray-100 rounded-[40px]">No active schedules found</div>
          )}

          <div className="mt-16">
             <h4 className="text-[10px] font-black text-gray-300 mb-8 uppercase tracking-[0.3em] italic">Latest Medical Encounters</h4>
             <div className="space-y-5">
                {patientData.recentHistory.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-6 bg-white rounded-[30px] border border-gray-50 hover:shadow-xl hover:-translate-x-2 transition-all cursor-pointer group">
                     <div className="flex items-center gap-5">
                        <div className="w-2 h-2 rounded-full bg-gray-200 group-hover:bg-trust-green group-hover:shadow-[0_0_10px_rgba(4,120,87,0.5)] transition-all"></div>
                        <span className="text-gray-600 font-black text-xs italic">{item.title}</span>
                     </div>
                     <span className="text-[10px] text-gray-300 font-black font-mono italic tracking-tighter">{item.date}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* دسترسی سریع (Quick Actions) */}
        <div className="bg-white p-10 rounded-[50px] border border-gray-50 shadow-sm h-fit sticky top-6">
          <h3 className="text-xl font-black text-gray-800 mb-10 italic uppercase tracking-tighter">Fast Track</h3>
          <div className="grid grid-cols-1 gap-6">
            <Link to="/appointments" className="group flex items-center gap-6 p-6 rounded-[35px] bg-gray-50 border border-transparent hover:bg-white hover:border-trust-green/20 hover:shadow-2xl transition-all">
              <div className="w-16 h-16 rounded-[24px] bg-green-50 text-trust-green flex items-center justify-center text-3xl group-hover:rotate-12 transition-transform shadow-inner">
                <FaCalendarCheck />
              </div>
              <div className="text-right">
                <h5 className="font-black text-gray-800 text-sm italic">New Booking</h5>
                <p className="text-[10px] text-gray-400 font-black mt-1 uppercase tracking-tighter">In-person or Online</p>
              </div>
            </Link>

            <Link to="/consult" className="group flex items-center gap-6 p-6 rounded-[35px] bg-gray-50 border border-transparent hover:bg-white hover:border-amber-400/20 hover:shadow-2xl transition-all">
              <div className="w-16 h-16 rounded-[24px] bg-amber-50 text-amber-500 flex items-center justify-center text-3xl group-hover:rotate-12 transition-transform shadow-inner">
                <FaCommentMedical />
              </div>
              <div className="text-right">
                <h5 className="font-black text-gray-800 text-sm italic">Direct Consult</h5>
                <p className="text-[10px] text-gray-400 font-black mt-1 uppercase tracking-tighter">Chat with specialists</p>
              </div>
            </Link>

            <div className="group flex items-center gap-6 p-6 rounded-[35px] bg-gray-50 border border-transparent hover:bg-white hover:border-blue-400/20 hover:shadow-2xl transition-all cursor-pointer">
              <div className="w-16 h-16 rounded-[24px] bg-blue-50 text-blue-500 flex items-center justify-center text-3xl group-hover:rotate-12 transition-transform shadow-inner">
                <FaUserMd />
              </div>
              <div className="text-right">
                <h5 className="font-black text-gray-800 text-sm italic">E-Health Record</h5>
                <p className="text-[10px] text-gray-400 font-black mt-1 uppercase tracking-tighter">History, RX & Labs</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;