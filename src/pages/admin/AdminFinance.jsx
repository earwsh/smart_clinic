import React, { useState, useEffect } from 'react';
import api from '../../api/axios'; // اینستنس اکسیس شما
import { 
  FaWallet, FaArrowUp, FaArrowDown, FaDownload, 
  FaCreditCard, FaHistory, FaChartBar, FaFileInvoiceDollar, FaSync
} from 'react-icons/fa';

const AdminFinance = () => {
  // --- States for API Integration ---
  const [loading, setLoading] = useState(true);
  const [settleLoading, setSettleLoading] = useState(false);
  const [financeStats, setFinanceStats] = useState({
    monthlyIncome: 0,
    withdrawableBalance: 0,
    totalRefunds: 0,
    growthRate: 0,
    refundReduction: 0
  });
  const [transactions, setTransactions] = useState([]);

  // ۱. دریافت اطلاعات مالی و تراکنش‌ها (GET)
  const fetchFinanceData = async () => {
    try {
      setLoading(true);
      // فرض بر این است که بک‌اِند دو اندپوینت مجزا یا یک اندپوینت جامع دارد
      const [statsRes, transRes] = await Promise.all([
        api.get('/finance/summary'),
        api.get('/finance/transactions')
      ]);

      setFinanceStats(statsRes.data);
      setTransactions(transRes.data);
      setLoading(false);
    } catch (error) {
      console.error("Finance API Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFinanceData();
  }, []);

  // ۲. درخواست تسویه حساب (POST)
  const handleSettlement = async () => {
    if (financeStats.withdrawableBalance <= 0) {
      alert("موجودی قابل برداشتی وجود ندارد.");
      return;
    }

    try {
      setSettleLoading(true);
      await api.post('/finance/settle-request');
      alert("درخواست تسویه حساب با موفقیت ثبت شد و در صف پردازش قرار گرفت.");
      setSettleLoading(false);
      fetchFinanceData(); // بروزرسانی اعداد پس از درخواست
    } catch (error) {
      alert(error.response?.data?.message || "خطا در ثبت درخواست تسویه");
      setSettleLoading(false);
    }
  };

  return (
    <div className="animate-fade-in pb-10 space-y-8 p-2 bg-[#FDFBF7]">
      
      {/* هدر و دکمه خروجی */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-800 flex items-center gap-2 italic">
            <FaWallet className="text-trust-green" />
            Financial Management
          </h1>
          <p className="text-[10px] text-gray-400 mt-1 font-black uppercase tracking-widest italic">Monitoring Transactions & Clinic Revenue</p>
        </div>
        <button className="bg-white border border-gray-100 text-gray-700 px-6 py-3 rounded-2xl font-black flex items-center gap-3 hover:shadow-md transition-all text-xs shadow-sm active:scale-95">
          <FaDownload className="text-trust-green" /> EXPORT PDF REPORT
        </button>
      </div>

      {/* کارت‌های آمار مالی */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* درآمد کل ماه */}
        <div className={`bg-white p-8 rounded-[40px] shadow-sm border border-gray-50 relative overflow-hidden group ${loading && 'animate-pulse'}`}>
          <div className="relative z-10">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">Monthly Revenue</span>
            <div className="flex items-center gap-2 mt-3">
              <h3 className="text-4xl font-black text-gray-800 font-mono tracking-tighter">
                {loading ? '--.-' : financeStats.monthlyIncome}
              </h3>
              <span className="text-xs font-bold text-gray-400 italic">M Toman</span>
            </div>
            <div className={`flex items-center gap-1 text-[10px] font-black mt-5 px-2 py-1 rounded-lg w-fit ${financeStats.growthRate >= 0 ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'}`}>
              <FaArrowUp className={financeStats.growthRate < 0 ? 'rotate-180' : ''} /> 
              {financeStats.growthRate}% Growth vs Last Month
            </div>
          </div>
        </div>

        {/* موجودی قابل تسویه */}
        <div className={`bg-gray-900 p-8 rounded-[40px] shadow-2xl text-white relative overflow-hidden group ${loading && 'animate-pulse'}`}>
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:rotate-12 transition-transform duration-700">
            <FaCreditCard size={150} />
          </div>
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic">Withdrawable Balance</span>
          <div className="flex items-center gap-2 mt-3">
            <h3 className="text-4xl font-black text-white font-mono tracking-tighter">
               {loading ? '--.-' : financeStats.withdrawableBalance}
            </h3>
            <span className="text-xs font-bold text-gray-500 italic">M Toman</span>
          </div>
          <button 
            onClick={handleSettlement}
            disabled={settleLoading || loading}
            className="mt-6 bg-trust-green text-white px-6 py-3 rounded-xl text-[10px] font-black hover:bg-emerald-600 transition-all shadow-lg shadow-green-900/20 active:scale-95 flex items-center gap-2"
          >
            {settleLoading ? <FaSync className="animate-spin" /> : <FaSync />} Request Instant Settlement
          </button>
        </div>

        {/* مبالغ مرجوعی */}
        <div className={`bg-white p-8 rounded-[40px] shadow-sm border border-gray-50 relative group ${loading && 'animate-pulse'}`}>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">Total Refunds</span>
          <div className="flex items-center gap-2 mt-3">
            <h3 className="text-4xl font-black text-red-500 font-mono tracking-tighter">
               {loading ? '--.-' : financeStats.totalRefunds}
            </h3>
            <span className="text-xs font-bold text-gray-400 italic">M Toman</span>
          </div>
          <div className="flex items-center gap-1 text-red-400 text-[10px] font-black mt-5 bg-red-50 w-fit px-2 py-1 rounded-lg italic">
            <FaArrowDown /> {financeStats.refundReduction}% lower than last week
          </div>
        </div>
      </div>

      {/* بخش اصلی: لیست تراکنش‌ها و نمودار */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* جدول تراکنش‌ها */}
        <div className="lg:col-span-2 bg-white rounded-[50px] p-10 shadow-sm border border-gray-50">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-lg font-black text-gray-800 flex items-center gap-3 italic">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300 shadow-inner"><FaHistory size={18} /></div>
              Recent Transactions
            </h3>
            <button onClick={fetchFinanceData} className="text-trust-green hover:rotate-180 transition-transform duration-500">
               <FaSync size={14} />
            </button>
          </div>
          
          <div className="space-y-4">
            {loading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-50 rounded-[30px] animate-pulse"></div>
              ))
            ) : transactions.length > 0 ? (
              transactions.map((tr) => (
                <div key={tr.id} className="flex flex-col sm:flex-row items-center justify-between p-6 bg-gray-50/50 rounded-[35px] border border-transparent hover:border-gray-100 hover:bg-white hover:shadow-xl transition-all group">
                  <div className="flex items-center gap-5">
                    <div className={`w-16 h-16 rounded-[22px] flex items-center justify-center text-2xl shadow-inner ${
                      tr.status === 'success' ? 'bg-green-50 text-green-600' : 
                      tr.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                    }`}>
                      <FaFileInvoiceDollar />
                    </div>
                    <div className="text-right">
                      <h4 className="font-black text-gray-800 text-sm italic">{tr.patient}</h4>
                      <p className="text-[10px] text-gray-400 font-black mt-1 font-mono uppercase tracking-tighter">{tr.type} • {tr.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8 mt-6 sm:mt-0">
                    <div className="text-center sm:text-left">
                      <span className="block font-black text-gray-800 text-xl font-mono tracking-tighter">{tr.amount}</span>
                      <span className="text-[9px] text-gray-400 font-black uppercase italic tracking-widest">Tomans</span>
                    </div>
                    <div className={`text-[9px] font-black px-5 py-2.5 rounded-xl shadow-sm uppercase tracking-widest ${
                      tr.status === 'success' ? 'bg-green-600 text-white shadow-green-100' : 
                      tr.status === 'pending' ? 'bg-amber-500 text-white shadow-amber-100' : 'bg-red-600 text-white shadow-red-100'
                    }`}>
                      {tr.status === 'success' ? 'Success' : tr.status === 'pending' ? 'Pending' : 'Failed'}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 text-gray-300 font-black italic uppercase tracking-widest">No transactions found</div>
            )}
          </div>
        </div>

        {/* سایدبار گزارش توزیع */}
        <div className="bg-white rounded-[50px] p-10 shadow-sm border border-gray-50 flex flex-col h-fit sticky top-6">
           <h3 className="text-lg font-black text-gray-800 mb-10 flex items-center gap-3 italic">
             <div className="w-10 h-10 bg-trust-green/10 rounded-xl flex items-center justify-center text-trust-green shadow-inner"><FaChartBar size={18} /></div>
             Revenue Stream
           </h3>
           
           <div className="space-y-10 flex-1">
             {[
               { label: 'In-Person Visit', percent: 75, color: 'bg-trust-green' },
               { label: 'Online Consult', percent: 40, color: 'bg-blue-400' },
               { label: 'Medical Services', percent: 25, color: 'bg-pastel-gold' },
             ].map((item, idx) => (
               <div key={idx}>
                 <div className="flex justify-between text-[10px] font-black mb-3 uppercase italic tracking-tighter">
                   <span className="text-gray-500">{item.label}</span>
                   <span className="text-gray-400 font-mono">{item.percent}%</span>
                 </div>
                 <div className="w-full h-3 bg-gray-50 rounded-full overflow-hidden shadow-inner border border-gray-100">
                   <div className={`${item.color} h-full transition-all duration-1000 ease-out shadow-lg`} style={{ width: `${item.percent}%` }}></div>
                 </div>
               </div>
             ))}
           </div>

           <div className="mt-14 p-8 bg-trust-green/5 rounded-[35px] border border-trust-green/10 text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-trust-green/5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform"></div>
              <p className="text-[10px] text-trust-green leading-loose font-black italic relative z-10">
                💡 <span className="underline decoration-wavy underline-offset-4">Smart Insights:</span> Your primary revenue source this month is "In-Person Visits". Focus on increasing follow-up rates to boost specialized services.
              </p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default AdminFinance;