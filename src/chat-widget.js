/**
 * Live Chat Widget for Pesantren Smart Digital
 * Injects a floating chat widget and handles real-time communication with registration
 */

(function() {
    const WIDGET_HTML = `
    <!-- Live Chat Widget -->
    <div id="chat-widget" class="fixed bottom-6 left-6 z-[9999] font-sans">
        <!-- Chat Bubble -->
        <button id="chat-bubble" class="bg-[#0A5C4F] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center relative">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
            <span id="chat-badge" class="absolute -top-1 -right-1 bg-[#FFD700] text-[#0A5C4F] text-[10px] font-bold px-1.5 py-0.5 rounded-full hidden">1</span>
        </button>

        <!-- Chat Window -->
        <div id="chat-window" class="absolute bottom-20 left-0 w-[300px] md:w-[350px] bg-white rounded-2xl shadow-2xl border border-gray-100 hidden flex-col overflow-hidden animate-fade-in-up">
            <!-- Header -->
            <div class="bg-[#0A5C4F] p-4 text-white flex justify-between items-center">
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                        <i class="fas fa-headset"></i>
                    </div>
                    <div>
                        <h4 class="font-bold text-sm">Live Chat PSD</h4>
                        <p class="text-[10px] text-white/80">Online | Kami siap membantu</p>
                    </div>
                </div>
                <button id="close-chat" class="hover:text-[#FFD700] transition">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <!-- Registration View -->
            <div id="chat-reg-view" class="p-6 space-y-4 bg-white flex-col hidden">
                <div class="text-center mb-4">
                    <h5 class="font-bold text-gray-800">Selamat Datang!</h5>
                    <p class="text-xs text-gray-500">Silakan isi data diri untuk memulai chat.</p>
                </div>
                <div>
                    <label class="block text-[10px] uppercase font-bold text-gray-400 mb-1">Nama Lengkap</label>
                    <input type="text" id="chat-reg-name" placeholder="Nama Anda" class="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0A5C4F] outline-none">
                </div>
                <div>
                    <label class="block text-[10px] uppercase font-bold text-gray-400 mb-1">Alamat Email</label>
                    <input type="email" id="chat-reg-email" placeholder="email@contoh.com" class="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0A5C4F] outline-none">
                </div>
                <button id="chat-reg-btn" class="w-full bg-[#0A5C4F] text-white font-bold py-3 rounded-xl hover:bg-opacity-90 transition shadow-lg shadow-[#0A5C4F]/20 mt-2">
                    Mulai Chat Sekarang
                </button>
            </div>

            <!-- Chat Content View (Initially Hidden) -->
            <div id="chat-content-view" class="flex flex-col hidden">
                <!-- Messages Area -->
                <div id="chat-messages" class="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50 flex flex-col">
                    <div class="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-gray-700 self-start max-w-[80%] border border-gray-100">
                        Halo! Ada yang bisa kami bantu hari ini?
                    </div>
                </div>

                <!-- Input Area -->
                <form id="chat-form" class="p-4 border-t border-gray-100 flex items-center space-x-2 bg-white">
                    <input type="text" id="chat-input" placeholder="Tulis pesan..." class="flex-1 bg-gray-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-[#0A5C4F] outline-none text-gray-800">
                    <button type="submit" class="bg-[#0A5C4F] text-white p-2 rounded-xl hover:bg-opacity-90 transition">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </form>
            </div>
        </div>
    </div>

    <style>
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.3s ease-out; }
        #chat-messages::-webkit-scrollbar { width: 4px; }
        #chat-messages::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
    </style>
    `;

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
        
        const regView = document.getElementById('chat-reg-view');
        const contentView = document.getElementById('chat-content-view');
        const regBtn = document.getElementById('chat-reg-btn');

        // Toggle Chat Window
        chatBubble.addEventListener('click', () => {
            chatWindow.classList.toggle('hidden');
            chatBadge.classList.add('hidden');
            checkRegistration();
            scrollToBottom();
        });

        closeChat.addEventListener('click', () => chatWindow.classList.add('hidden'));

        function checkRegistration() {
            const userName = localStorage.getItem('psd_chat_user_name');
            if (userName) {
                regView.classList.add('hidden');
                regView.classList.remove('flex');
                contentView.classList.remove('hidden');
                contentView.classList.add('flex');
            } else {
                regView.classList.remove('hidden');
                regView.classList.add('flex');
                contentView.classList.add('hidden');
                contentView.classList.remove('flex');
            }
        }

        regBtn.addEventListener('click', async () => {
            const name = document.getElementById('chat-reg-name').value.trim();
            const email = document.getElementById('chat-reg-email').value.trim();

            if (!name || !email) {
                alert('Silakan isi nama dan email Anda.');
                return;
            }

            regBtn.innerText = 'Menghubungkan...';
            regBtn.disabled = true;

            const res = await window.saveChatSession(name, email);
            if (res.success) {
                checkRegistration();
                // Send initial greeting with user info if it's a new session
                await window.sendChatMessage(`Halo, saya ${name}. Saya ingin bertanya...`);
            } else {
                alert('Gagal memulai chat: ' + res.error);
            }
            regBtn.innerText = 'Mulai Chat Sekarang';
            regBtn.disabled = false;
        });

        const scrollToBottom = () => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        };

        const appendMessage = (msg) => {
            const isMyMsg = msg.sender_id === window.getChatUserId();
            const isAdmin = msg.is_admin;
            
            const msgDiv = document.createElement('div');
            msgDiv.className = `max-w-[80%] p-3 rounded-2xl text-sm shadow-sm border ${
                isAdmin ? 'self-start bg-white rounded-tl-none border-gray-100 text-gray-700' : 
                isMyMsg ? 'self-end bg-[#0A5C4F] text-white rounded-tr-none border-[#0A5C4F]/20' :
                'self-start bg-white rounded-tl-none border-gray-100 text-gray-700'
            }`;
            
            msgDiv.innerHTML = `
                ${isAdmin ? '<div class="text-[10px] font-bold text-[#0A5C4F] mb-1">Admin PSD</div>' : ''}
                <div>${msg.text}</div>
                <div class="text-[9px] mt-1 ${isMyMsg ? 'text-white/60' : 'text-gray-400 text-right'}">
                    ${new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
            `;
            chatMessages.appendChild(msgDiv);
            scrollToBottom();

            if (chatWindow.classList.contains('hidden') && isAdmin) {
                chatBadge.classList.remove('hidden');
            }
        };

        // Wait for admin-system to load functions
        const waitForDeps = async () => {
            return new Promise(resolve => {
                const check = () => {
                    if (window.getMessages && window.supabaseInstance && window.saveChatSession) resolve();
                    else setTimeout(check, 100);
                };
                check();
            });
        };

        waitForDeps().then(async () => {
            // Load Existing Messages
            const messages = await window.getMessages();
            const userId = window.getChatUserId();
            messages.forEach(msg => {
                if (msg.sender_id === userId || msg.is_admin) {
                    appendMessage(msg);
                }
            });

            // Subscribe to Realtime
            window.subscribeToMessages((newMsg) => {
                const userId = window.getChatUserId();
                if (newMsg.sender_id === userId || newMsg.is_admin) {
                    const timestamp = new Date(newMsg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                    const existing = Array.from(chatMessages.children).some(el => el.innerText.includes(newMsg.text) && el.innerText.includes(timestamp));
                    if (!existing) appendMessage(newMsg);
                }
            });

            // Send Message
            chatForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const text = chatInput.value.trim();
                if (!text) return;

                chatInput.value = '';
                const res = await window.sendChatMessage(text);
                if (!res.success) {
                    console.error('Chat error:', res.error);
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
