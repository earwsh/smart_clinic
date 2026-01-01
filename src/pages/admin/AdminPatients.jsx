import React, { useState, useEffect } from 'react';
import api from '../../api/axios'; // اینستنس اکسیس شما
import { 
  FaUserInjured, FaSearch, FaPlus, FaFileMedicalAlt, 
  FaTimes, FaPhoneAlt, FaFilter, FaGlobe, FaLink, FaFolderOpen, FaSync
} from 'react-icons/fa';

const AdminPatients = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientHistory, setPatientHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [patients, setPatients] = useState([]);

  // ۱. دریافت لیست بیماران با قابلیت فیلتر (GET)
  const fetchPatients = async () => {
    try {
      setLoading(true);
      // ارسال کوئری جستجو به سمت سرور: /api/v1/patients?q=ali
      const response = await api.get('/patients', {
        params: { q: searchQuery }
      });
      setPatients(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching patients:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [searchQuery]);

  // ۲. دریافت سوابق پزشکی کامل بیمار (GET)
  const handleViewProfile = async (patient) => {
    setSelectedPatient(patient);
    setShowProfileModal(true);
    setHistoryLoading(true);
    try {
      // دریافت سوابق از اندپوینت اختصاصی: /api/v1/patients/1/history
      const response = await api.get(`/patients/${patient.id}/history`);
      setPatientHistory(response.data);
      setHistoryLoading(false);
    } catch (error) {
      console.error("Error fetching medical history:", error);
      setHistoryLoading(false);
    }
  };

  const getSourceBadge = (source) => {
    const configs = {
      'Direct': { label: 'سایت اصلی', color: 'bg-blue-50 text-blue-600 border-blue-100', icon: <FaGlobe /> },
      'DoctorYab': { label: 'دکتریاب', color: 'bg-purple-50 text-purple-600 border-purple-100', icon: <FaLink /> },
      'Nobat.ir': { label: 'نوبت‌دات‌آی‌آر', color: 'bg-orange-50 text-orange-600 border-orange-100', icon: <FaLink /> }
    };
    const config = configs[source] || { label: 'سایر', color: 'bg-gray-50 text-gray-500 border-gray-100', icon: null };
    return (
      <span className={`flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-lg font-black border ${config.color}`}>
        {config.icon} {config.label}
      </span>
    );
  };

  return (
    <div className="animate-fade-in pb-10 space-y-6 p-2 bg-[#FDFBF7]">
      
      {/* هدر */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-black text-gray-800 flex items-center gap-3 italic">
            <FaUserInjured className="text-trust-green" /> Patient Database
          </h1>
          <p className="text-[10px] text-gray-400 mt-1 font-black uppercase tracking-widest italic">Centralized medical records management</p>
        </div>
        <button className="bg-trust-green text-white px-8 py-4 rounded-[22px] shadow-xl shadow-green-100 hover:bg-emerald-700 font-black transition-all flex items-center gap-3 active:scale-95 text-sm uppercase italic">
          <FaPlus size={14} /> Add New Patient
        </button>
      </div>

      {/* ابزار جستجو */}
      <div className="bg-white p-6 rounded-[35px] shadow-sm border border-gray-50 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <input 
            type="text" 
            placeholder="جستجوی نام، شماره تماس یا کد ملی..." 
            className="w-full bg-gray-50 border border-transparent rounded-[20px] py-4 pr-14 pl-4 font-bold text-gray-700 focus:bg-white focus:border-trust-green/20 focus:ring-4 focus:ring-trust-green/5 transition-all outline-none"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute right-6 top-5 text-gray-300" />
        </div>
        <button className="flex items-center gap-3 bg-gray-50 text-gray-400 px-7 py-4 rounded-[20px] font-black border border-gray-100 hover:bg-white hover:text-trust-green transition-all text-xs uppercase italic">
          <FaFilter /> Advanced Filter
        </button>
      </div>

      {/* جدول لیست بیماران */}
      <div className="bg-white rounded-[45px] shadow-sm border border-gray-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest italic">Identity</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest italic text-center">Acquisition Source</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest italic text-center">Last Visit Date</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest italic text-center">Clinical Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                [...Array(4)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan="4" className="p-10"><div className="h-10 bg-gray-50 rounded-2xl w-full"></div></td>
                  </tr>
                ))
              ) : patients.length > 0 ? (
                patients.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/30 transition-all group">
                    <td className="p-6">
                      <div className="flex items-center gap-5">
                        <img src={p.avatar} className="w-16 h-16 rounded-3xl shadow-sm border-2 border-white object-cover" />
                        <div>
                          <h4 className="font-black text-gray-800 italic group-hover:text-trust-green transition-colors">{p.name}</h4>
                          <span className="text-[11px] text-gray-400 font-black font-mono tracking-tighter italic">{p.phone} • {p.age} Years Old</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex justify-center">{getSourceBadge(p.source)}</div>
                    </td>
                    <td className="p-6 text-center">
                      <div className="text-xs font-black text-gray-600 font-mono italic">{p.lastVisit}</div>
                      <div className="text-[9px] text-gray-300 font-black mt-1 uppercase tracking-tighter italic">{p.condition}</div>
                    </td>
                    <td className="p-6">
                      <div className="flex justify-center">
                        <button 
                          onClick={() => handleViewProfile(p)}
                          className="flex items-center gap-3 bg-white border border-gray-100 text-gray-400 px-6 py-3 rounded-2xl hover:bg-trust-green hover:text-white hover:border-trust-green transition-all shadow-sm font-black text-[10px] uppercase italic tracking-widest"
                        >
                          <FaFileMedicalAlt size={12} /> Open Records
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-24 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-200">
                      <FaFolderOpen size={50} className="mb-4 opacity-20" />
                      <p className="font-black text-sm italic uppercase tracking-tighter">No patient records found in database</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* مودال حرفه‌ای پرونده الکترونیک (EHR) */}
      {showProfileModal && selectedPatient && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-md animate-fade-in">
          <div className="bg-white w-full max-w-5xl rounded-[55px] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] animate-zoom-in border border-white/20">
             <div className="w-full md:w-85 bg-gray-50/50 p-10 border-l border-gray-100 flex flex-col items-center text-center backdrop-blur-sm">
                <img src={selectedPatient.avatar} className="w-40 h-40 rounded-[50px] shadow-2xl border-4 border-white mb-8 object-cover" />
                <h3 className="text-2xl font-black text-gray-800 italic uppercase tracking-tighter">{selectedPatient.name}</h3>
                <p className="text-[10px] font-black text-gray-400 mt-2 mb-10 italic uppercase tracking-widest">Case ID: #PN-{selectedPatient.id}00X</p>
                
                <div className="w-full space-y-4">
                   <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 text-right">
                      <p className="text-[9px] font-black text-gray-400 uppercase italic mb-1 tracking-widest">Contact Phone</p>
                      <p className="text-sm font-black text-gray-700 font-mono tracking-widest">{selectedPatient.phone}</p>
                   </div>
                </div>
                
                <button onClick={() => setShowProfileModal(false)} className="mt-auto w-full py-5 bg-gray-900 text-white rounded-[22px] font-black text-xs flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all uppercase tracking-widest italic">
                  <FaTimes /> Close Records
                </button>
             </div>

             <div className="flex-1 p-10 overflow-y-auto custom-scrollbar bg-white">
                <h4 className="font-black text-gray-800 text-xl mb-10 flex items-center gap-4 italic uppercase tracking-tighter underline decoration-trust-green decoration-4 underline-offset-[12px]">
                   Clinical History & Diagnostics
                </h4>
                
                <div className="space-y-6">
                   {historyLoading ? (
                      <div className="py-20 flex flex-col items-center text-gray-300 gap-4 font-black italic">
                         <FaSync className="animate-spin text-2xl" />
                         Fetching diagnostic logs...
                      </div>
                   ) : patientHistory.length > 0 ? (
                      patientHistory.map((log, i) => (
                        <div key={i} className="p-6 border border-gray-50 rounded-[35px] hover:bg-green-50/30 transition-colors group relative overflow-hidden">
                           <div className="flex justify-between items-center mb-4">
                              <span className="text-[9px] font-black text-trust-green bg-green-50 px-4 py-1.5 rounded-xl border border-green-100 uppercase italic tracking-widest">{log.type || 'Clinical Visit'}</span>
                              <span className="text-[10px] text-gray-400 font-mono font-black italic">{log.date}</span>
                           </div>
                           <p className="text-xs text-gray-600 font-bold leading-[2] text-justify italic">{log.notes || 'No clinical notes recorded for this session.'}</p>
                        </div>
                      ))
                   ) : (
                      <p className="text-center py-20 text-gray-300 font-black italic">No history available for this patient.</p>
                   )}
                </div>
             </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminPatients;