import React, { useState } from 'react';
import api from '../../api/axios'; // اینستنس اکسیس شما
import { FaUser, FaLock, FaMobileAlt, FaArrowLeft, FaGoogle, FaShieldAlt, FaSync } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // استیت فرم برای ارسال به بک‌اِند
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // تابع مدیریت ورود/ثبت‌نام (API Integration)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // اعتبارسنجی اولیه ساده
    if (!formData.phone || !formData.password) {
      setError("لطفاً شماره موبایل و رمز عبور را وارد کنید.");
      setLoading(false);
      return;
    }

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      
      // ارسال درخواست به سرور
      const response = await api.post(endpoint, formData);
      
      // ذخیره توکن در مرورگر برای استفاده در Axios Interceptor
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      // هدایت کاربر (بسته به نقش یا نیاز پروژه)
      // اگر ادمین بود به /admin، اگر بیمار بود به داشبورد
      navigate('/'); 

    } catch (err) {
      // دریافت پیام خطا از پاسخ بک‌اِند
      const serverError = err.response?.data?.message || "خطا در احراز هویت. لطفا دوباره تلاش کنید.";
      setError(serverError);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#FDFBF7]">
      
      {/* المان‌های بصری پس‌زمینه */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-trust-green/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-amber-100/20 rounded-full blur-3xl"></div>

      {/* کارت اصلی ورود */}
      <div className="bg-white w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-[40px] overflow-hidden shadow-2xl relative z-10 animate-fade-in min-h-[650px] border border-gray-50">
        
        {/* بخش فرم (راست) */}
        <div className="p-8 md:p-12 flex flex-col justify-center bg-white/40 backdrop-blur-xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-[28px] bg-green-50 text-trust-green mb-6 shadow-inner border border-green-100/50">
              <FaShieldAlt size={32} />
            </div>
            <h2 className="text-3xl font-black text-gray-800 mb-3 italic uppercase tracking-tighter italic">
              {isLogin ? 'Authentication' : 'Registration'}
            </h2>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">
              {isLogin ? 'Enter your credentials to continue' : 'Join our medical community today'}
            </p>
          </div>

          {/* نمایش خطاها */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 text-[10px] font-black rounded-2xl border border-red-100 text-center uppercase italic tracking-wider animate-shake">
               {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="relative group">
                <FaUser className="absolute right-5 top-5 text-gray-300 group-focus-within:text-trust-green transition-colors" />
                <input 
                  type="text" 
                  name="fullName"
                  placeholder="Full Name" 
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full pl-4 pr-14 py-4 bg-gray-50/50 border border-transparent rounded-2xl focus:bg-white focus:border-trust-green/30 focus:ring-4 focus:ring-trust-green/5 transition-all outline-none font-black text-gray-700 italic"
                />
              </div>
            )}
            
            <div className="relative group">
              <FaMobileAlt className="absolute right-5 top-5 text-gray-300 group-focus-within:text-trust-green transition-colors" />
              <input 
                type="tel" 
                name="phone"
                placeholder="Mobile Number" 
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-4 pr-14 py-4 bg-gray-50/50 border border-transparent rounded-2xl focus:bg-white focus:border-trust-green/30 focus:ring-4 focus:ring-trust-green/5 transition-all outline-none font-black font-mono tracking-widest text-left"
              />
            </div>

            <div className="relative group">
              <FaLock className="absolute right-5 top-5 text-gray-300 group-focus-within:text-trust-green transition-colors" />
              <input 
                type="password" 
                name="password"
                placeholder="Password" 
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-4 pr-14 py-4 bg-gray-50/50 border border-transparent rounded-2xl focus:bg-white focus:border-trust-green/30 focus:ring-4 focus:ring-trust-green/5 transition-all outline-none font-black"
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className={`w-full bg-trust-green text-white font-black py-5 rounded-[22px] shadow-2xl shadow-green-200 transition-all active:scale-95 flex items-center justify-center gap-4 italic uppercase text-xs tracking-widest ${loading ? 'opacity-60 pointer-events-none' : 'hover:bg-emerald-700 hover:-translate-y-1'}`}
            >
              {loading ? <FaSync className="animate-spin" /> : (isLogin ? 'Sign In Now' : 'Create Account')}
            </button>
          </form>

          <div className="mt-12 flex items-center gap-4">
            <div className="h-px bg-gray-100 flex-1"></div>
            <span className="text-gray-300 text-[9px] font-black uppercase tracking-[0.3em]">Social Login</span>
            <div className="h-px bg-gray-100 flex-1"></div>
          </div>

          <button className="w-full mt-8 flex items-center justify-center gap-4 bg-white border border-gray-100 py-4 rounded-2xl hover:bg-gray-50 transition-all text-gray-500 font-black text-[10px] shadow-sm active:scale-95 uppercase tracking-widest italic">
            <FaGoogle className="text-red-500" /> Continue with Google
          </button>

          <div className="mt-12 text-center">
            <span className="text-[11px] font-bold text-gray-400 italic">
              {isLogin ? "Don't have an account?" : 'Already registered?'}
            </span>
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="mr-2 text-trust-green font-black text-xs hover:underline decoration-2 underline-offset-8 uppercase italic"
            >
              {isLogin ? 'Register Here' : 'Log In Here'}
            </button>
          </div>
        </div>

        {/* بخش برندینگ (چپ) */}
        <div className="hidden md:flex flex-col justify-between p-16 bg-gradient-to-br from-trust-green to-[#047857] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')] opacity-10"></div>
          
          <div className="relative z-10">
            <h3 className="text-5xl font-black mb-8 leading-tight italic tracking-tighter">
              Seamless Care,<br/>Better Results.
            </h3>
            <p className="text-green-50 font-bold leading-loose opacity-80 text-justify text-sm italic">
              با پیوستن به سامانه دکتر ناصح یوسفی، مدیریت سلامت شما از نوبت‌دهی تا دریافت نسخه و مشاوره زنده، کاملاً دیجیتال و بدون اتلاف وقت انجام خواهد شد.
            </p>
          </div>

          <div className="relative z-10 mt-10">
            <div className="bg-white/10 backdrop-blur-2xl p-8 rounded-[40px] border border-white/20 mb-10 shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
              <div className="flex items-center gap-5 mb-5">
                <div className="flex -space-x-3 rtl:space-x-reverse">
                   <div className="w-11 h-11 rounded-full bg-blue-100 border-2 border-trust-green shadow-lg"></div>
                   <div className="w-11 h-11 rounded-full bg-amber-100 border-2 border-trust-green shadow-lg"></div>
                   <div className="w-11 h-11 rounded-full bg-red-100 border-2 border-trust-green shadow-lg"></div>
                </div>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">+1.2K Verified Patients</span>
              </div>
              <p className="text-xs text-green-50 font-black leading-loose italic">"پلتفرم فوق‌العاده سریع و کاربرپسند. نوبت گرفتن هرگز به این سادگی نبود!"</p>
            </div>
            
            <Link to="/" className="inline-flex items-center gap-4 text-[10px] font-black text-white hover:translate-x-[-12px] transition-transform uppercase tracking-[0.3em] italic bg-white/5 px-6 py-3 rounded-full border border-white/10">
              <FaArrowLeft /> Back to home
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Login;