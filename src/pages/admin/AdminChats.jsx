import React, { useState, useEffect, useRef } from 'react';
import api from '../../api/axios'; // اینستنس اکسیس شما
import { 
  FaSearch, FaPaperPlane, FaPaperclip, FaUserCircle, 
  FaCheckDouble, FaEllipsisV, FaPhone, FaSync
} from 'react-icons/fa';

const AdminChats = () => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sendLoading, setSendLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // تابع کمکی برای اسکرول به پایین
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ۱. دریافت لیست گفتگوهای فعال (GET)
  const fetchConversations = async () => {
    try {
      setLoading(true);
      const response = await api.get('/chats'); // آدرس فرضی API
      setConversations(response.data);
      setLoading(false);
    } catch (err) {
      console.error("خطا در دریافت لیست چت‌ها", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  // ۲. دریافت پیام‌های یک چت خاص (GET)
  useEffect(() => {
    if (!selectedChatId) return;

    const fetchMessages = async () => {
      try {
        const response = await api.get(`/chats/${selectedChatId}/messages`);
        setMessages(response.data);
        setTimeout(scrollToBottom, 100);
      } catch (err) {
        console.error("خطا در دریافت پیام‌ها", err);
      }
    };

    fetchMessages();
    
    // نکته برای بک‌اِند: اینجا محل مناسبی برای برقراری اتصال Socket.io برای این چت خاص است.
  }, [selectedChatId]);

  // ۳. ارسال پیام جدید (POST)
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim() || sendLoading) return;

    try {
      setSendLoading(true);
      const payload = {
        text: messageText,
        senderType: 'doctor' // مشخص کردن فرستنده برای بک‌اِند
      };

      const response = await api.post(`/chats/${selectedChatId}/send`, payload);
      
      // اضافه کردن پیام برگشتی از سرور به لیست (شامل ID و زمان دقیق)
      setMessages((prev) => [...prev, response.data]);
      setMessageText('');
      setSendLoading(false);
      setTimeout(scrollToBottom, 50);
    } catch (err) {
      alert("خطا در ارسال پیام");
      setSendLoading(false);
    }
  };

  const currentChat = conversations.find(c => c.id === selectedChatId);

  return (
    <div className="h-[calc(100vh-140px)] flex gap-4 animate-fade-in bg-[#FDFBF7]">
      
      {/* --- لیست گفتگوها (سمت راست) --- */}
      <div className="w-80 lg:w-96 bg-white rounded-[32px] border border-gray-100 flex flex-col shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-black text-gray-800 italic">Conversations</h2>
            <button onClick={fetchConversations} className="text-trust-green hover:rotate-180 transition-transform duration-500">
              <FaSync size={14} />
            </button>
          </div>
          <div className="relative">
            <input type="text" placeholder="جستجوی بیمار..." className="w-full bg-gray-50 border-none rounded-2xl py-3.5 pr-12 pl-4 text-sm focus:ring-2 focus:ring-trust-green/10 outline-none font-bold" />
            <FaSearch className="absolute right-4 top-4 text-gray-300" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="p-4 space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex gap-3 animate-pulse">
                  <div className="w-14 h-14 bg-gray-100 rounded-2xl"></div>
                  <div className="flex-1 space-y-3 py-1">
                    <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                    <div className="h-2 bg-gray-50 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            conversations.map((chat) => (
              <div 
                key={chat.id}
                onClick={() => setSelectedChatId(chat.id)}
                className={`flex items-center gap-4 p-5 cursor-pointer transition-all border-r-4 ${selectedChatId === chat.id ? 'bg-green-50/40 border-trust-green' : 'border-transparent hover:bg-gray-50/50'}`}
              >
                <div className="relative shrink-0">
                  <img src={chat.avatar || `https://ui-avatars.com/api/?name=${chat.name}`} className="w-14 h-14 rounded-2xl border-2 border-white shadow-sm" alt="" />
                  {chat.online && <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-black text-gray-800 text-sm truncate">{chat.name}</h4>
                    <span className="text-[10px] text-gray-400 font-black font-mono">{chat.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-400 truncate font-bold">{chat.lastMsg}</p>
                    {chat.unread > 0 && <span className="bg-trust-green text-white text-[10px] font-black px-2 py-0.5 rounded-lg shadow-lg shadow-green-100">{chat.unread}</span>}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* --- پنجره چت اصلی --- */}
      <div className="flex-1 bg-white rounded-[40px] border border-gray-100 flex flex-col shadow-sm overflow-hidden relative">
        {selectedChatId && currentChat ? (
          <>
            {/* هدر چت */}
            <div className="p-4 px-8 border-b border-gray-50 flex justify-between items-center bg-white/90 backdrop-blur-md z-10">
              <div className="flex items-center gap-4">
                  <img src={currentChat.avatar} className="w-12 h-12 rounded-2xl shadow-md border-2 border-white" />
                  <div>
                    <h3 className="font-black text-gray-800 text-md italic">{currentChat.name}</h3>
                    <span className="text-[10px] text-green-500 font-black flex items-center gap-1">
                       <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span> آنلاین
                    </span>
                  </div>
              </div>
              <div className="flex gap-2">
                 <button className="w-11 h-11 flex items-center justify-center rounded-2xl text-gray-400 hover:bg-gray-50 hover:text-trust-green transition-all shadow-sm border border-gray-50"><FaPhone size={14} /></button>
                 <button className="w-11 h-11 flex items-center justify-center rounded-2xl text-gray-400 hover:bg-gray-50 transition-all shadow-sm border border-gray-100"><FaEllipsisV size={14} /></button>
              </div>
            </div>

            {/* ناحیه پیام‌ها */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar bg-gray-50/20">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.senderType === 'doctor' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] p-5 rounded-[28px] relative shadow-sm text-sm leading-relaxed font-bold ${msg.senderType === 'doctor' ? 'bg-gray-800 text-white rounded-tr-none shadow-gray-200' : 'bg-white text-gray-700 rounded-tl-none border border-gray-100'}`}>
                    {msg.text}
                    <div className={`flex items-center gap-2 mt-3 ${msg.senderType === 'doctor' ? 'justify-start' : 'justify-end'}`}>
                        <span className="text-[9px] opacity-40 font-black font-mono">{msg.time}</span>
                        {msg.senderType === 'doctor' && <FaCheckDouble className={`text-[10px] ${msg.isRead ? 'text-blue-400' : 'text-gray-500'}`} />}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} /> {/* مرجع اسکرول */}
            </div>

            {/* ناحیه ارسال پیام */}
            <div className="p-6 bg-white border-t border-gray-50">
              <form onSubmit={handleSendMessage} className="bg-gray-50 p-2 pl-4 rounded-[24px] border border-gray-100 flex items-center gap-3 focus-within:bg-white focus-within:border-trust-green/20 transition-all shadow-inner">
                <button type="button" className="p-4 text-gray-400 hover:text-trust-green transition-colors"><FaPaperclip size={20} /></button>
                <input 
                  type="text" 
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="پاسخ بیمار را بنویسید..." 
                  className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 font-bold placeholder-gray-300" 
                />
                <button 
                  type="submit"
                  disabled={sendLoading}
                  className="bg-trust-green text-white px-8 py-4 rounded-2xl font-black text-xs shadow-xl shadow-green-100 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                >
                  {sendLoading ? <FaSync className="animate-spin" /> : <>ارسال <FaPaperPlane className="rtl:-rotate-90" /></>}
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-300 space-y-6">
             <div className="w-24 h-24 bg-gray-50 rounded-[40px] flex items-center justify-center shadow-inner">
                <FaUserCircle size={50} className="opacity-10" />
             </div>
             <p className="font-black text-sm italic uppercase tracking-widest">Select a patient to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChats;