// Simple Data Management System using Supabase & localStorage (Hybrid)
console.log('admin-system.js starting to load...');

// Define DB_KEYS first
const DB_KEYS = {
    NEWS: 'psd_news',
    FEEDBACK: 'psd_feedback',
    COMPANY: 'psd_company',
    AUTH: 'psd_auth_v2',
    SESSION: 'psd_session',
    CURRENT_USER: 'psd_current_user',
    USERS: 'psd_users',
    SEO: 'psd_seo',
    FEATURES: 'psd_features',
    TESTIMONIALS: 'psd_testimonials',
    FAQ: 'psd_faq',
    ANALYTICS: 'psd_analytics'
};

// 1. ATTACH ALL FUNCTIONS TO WINDOW IMMEDIATELY
console.log('Attaching functions to window...');

window.isLoggedIn = function() {
    const session = sessionStorage.getItem(DB_KEYS.SESSION) === 'true';
    return session;
};

window.getCurrentUser = function() {
    try {
        const stored = sessionStorage.getItem(DB_KEYS.CURRENT_USER);
        return stored ? JSON.parse(stored) : { username: 'admin', displayName: 'Admin' };
    } catch(e) {
        return { username: 'admin', displayName: 'Admin' };
    }
};

window.login = function(username, password) {
    console.log('login() called for:', username);
    try {
        if (typeof CryptoJS === 'undefined') {
            alert('Error: Sistem keamanan (CryptoJS) tidak termuat. Periksa koneksi internet Anda.');
            return false;
        }
        const inputHash = CryptoJS.SHA256(password).toString();

        // 1. Check multi-user list first
        const users = JSON.parse(localStorage.getItem(DB_KEYS.USERS) || '[]');
        const matchedUser = users.find(u => u.username === username && u.passwordHash === inputHash);
        if (matchedUser) {
            sessionStorage.setItem(DB_KEYS.SESSION, 'true');
            sessionStorage.setItem(DB_KEYS.CURRENT_USER, JSON.stringify({ username: matchedUser.username, displayName: matchedUser.displayName || matchedUser.username }));
            console.log('Login successful (multi-user):', matchedUser.username);
            return true;
        }

        // 2. Fallback: legacy single auth
        let authData = JSON.parse(localStorage.getItem(DB_KEYS.AUTH) || 'null');
        if (!authData) authData = { username: 'admin', passwordHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', displayName: 'Admin' };
        
        if (username === authData.username && inputHash === authData.passwordHash) {
            sessionStorage.setItem(DB_KEYS.SESSION, 'true');
            sessionStorage.setItem(DB_KEYS.CURRENT_USER, JSON.stringify({ username: authData.username, displayName: authData.displayName || 'Admin' }));
            console.log('Login successful (legacy):', authData.username);
            return true;
        }
        
        console.warn('Login failed: Invalid credentials');
        return false;
    } catch (e) {
        console.error('Login error:', e);
        return false;
    }
};

window.updateAdminPassword = function(newPassword, targetUsername) {
    console.log('updateAdminPassword() called');
    try {
        const newHash = CryptoJS.SHA256(newPassword).toString();
        const uname = targetUsername || window.getCurrentUser().username;

        // Update in users array if exists
        const users = JSON.parse(localStorage.getItem(DB_KEYS.USERS) || '[]');
        const idx = users.findIndex(u => u.username === uname);
        if (idx !== -1) {
            users[idx].passwordHash = newHash;
            localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
        }

        // Also update legacy auth if it's the same user
        let authData = JSON.parse(localStorage.getItem(DB_KEYS.AUTH) || 'null') || { username: 'admin' };
        if (authData.username === uname) {
            authData.passwordHash = newHash;
            localStorage.setItem(DB_KEYS.AUTH, JSON.stringify(authData));
        }
        return true;
    } catch (e) {
        console.error('Update password error:', e);
        return false;
    }
};

window.logout = function() {
    console.log('logout() called');
    sessionStorage.removeItem(DB_KEYS.SESSION);
    sessionStorage.removeItem(DB_KEYS.CURRENT_USER);
    window.location.reload();
};

// --- USER MANAGEMENT ---
window.getUsers = function() {
    try {
        const users = JSON.parse(localStorage.getItem(DB_KEYS.USERS) || '[]');
        // Always ensure default admin appears
        const authData = JSON.parse(localStorage.getItem(DB_KEYS.AUTH) || 'null');
        if (authData && !users.find(u => u.username === authData.username)) {
            users.unshift({ id: 'legacy-admin', username: authData.username, displayName: authData.displayName || 'Admin', role: 'admin', isLegacy: true });
        }
        return users;
    } catch(e) { return []; }
};

window.saveUser = function(userData) {
    try {
        const users = JSON.parse(localStorage.getItem(DB_KEYS.USERS) || '[]');
        if (userData.password) {
            userData.passwordHash = CryptoJS.SHA256(userData.password).toString();
            delete userData.password;
        }
        const idx = users.findIndex(u => u.id === userData.id);
        if (idx !== -1) {
            users[idx] = { ...users[idx], ...userData };
        } else {
            userData.id = 'user_' + Date.now();
            userData.role = userData.role || 'admin';
            users.push(userData);
        }
        localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
        return { success: true };
    } catch(e) {
        return { success: false, error: e.message };
    }
};

window.deleteUser = function(userId) {
    try {
        const users = JSON.parse(localStorage.getItem(DB_KEYS.USERS) || '[]');
        const filtered = users.filter(u => u.id !== userId);
        localStorage.setItem(DB_KEYS.USERS, JSON.stringify(filtered));
        return { success: true };
    } catch(e) {
        return { success: false, error: e.message };
    }
};

window.initDB = function() {
    console.log('initDB() called');
    try {
        const all2News = [
            {
                title: 'Implementasi Sistem Digital di Pesantren Modern',
                date: '05 Jan 2026',
                summary: 'Langkah besar menuju digitalisasi pendidikan islam di Indonesia mulai menunjukkan hasil yang signifikan dengan sistem manajemen terpadu.',
                content: '<p>Digitalisasi di lingkungan pesantren...</p>',
                image: 'src/berita1.webp'
            },
            {
                title: 'Pelatihan Manajemen Keuangan Digital Untuk Admin Pesantren',
                date: '02 Jan 2026',
                summary: 'Meningkatkan akuntabilitas dan transparansi keuangan pesantren melalui sistem manajemen yang terintegrasi...',
                content: '<p>Pelatihan keuangan...</p>',
                image: 'src/berita2.webp'
            }
        ];
        let currentNews = JSON.parse(localStorage.getItem(DB_KEYS.NEWS)) || [];
        let newsAdded = false;
        all2News.forEach((n, idx) => {
            if (!currentNews.find(cn => cn.title === n.title)) {
                currentNews.push({ ...n, id: Date.now() + 100 + idx });
                newsAdded = true;
            }
        });
        if (newsAdded) {
            localStorage.setItem(DB_KEYS.NEWS, JSON.stringify(currentNews));
        }

        if (!localStorage.getItem(DB_KEYS.COMPANY)) {
            const mockCompany = {
                name: 'Pesantren Smart Digital',
                email: 'info@pesantrensmart.com',
                phone: '+62 812-3456-7890',
                address: 'Jl. Pesantren No. 123, Indonesia',
                playstore_url: '#',
                social: { instagram: '#', facebook: '#', tiktok: '#' },
                hero_headline: 'Solusi Digital Cerdas Untuk Pesantren Modern',
                hero_subheadline: 'PSD hadir mentransformasi tata kelola pesantren Anda menjadi lebih efisien, transparan, dan terintegrasi.',
                whatsapp_number: '6281368946818'
            };
            localStorage.setItem(DB_KEYS.COMPANY, JSON.stringify(mockCompany));
        } else {
            const current = JSON.parse(localStorage.getItem(DB_KEYS.COMPANY));
            let updated = false;
            if (current && !current.hasOwnProperty('playstore_url')) { current.playstore_url = '#'; updated = true; }
            if (current && !current.hasOwnProperty('hero_headline')) { current.hero_headline = 'Solusi Digital Cerdas Untuk Pesantren Modern'; updated = true; }
            if (current && !current.hasOwnProperty('hero_subheadline')) { current.hero_subheadline = 'PSD hadir mentransformasi tata kelola pesantren Anda menjadi lebih efisien, transparan, dan terintegrasi.'; updated = true; }
            if (current && !current.hasOwnProperty('whatsapp_number')) { current.whatsapp_number = '6281368946818'; updated = true; }
            if (updated) localStorage.setItem(DB_KEYS.COMPANY, JSON.stringify(current));
        }

        const all20Features = [
            { title: 'Buku Tamu Digital', description: 'Pencatatan pengunjung pesantren dengan mudah dan rapi.', icon: 'card' },
            { title: 'Izin Santri', description: 'Proses perizinan santri keluar-masuk terpantau sistematis.', icon: 'parent' },
            { title: 'Kepegawaian', description: 'Manajemen data asatidz, absen, hingga penggajian.', icon: 'staff' },
            { title: 'Akademik', description: 'Pengelolaan kurikulum, jadwal pelajaran, dan nilai santri.', icon: 'teacher' },
            { title: 'Surat Menyurat', description: 'Pembuatan surat keterangan secara otomatis dan arsip digital.', icon: 'archive' },
            { title: 'Pangkalan Data', description: 'Bank data terpusat seluruh elemen pesantren.', icon: 'database' },
            { title: 'Koperasi & Kantin', description: 'Digitalisasi transaksi minimarket dan kantin santri.', icon: 'shop' },
            { title: 'BK & Pelanggaran', description: 'Pencatatan poin kedisiplinan dan histori pelanggaran santri.', icon: 'student' },
            { title: 'Penilaian (Raport)', description: 'Generate nilai raport santri secara otomatis dalam hitungan detik.', icon: 'star' },
            { title: 'Buku Induk', description: 'Penyimpanan data historis santri secara komprehensif.', icon: 'report' },
            { title: 'Keuangan', description: 'Rekap bayaran SPP, donasi, dan laporan arus kas pesantren.', icon: 'money' },
            { title: 'Aset & Inventaris', description: 'Monitoring barang, asrama, dan fasilitas yayasan.', icon: 'monitor' },
            { title: 'Absensi', description: 'Rekap kehadiran harian santri, kelas, dan asrama.', icon: 'clock' },
            { title: 'Berita & Pengumuman', description: 'Platform info terupdate untuk wali santri dan civitas.', icon: 'news' },
            { title: 'Konseling', description: 'Fasilitas konsultasi asatidz dan psikolog pesantren.', icon: 'chat' },
            { title: 'Broadcast WA', description: 'Kirim info tagihan dan pengumuman masal via WhatsApp otomatis.', icon: 'broadcast' },
            { title: 'Payment Gateway', description: 'Pembayaran SPP via Virtual Account (BSI, Mandiri, BCA, dll).', icon: 'payment' },
            { title: 'Pesan Wali Santri', description: 'Fitur direct message wali santri ke musyrif/pengasuh.', icon: 'mail' },
            { title: 'Jurnal Kegiatan', description: 'Pencatatan harian log kegiatan santri di asrama.', icon: 'activity' },
            { title: 'Akses Gerbang', description: 'Kartu RFID/Barcode terintegrasi untuk akses gerbang masuk.', icon: 'gate' }
        ];
        
        let currentFeatures = JSON.parse(localStorage.getItem(DB_KEYS.FEATURES)) || [];
        let featuresAdded = false;
        all20Features.forEach((f, idx) => {
            if (!currentFeatures.find(cf => cf.title === f.title)) {
                currentFeatures.push({ ...f, id: Date.now() + 200 + idx });
                featuresAdded = true;
            }
        });
        if (featuresAdded) {
            localStorage.setItem(DB_KEYS.FEATURES, JSON.stringify(currentFeatures));
        }

        if (!localStorage.getItem(DB_KEYS.TESTIMONIALS)) {
            const mockTestimonials = [
                { id: 1, name: 'KH. Ahmad Dahlan', role: 'Pengasuh Ponpes', content: 'Sistem PSD sangat membantu efisiensi administrasi kami.', image: 'https://ui-avatars.com/api/?name=Ahmad+Dahlan&background=0A5C4F&color=fff' },
                { id: 2, name: 'Hj. Siti Aminah', role: 'Wali Santri', content: 'Sekarang pantau perkembangan anak jadi lebih mudah lewat aplikasi.', image: 'https://ui-avatars.com/api/?name=Siti+Aminah&background=F4C430&color=fff' }
            ];
            localStorage.setItem(DB_KEYS.TESTIMONIALS, JSON.stringify(mockTestimonials));
        }

        if (!localStorage.getItem(DB_KEYS.FAQ)) {
            const mockFAQ = [
                { id: 1, question: 'Apa itu Pesantren Smart Digital?', answer: 'PSD adalah platform terintegrasi untuk modernisasi tata kelola pesantren.' },
                { id: 2, question: 'Bagaimana cara mendaftar?', answer: 'Anda dapat menghubungi tim marketing kami melalui tombol WhatsApp yang tersedia.' }
            ];
            localStorage.setItem(DB_KEYS.FAQ, JSON.stringify(mockFAQ));
        }

        if (!localStorage.getItem(DB_KEYS.SEO)) {
            const defaultSEO = {
                meta_title: 'Pesantren Smart Digital - Solusi Manajemen Pesantren',
                meta_description: 'Platform manajemen pesantren digital terintegrasi untuk modernisasi pendidikan islam di Indonesia.',
                meta_keywords: 'pesantren, pesantren digital, manajemen pesantren, aplikasi pesantren, spp online'
            };
            localStorage.setItem(DB_KEYS.SEO, JSON.stringify(defaultSEO));
        }

        // Initialize auth if not exists
        if (!localStorage.getItem(DB_KEYS.AUTH)) {
            const defaultAuth = { username: 'admin', passwordHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918' }; // password: admin
            localStorage.setItem(DB_KEYS.AUTH, JSON.stringify(defaultAuth));
            console.log('Auth initialized to default (admin/admin)');
        }
    } catch (e) {
        console.error('initDB error:', e);
    }
};

window.getNews = async function() {
    let supabaseData = [];
    if (window.supabaseInstance && !window.isSupabaseError) {
        try {
            const { data, error } = await window.supabaseInstance.from('news').select('*').order('id', { ascending: false });
            if (error) throw error;
            supabaseData = data;
        } catch (err) {
            console.error('Failed to get news from Supabase:', err);
            if (err.message === 'TypeError: Load failed' || err.message.includes('hostname')) {
                window.isSupabaseError = true;
                console.warn('Network Error: Supabase Hostname tidak ditemukan. Beralih sepenuhnya ke LocalStorage.');
            }
        }
    }
    const localData = JSON.parse(localStorage.getItem(DB_KEYS.NEWS)) || [];
    const combined = [...supabaseData];
    const existingIds = new Set(supabaseData.map(item => item.id));
    const existingTitles = new Set(supabaseData.map(item => (item.title || '').toLowerCase()));
    
    for (const item of localData) {
        if (!existingIds.has(item.id) && !existingTitles.has((item.title || '').toLowerCase())) {
            combined.push(item);
        }
    }
    return combined.sort((a, b) => b.id - a.id);
};

window.getNewsById = async function(id) {
    const numericId = parseInt(id, 10);
    
    // Try Supabase first if connected and ID is a valid integer
    if (window.supabaseInstance && !window.isSupabaseError && !isNaN(numericId)) {
        try {
            const { data, error } = await window.supabaseInstance.from('news').select('*').eq('id', numericId).single();
            if (!error && data) return data;
            if (error && error.code !== 'PGRST116') { // PGRST116 = not found, which is fine
                console.error('Supabase getNewsById error:', error);
            }
        } catch (err) {
            console.error('Failed to get news by ID from Supabase:', err);
        }
    }
    // Fallback to localStorage
    const news = JSON.parse(localStorage.getItem(DB_KEYS.NEWS)) || [];
    return news.find(n => String(n.id) === String(id)) || null;
};

window.saveNewsToDB = async function(newsItem) {
    let newId = newsItem.id;
    if (window.supabaseInstance && !window.isSupabaseError) {
        try {
            const dataToSave = { ...newsItem };
            if (dataToSave.id > 2147483647) delete dataToSave.id;
            
            const { data, error } = await window.supabaseInstance.from('news').upsert([dataToSave]).select();
            if (error) throw error;
            if (data && data.length > 0) newId = data[0].id;
        } catch (err) {
            console.error('Failed to save news to Supabase:', err);
        }
    }
    const news = JSON.parse(localStorage.getItem(DB_KEYS.NEWS)) || [];
    const finalItem = { ...newsItem, id: newId };
    
    if (newsItem.id) {
        const index = news.findIndex(n => n.id === newsItem.id);
        if (index !== -1) news[index] = finalItem;
        else news.unshift(finalItem);
    } else {
        finalItem.id = newId || Date.now();
        news.unshift(finalItem);
    }
    localStorage.setItem(DB_KEYS.NEWS, JSON.stringify(news));
};

window.deleteNewsFromDB = async function(id) {
    if (window.supabaseInstance && !window.isSupabaseError) {
        if (id <= 2147483647) {
            try {
                const { error } = await window.supabaseInstance.from('news').delete().eq('id', id);
                if (error) throw error;
            } catch (err) {
                console.error('Failed to delete news from Supabase:', err);
            }
        }
    }
    const news = JSON.parse(localStorage.getItem(DB_KEYS.NEWS)) || [];
    const filtered = news.filter(n => n.id !== id);
    localStorage.setItem(DB_KEYS.NEWS, JSON.stringify(filtered));
};

window.getFeedback = async function() {
    if (window.supabaseInstance && !window.isSupabaseError) {
        try {
            const { data, error } = await window.supabaseInstance.from('feedback').select('*').order('id', { ascending: false });
            if (error) throw error;
            return data;
        } catch (err) {
            console.error('Failed to get feedback from Supabase:', err);
        }
    }
    return JSON.parse(localStorage.getItem(DB_KEYS.FEEDBACK)) || [];
};

window.saveFeedbackToDB = async function(name, email, subject, message) {
    const newFeedback = {
        name, email, subject, message,
        date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
    };
    
    let supabaseSuccess = false;
    let localSuccess = false;
    let errorMsg = null;

    if (window.supabaseInstance && !window.isSupabaseError) {
        try {
            console.log('Attempting to save feedback to Supabase:', newFeedback);
            const { error } = await window.supabaseInstance.from('feedback').insert([newFeedback]);
            if (error) {
                console.error('Supabase Insert Error:', error);
                if (error.code === '42703') {
                    errorMsg = 'Error: Kolom di Supabase tidak sesuai (mungkin kolom "message" atau "date" belum dibuat).';
                } else {
                    errorMsg = `Supabase Error: ${error.message}`;
                }
                throw error;
            }
            console.log('Feedback saved to Supabase successfully');
            supabaseSuccess = true;
        } catch (err) {
            console.error('Failed to save feedback to Supabase:', err);
        }
    } else {
        console.warn('Supabase not available or error state, falling back to LocalStorage');
    }

    try {
        const feedback = JSON.parse(localStorage.getItem(DB_KEYS.FEEDBACK)) || [];
        newFeedback.id = Date.now();
        feedback.unshift(newFeedback);
        localStorage.setItem(DB_KEYS.FEEDBACK, JSON.stringify(feedback));
        localSuccess = true;
        console.log('Feedback saved to LocalStorage successfully');
    } catch (e) {
        console.error('Failed to save feedback to LocalStorage:', e);
    }

    return { success: supabaseSuccess || localSuccess, error: errorMsg, isSupabase: supabaseSuccess };
};

// --- LIVE CHAT FUNCTIONS ---

// Unique ID for chat session
window.getChatUserId = function() {
    let userId = localStorage.getItem('psd_chat_user_id');
    if (!userId) {
        userId = 'user_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('psd_chat_user_id', userId);
    }
    return userId;
};

window.playChatSound = function() {
    try {
        if (!window.chatAudioCtx) {
            window.chatAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (window.chatAudioCtx.state === 'suspended') {
            window.chatAudioCtx.resume();
        }
        const osc = window.chatAudioCtx.createOscillator();
        const gain = window.chatAudioCtx.createGain();
        osc.connect(gain);
        gain.connect(window.chatAudioCtx.destination);
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, window.chatAudioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, window.chatAudioCtx.currentTime + 0.1);
        
        gain.gain.setValueAtTime(0, window.chatAudioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.2, window.chatAudioCtx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, window.chatAudioCtx.currentTime + 0.3);
        
        osc.start(window.chatAudioCtx.currentTime);
        osc.stop(window.chatAudioCtx.currentTime + 0.3);
    } catch (e) {
        console.warn('Sound play failed', e);
    }
};

window.saveChatSession = async function(name, email) {
    const sender_id = window.getChatUserId();
    
    if (window.supabaseInstance && !window.isSupabaseError) {
        try {
            const { data, error } = await window.supabaseInstance
                .from('chat_sessions')
                .upsert({ sender_id, name, email });
            if (error) {
                console.error('Supabase chat_sessions error:', error);
                return { success: false, error: error.message };
            }
        } catch (e) {
            console.error('Supabase chat_sessions exception:', e);
            return { success: false, error: e.message };
        }
    }
    
    // Always save to localStorage
    localStorage.setItem('psd_chat_user_name', name);
    localStorage.setItem('psd_chat_user_email', email);
    return { success: true };
};

window.getMessages = async function() {
    console.log('getMessages() called');
    let messages = [];
    // 1. Try Supabase
    if (window.supabaseInstance && !window.isSupabaseError) {
        try {
            const { data, error } = await window.supabaseInstance
                .from('messages')
                .select('*')
                .order('created_at', { ascending: true });
            if (!error && data) {
                console.log('Fetched messages from Supabase:', data.length);
                messages = data;
            }
        } catch (err) {
            console.error('Failed to get messages from Supabase:', err);
        }
    }
    
    // 2. Fallback/Combine with LocalStorage
    const localMsgs = JSON.parse(localStorage.getItem('psd_messages') || '[]');
    console.log('Fetched messages from LocalStorage:', localMsgs.length);
    // ...
    // Simple merge by id/timestamp to avoid duplicates if both are active
    const combined = [...messages];
    localMsgs.forEach(lm => {
        if (!combined.find(cm => (cm.id && cm.id === lm.id) || (cm.text === lm.text && cm.created_at === lm.created_at))) {
            combined.push(lm);
        }
    });
    
    return combined.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
};

window.sendChatMessage = async function(text, isAdmin = false, senderName = 'User', targetUserId = null) {
    const userId = targetUserId || window.getChatUserId();
    const msg = {
        id: Date.now(),
        sender_id: userId,
        sender_name: isAdmin ? 'Admin PSD' : senderName,
        text: text,
        is_admin: isAdmin,
        created_at: new Date().toISOString()
    };
    console.log('sendChatMessage() attempt:', msg);

    let supabaseSuccess = false;
    if (window.supabaseInstance && !window.isSupabaseError) {
        try {
            const { error } = await window.supabaseInstance.from('messages').insert([msg]);
            if (!error) supabaseSuccess = true;
        } catch (err) {
            console.error('Failed to send message to Supabase:', err);
        }
    }

    // Always save to LocalStorage as well for reliability/fallback
    try {
        const localMsgs = JSON.parse(localStorage.getItem('psd_messages') || '[]');
        localMsgs.push(msg);
        localStorage.setItem('psd_messages', JSON.stringify(localMsgs));
    } catch (e) {
        console.error('Local message save failed:', e);
    }

    return { success: true, isSupabase: supabaseSuccess };
};

window.subscribeToMessages = function(callback) {
    if (window.supabaseInstance && !window.isSupabaseError) {
        console.log('Subscribing to messages...');
        return window.supabaseInstance
            .channel('public:messages')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
                console.log('New message received:', payload.new);
                callback(payload.new);
            })
            .subscribe();
    }
    return null;
};

