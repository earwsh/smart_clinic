import React, { useState, useEffect } from 'react';
import api from '../../api/axios'; // اینستنس اکسیس شما
import { 
  FaUserMd, FaGraduationCap, FaAward, FaMapMarkerAlt, 
  FaPhoneAlt, FaInstagram, FaTelegramPlane, FaSync 
} from 'react-icons/fa';

const Bio = () => {
  const [loading, setLoading] = useState(true);
  const [doctorInfo, setDoctorInfo] = useState({
    name: '',
    specialty: '',
    bio: '',
    address: '',
    phone: '',
    socials: { instagram: '', telegram: '' },
    experience: []
  });

  // ۱. دریافت اطلاعات کامل رزومه پزشک از API (GET)
  const fetchBioData = async () => {
    try {
      setLoading(true);
      // فراخوانی اندپوینت رزومه: /api/v1/doctor/profile
      const response = await api.get('/doctor/profile');
      
      setDoctorInfo(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Bio API Error:", err);
      // در صورت خطا، نمایش پیام یا داده‌های پیش‌فرض
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBioData();
  }, []);

  if (loading) return (
    <div className="h-[calc(100vh-140px)] flex flex-col items-center justify-center text-gray-300">
      <FaSync className="animate-spin text-4xl mb-6 text-trust-green" />
      <p className="font-black italic uppercase tracking-widest text-xs">Syncing Doctor Profile...</p>
    </div>
  );

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col animate-fade-in bg-[#FDFBF7] p-2">
      
      {/* هدر پروفایل (پویا) */}
      <div className="bg-white p-6 rounded-[32px] border border-gray-100 mb-6 relative overflow-hidden shadow-sm shrink-0">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-trust-green to-emerald-800 opacity-90 shadow-lg"></div>
        
        <div className="relative flex flex-col md:flex-row items-center md:items-end gap-6 pt-8 px-4">
          <div className="w-36 h-36 rounded-[45px] border-4 border-white shadow-2xl overflow-hidden bg-white z-10 shrink-0 transform hover:scale-105 transition-transform duration-500">
            <img 
              src={doctorInfo.avatar || `https://ui-avatars.com/api/?name=${doctorInfo.name}&background=E3F2FD&color=047857&size=256`} 
              alt={doctorInfo.name} 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 text-center md:text-right mb-2">
            <h1 className="text-3xl font-black text-gray-800 mb-1 italic">{doctorInfo.name}</h1>
            <p className="text-trust-green font-black text-sm flex items-center justify-center md:justify-start gap-2 uppercase tracking-tight">
              <FaUserMd /> {doctorInfo.specialty}
            </p>
          </div>

          <div className="flex gap-3 mb-4">
            <a href={doctorInfo.socials?.instagram} target="_blank" className="w-11 h-11 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gradient-to-tr hover:from-amber-400 hover:to-purple-600 hover:text-white transition-all shadow-sm border border-gray-100 active:scale-90">
              <FaInstagram size={20} />
            </a>
            <a href={doctorInfo.socials?.telegram} target="_blank" className="w-11 h-11 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-400 hover:text-white transition-all shadow-sm border border-gray-100 active:scale-90">
              <FaTelegramPlane size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* محتوای پایینی (گرید) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* ستون اطلاعات تماس */}
        <div className="lg:col-span-1 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
          
          <div className="bg-white p-7 rounded-[35px] border border-gray-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-1 h-full bg-trust-green opacity-20"></div>
            <h3 className="font-black text-gray-800 mb-5 border-b border-gray-50 pb-4 text-xs flex items-center gap-3 italic uppercase tracking-widest">
              About Physician
            </h3>
            <p className="text-gray-500 text-xs leading-[2.2] text-justify font-bold italic">
              {doctorInfo.bio}
            </p>
          </div>

          <div className="bg-white p-7 rounded-[35px] border border-gray-100 shadow-sm">
            <h3 className="font-black text-gray-800 mb-6 border-b border-gray-50 pb-4 text-xs flex items-center gap-3 italic uppercase tracking-widest">
               Contact Channels
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-5">
                <div className="w-11 h-11 rounded-2xl bg-green-50 text-trust-green flex items-center justify-center shrink-0 border border-green-100 shadow-inner">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <span className="block font-black text-gray-800 text-[10px] uppercase tracking-tighter italic">Clinic Address:</span>
                  <p className="text-[11px] text-gray-400 mt-1.5 font-bold leading-relaxed italic">{doctorInfo.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 border border-blue-100 shadow-inner">
                  <FaPhoneAlt />
                </div>
                <div>
                  <span className="block font-black text-gray-800 text-[10px] uppercase tracking-tighter italic">Official Hotline:</span>
                  <p className="text-sm text-gray-500 mt-1.5 dir-ltr text-right font-black font-mono tracking-widest">{doctorInfo.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ستون تایم‌لاین سوابق (پویا از API) */}
        <div className="lg:col-span-2 h-full min-h-0 bg-white rounded-[50px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-8 pb-4 sticky top-0 bg-white/90 backdrop-blur-md z-10 flex justify-between items-center border-b border-gray-50">
               <h3 className="font-black text-gray-800 text-xl flex items-center gap-4 italic uppercase tracking-tighter">
                  <FaGraduationCap className="text-trust-green" /> Academic & Professional Timeline
               </h3>
               <button onClick={fetchBioData} className="text-trust-green hover:rotate-180 transition-transform duration-500">
                  <FaSync size={14} />
               </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 pt-6 custom-scrollbar">
              <div className="relative border-r-2 border-dashed border-gray-100 mr-5 space-y-12 pb-10">
                
                {doctorInfo.experience?.length > 0 ? (
                  doctorInfo.experience.map((exp) => (
                    <div key={exp.id} className="relative pr-12 group">
                      <div className="absolute top-0 -right-[12px] w-5 h-5 rounded-full bg-white border-4 border-trust-green shadow-lg group-hover:scale-125 transition-transform"></div>
                      <div className="bg-gray-50/40 p-7 rounded-[35px] border border-transparent hover:border-gray-200 hover:bg-white transition-all shadow-sm hover:shadow-xl group-hover:-translate-x-2">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-3 mb-4">
                          <h4 className="font-black text-gray-800 text-lg italic tracking-tight">{exp.title}</h4>
                          <span className="text-[10px] bg-trust-green text-white px-4 py-1.5 rounded-xl font-black font-mono shadow-md shadow-green-100 italic uppercase tracking-widest">{exp.period}</span>
                        </div>
                        <p className="text-xs text-trust-green font-black flex items-center gap-2 mb-3 italic">
                          <FaAward size={14} /> {exp.center}
                        </p>
                        <p className="text-[11px] text-gray-400 font-bold leading-loose italic text-justify">{exp.desc}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-20 text-gray-300 font-black italic">No records available currently.</p>
                )}

              </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Bio;