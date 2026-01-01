import React, { useState } from 'react';
import { 
  FaPaperPlane, 
  FaPaperclip, 
  FaMicrophone, 
  FaUserMd, 
  FaCircle, 
  FaFileMedicalAlt, 
  FaImage 
} from 'react-icons/fa';

const Consult = () => {
  const [message, setMessage] = useState('');

  // داده‌های ساختگی چت (شبیه‌سازی مکالمه با دکتر)
  const [chats, setChats] = useState([
    { 
      id: 1, 
      sender: 'doctor', 
      text: 'سلام علی جان. وقت بخیر. نتیجه MRI که فرستادی رو دیدم. خوشبختانه مشکل دیسک جدی نیست.', 
      time: '14:30',
      type: 'text'
    },
    { 
      id: 2, 
      sender: 'doctor', 
      text: 'برات چند تا حرکت اصلاحی نوشتم که باید روزی ۲ بار انجام بدی. فایلش رو پایین می‌فرستم.', 
      time: '14:32',
      type: 'text'
    },
    { 
      id: 3, 
      sender: 'doctor', 
      text: 'برنامه_تمرینی_کمر.pdf', 
      time: '14:32',
      type: 'file'
    },
    { 
      id: 4, 
      sender: 'patient', 
      text: 'سلام دکتر، خیلی ممنون. چشم حتما انجام میدم. آیا نیازی هست داروی خاصی مصرف کنم؟', 
      time: '14:45',
      type: 'text'
    },
    { 
      id: 5, 
      sender: 'doctor', 
      text: 'فعلاً فقط مسکن ساده در صورت درد شدید. هفته آینده دوباره وضعیتت رو چک می‌کنیم.', 
      time: '15:10',
      type: 'text'
    },
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // اضافه کردن پیام جدید به لیست
    const newMsg = {
      id: Date.now(),
      sender: 'patient',
      text: message,
      time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    };
    
    setChats([...chats, newMsg]);
    setMessage('');
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-140px)] animate-fade-in flex flex-col md:flex-row gap-6">
      
      {/* سایدبار لیست پزشکان (در موبایل مخفی می‌شود) */}
      <div className="hidden md:flex flex-col w-1/3 glass-panel rounded-3xl p-4 border border-white/60 h-full">
        <div className="mb-4 relative">
          <input 
            type="text" 
            placeholder="جستجو در گفتگوها..." 
            className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-trust-green transition-all"
          />
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2">
          {/* آیتم فعال */}
          <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border-r-4 border-trust-green cursor-pointer">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=Dr+Naseh&background=E3F2FD&color=047857" alt="دکتر" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-bold text-gray-800 text-sm truncate">دکتر ناصح یوسفی</h4>
                <span className="text-xs text-trust-green font-bold">۱۵:۱۰</span>
              </div>
              <p className="text-xs text-gray-500 truncate">فعلاً فقط مسکن ساده...</p>
            </div>
          </div>

          {/* آیتم غیر فعال */}
          <div className="flex items-center gap-3 p-3 hover:bg-white/40 rounded-xl transition-colors cursor-pointer opacity-70">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center border-2 border-white">
              <FaUserMd className="text-pastel-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-bold text-gray-700 text-sm">پشتیبانی فنی</h4>
                <span className="text-xs text-gray-400">دیروز</span>
              </div>
              <p className="text-xs text-gray-400 truncate">مشکل پرداخت حل شد.</p>
            </div>
          </div>
        </div>
      </div>

      {/* پنجره چت اصلی */}
      <div className="flex-1 glass-panel rounded-3xl border border-white/60 flex flex-col h-full overflow-hidden relative">
        
        {/* هدر چت */}
        <div className="p-4 bg-white/40 backdrop-blur-md border-b border-white/50 flex justify-between items-center z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-trust-green">
              <img src="https://ui-avatars.com/api/?name=Dr+Naseh&background=E3F2FD&color=047857" alt="دکتر" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                دکتر ناصح یوسفی
                <FaCircle className="text-[10px] text-green-500 animate-pulse" />
              </h3>
              <p className="text-xs text-trust-green font-bold">آنلاین - پاسخگویی سریع</p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>

        {/* ناحیه پیام‌ها */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-white/30">
          {chats.map((chat) => (
            <div key={chat.id} className={`flex ${chat.sender === 'patient' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`
                  max-w-[75%] p-4 rounded-2xl relative shadow-sm text-sm leading-relaxed
                  ${chat.sender === 'patient' 
                    ? 'bg-white text-gray-700 rounded-tr-none border border-white' 
                    : 'bg-trust-green text-white rounded-tl-none shadow-md shadow-trust-green/20'
                  }
                `}
              >
                {/* اگر فایل باشد */}
                {chat.type === 'file' ? (
                  <div className="flex items-center gap-3 bg-white/20 p-2 rounded-lg cursor-pointer hover:bg-white/30 transition-colors">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <FaFileMedicalAlt className="text-xl" />
                    </div>
                    <div>
                      <span className="block font-bold ltr truncate text-xs">{chat.text}</span>
                      <span className="text-[10px] opacity-80">2.4 MB</span>
                    </div>
                  </div>
                ) : (
                  <p>{chat.text}</p>
                )}
                
                <span className={`text-[10px] absolute bottom-1 ${chat.sender === 'patient' ? 'left-2 text-gray-400' : 'right-2 text-green-100 opacity-70'}`}>
                  {chat.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ناحیه تایپ و ارسال */}
        <div className="p-4 bg-white/60 backdrop-blur-md border-t border-white/50">
          <form onSubmit={handleSend} className="flex items-center gap-2 bg-white rounded-2xl p-2 shadow-sm border border-gray-200">
            
            <button type="button" className="p-3 text-gray-400 hover:text-trust-green hover:bg-green-50 rounded-xl transition-all">
              <FaPaperclip />
            </button>
            
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="پیام خود را بنویسید..." 
              className="flex-1 bg-transparent border-none focus:ring-0 text-gray-700 placeholder-gray-400 px-2"
            />
            
            {message.trim() ? (
              <button type="submit" className="p-3 bg-trust-green text-white rounded-xl shadow-lg hover:scale-105 transition-all">
                <FaPaperPlane className="rtl:-rotate-90" /> {/* چرخش آیکون ارسال برای راست‌چین */}
              </button>
            ) : (
              <button type="button" className="p-3 text-gray-400 hover:text-gray-600 transition-all">
                <FaMicrophone />
              </button>
            )}
          </form>
        </div>

      </div>
    </div>
  );
};

export default Consult;