window.getCompanyInfo = async function() {
    if (window.supabaseInstance && !window.isSupabaseError) {
        try {
            const { data, error } = await window.supabaseInstance.from('company').select('*').eq('id', 1).single();
            if (error) throw error;
            return data;
        } catch (err) {
            console.error('Failed to get company info from Supabase:', err);
        }
    }
    return JSON.parse(localStorage.getItem(DB_KEYS.COMPANY));
};

window.updateCompanyInfoInDB = async function(info) {
    if (window.supabaseInstance && !window.isSupabaseError) {
        try {
            // Include all fields in the update
            const { error } = await window.supabaseInstance.from('company').update({
                email: info.email,
                phone: info.phone,
                address: info.address,
                playstore_url: info.playstore_url,
                social: info.social,
                hero_headline: info.hero_headline,
                hero_subheadline: info.hero_subheadline,
                whatsapp_number: info.whatsapp_number
            }).eq('id', 1);
            if (error) throw error;
        } catch (err) {
            console.error('Failed to update company info in Supabase:', err);
        }
    }
    const current = JSON.parse(localStorage.getItem(DB_KEYS.COMPANY)) || {};
    const updated = { ...current, ...info };
    localStorage.setItem(DB_KEYS.COMPANY, JSON.stringify(updated));
};

