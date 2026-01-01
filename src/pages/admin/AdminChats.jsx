import React, { useState } from 'react';
import { 
  FaSearch, 
  FaPaperPlane, 
  FaPaperclip, 
  FaCircle, 
  FaUserCircle, 
  FaFileMedical, 
  FaCheckDouble,
  FaEllipsisV,
  FaPhone
} from 'react-icons/fa';

const AdminChats = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState('');

  // لیست گفتگوهای فعال
  const [chatList] = useState([
    { id: 1, name: 'علی رضایی', lastMsg: 'دکتر جان درد کمرم کمتر شده...', time: '10:30', unread: 2, online: true, avatar: 'https://ui-avatars.com/api/?name=Ali+Rezaei&background=E3F2FD' },
    { id: 2, name: 'سارا نبوی', lastMsg: 'فایل MRI رو ضمیمه کردم.', time: '09:15', unread: 0, online: false, avatar: 'https://ui-avatars.com/api/?name=Sara+Nabavi&background=F3E5F5' },
    { id: 3, name: 'رضا کمالی', lastMsg: 'ممنون از راهنمایی شما', time: 'دیروز', unread: 0, online: true, avatar: 'https://ui-avatars.com/api/?name=Reza+Kamali&background=E8F5E9' },
  ]);

  // تاریخچه چت انتخاب شده
  const [messages, setMessages] = useState([
    { id: 1, sender: 'patient', text: 'سلام دکتر، وقت بخیر. من طبق دستوری که دادید تمرینات رو انجام دادم.', time: '10:25' },
    { id: 2, sender: 'doctor', text: 'سلام علی جان. وضعیت درد چطوره؟ بهبودی حس می‌کنی؟', time: '10:28' },
    { id: 3, sender: 'patient', text: 'بله دکتر جان، درد کمرم کمتر شده ولی شب‌ها کمی تیر می‌کشه.', time: '10:30' },
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: 'doctor',
      text: message,
      time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMsg]);
    setMessage('');
  };

  const currentChat = chatList.find(c => c.id === selectedChat);

  return (
    <div className="h-[calc(100vh-140px)] flex gap-4 animate-fade-in">
      
      {/* --- لیست گفتگوها (سمت راست) --- */}
      <div className="w-80 lg:w-96 bg-white rounded-[32px] border border-gray-100 flex flex-col shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-50">
          <h2 className="text-xl font-bold text-gray-800 mb-4">گفتگوهای فعال</h2>
          <div className="relative">
            <input 
              type="text" 
              placeholder="جستجوی بیمار..." 
              className="w-full bg-gray-50 border-none rounded-2xl py-3 pr-10 pl-4 text-sm focus:ring-2 focus:ring-trust-green/20"
            />
            <FaSearch className="absolute right-3.5 top-3.5 text-gray-300" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {chatList.map((chat) => (
            <div 
              key={chat.id}
              onClick={() => setSelectedId(chat.id)}
              className={`
                flex items-center gap-4 p-4 cursor-pointer transition-all border-r-4
                ${selectedChat === chat.id ? 'bg-green-50/50 border-trust-green shadow-sm' : 'border-transparent hover:bg-gray-50'}
              `}
            >
              <div className="relative shrink-0">
                <img src={chat.avatar} className="w-12 h-12 rounded-2xl border-2 border-white" alt="" />
                {chat.online && <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-gray-800 text-sm truncate">{chat.name}</h4>
                  <span className="text-[10px] text-gray-400 font-bold">{chat.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500 truncate">{chat.lastMsg}</p>
                  {chat.unread > 0 && (
                    <span className="bg-trust-green text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{chat.unread}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- پنجره چت (بخش اصلی) --- */}
      <div className="flex-1 bg-white rounded-[32px] border border-gray-100 flex flex-col shadow-sm overflow-hidden relative">
        
        {/* هدر چت */}
        <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-white/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-trust-green-light flex items-center justify-center text-trust-green">
               <FaUserCircle className="text-2xl" />
             </div>
             <div>
               <h3 className="font-bold text-gray-800 text-sm">{currentChat.name}</h3>
               <span className="text-[10px] text-green-500 font-bold">در حال پاسخگویی...</span>
             </div>
          </div>
          <div className="flex gap-2">
             <button className="p-2.5 text-gray-400 hover:text-trust-green transition-colors"><FaPhone /></button>
             <button className="p-2.5 text-gray-400 hover:text-gray-600 transition-colors"><FaEllipsisV /></button>
          </div>
        </div>

        {/* ناحیه پیام‌ها */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`
                  max-w-[70%] p-4 rounded-2xl relative shadow-sm
                  ${msg.sender === 'doctor' 
                    ? 'bg-gray-800 text-white rounded-tr-none' 
                    : 'bg-white text-gray-700 rounded-tl-none border border-gray-100'
                  }
                `}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <div className={`flex items-center gap-1 mt-2 ${msg.sender === 'doctor' ? 'justify-start' : 'justify-end'}`}>
                   <span className="text-[9px] opacity-60 font-bold">{msg.time}</span>
                   {msg.sender === 'doctor' && <FaCheckDouble className="text-[10px] text-trust-green" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ناحیه تایپ و ارسال */}
        <div className="p-5 bg-gray-50/50 border-t border-gray-100">
          <form onSubmit={handleSendMessage} className="bg-white p-2 rounded-2xl border border-gray-200 flex items-center gap-2 shadow-sm focus-within:border-trust-green transition-all">
            <button type="button" className="p-3 text-gray-400 hover:text-trust-green transition-colors">
              <FaPaperclip />
            </button>
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="پیام خود را بنویسید..."
              className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
            />
            <button className="bg-trust-green text-white px-5 py-3 rounded-xl font-bold text-sm shadow-lg shadow-trust-green/20 hover:scale-105 transition-all flex items-center gap-2">
              <span className="hidden sm:inline">ارسال</span>
              <FaPaperPlane className="rtl:-rotate-90" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default AdminChats;