import React from 'react';
import { 
  FaWallet, 
  FaArrowUp, 
  FaArrowDown, 
  FaDownload, 
  FaCreditCard, 
  FaHistory, 
  FaChartBar,
  FaFileInvoiceDollar
} from 'react-icons/fa';

const AdminFinance = () => {
  // داده‌های ساختگی تراکنش‌ها
  const transactions = [
    { id: 1, patient: 'علی رضایی', amount: '۲۵۰,۰۰۰', date: '۱۴۰۴/۱۰/۱۸', type: 'ویزیت حضوری', status: 'success' },
    { id: 2, patient: 'سارا نبوی', amount: '۱۵۰,۰۰۰', date: '۱۴۰۴/۱۰/۱۸', type: 'مشاوره آنلاین', status: 'success' },
    { id: 3, patient: 'رضا کمالی', amount: '۴۰۰,۰۰۰', date: '۱۴۰۴/۱۰/۱۷', type: 'نوار عصب', status: 'pending' },
    { id: 4, patient: 'مریم نوری', amount: '۳۰۰,۰۰۰', date: '۱۴۰۴/۱۰/۱۶', type: 'تزریق', status: 'failed' },
  ];

  return (
    <div className="animate-fade-in pb-10 space-y-8">
      
      {/* ۱. هدر و دکمه خروجی */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaWallet className="text-trust-green" />
            مدیریت مالی و تراکنش‌ها
          </h1>
          <p className="text-sm text-gray-400 mt-1">گزارش درآمد کلینیک و تسویه حساب‌های بانکی</p>
        </div>
        <button className="bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm text-sm">
          <FaDownload /> دریافت گزارش PDF
        </button>
      </div>

      {/* ۲. کارت‌های آمار مالی (Finance Stats) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* درآمد کل ماه */}
        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-50 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative z-10">
            <span className="text-xs font-bold text-gray-400">درآمد کل ماه جاری</span>
            <div className="flex items-center gap-2 mt-2">
              <h3 className="text-3xl font-black text-gray-800">۴۵.۸</h3>
              <span className="text-sm text-gray-400">میلیون تومان</span>
            </div>
            <div className="flex items-center gap-1 text-green-500 text-xs font-bold mt-4">
              <FaArrowUp /> ۸٪ رشد نسبت به ماه قبل
            </div>
          </div>
        </div>

        {/* موجودی قابل تسویه */}
        <div className="bg-gray-900 p-6 rounded-[32px] shadow-xl text-white relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10"><FaCreditCard className="text-9xl rotate-12" /></div>
          <span className="text-xs font-bold text-gray-400">موجودی قابل برداشت</span>
          <div className="flex items-center gap-2 mt-2">
            <h3 className="text-3xl font-black text-white">۱۲.۴</h3>
            <span className="text-sm text-gray-400">میلیون تومان</span>
          </div>
          <button className="mt-4 bg-trust-green text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-emerald-600 transition-colors">
            درخواست تسویه آنی
          </button>
        </div>

        {/* هزینه‌ها/کنسلی‌ها */}
        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100">
          <span className="text-xs font-bold text-gray-400">کل مبالغ مرجوعی (کنسلی)</span>
          <div className="flex items-center gap-2 mt-2">
            <h3 className="text-3xl font-black text-red-500">۱.۲</h3>
            <span className="text-sm text-gray-400">میلیون تومان</span>
          </div>
          <div className="flex items-center gap-1 text-red-400 text-xs font-bold mt-4">
            <FaArrowDown /> ۳٪ کاهش نسبت به هفته قبل
          </div>
        </div>
      </div>

      {/* ۳. بخش اصلی: لیست تراکنش‌ها و نمودار ساده */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* لیست آخرین تراکنش‌ها */}
        <div className="lg:col-span-2 bg-white rounded-[40px] p-8 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FaHistory className="text-gray-300" /> آخرین تراکنش‌های موفق
          </h3>
          
          <div className="space-y-4">
            {transactions.map((tr) => (
              <div key={tr.id} className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-md transition-all group">
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                    tr.status === 'success' ? 'bg-green-100 text-green-600' : 
                    tr.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'
                  }`}>
                    <FaFileInvoiceDollar />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">{tr.patient}</h4>
                    <span className="text-[10px] text-gray-400">{tr.type} | {tr.date}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-left">
                    <span className="block font-black text-gray-700">{tr.amount}</span>
                    <span className="text-[10px] text-gray-400">تومان</span>
                  </div>
                  <div className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                    tr.status === 'success' ? 'bg-green-100 text-green-700' : 
                    tr.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {tr.status === 'success' ? 'موفق' : tr.status === 'pending' ? 'در انتظار' : 'ناموفق'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* سایدبار مالی: آمار کلی سالانه */}
        <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100 flex flex-col">
           <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
             <FaChartBar className="text-trust-green" /> گزارش سالانه
           </h3>
           
           <div className="space-y-6 flex-1">
             {[
               { label: 'ویزیت حضوری', percent: 75, color: 'bg-trust-green' },
               { label: 'مشاوره آنلاین', percent: 40, color: 'bg-blue-400' },
               { label: 'خدمات پاراکلینیک', percent: 25, color: 'bg-pastel-gold' },
             ].map((item, idx) => (
               <div key={idx}>
                 <div className="flex justify-between text-xs font-bold mb-2">
                   <span className="text-gray-600">{item.label}</span>
                   <span className="text-gray-400">{item.percent}٪</span>
                 </div>
                 <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                   <div className={`${item.color} h-full transition-all duration-1000`} style={{ width: `${item.percent}%` }}></div>
                 </div>
               </div>
             ))}
           </div>

           <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-100 text-center text-xs text-blue-600 leading-relaxed font-bold">
             💡 بیشترین درآمد شما در ۳۰ روز اخیر از "ویزیت حضوری" بوده است.
           </div>
        </div>

      </div>
    </div>
  );
};

export default AdminFinance;