window.syncCompanyInfo = async function() {
    try {
        const info = await window.getCompanyInfo();
        if (!info) return;

        // Footer & Navbar Contact
        const emailEls = document.querySelectorAll('[id^="footer-email"], [id^="nav-email"]');
        const phoneEls = document.querySelectorAll('[id^="footer-phone"], [id^="nav-phone"]');
        const addrEls = document.querySelectorAll('[id^="footer-address"]');
        
        emailEls.forEach(el => el.innerText = info.email);
        phoneEls.forEach(el => el.innerText = info.phone);
        addrEls.forEach(el => el.innerText = info.address);

        // Social Links (Fixed bug where nav social didn't update)
        const socialInstas = document.querySelectorAll('[id$="-social-instagram"]');
        const socialFBs = document.querySelectorAll('[id$="-social-facebook"]');
        const socialTikToks = document.querySelectorAll('[id$="-social-tiktok"]');
        
        let social = info.social;
        if (typeof social === 'string') {
            try { social = JSON.parse(social); } catch(e) { console.error('Parse social failed', e); }
        }

        socialInstas.forEach(el => el.href = social?.instagram || '#');
        socialFBs.forEach(el => el.href = social?.facebook || '#');
        socialTikToks.forEach(el => el.href = social?.tiktok || '#');
        
        // Playstore & WhatsApp
        const playStoreLinks = document.querySelectorAll('[id$="-playstore-link"]');
        playStoreLinks.forEach(el => el.href = info.playstore_url || '#');

        // Hero Content
        const heroTitle = document.getElementById('hero-title');
        const heroSub = document.getElementById('hero-subtitle');
        if (heroTitle && info.hero_headline) heroTitle.innerText = info.hero_headline;
        if (heroSub && info.hero_subheadline) heroSub.innerText = info.hero_subheadline;

        // WhatsApp floating button logic has been removed and replaced with Live Chat
    } catch (e) {
        console.error('syncCompanyInfo error:', e);
    }
};

window.getGlobalSEO = async function() {
    if (window.supabaseInstance && !window.isSupabaseError) {
        try {
            const { data, error } = await window.supabaseInstance.from('global_seo').select('*').eq('id', 1).single();
            if (error) {
                // Jika tabel belum ada di Supabase, fallback ke local
                if (error.code === '42P01') {
                    console.warn('Tabel global_seo belum ada di Supabase, fallback ke LocalStorage');
                } else {
                    throw error;
                }
            } else if (data) {
                return data;
            }
        } catch (err) {
            console.error('Failed to get global SEO from Supabase:', err);
        }
    }
    return JSON.parse(localStorage.getItem(DB_KEYS.SEO));
};

window.updateGlobalSEOInDB = async function(seoData) {
    if (window.supabaseInstance && !window.isSupabaseError) {
        try {
            const { error } = await window.supabaseInstance.from('global_seo').upsert([{ id: 1, ...seoData }]);
            if (error) {
                 if (error.code === '42P01') {
                    console.warn('Tabel global_seo belum ada di Supabase, hanya menyimpan di LocalStorage');
                } else {
                    throw error;
                }
            }
        } catch (err) {
            console.error('Failed to update global SEO in Supabase:', err);
        }
    }
    const current = JSON.parse(localStorage.getItem(DB_KEYS.SEO)) || {};
    const updated = { ...current, ...seoData };
    localStorage.setItem(DB_KEYS.SEO, JSON.stringify(updated));
};

