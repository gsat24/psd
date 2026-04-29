'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [isAdminOnline, setIsAdminOnline] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [badgeCount, setBadgeCount] = useState(0);
  const [sessionId, setSessionId] = useState(null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Load registration from localStorage
    const savedName = localStorage.getItem('psd_chat_user_name');
    const savedEmail = localStorage.getItem('psd_chat_user_email');
    const savedPhone = localStorage.getItem('psd_chat_user_phone');
    const savedId = localStorage.getItem('psd_chat_user_id') || Math.random().toString(36).substring(7);
    
    if (savedName && savedEmail) {
      setUserName(savedName);
      setUserEmail(savedEmail);
      setUserPhone(savedPhone || '');
      setIsRegistered(true);
    }
    setSessionId(savedId);
    localStorage.setItem('psd_chat_user_id', savedId);

    // Initial fetch of messages
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('sender_id', savedId)
        .order('created_at', { ascending: true });
      
      if (!error && data) {
        setMessages(data);
      }
    };
    fetchMessages();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('public:messages')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages',
        filter: `sender_id=eq.${savedId}`
      }, (payload) => {
        setMessages(prev => [...prev, payload.new]);
        if (!isOpen) {
          setBadgeCount(prev => prev + 1);
        }
      })
      .subscribe();

    // Tooltip animation
    const tooltipInterval = setInterval(() => {
      if (!isOpen) {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 5000);
      }
    }, 15000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(tooltipInterval);
    };
  }, [isOpen, sessionId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleRegister = (e) => {
    e.preventDefault();
    if (userName && userEmail && userPhone) {
      localStorage.setItem('psd_chat_user_name', userName);
      localStorage.setItem('psd_chat_user_email', userEmail);
      localStorage.setItem('psd_chat_user_phone', userPhone);
      setIsRegistered(true);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      sender_id: sessionId,
      sender_name: userName,
      text: inputValue,
      is_admin: false,
      created_at: new Date().toISOString()
    };

    // Optimistic update
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    const { error } = await supabase.from('messages').insert([newMessage]);
    if (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans flex items-end gap-3">
      {/* Tooltip */}
      <div className={`mb-1 flex items-center gap-2 bg-white rounded-full shadow-lg px-4 py-2 border border-gray-100 transition-opacity duration-700 pointer-events-none select-none ${showTooltip && !isOpen ? 'opacity-100' : 'opacity-0'}`}>
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block"></span>
        <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">Admin Online</span>
      </div>

      {/* Bubble */}
      <button 
        onClick={() => {
          setIsOpen(!isOpen);
          setBadgeCount(0);
        }}
        className="bg-[#0A5C4F] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center relative flex-shrink-0"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
        </svg>
        {badgeCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#FFD700] text-[#0A5C4F] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            {badgeCount}
          </span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[300px] md:w-[360px] h-[500px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0A5C4F] to-[#0d7a65] p-4 text-white flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-headset"></i>
              </div>
              <div>
                <h4 className="font-bold text-sm">Live Chat PSD</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"></span>
                  <p className="text-[10px] text-white/90">Online | Siap membantu</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-[#FFD700] transition w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10">
              <i className="fas fa-times"></i>
            </button>
          </div>

          {!isRegistered ? (
            <div className="p-6 space-y-4 flex-1 overflow-y-auto">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-[#0A5C4F]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <i className="fas fa-user-circle text-[#0A5C4F] text-2xl"></i>
                </div>
                <h5 className="font-bold text-gray-800 text-sm">Selamat Datang!</h5>
                <p className="text-[10px] text-gray-500 mt-1">Isi data diri untuk memulai chat.</p>
              </div>
              <form onSubmit={handleRegister} className="space-y-3">
                <input 
                  type="text" required placeholder="Nama Anda" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-[#0A5C4F]"
                  value={userName} onChange={e => setUserName(e.target.value)}
                />
                <input 
                  type="tel" required placeholder="No. WhatsApp" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-[#0A5C4F]"
                  value={userPhone} onChange={e => setUserPhone(e.target.value)}
                />
                <input 
                  type="email" required placeholder="Email" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-[#0A5C4F]"
                  value={userEmail} onChange={e => setUserEmail(e.target.value)}
                />
                <button className="w-full bg-[#0A5C4F] text-white font-bold py-3 rounded-lg hover:bg-[#084a40] transition text-xs shadow-lg">
                  Mulai Chat Sekarang
                </button>
              </form>
            </div>
          ) : (
            <>
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 flex flex-col">
                <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-gray-700 self-start max-w-[80%] border border-gray-100">
                  Halo {userName}! Ada yang bisa kami bantu hari ini? 😊
                </div>
                {messages.map((msg, i) => (
                  <div 
                    key={i}
                    className={`max-w-[82%] p-3 rounded-2xl text-sm shadow-sm border ${
                      msg.is_admin
                        ? 'self-start bg-white rounded-tl-none border-gray-100 text-gray-700'
                        : 'self-end bg-[#0A5C4F] text-white rounded-tr-none border-[#0A5C4F]/20'
                    }`}
                  >
                    {msg.is_admin && (
                      <div className="text-[10px] font-bold text-[#0A5C4F] mb-1">{msg.sender_name || 'Admin PSD'}</div>
                    )}
                    <div>{msg.text}</div>
                    <div className={`text-[9px] mt-1 ${msg.is_admin ? 'text-gray-400' : 'text-white/60 text-right'}`}>
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-100 flex items-center space-x-2 bg-white">
                <input 
                  type="text" 
                  placeholder="Tulis pesan..." 
                  className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0A5C4F] outline-none text-gray-800 transition"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                />
                <button type="submit" className="bg-[#0A5C4F] text-white p-2.5 rounded-xl hover:bg-[#084a40] transition flex-shrink-0">
                  <i className="fas fa-paper-plane text-sm"></i>
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}
