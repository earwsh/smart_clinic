شimport React, { useState, useEffect } from 'react';
import api from '../../api/axios'; // اینستنس اکسیس شما
import { FaUserInjured, FaCalendarCheck, FaWallet, FaChartLine, FaClock, FaArrowLeft, FaSync } from 'react-icons/fa';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    todayPatients: 0,
    bookedAppointments: 0,
    todayIncome: 0,
    monthlyGrowth: 0
  });
  const [recentAppointments, setRecentAppointments] = useState([]);

  // ۱. دریافت آمار و اطلاعات داشبورد (GET)
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // در یک درخواست همزمان هر دو بخش را دریافت می‌کنیم
      const [statsRes, appointmentsRes] = await Promise.all([
        api.get('/admin/stats'), 
        api.get('/appointments/recent')
      ]);

      setStats(statsRes.data);
      setRecentAppointments(appointmentsRes.data);
      setLoading(false);
    } catch (error) {
      console.error("Dashboard API Error:", error);
      // مقادیر پیش‌فرض در صورت خطا برای جلوگیری از کرش کردن
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="animate-fade-in p-2 bg-[#FDFBF7]">
      <div className="flex justify-between items-center mb-8 px-2">
        <div>
          <h1 className="text-2xl font-black text-gray-800 italic">Clinic Overview</h1>
          <p className="text-[10px] text-gray-400 mt-1 font-black uppercase tracking-widest italic">
            Last Updated: {new Date().toLocaleTimeString('fa-IR', {hour: '2-digit', minute:'2-digit'})}
          </p>
        </div>
        <button 
          onClick={fetchDashboardData}
          className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 text-trust-green flex items-center gap-3 hover:shadow-md transition-all active:scale-95 text-xs font-black"
        >
           <FaSync className={loading ? 'animate-spin' : ''} /> 
           LIVE STATUS
        </button>
      </div>
      
      {/* کارت‌های آمار (Stats Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        
        {/* کل بیماران امروز */}
        <div className={`bg-white p-7 rounded-[35px] shadow-sm border border-gray-50 flex items-center justify-between transition-all hover:shadow-xl group ${loading && 'animate-pulse'}`}>
          <div>
            <p className="text-gray-400 text-[10px] font-black mb-2 uppercase tracking-tighter italic">Today's Patients</p>
            <h3 className="text-4xl font-black text-gray-800 font-mono tracking-tighter">
              {loading ? '--' : stats.todayPatients}
              <span className="text-xs text-gray-400 font-bold mr-1 italic">PA</span>
            </h3>
          </div>
          <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
            <FaUserInjured />
          </div>
        </div>

        {/* نوبت‌های کل */}
        <div className={`bg-white p-7 rounded-[35px] shadow-sm border border-gray-50 flex items-center justify-between transition-all hover:shadow-xl group ${loading && 'animate-pulse'}`}>
          <div>
            <p className="text-gray-400 text-[10px] font-black mb-2 uppercase tracking-tighter italic">Booked Slots</p>
            <h3 className="text-4xl font-black text-gray-800 font-mono tracking-tighter">
              {loading ? '--' : stats.bookedAppointments}
              <span className="text-xs text-gray-400 font-bold mr-1 italic">AP</span>
            </h3>
          </div>
          <div className="w-14 h-14 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
            <FaCalendarCheck />
          </div>
        </div>

        {/* درآمد */}
        <div className={`bg-white p-7 rounded-[35px] shadow-sm border border-gray-50 flex items-center justify-between transition-all hover:shadow-xl group ${loading && 'animate-pulse'}`}>
          <div>
            <p className="text-gray-400 text-[10px] font-black mb-2 uppercase tracking-tighter italic">Daily Income</p>
            <h3 className="text-3xl font-black text-gray-800 font-mono tracking-tighter">
              {loading ? '--' : (stats.todayIncome / 1000000).toFixed(1)}
              <span className="text-xs text-gray-400 font-bold mr-1 italic">M</span>
            </h3>
          </div>
          <div className="w-14 h-14 bg-green-50 text-trust-green rounded-2xl flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
            <FaWallet />
          </div>
        </div>

        {/* رشد */}
        <div className={`bg-white p-7 rounded-[35px] shadow-sm border border-gray-50 flex items-center justify-between transition-all hover:shadow-xl group ${loading && 'animate-pulse'}`}>
          <div>
            <p className="text-gray-400 text-[10px] font-black mb-2 uppercase tracking-tighter italic">Monthly Growth</p>
            <h3 className="text-3xl font-black text-green-500 font-mono flex items-center gap-1">
              {loading ? '--' : `${stats.monthlyGrowth}%+`}
              <FaChartLine className="text-sm" />
            </h3>
          </div>
          <div className="w-14 h-14 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center text-2xl shadow-inner font-mono font-black group-hover:rotate-12 transition-transform">
             ↗
          </div>
        </div>
      </div>

      {/* بخش پایین داشبورد */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* کانتینر نمودار - آماده برای نصب Recharts یا Chart.js */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[50px] shadow-sm border border-gray-50 min-h-[400px] flex flex-col relative overflow-hidden group">
            <div className="text-right mb-10">
               <h4 className="font-black text-gray-800 text-xl italic underline decoration-trust-green decoration-4 underline-offset-8">Patient Analytics</h4>
               <p className="text-[10px] text-gray-400 font-black mt-2 uppercase tracking-widest">Weekly visitation comparison</p>
            </div>
            
            {/* لایه شبیه‌ساز نمودار */}
            <div className="flex-1 w-full bg-gray-50/50 rounded-[35px] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-gray-300">
               <FaChartLine size={40} className="mb-4 opacity-20" />
               <span className="font-black text-xs italic">Waiting for Chart Engine Data...</span>
            </div>
        </div>

        {/* آخرین نوبت‌ها */}
        <div className="bg-white p-8 rounded-[50px] shadow-sm border border-gray-50 flex flex-col">
            <div className="flex justify-between items-center mb-10 px-2">
               <h4 className="font-black text-gray-800 text-md italic">Recent Activity</h4>
               <button className="text-[10px] font-black text-trust-green bg-green-50 px-3 py-1 rounded-lg hover:bg-trust-green hover:text-white transition-all uppercase tracking-tighter">View All</button>
            </div>

            <div className="flex-1 space-y-6">
               {loading ? (
                  [...Array(4)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-50 rounded-[22px] animate-pulse"></div>
                  ))
               ) : recentAppointments.length > 0 ? (
                  recentAppointments.map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-5 bg-gray-50/50 rounded-[25px] border border-transparent hover:border-gray-100 hover:bg-white hover:shadow-xl transition-all group cursor-pointer">
                       <div className="flex items-center gap-4">
                          <div className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center font-black text-[10px] text-gray-400 font-mono shadow-sm border border-gray-50">{app.time}</div>
                          <div className="text-right">
                             <p className="text-sm font-black text-gray-800 italic">{app.name}</p>
                             <p className="text-[9px] text-gray-400 font-bold mt-1 uppercase">{app.service}</p>
                          </div>
                       </div>
                       <FaArrowLeft className="text-[10px] text-gray-300 group-hover:text-trust-green transition-all transform group-hover:-translate-x-1" />
                    </div>
                  ))
               ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-gray-200">
                     <p className="text-xs font-black italic">No records found</p>
                  </div>
               )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;