window.syncGlobalSEO = async function() {
    try {
        const seo = await window.getGlobalSEO();
        if (!seo) return;

        // Update Title if not explicitly set by page logic (like berita-detail)
        if (!window.location.pathname.includes('berita-detail.html')) {
            if (seo.meta_title) document.title = seo.meta_title;
        }

        // Update Meta Description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            document.head.appendChild(metaDesc);
        }
        if (seo.meta_description && !window.location.pathname.includes('berita-detail.html')) {
             metaDesc.content = seo.meta_description;
        }

        // Update Meta Keywords
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
            metaKeywords = document.createElement('meta');
            metaKeywords.name = 'keywords';
            document.head.appendChild(metaKeywords);
        }
        if (seo.meta_keywords && !window.location.pathname.includes('berita-detail.html')) {
            metaKeywords.content = seo.meta_keywords;
        }

    } catch (e) {
        console.error('syncGlobalSEO error:', e);
    }
};

// --- NEW CRUD FUNCTIONS FOR FEATURES, TESTIMONIALS, FAQ ---

async function genericGet(table, key) {
    let supabaseData = [];
    if (window.supabaseInstance && !window.isSupabaseError) {
        try {
            const { data, error } = await window.supabaseInstance.from(table).select('*').order('id', { ascending: false });
            if (error) throw error;
            supabaseData = data;
        } catch (err) {
            console.error(`Failed to get ${table} from Supabase:`, err);
        }
    }
    const localData = JSON.parse(localStorage.getItem(key)) || [];
    
    const combined = [...supabaseData];
    const existingIds = new Set(supabaseData.map(item => item.id));
    const existingTitles = new Set(supabaseData.map(item => (item.title || item.name || item.question || '').toLowerCase()));
    
    for (const item of localData) {
        const identifier = (item.title || item.name || item.question || '').toLowerCase();
        if (!existingIds.has(item.id) && !existingTitles.has(identifier)) {
            combined.push(item);
        }
    }
    
    return combined.sort((a, b) => b.id - a.id);
}

async function genericSave(table, key, item) {
    let newId = item.id;
    if (window.supabaseInstance && !window.isSupabaseError) {
        try {
            const dataToSave = { ...item };
            if (dataToSave.id > 2147483647) delete dataToSave.id;
            
            const { data, error } = await window.supabaseInstance.from(table).upsert([dataToSave]).select();
            if (error) throw error;
            if (data && data.length > 0) newId = data[0].id;
        } catch (err) {
            console.error(`Failed to save ${table} to Supabase:`, err);
        }
    }
    const list = JSON.parse(localStorage.getItem(key)) || [];
    const finalItem = { ...item, id: newId };
    
    if (item.id) {
        const index = list.findIndex(i => i.id === item.id);
        if (index !== -1) list[index] = finalItem;
        else list.unshift(finalItem);
    } else {
        finalItem.id = newId || Date.now();
        list.unshift(finalItem);
    }
    localStorage.setItem(key, JSON.stringify(list));
}

async function genericDelete(table, key, id) {
    if (window.supabaseInstance && !window.isSupabaseError) {
        if (id <= 2147483647) {
            try {
                const { error } = await window.supabaseInstance.from(table).delete().eq('id', id);
                if (error) throw error;
            } catch (err) {
                console.error(`Failed to delete from ${table} in Supabase:`, err);
            }
        }
    }
    const list = JSON.parse(localStorage.getItem(key)) || [];
    localStorage.setItem(key, JSON.stringify(list.filter(i => i.id !== id)));
}

