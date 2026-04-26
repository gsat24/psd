/**
 * Live Chat Widget for Pesantren Smart Digital
 * Injects a floating chat widget and handles real-time communication with registration
 */

(function() {
    const WIDGET_HTML = `
    <!-- Live Chat Widget -->
    <div id="chat-widget" class="fixed bottom-6 right-6 z-[9999] font-sans flex items-end gap-3">

        <!-- Animated "Admin Online" Tooltip -->
        <div id="chat-online-label" class="mb-1 flex items-center gap-2 bg-white rounded-full shadow-lg px-4 py-2 border border-gray-100 opacity-0 transition-opacity duration-700 pointer-events-none select-none" style="transition: opacity 0.7s ease;">
            <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block"></span>
            <span id="chat-online-text" class="text-sm font-semibold text-gray-700 whitespace-nowrap"></span>
        </div>

        <!-- Chat Bubble -->
        <button id="chat-bubble" class="bg-[#0A5C4F] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center relative flex-shrink-0">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
            <span id="chat-badge" class="absolute -top-1 -right-1 bg-[#FFD700] text-[#0A5C4F] text-[10px] font-bold px-1.5 py-0.5 rounded-full hidden">1</span>
        </button>

        <!-- Chat Window -->
        <div id="chat-window" class="absolute bottom-20 right-0 w-[300px] md:w-[360px] max-h-[80vh] md:max-h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-100 hidden flex-col overflow-hidden" style="animation: none; overscroll-behavior: contain;">
            <!-- Header -->
            <div class="bg-gradient-to-r from-[#0A5C4F] to-[#0d7a65] p-4 text-white flex justify-between items-center">
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                        <i class="fas fa-headset"></i>
                    </div>
                    <div>
                        <h4 class="font-bold text-sm">Live Chat PSD</h4>
                        <div class="flex items-center gap-1.5 mt-0.5">
                            <span class="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"></span>
                            <p id="chat-admin-name-header" class="text-[10px] text-white/90">Online | Siap membantu Anda</p>
                        </div>
                    </div>
                </div>
                <button id="close-chat" class="hover:text-[#FFD700] transition w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <!-- Registration View -->
            <div id="chat-reg-view" class="p-4 md:p-5 space-y-3 bg-white hidden flex-col overflow-y-auto flex-1 min-h-0">
                <div class="text-center mb-1">
                    <div class="w-12 h-12 bg-[#0A5C4F]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                        <i class="fas fa-user-circle text-[#0A5C4F] text-2xl"></i>
                    </div>
                    <h5 class="font-bold text-gray-800 text-sm">Selamat Datang!</h5>
                    <p class="text-[10px] text-gray-500 mt-1">Isi data diri untuk memulai chat.</p>
                </div>
                <div>
                    <label class="block text-[9px] uppercase font-bold text-gray-400 mb-0.5">Nama Lengkap</label>
                    <input type="text" id="chat-reg-name" placeholder="Nama Anda" class="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#0A5C4F] outline-none transition">
                </div>
                <div>
                    <label class="block text-[9px] uppercase font-bold text-gray-400 mb-0.5">No. WhatsApp</label>
                    <input type="tel" id="chat-reg-phone" placeholder="Contoh: 081234567890" class="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#0A5C4F] outline-none transition">
                </div>
                <div>
                    <label class="block text-[9px] uppercase font-bold text-gray-400 mb-0.5">Alamat Email</label>
                    <input type="email" id="chat-reg-email" placeholder="email@contoh.com" class="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#0A5C4F] outline-none transition">
                </div>
                <button id="chat-reg-btn" class="w-full bg-[#0A5C4F] text-white font-bold py-2.5 rounded-lg hover:bg-[#084a40] transition shadow-lg shadow-[#0A5C4F]/20 mt-1 flex items-center justify-center gap-2 text-xs">
                    <i class="fas fa-comments text-xs"></i>
                    Mulai Chat Sekarang
                </button>
            </div>

            <!-- Offline / Ticket View -->
            <div id="chat-offline-view" class="p-4 md:p-5 space-y-3 bg-white hidden flex-col overflow-y-auto flex-1 min-h-0">
                <div class="text-center mb-1">
                    <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <i class="fas fa-envelope-open-text text-gray-400 text-2xl"></i>
                    </div>
                    <h5 class="font-bold text-gray-800 text-sm">Admin Sedang Offline</h5>
                    <p class="text-[10px] text-gray-500 mt-1">Silakan tinggalkan pesan, kami akan segera menghubungi Anda via WhatsApp.</p>
                </div>
                <div>
                    <label class="block text-[9px] uppercase font-bold text-gray-400 mb-0.5">Nama Lengkap</label>
                    <input type="text" id="chat-off-name" placeholder="Nama Anda" class="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 focus:ring-2 focus:ring-[#0A5C4F] outline-none">
                </div>
                <div>
                    <label class="block text-[9px] uppercase font-bold text-gray-400 mb-0.5">No. WhatsApp</label>
                    <input type="tel" id="chat-off-phone" placeholder="Contoh: 081234567890" class="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 focus:ring-2 focus:ring-[#0A5C4F] outline-none">
                </div>
                <div>
                    <label class="block text-[9px] uppercase font-bold text-gray-400 mb-0.5">Pesan / Kendala</label>
                    <textarea id="chat-off-msg" rows="3" placeholder="Tulis pesan Anda di sini..." class="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 focus:ring-2 focus:ring-[#0A5C4F] outline-none"></textarea>
                </div>
                <button id="chat-off-btn" class="w-full bg-[#0A5C4F] text-white font-bold py-2.5 rounded-lg hover:bg-[#084a40] transition text-xs shadow-lg shadow-[#0A5C4F]/20">
                    Kirim Pesan Sekarang
                </button>
            </div>

            <!-- Chat Content View (Initially Hidden) -->
            <div id="chat-content-view" class="flex flex-col hidden">
                <!-- Messages Area -->
                <div id="chat-messages" class="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50 flex flex-col">
                    <div class="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-gray-700 self-start max-w-[80%] border border-gray-100">
                        Halo! Ada yang bisa kami bantu hari ini? 😊
                    </div>
                </div>

                <!-- Input Area -->
                <form id="chat-form" class="p-3 border-t border-gray-100 flex items-center space-x-2 bg-white">
                    <input type="text" id="chat-input" placeholder="Tulis pesan..." class="flex-1 bg-gray-100 border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0A5C4F] outline-none text-gray-800 transition">
                    <button type="submit" class="bg-[#0A5C4F] text-white p-2.5 rounded-xl hover:bg-[#084a40] transition flex-shrink-0">
                        <i class="fas fa-paper-plane text-sm"></i>
                    </button>
                </form>
            </div>
        </div>
    </div>

    <style>
        @keyframes chat-fade-in-up {
            from { opacity: 0; transform: translateY(16px) scale(0.97); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .chat-anim-open { animation: chat-fade-in-up 0.3s ease-out forwards; }
        #chat-messages::-webkit-scrollbar { width: 4px; }
        #chat-messages::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
    </style>
    `;

    function getAdminDisplayName() {
        // Try to get from localStorage (set when admin logs in via chat_sessions or company name)
        try {
            // Check if an admin is logged into the admin panel (stored in localStorage for cross-tab awareness)
            const adminOnline = localStorage.getItem('psd_admin_online_name');
            if (adminOnline) return adminOnline;
        } catch(e) {}
        return 'Admin PSD';
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    async function startOnlineAnimation(labelEl, textEl) {
        let visible = false;

        async function toggle() {
            // Check if chat is window is open, don't show tooltip if it is
            const chatWindow = document.getElementById('chat-window');
            if (chatWindow && !chatWindow.classList.contains('hidden')) {
                labelEl.style.opacity = '0';
                visible = false;
                setTimeout(toggle, 3000);
                return;
            }

            const isOnline = await getChatStatus();
            if (!isOnline) {
                labelEl.style.opacity = '0';
                visible = false;
                setTimeout(toggle, 5000); // Re-check after 5s
                return;
            }

            if (visible) {
                // Fade out
                labelEl.style.opacity = '0';
                visible = false;
                setTimeout(toggle, 2500); // delay when hidden
            } else {
                // Fade in
                labelEl.style.opacity = '1';
                visible = true;
                const name = getAdminDisplayName();
                textEl.textContent = name + ' Online';
                setTimeout(toggle, 3500); // show for 3.5s
            }
        }

        // Start after 2s delay
        setTimeout(toggle, 2000);
    }

    async function getChatStatus() {
        try {
            if (window.getCompanyInfo) {
                const info = await window.getCompanyInfo();
                return info.chat_status !== false; // Default true if undefined
            }
        } catch (e) {}
        return true;
    }

    function init() {
        if (document.getElementById('chat-widget')) return;
        
        // Inject HTML
        const container = document.createElement('div');
        container.innerHTML = WIDGET_HTML;
        document.body.appendChild(container);

        const chatBubble = document.getElementById('chat-bubble');
        const chatWindow = document.getElementById('chat-window');
        const closeChat = document.getElementById('close-chat');
        const chatForm = document.getElementById('chat-form');
        const chatInput = document.getElementById('chat-input');
        const chatMessages = document.getElementById('chat-messages');
        const chatBadge = document.getElementById('chat-badge');
        const onlineLabel = document.getElementById('chat-online-label');
        const onlineText = document.getElementById('chat-online-text');
        const adminNameHeader = document.getElementById('chat-admin-name-header');
        
        const regView = document.getElementById('chat-reg-view');
        const contentView = document.getElementById('chat-content-view');
        const regBtn = document.getElementById('chat-reg-btn');

        // Start animated "Admin Online" label
        startOnlineAnimation(onlineLabel, onlineText);

        // Update header with admin name
        const adminName = getAdminDisplayName();
        if (adminNameHeader) adminNameHeader.textContent = adminName + ' | Siap membantu Anda';

        // Toggle Chat Window
        chatBubble.addEventListener('click', async () => {
            const isHidden = chatWindow.classList.contains('hidden');
            if (isHidden) {
                chatWindow.classList.remove('hidden');
                chatWindow.classList.add('chat-anim-open');
                // Hide the online label when chat is open
                onlineLabel.style.opacity = '0';
                onlineLabel.style.pointerEvents = 'none';
            } else {
                chatWindow.classList.add('hidden');
                chatWindow.classList.remove('chat-anim-open');
            }
            chatBadge.classList.add('hidden');
            await checkRegistration();
            scrollToBottom();
        });

        closeChat.addEventListener('click', () => {
            chatWindow.classList.add('hidden');
            chatWindow.classList.remove('chat-anim-open');
        });

        async function checkRegistration() {
            const isOnline = await getChatStatus();
            const userName = localStorage.getItem('psd_chat_user_name');
            const offlineView = document.getElementById('chat-offline-view');
            const regView = document.getElementById('chat-reg-view');
            const contentView = document.getElementById('chat-content-view');

            if (!isOnline) {
                // Admin Offline -> Show Ticket Form
                offlineView.classList.remove('hidden');
                offlineView.classList.add('flex');
                regView.classList.add('hidden');
                regView.classList.remove('flex');
                contentView.classList.add('hidden');
                contentView.classList.remove('flex');
                
                // Update header
                if (adminNameHeader) adminNameHeader.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block mr-1"></span> Offline | Kirim Pesan';
            } else if (userName) {
                // Online & Registered -> Show Chat
                offlineView.classList.add('hidden');
                offlineView.classList.remove('flex');
                regView.classList.add('hidden');
                regView.classList.remove('flex');
                contentView.classList.remove('hidden');
                contentView.classList.add('flex');
                
                // Update header
                const adminName = getAdminDisplayName();
                if (adminNameHeader) adminNameHeader.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-green-400 inline-block mr-1"></span> Online | Siap membantu`;
            } else {
                // Online & Not Registered -> Show Reg Form
                offlineView.classList.add('hidden');
                offlineView.classList.remove('flex');
                regView.classList.remove('hidden');
                regView.classList.add('flex');
                contentView.classList.add('hidden');
                contentView.classList.remove('flex');
                
                // Update header
                const adminName = getAdminDisplayName();
                if (adminNameHeader) adminNameHeader.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-green-400 inline-block mr-1"></span> Online | Siap membantu`;
            }
        }

        regBtn.addEventListener('click', async () => {
            const name = document.getElementById('chat-reg-name').value.trim();
            const email = document.getElementById('chat-reg-email').value.trim();
            const phone = document.getElementById('chat-reg-phone').value.trim();

            if (!name || !email || !phone) {
                if (window.showModal) {
                    window.showModal('Data Belum Lengkap', 'Semua data wajib diisi (Nama, WhatsApp, & Email) agar admin kami dapat menghubungi Anda.', 'error');
                } else {
                    alert('Semua data wajib diisi (Nama, WhatsApp, & Email)!');
                }
                return;
            }

            if (!validateEmail(email)) {
                if (window.showModal) {
                    window.showModal('Format Email Salah', 'Pastikan alamat email Anda sudah benar (contoh: nama@gmail.com).', 'error');
                } else {
                    alert('Format email tidak valid!');
                }
                return;
            }

            regBtn.innerHTML = '<i class="fas fa-spinner fa-spin text-sm"></i> Menghubungkan...';
            regBtn.disabled = true;

            if (window.saveChatSession) {
                const res = await window.saveChatSession(name, email, phone);
                if (res.success) {
                    checkRegistration();
                    if (window.sendChatMessage) {
                        await window.sendChatMessage(`Halo, saya ${name}. Saya ingin bertanya...`, false, name);
                    }
                } else {
                    // Even if Supabase fails, allow local-mode chat
                    localStorage.setItem('psd_chat_user_name', name);
                    localStorage.setItem('psd_chat_user_email', email);
                    localStorage.setItem('psd_chat_user_phone', phone);
                    checkRegistration();
                }
            } else {
                localStorage.setItem('psd_chat_user_name', name);
                localStorage.setItem('psd_chat_user_email', email);
                localStorage.setItem('psd_chat_user_phone', phone);
                checkRegistration();
            }
            
            regBtn.innerHTML = '<i class="fas fa-comments text-sm"></i> Mulai Chat Sekarang';
            regBtn.disabled = false;
        });

        const scrollToBottom = () => {
            setTimeout(() => { chatMessages.scrollTop = chatMessages.scrollHeight; }, 50);
        };

        const renderedMsgIds = new Set();

        const appendMessage = (msg, skipDupeCheck = false) => {
            const userId = window.getChatUserId ? window.getChatUserId() : null;
            const isMyMsg = msg.sender_id === userId;
            const isAdmin = msg.is_admin;
            
            // Deduplicate by id or text+time
            const msgKey = msg.id || (msg.text + '|' + msg.created_at);
            if (!skipDupeCheck && renderedMsgIds.has(msgKey)) return;
            renderedMsgIds.add(msgKey);

            const msgDiv = document.createElement('div');
            msgDiv.className = `max-w-[82%] p-3 rounded-2xl text-sm shadow-sm border ${
                isAdmin
                    ? 'self-start bg-white rounded-tl-none border-gray-100 text-gray-700'
                    : isMyMsg
                        ? 'self-end bg-[#0A5C4F] text-white rounded-tr-none border-[#0A5C4F]/20'
                        : 'self-start bg-white rounded-tl-none border-gray-100 text-gray-700'
            }`;
            
            const timeStr = msg.created_at
                ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            msgDiv.innerHTML = `
                ${isAdmin ? `<div class="text-[10px] font-bold text-[#0A5C4F] mb-1">${msg.sender_name || 'Admin PSD'}</div>` : ''}
                <div>${msg.text}</div>
                <div class="text-[9px] mt-1 ${isMyMsg && !isAdmin ? 'text-white/60 text-right' : 'text-gray-400'}">
                    ${timeStr}
                </div>
            `;
            chatMessages.appendChild(msgDiv);
            scrollToBottom();

            // Detect Session End (Case Insensitive)
            if (isAdmin && (msg.text || '').toUpperCase() === 'SESI CHAT TELAH BERAKHIR') {
                const systemMsg = document.createElement('div');
                systemMsg.className = 'w-full text-center py-4 text-red-500 font-bold text-[10px] uppercase tracking-widest animate-pulse';
                systemMsg.innerHTML = '<i class="fas fa-hand-paper mr-2"></i> Sesi chat telah diakhiri oleh admin';
                chatMessages.appendChild(systemMsg);
                scrollToBottom();

                setTimeout(() => {
                    localStorage.removeItem('psd_chat_user_name');
                    localStorage.removeItem('psd_chat_user_email');
                    localStorage.removeItem('psd_chat_user_id');
                    localStorage.removeItem('psd_chat_session_id');
                    renderedMsgIds.clear();
                    checkRegistration();
                    // Clear messages area for next time
                    chatMessages.innerHTML = `<div class="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-gray-700 self-start max-w-[80%] border border-gray-100">Halo! Ada yang bisa kami bantu hari ini? 😊</div>`;
                }, 4000);
            }

            // Show badge if window closed and it's an admin message
            if (chatWindow.classList.contains('hidden') && isAdmin) {
                chatBadge.classList.remove('hidden');
            }
        };

        // Wait for admin-system to load functions
        const waitForDeps = () => {
            return new Promise(resolve => {
                let attempts = 0;
                const check = () => {
                    attempts++;
                    if (window.getChatUserId && window.saveChatSession) {
                        resolve();
                        return;
                    }
                    if (attempts > 60) { resolve(); return; }
                    setTimeout(check, 100);
                };
                check();
            });
        };

        waitForDeps().then(async () => {
            // Load Existing Messages
            if (window.getMessages) {
                const messages = await window.getMessages();
                const userId = window.getChatUserId ? window.getChatUserId() : null;
                messages.forEach(msg => {
                    if (msg.sender_id === userId || msg.is_admin) {
                        appendMessage(msg);
                    }
                });
            }

            // Subscribe to Realtime
            if (window.subscribeToMessages) {
                console.log('Chat widget setting up message subscription...');
                window.subscribeToMessages((newMsg) => {
                    console.log('Realtime message received in widget callback:', newMsg);
                    const userId = window.getChatUserId ? window.getChatUserId() : null;
                    if (newMsg.sender_id === userId || newMsg.is_admin) {
                        appendMessage(newMsg);
                        
                        // Play sound if message is from admin
                        if (newMsg.is_admin) {
                            console.log('Attempting to play sound for admin message');
                            if (window.playChatSound) {
                                window.playChatSound();
                            } else {
                                console.warn('window.playChatSound not found!');
                            }
                        }
                    }
                });
            }


            // Send Offline Message (Ticket)
            const offBtn = document.getElementById('chat-off-btn');
            if (offBtn) {
                offBtn.addEventListener('click', async () => {
                    const name = document.getElementById('chat-off-name').value.trim();
                    const phone = document.getElementById('chat-off-phone').value.trim();
                    const msg = document.getElementById('chat-off-msg').value.trim();

                    if (!name || !phone || !msg) {
                        if (window.showModal) window.showModal('Data Belum Lengkap', 'Nama, WhatsApp, dan Pesan wajib diisi.', 'error');
                        else alert('Semua data wajib diisi!');
                        return;
                    }

                    offBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
                    offBtn.disabled = true;

                    if (window.saveFeedbackToDB) {
                        const res = await window.saveFeedbackToDB(name, 'via-chat-offline@psd.com', 'Tiket Chat Offline', msg, phone);
                        if (res.success) {
                            if (window.showModal) window.showModal('Berhasil!', 'Pesan Anda telah terkirim sebagai tiket. Kami akan menghubungi Anda segera.', 'success');
                            else alert('Pesan terkirim!');
                            
                            // Clear and close
                            document.getElementById('chat-off-name').value = '';
                            document.getElementById('chat-off-phone').value = '';
                            document.getElementById('chat-off-msg').value = '';
                            chatWindow.classList.add('hidden');
                        } else {
                            if (window.showModal) window.showModal('Gagal', 'Terjadi kesalahan saat mengirim pesan.', 'error');
                        }
                    }
                    
                    offBtn.innerHTML = 'Kirim Pesan Sekarang';
                    offBtn.disabled = false;
                });
            }

            // Send Message
            chatForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const text = chatInput.value.trim();
                if (!text) return;
                
                const userName = localStorage.getItem('psd_chat_user_name') || 'User';
                chatInput.value = '';

                if (window.sendChatMessage) {
                    const res = await window.sendChatMessage(text, false, userName);
                    if (!res.success) {
                        console.error('Chat send error:', res.error);
                    }
                }
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
