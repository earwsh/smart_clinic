import React, { useState, useEffect, useRef } from 'react';
import api from '../../api/axios'; // اینستنس اکسیس شما
import { 
  FaPaperPlane, FaPaperclip, FaMicrophone, FaUserMd, 
  FaCircle, FaFileMedicalAlt, FaSearch, FaSync
} from 'react-icons/fa';

const Consult = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sendLoading, setSendLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const messagesEndRef = useRef(null);

  // تابع اسکرول خودکار به پایین‌ترین پیام
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ۱. دریافت لیست گفتگوهای فعال بیمار (GET)
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        const response = await api.get('/patient/chats');
        setConversations(response.data);
        if (response.data.length > 0) setActiveChatId(response.data[0].id);
        setLoading(false);
      } catch (err) {
        console.error("Fetch Conversations Error:", err);
        setLoading(false);
      }
    };
    fetchConversations();
  }, []);

  // ۲. دریافت پیام‌های چت انتخاب شده (GET)
  useEffect(() => {
    if (!activeChatId) return;
    const fetchMessages = async () => {
      try {
        const response = await api.get(`/patient/chats/${activeChatId}/messages`);
        setMessages(response.data);
        setTimeout(scrollToBottom, 100);
      } catch (err) {
        console.error("Fetch Messages Error:", err);
      }
    };
    fetchMessages();
  }, [activeChatId]);

  // ۳. ارسال پیام جدید به سرور (POST)
  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim() || sendLoading) return;

    try {
      setSendLoading(true);
      const payload = {
        text: message,
        type: 'text'
      };

      const response = await api.post(`/patient/chats/${activeChatId}/send`, payload);
      
      // اضافه کردن پیام تایید شده سرور به لیست
      setMessages((prev) => [...prev, response.data]);
      setMessage('');
      setSendLoading(false);
      setTimeout(scrollToBottom, 50);
    } catch (err) {
      alert("خطا در ارسال پیام. لطفا دوباره تلاش کنید.");
      setSendLoading(false);
    }
  };

  const currentChat = conversations.find(c => c.id === activeChatId);

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-140px)] animate-fade-in flex flex-col md:flex-row gap-6 p-2 bg-[#FDFBF7]">
      
      {/* سایدبار لیست پزشکان/گفتگوها */}
      <div className="hidden md:flex flex-col w-1/3 bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm h-full overflow-hidden">
        <div className="mb-6 relative">
          <input 
            type="text" 
            placeholder="Search conversations..." 
            className="w-full bg-gray-50 border-none rounded-2xl py-4 pr-12 pl-4 text-xs focus:ring-2 focus:ring-trust-green/10 outline-none font-black italic"
          />
          <FaSearch className="absolute right-5 top-5 text-gray-300" />
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-300 gap-4">
               <FaSync className="animate-spin text-xl" />
               <span className="text-[10px] font-black uppercase italic">Updating Inbox...</span>
            </div>
          ) : (
            conversations.map((chat) => (
              <div 
                key={chat.id}
                onClick={() => setActiveChatId(chat.id)}
                className={`flex items-center gap-4 p-5 cursor-pointer transition-all rounded-[28px] border-2 ${activeChatId === chat.id ? 'bg-green-50 border-trust-green/20' : 'bg-white border-transparent hover:bg-gray-50'}`}
              >
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
                    {chat.avatar ? <img src={chat.avatar} alt="" /> : <FaUserMd className="text-gray-300 text-xl" />}
                  </div>
                  {chat.online && <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-black text-gray-800 text-sm truncate italic">{chat.name}</h4>
                    <span className="text-[9px] text-gray-400 font-black font-mono">{chat.time}</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate font-bold italic">{chat.lastMsg}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* پنجره اصلی گفتگو */}
      <div className="flex-1 bg-white rounded-[45px] border border-gray-100 flex flex-col h-full overflow-hidden relative shadow-sm">
        
        {/* هدر چت */}
        {currentChat ? (
          <div className="p-6 bg-white/80 backdrop-blur-md border-b border-gray-50 flex justify-between items-center z-10 px-10">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-[18px] overflow-hidden border-2 border-trust-green shadow-xl shadow-green-100">
                {currentChat.avatar ? <img src={currentChat.avatar} alt="" /> : <FaUserMd className="text-gray-300" />}
              </div>
              <div>
                <h3 className="font-black text-gray-800 flex items-center gap-3 italic">
                  {currentChat.name}
                  {currentChat.online && <FaCircle className="text-[8px] text-green-500 animate-pulse" />}
                </h3>
                <p className="text-[9px] text-trust-green font-black uppercase tracking-[0.2em] italic">Fast Response Active</p>
              </div>
            </div>
            <button className="text-gray-300 hover:text-gray-600 transition-all p-2 bg-gray-50 rounded-xl active:scale-90">
                <FaSync size={14} onClick={() => setActiveChatId(activeChatId)} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        ) : (
          <div className="p-6 border-b border-gray-50 italic text-gray-300 text-center font-black uppercase text-[10px]">Select a contact to begin</div>
        )}

        {/* ناحیه پیام‌ها */}
        <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar bg-gray-50/20">
          {messages.map((chat) => (
            <div key={chat.id} className={`flex ${chat.sender === 'patient' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`
                  max-w-[70%] p-6 rounded-[32px] relative shadow-sm text-sm leading-[1.8] font-bold italic
                  ${chat.sender === 'patient' 
                    ? 'bg-white text-gray-700 rounded-tr-none border border-gray-100' 
                    : 'bg-trust-green text-white rounded-tl-none shadow-2xl shadow-green-200'
                  }
                `}
              >
                {chat.type === 'file' ? (
                  <div className="flex items-center gap-5 bg-white/10 p-4 rounded-2xl cursor-pointer hover:bg-white/20 transition-all border border-white/20">
                    <FaFileMedicalAlt className="text-3xl" />
                    <div className="text-right">
                      <span className="block font-black ltr truncate text-xs font-mono">{chat.text}</span>
                      <span className="text-[9px] opacity-70 uppercase font-black">2.4 MB • medical file</span>
                    </div>
                  </div>
                ) : (
                  <p>{chat.text}</p>
                )}
                
                <div className={`text-[9px] mt-4 font-mono font-black flex ${chat.sender === 'patient' ? 'justify-start text-gray-300' : 'justify-end text-green-50/60 uppercase'}`}>
                   {chat.time}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* ناحیه تایپ و ارسال */}
        <div className="p-8 bg-white border-t border-gray-50">
          <form onSubmit={handleSend} className="flex items-center gap-4 bg-gray-50 rounded-[30px] p-2 pl-5 border border-transparent focus-within:border-trust-green/20 focus-within:bg-white transition-all shadow-inner">
            <button type="button" className="p-4 text-gray-300 hover:text-trust-green transition-all active:scale-90">
              <FaPaperclip size={20} />
            </button>
            
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your health status or ask a question..." 
              className="flex-1 bg-transparent border-none focus:ring-0 text-gray-700 font-bold placeholder-gray-300 text-sm italic"
            />
            
            <button 
              type="submit" 
              disabled={!message.trim() || sendLoading}
              className={`p-5 rounded-2xl shadow-2xl transition-all flex items-center justify-center active:scale-95 ${message.trim() ? 'bg-trust-green text-white shadow-green-100 hover:bg-emerald-700' : 'bg-gray-100 text-gray-300'}`}
            >
              {sendLoading ? <FaSync className="animate-spin" /> : <FaPaperPlane className="rtl:-rotate-90 text-sm" />}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Consult;