window.getFeatures = () => genericGet('features', DB_KEYS.FEATURES);
window.saveFeature = (item) => genericSave('features', DB_KEYS.FEATURES, item);
window.deleteFeature = (id) => genericDelete('features', DB_KEYS.FEATURES, id);

window.getTestimonials = () => genericGet('testimonials', DB_KEYS.TESTIMONIALS);
window.saveTestimonial = (item) => genericSave('testimonials', DB_KEYS.TESTIMONIALS, item);
window.deleteTestimonial = (id) => genericDelete('testimonials', DB_KEYS.TESTIMONIALS, id);

window.getFAQ = () => genericGet('faq', DB_KEYS.FAQ);
window.saveFAQ = (item) => genericSave('faq', DB_KEYS.FAQ, item);
window.deleteFAQ = (id) => genericDelete('faq', DB_KEYS.FAQ, id);

// --- ANALYTICS ---
window.trackVisit = async function() {
    const data = {
        page_path: window.location.pathname,
        referrer: document.referrer,
        browser: navigator.userAgent.substring(0, 100)
    };
    if (window.supabaseInstance && !window.isSupabaseError) {
        try {
            await window.supabaseInstance.from('analytics').insert([data]);
        } catch (e) {}
    }
    // Local tracking
    const logs = JSON.parse(localStorage.getItem(DB_KEYS.ANALYTICS)) || [];
    logs.push({ ...data, date: new Date().toISOString() });
    localStorage.setItem(DB_KEYS.ANALYTICS, JSON.stringify(logs.slice(-100))); // Keep last 100
};

window.getAnalyticsStats = async function() {
    if (window.supabaseInstance && !window.isSupabaseError) {
        try {
            const { count: visits } = await window.supabaseInstance.from('analytics').select('*', { count: 'exact', head: true });
            const { count: news } = await window.supabaseInstance.from('news').select('*', { count: 'exact', head: true });
            const { count: feedback } = await window.supabaseInstance.from('feedback').select('*', { count: 'exact', head: true });
            return { visits, news, feedback };
        } catch (e) {}
    }
    // Fallback to local count
    return {
        visits: (JSON.parse(localStorage.getItem(DB_KEYS.ANALYTICS)) || []).length,
        news: (JSON.parse(localStorage.getItem(DB_KEYS.NEWS)) || []).length,
        feedback: (JSON.parse(localStorage.getItem(DB_KEYS.FEEDBACK)) || []).length
    };
};

