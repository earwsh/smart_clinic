import React, { useState, useEffect } from 'react';
import api from '../../api/axios'; // اینستنس اکسیس شما
import { 
  FaCog, FaUserCog, FaLock, FaBell, FaHospital, 
  FaSave, FaCamera, FaSync
} from 'react-icons/fa';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);

  // استیت جامع برای مدیریت تمام فیلدها (آماده برای API)
  const [formData, setFormData] = useState({
    doctorName: '',
    medicalId: '',
    bio: '',
    clinicAddress: '',
    clinicPhone: '',
    googleMaps: '',
    currentPassword: '',
    newPassword: ''
  });

  // ۱. دریافت اطلاعات فعلی تنظیمات از سرور (GET)
  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/settings');
      // مقداردهی اولیه فرم با داده‌های واقعی سرور
      setFormData(prev => ({
        ...prev,
        ...response.data,
        currentPassword: '', // پسوردها نباید از سمت سرور برگردند
        newPassword: ''
      }));
      setLoading(false);
    } catch (err) {
      console.error("Error fetching settings:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // هندلر تغییر ورودی‌ها
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ۲. تابع ذخیره تغییرات (PATCH)
  const handleSave = async () => {
    setSaveLoading(true);
    try {
      // ارسال کل آبجکت به بک‌اِند
      await api.patch('/admin/settings/update', formData);
      
      alert("تنظیمات با موفقیت بروزرسانی شد.");
      setSaveLoading(false);
      
      // اگر رمز عبور تغییر کرده بود، فیلدها را خالی کن
      setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '' }));
      
    } catch (err) {
      const errorMsg = err.response?.data?.message || "خطا در ذخیره اطلاعات. لطفا دسترسی اینترنت را چک کنید.";
      alert(errorMsg);
      setSaveLoading(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-96 text-gray-300">
      <FaSync className="animate-spin text-4xl mb-6 text-trust-green" />
      <p className="font-black italic uppercase tracking-widest text-xs">Syncing System Settings...</p>
    </div>
  );

  return (
    <div className="animate-fade-in pb-10 max-w-5xl mx-auto p-2 bg-[#FDFBF7]">
      
      {/* هدر صفحه */}
      <div className="mb-10 flex justify-between items-end px-4">
        <div>
          <h1 className="text-2xl font-black text-gray-800 flex items-center gap-3 italic">
            <FaCog className="text-trust-green animate-spin-slow" /> System Configuration
          </h1>
          <p className="text-[10px] text-gray-400 mt-1 font-black uppercase tracking-widest italic">Management of clinic identity and security</p>
        </div>
        <button onClick={fetchSettings} className="p-3 bg-white border border-gray-100 rounded-2xl text-trust-green shadow-sm hover:shadow-md transition-all active:scale-95">
           <FaSync size={14} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* منوی تب‌ها (سمت راست) */}
        <div className="w-full lg:w-72 space-y-3 shrink-0">
          {[
            { id: 'profile', label: 'Doctor Profile', icon: <FaUserCog /> },
            { id: 'clinic', label: 'Clinic Information', icon: <FaHospital /> },
            { id: 'security', label: 'Access & Security', icon: <FaLock /> },
            { id: 'notifications', label: 'Alerts & Notifications', icon: <FaBell /> },
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-7 py-5 rounded-[24px] font-black text-xs uppercase italic tracking-wider transition-all ${activeTab === tab.id ? 'bg-trust-green text-white shadow-2xl shadow-green-100 scale-105 z-10' : 'bg-white text-gray-400 border border-gray-50 hover:bg-gray-50'}`}
            >
              <span className="text-lg">{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>

        {/* محتوای تنظیمات (سمت چپ) */}
        <div className="flex-1 bg-white rounded-[50px] p-8 md:p-12 shadow-sm border border-gray-50 relative min-h-[550px] flex flex-col">
          
          {/* تب پروفایل */}
          {activeTab === 'profile' && (
            <div className="animate-fade-in space-y-10">
              <div className="flex flex-col items-center mb-6">
                <div className="relative group">
                  <img src="https://ui-avatars.com/api/?name=Dr+Naseh&background=E3F2FD&color=047857&size=150" className="w-40 h-40 rounded-[55px] border-4 border-white shadow-2xl object-cover transition-transform group-hover:scale-105 duration-500" alt="" />
                  <button className="absolute -bottom-2 -right-2 bg-gray-900 text-white p-4 rounded-[22px] border-4 border-white hover:scale-110 transition-transform shadow-xl group-hover:bg-trust-green active:scale-90">
                    <FaCamera size={18} />
                  </button>
                </div>
                <p className="mt-5 text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] italic">Update Profile Image</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 mr-2 uppercase tracking-tighter italic">Doctor Full Name</label>
                  <input type="text" name="doctorName" value={formData.doctorName} onChange={handleChange} className="w-full bg-gray-50 border border-transparent rounded-2xl p-5 font-black text-gray-700 focus:bg-white focus:border-trust-green/20 focus:ring-4 focus:ring-trust-green/5 outline-none transition-all italic" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 mr-2 uppercase tracking-tighter italic">Medical License ID</label>
                  <input type="text" name="medicalId" value={formData.medicalId} onChange={handleChange} className="w-full bg-gray-50 border border-transparent rounded-2xl p-5 font-black text-gray-700 focus:bg-white focus:border-trust-green/20 focus:ring-4 focus:ring-trust-green/5 outline-none transition-all font-mono italic" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-gray-400 mr-2 uppercase tracking-tighter italic">Professional Biography</label>
                  <textarea name="bio" rows="4" value={formData.bio} onChange={handleChange} className="w-full bg-gray-50 border border-transparent rounded-[32px] p-6 font-bold text-gray-600 focus:bg-white focus:border-trust-green/20 focus:ring-4 focus:ring-trust-green/5 outline-none transition-all resize-none leading-relaxed italic"></textarea>
                </div>
              </div>
            </div>
          )}

          {/* تب اطلاعات مطب */}
          {activeTab === 'clinic' && (
            <div className="animate-fade-in space-y-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 mr-2 uppercase tracking-tighter italic">Clinic Physical Address</label>
                <input type="text" name="clinicAddress" value={formData.clinicAddress} onChange={handleChange} className="w-full bg-gray-50 border border-transparent rounded-2xl p-5 font-black text-gray-700 focus:bg-white focus:border-trust-green/20 focus:ring-4 focus:ring-trust-green/5 outline-none transition-all italic" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 mr-2 uppercase tracking-tighter italic">Landline Phone Number</label>
                  <input type="tel" name="clinicPhone" value={formData.clinicPhone} onChange={handleChange} className="w-full bg-gray-50 border border-transparent rounded-2xl p-5 font-black text-gray-700 font-mono text-right dir-ltr focus:bg-white transition-all italic" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 mr-2 uppercase tracking-tighter italic">Google Maps Location Link</label>
                  <input type="text" name="googleMaps" value={formData.googleMaps} onChange={handleChange} placeholder="https://goo.gl/maps/..." className="w-full bg-gray-50 border border-transparent rounded-2xl p-5 font-bold text-gray-400 text-xs text-right dir-ltr focus:bg-white transition-all" />
                </div>
              </div>
            </div>
          )}

          {/* تب امنیت */}
          {activeTab === 'security' && (
            <div className="animate-fade-in space-y-10">
              <div className="bg-amber-50 border border-amber-100 p-8 rounded-[35px] flex items-start gap-6 shadow-inner shadow-amber-200/20">
                 <div className="w-12 h-12 bg-amber-500 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-amber-200"><FaLock size={18} /></div>
                 <div>
                    <h5 className="font-black text-amber-800 text-sm italic uppercase tracking-tighter">Security Protocol</h5>
                    <p className="text-[11px] text-amber-700/60 font-bold mt-2 leading-relaxed">To protect patient confidentiality, we recommend updating your administrative password every 90 days. Use a combination of symbols, numbers, and letters.</p>
                 </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 mr-2 uppercase tracking-tighter italic">Current Password</label>
                  <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleChange} className="w-full bg-gray-50 border border-transparent rounded-2xl p-5 font-black text-gray-700 focus:bg-white outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 mr-2 uppercase tracking-tighter italic">New Secure Password</label>
                  <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} className="w-full bg-gray-50 border border-transparent rounded-2xl p-5 font-black text-gray-700 focus:bg-white outline-none transition-all" />
                </div>
              </div>
            </div>
          )}

          {/* دکمه ذخیره نهایی (ثابت در فوتر کارت) */}
          <div className="mt-auto pt-10 border-t border-gray-50 flex justify-end">
            <button 
              onClick={handleSave}
              disabled={saveLoading}
              className={`bg-trust-green text-white px-12 py-5 rounded-[26px] font-black shadow-2xl shadow-green-200 hover:bg-emerald-700 hover:-translate-y-1 active:scale-95 transition-all flex items-center gap-4 italic text-sm ${saveLoading && 'opacity-60 pointer-events-none'}`}
            >
              {saveLoading ? <FaSync className="animate-spin" /> : <FaSave size={16} />}
              Apply & Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminSettings;