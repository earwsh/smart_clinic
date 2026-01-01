import React, { useState } from 'react';
import { 
  FaUserInjured, FaSearch, FaPlus, FaFileMedicalAlt, 
  FaHistory, FaTimes, FaPhoneAlt, FaBirthdayCake, 
  FaSave, FaStickyNote, FaImage, FaFilter, FaGlobe, FaLink
} from 'react-icons/fa';

const AdminPatients = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activeTab, setActiveTab] = useState('history');
  const [searchQuery, setSearchQuery] = useState('');

  // داده‌های پیشرفته بیماران با ذکر منبع ورود
  const [patients] = useState([
    { 
      id: 1, name: 'علی رضایی', phone: '09121112222', age: 32, 
      lastVisit: '1404/10/15', condition: 'دیسک کمر', status: 'under_treatment', 
      source: 'Direct', // سایت خودتان
      avatar: 'https://ui-avatars.com/api/?name=Ali+Rezaei&background=E3F2FD' 
    },
    { 
      id: 2, name: 'زهرا حسینی', phone: '09123334444', age: 58, 
      lastVisit: '1404/09/20', condition: 'آرتروز زانو', status: 'completed', 
      source: 'DoctorYab', // سایت خارجی ۱
      avatar: 'https://ui-avatars.com/api/?name=Zahra+Hosseini&background=F3E5F5' 
    },
    { 
      id: 3, name: 'رضا کمالی', phone: '09351234567', age: 24, 
      lastVisit: '1404/10/01', condition: 'کتف درد', status: 'critical', 
      source: 'Nobat.ir', // سایت خارجی ۲
      avatar: 'https://ui-avatars.com/api/?name=Reza+Kamali&background=E8F5E9' 
    }
  ]);

  const getSourceBadge = (source) => {
    switch(source) {
      case 'Direct': return <span className="flex items-center gap-1 text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded-md font-bold border border-blue-100"><FaGlobe /> سایت اصلی</span>;
      case 'DoctorYab': return <span className="flex items-center gap-1 text-[10px] bg-purple-50 text-purple-600 px-2 py-1 rounded-md font-bold border border-purple-100"><FaLink /> دکتریاب</span>;
      case 'Nobat.ir': return <span className="flex items-center gap-1 text-[10px] bg-orange-50 text-orange-600 px-2 py-1 rounded-md font-bold border border-orange-100"><FaLink /> نوبت‌دات‌آی‌آر</span>;
      default: return <span className="text-[10px] bg-gray-50 text-gray-500 px-2 py-1 rounded-md font-bold">سایر</span>;
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      under_treatment: 'bg-blue-50 text-blue-700 border-blue-200',
      completed: 'bg-green-50 text-green-700 border-green-200',
      critical: 'bg-red-50 text-red-700 border-red-200',
    };
    const labels = { under_treatment: 'تحت درمان', completed: 'ترخیص شده', critical: 'وضعیت حاد' };
    return <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${styles[status]}`}>{labels[status]}</span>;
  };

  return (
    <div className="animate-fade-in pb-10 space-y-6">
      
      {/* هدر */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaUserInjured className="text-trust-green" /> بانک اطلاعات مراجعین
          </h1>
          <p className="text-sm text-gray-500 mt-1">مدیریت متمرکز بیماران تمام پلتفرم‌ها</p>
        </div>
        <button className="bg-trust-green text-white px-6 py-3 rounded-2xl shadow-lg hover:bg-emerald-700 font-bold transition-all flex items-center gap-2">
          <FaPlus /> افزودن بیمار دستی
        </button>
      </div>

      {/* ابزار جستجو و فیلتر پیشرفته */}
      <div className="bg-white p-5 rounded-[28px] shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <input 
            type="text" 
            placeholder="جستجوی نام، موبایل یا کد ملی..." 
            className="w-full bg-gray-50 border-none rounded-2xl py-3.5 pr-12 pl-4 focus:ring-2 focus:ring-trust-green/20 transition-all outline-none"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute right-4 top-4 text-gray-300" />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
           <button className="flex items-center gap-2 bg-gray-50 text-gray-600 px-5 py-3 rounded-2xl font-bold border border-gray-100 hover:bg-white transition-all text-sm">
             <FaFilter className="text-gray-400" /> فیلتر منبع
           </button>
        </div>
      </div>

      {/* لیست بیماران */}
      <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="p-6 text-sm font-black text-gray-400">نام بیمار</th>
                <th className="p-6 text-sm font-black text-gray-400">منبع ورود</th>
                <th className="p-6 text-sm font-black text-gray-400 text-center">وضعیت</th>
                <th className="p-6 text-sm font-black text-gray-400">آخرین ویزیت</th>
                <th className="p-6 text-sm font-black text-gray-400 text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {patients.map((p) => (
                <tr key={p.id} className="hover:bg-green-50/30 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <img src={p.avatar} className="w-12 h-12 rounded-2xl shadow-sm" alt="" />
                      <div>
                        <h4 className="font-bold text-gray-800 group-hover:text-trust-green transition-colors">{p.name}</h4>
                        <span className="text-xs text-gray-400 font-mono">{p.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    {getSourceBadge(p.source)}
                  </td>
                  <td className="p-6 text-center">
                    {getStatusBadge(p.status)}
                  </td>
                  <td className="p-6">
                    <div className="text-sm font-bold text-gray-600">{p.lastVisit}</div>
                    <div className="text-[10px] text-gray-400 mt-1">{p.condition}</div>
                  </td>
                  <td className="p-6">
                    <div className="flex justify-center">
                      <button 
                        onClick={() => {setSelectedPatient(p); setShowProfileModal(true);}}
                        className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-xl hover:bg-trust-green hover:text-white hover:border-trust-green transition-all shadow-sm font-bold text-xs"
                      >
                        <FaFileMedicalAlt /> پرونده
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* مودال پرونده در اینجا مشابه کد قبلی باقی می‌ماند با این تفاوت که در هدر آن منبع ورود هم نمایش داده می‌شود */}
    </div>
  );
};

export default AdminPatients;