// 2. SUPABASE INITIALIZATION
// IMPORTANT: Update these with your actual Supabase Project credentials!
const SUPABASE_URL = 'https://tcorbpybtgxhtwarfwyf.supabase.co'; 
const SUPABASE_ANON_KEY = 'sb_publishable_u3hZyGYv3X_tj6saDtjFtQ_ylo7zl7j';

window.supabaseInstance = null;
window.isSupabaseError = false;

function initSupabase() {
    console.log('Initializing Supabase with URL:', SUPABASE_URL);
    try {
        const sbClient = window.supabase;
        if (sbClient && SUPABASE_URL && SUPABASE_ANON_KEY) {
            window.supabaseInstance = sbClient.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log('Supabase initialized successfully');
            
            // Test connection
            window.supabaseInstance.from('news').select('count', { count: 'exact', head: true })
                .then(({ error }) => {
                    if (error) {
                        console.warn('Supabase connection test failed (possibly table missing or permissions):', error.message);
                        // We don't set isSupabaseError = true here yet, 
                        // only if it's a network/hostname error later.
                    } else {
                        console.log('Supabase connection test successful');
                    }
                });
                
            return true;
        }
    } catch (e) {
        console.error('Supabase initialization error:', e);
    }
    return false;
}

// 3. EXECUTE INITIALIZATION
try {
    initSupabase();
} catch (e) {
    console.error('Init call failed:', e);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('admin-system.js DOMContentLoaded');
    window.initDB();
    window.syncCompanyInfo();
    window.syncGlobalSEO();
    if (!window.location.pathname.includes('admin.html')) {
        window.trackVisit();
    }
});

// Sync Local Data to Supabase manually
window.syncLocalToSupabase = async function() {
    if (!window.supabaseInstance || window.isSupabaseError) {
        alert('Koneksi ke Supabase gagal atau belum dikonfigurasi!');
        return;
    }
    
    if (!confirm('Apakah Anda yakin ingin mengupload semua data dari Local Storage (Fitur, Testimoni, FAQ, Berita) ke database Supabase?')) {
        return;
    }
    
    try {
        const tables = [
            { name: 'features', key: DB_KEYS.FEATURES },
            { name: 'testimonials', key: DB_KEYS.TESTIMONIALS },
            { name: 'faq', key: DB_KEYS.FAQ },
            { name: 'news', key: DB_KEYS.NEWS }
        ];
        
        let totalUploaded = 0;
        
        for (const t of tables) {
            const localData = JSON.parse(localStorage.getItem(t.key)) || [];
            
            if (localData.length === 0) continue;
            
            // Get existing titles from Supabase to prevent duplicates
            const { data: existingData } = await window.supabaseInstance.from(t.name).select('*');
            const existingTitles = new Set((existingData || []).map(item => (item.title || item.name || item.question || '').toLowerCase()));
            
            // Items to upload are all local items that don't share a title with Supabase data
            const itemsToUpload = localData.filter(item => {
                const title = (item.title || item.name || item.question || '').toLowerCase();
                return !existingTitles.has(title);
            });
            
            const successfullyUploadedIds = new Set();
            
            for (const item of itemsToUpload) {
                const dataToSave = { ...item };
                delete dataToSave.id; // Let Supabase generate a proper serial ID
                
                const { error } = await window.supabaseInstance.from(t.name).insert([dataToSave]);
                if (error) {
                    console.error(`Gagal upload ke ${t.name}:`, error);
                    alert(`Gagal upload ke tabel ${t.name}: ${error.message}. Kemungkinan masalah izin akses (RLS).`);
                } else {
                    totalUploaded++;
                    successfullyUploadedIds.add(item.id);
                }
            }
            
            // Only remove successfully uploaded items from local storage
            if (successfullyUploadedIds.size > 0) {
                const currentLocal = JSON.parse(localStorage.getItem(t.key)) || [];
                const remainingLocal = currentLocal.filter(item => !successfullyUploadedIds.has(item.id));
                localStorage.setItem(t.key, JSON.stringify(remainingLocal));
            }
        }
        
        if (totalUploaded > 0) {
            alert(`Berhasil mengupload ${totalUploaded} data ke Supabase! Halaman akan dimuat ulang.`);
            window.location.reload();
        } else {
            alert('Proses selesai. Jika data belum masuk, cek pengaturan izin RLS di database Supabase kamu.');
        }
        
    } catch (error) {
        console.error('Sync error:', error);
        alert('Terjadi kesalahan saat sinkronisasi: ' + error.message);
    }
};

console.log('admin-system.js load complete.');
