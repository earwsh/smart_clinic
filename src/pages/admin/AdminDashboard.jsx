import React from 'react';
import { FaUserInjured, FaCalendarCheck, FaWallet, FaChartLine } from 'react-icons/fa';

const AdminDashboard = () => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">نمای کلی وضعیت کلینیک</h1>
      
      {/* کارت‌های آمار */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs font-bold mb-1">کل بیماران امروز</p>
            <h3 className="text-3xl font-bold text-gray-800">۱۲ <span className="text-sm text-gray-400">نفر</span></h3>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center text-xl">
            <FaUserInjured />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs font-bold mb-1">نوبت‌های رزرو شده</p>
            <h3 className="text-3xl font-bold text-gray-800">۴۵ <span className="text-sm text-gray-400">مورد</span></h3>
          </div>
          <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-xl flex items-center justify-center text-xl">
            <FaCalendarCheck />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs font-bold mb-1">درآمد امروز</p>
            <h3 className="text-3xl font-bold text-gray-800">۳.۵ <span className="text-sm text-gray-400">میلیون</span></h3>
          </div>
          <div className="w-12 h-12 bg-green-50 text-trust-green rounded-xl flex items-center justify-center text-xl">
            <FaWallet />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs font-bold mb-1">رشد ماهانه</p>
            <h3 className="text-3xl font-bold text-gray-800 flex items-center gap-1 text-green-500">
              ۱۵٪+ <FaChartLine className="text-lg" />
            </h3>
          </div>
          <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center text-xl">
             📈
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-64 flex items-center justify-center text-gray-400">
           نمودار مراجعات (به زودی)
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-64 flex items-center justify-center text-gray-400">
           لیست آخرین نوبت‌ها (به زودی)
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;