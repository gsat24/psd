// Simple Data Management System using Supabase & localStorage (Hybrid)
console.log('admin-system.js starting to load...');

// Define DB_KEYS first
const DB_KEYS = {
    NEWS: 'psd_news',
    FEEDBACK: 'psd_feedback',
    COMPANY: 'psd_company',
    AUTH: 'psd_auth_v2',
    SESSION: 'psd_session',
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
    console.log('isLoggedIn check:', session);
    return session;
};

window.login = function(username, password) {
    console.log('login() called for:', username);
    try {
        const storedAuth = localStorage.getItem(DB_KEYS.AUTH);
        let authData;
        try {
            authData = storedAuth ? JSON.parse(storedAuth) : null;
        } catch(e) {
            console.error('Failed to parse auth data, resetting...');
            authData = null;
        }
        
        if (!authData) {
            authData = { username: 'admin', passwordHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918' };
        }
        
        console.log('Comparing against stored username:', authData.username);

        if (typeof CryptoJS === 'undefined') {
            console.error('CryptoJS is not loaded!');
            alert('Error: Sistem keamanan (CryptoJS) tidak termuat. Periksa koneksi internet Anda.');
            return false;
        }

        const inputHash = CryptoJS.SHA256(password).toString();
        if (username === authData.username && inputHash === authData.passwordHash) {
            sessionStorage.setItem(DB_KEYS.SESSION, 'true');
            console.log('Login successful! Session set.');
            return true;
        }
        
        console.warn('Login failed: Invalid credentials');
        return false;
    } catch (e) {
        console.error('Login error:', e);
        return false;
    }
};

window.updateAdminPassword = function(newPassword) {
    console.log('updateAdminPassword() called');
    try {
        const storedAuth = localStorage.getItem(DB_KEYS.AUTH);
        let authData = { username: 'admin' };
        try {
            if (storedAuth) authData = JSON.parse(storedAuth);
        } catch(e) {}
        
        const newHash = CryptoJS.SHA256(newPassword).toString();
        authData.passwordHash = newHash;
        localStorage.setItem(DB_KEYS.AUTH, JSON.stringify(authData));
        return true;
    } catch (e) {
        console.error('Update password error:', e);
        return false;
    }
};

window.logout = function() {
    console.log('logout() called');
    sessionStorage.removeItem(DB_KEYS.SESSION);
    window.location.reload();
};

window.initDB = function() {
    console.log('initDB() called');
    try {
        if (!localStorage.getItem(DB_KEYS.NEWS)) {
            const mockNews = [
                {
                    id: 1,
                    title: 'Implementasi Sistem Digital di Pesantren Modern',
                    date: '05 Jan 2026',
                    summary: 'Langkah besar menuju digitalisasi pendidikan islam di Indonesia mulai menunjukkan hasil yang signifikan dengan sistem manajemen terpadu.',
                    content: `<p>Digitalisasi di lingkungan pesantren...</p>`,
                    image: 'src/berita1.webp'
                }
            ];
            localStorage.setItem(DB_KEYS.NEWS, JSON.stringify(mockNews));
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

        if (!localStorage.getItem(DB_KEYS.FEATURES)) {
            const mockFeatures = [
                { id: 1, title: 'Manajemen Santri', description: 'Kelola data ribuan santri dengan mudah dan akurat.', icon: 'users' },
                { id: 2, title: 'Pembayaran Digital', description: 'Sistem SPP dan donasi online yang terintegrasi otomatis.', icon: 'credit-card' },
                { id: 3, title: 'Absensi Real-time', description: 'Pantau kehadiran santri dan asatidz secara instan.', icon: 'clock' }
            ];
            localStorage.setItem(DB_KEYS.FEATURES, JSON.stringify(mockFeatures));
        }

        if (!localStorage.getItem(DB_KEYS.TESTIMONIALS)) {
            const mockTestimonials = [
                { id: 1, name: 'KH. Ahmad Dahlan', role: 'Pengasuh Ponpes', content: 'Sistem PSD sangat membantu efisiensi administrasi kami.', image: 'src/user1.webp' },
                { id: 2, name: 'Hj. Siti Aminah', role: 'Wali Santri', content: 'Sekarang pantau perkembangan anak jadi lebih mudah lewat aplikasi.', image: 'src/user2.webp' }
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
    if (window.supabaseInstance && !window.isSupabaseError) {
        try {
            const { data, error } = await window.supabaseInstance.from('news').select('*').order('id', { ascending: false });
            if (error) throw error;
            return data;
        } catch (err) {
            console.error('Failed to get news from Supabase:', err);
            if (err.message === 'TypeError: Load failed' || err.message.includes('hostname')) {
                window.isSupabaseError = true;
                console.warn('Network Error: Supabase Hostname tidak ditemukan. Beralih sepenuhnya ke LocalStorage.');
            }
        }
    }
    return JSON.parse(localStorage.getItem(DB_KEYS.NEWS)) || [];
};

window.getNewsById = async function(id) {
    if (window.supabaseInstance && !window.isSupabaseError) {
        try {
            const { data, error } = await window.supabaseInstance.from('news').select('*').eq('id', id).single();
            if (error) throw error;
            return data;
        } catch (err) {
            console.error('Failed to get news by ID from Supabase:', err);
        }
    }
    const news = JSON.parse(localStorage.getItem(DB_KEYS.NEWS)) || [];
    return news.find(n => n.id == id);
};

window.saveNewsToDB = async function(newsItem) {
    if (window.supabaseInstance && !window.isSupabaseError) {
        try {
            const { error } = await window.supabaseInstance.from('news').upsert([newsItem]);
            if (error) throw error;
        } catch (err) {
            console.error('Failed to save news to Supabase:', err);
        }
    }
    const news = JSON.parse(localStorage.getItem(DB_KEYS.NEWS)) || [];
    if (newsItem.id) {
        const index = news.findIndex(n => n.id === newsItem.id);
        if (index !== -1) news[index] = newsItem;
        else news.unshift(newsItem);
    } else {
        newsItem.id = Date.now();
        news.unshift(newsItem);
    }
    localStorage.setItem(DB_KEYS.NEWS, JSON.stringify(news));
};

window.deleteNewsFromDB = async function(id) {
    if (window.supabaseInstance && !window.isSupabaseError) {
        try {
            const { error } = await window.supabaseInstance.from('news').delete().eq('id', id);
            if (error) throw error;
        } catch (err) {
            console.error('Failed to delete news from Supabase:', err);
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

window.saveChatSession = async function(name, email) {
    const sender_id = window.getChatUserId();
    const { data, error } = await window.supabaseInstance
        .from('chat_sessions')
        .upsert({ sender_id, name, email });
    
    if (!error) {
        localStorage.setItem('psd_chat_user_name', name);
        localStorage.setItem('psd_chat_user_email', email);
        return { success: true };
    }
    return { success: false, error: error.message };
};

window.getMessages = async function() {
    if (window.supabaseInstance && !window.isSupabaseError) {
        try {
            const { data, error } = await window.supabaseInstance
                .from('messages')
                .select('*')
                .order('created_at', { ascending: true });
            if (error) throw error;
            return data;
        } catch (err) {
            console.error('Failed to get messages from Supabase:', err);
        }
    }
    return [];
};

window.sendChatMessage = async function(text, isAdmin = false, senderName = 'User') {
    const userId = window.getChatUserId();
    const msg = {
        sender_id: isAdmin ? 'admin' : userId,
        sender_name: isAdmin ? 'Admin PSD' : senderName,
        text: text,
        is_admin: isAdmin
    };

    if (window.supabaseInstance && !window.isSupabaseError) {
        try {
            const { error } = await window.supabaseInstance.from('messages').insert([msg]);
            if (error) throw error;
            return { success: true };
        } catch (err) {
            console.error('Failed to send message to Supabase:', err);
            return { success: false, error: err.message };
        }
    }
    return { success: false, error: 'Supabase not connected' };
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

        // Inject WhatsApp Button if not exists
        if (info.whatsapp_number && !document.getElementById('wa-floating-btn')) {
            const waBtn = document.createElement('a');
            waBtn.id = 'wa-floating-btn';
            waBtn.href = `https://wa.me/${info.whatsapp_number}`;
            waBtn.target = '_blank';
            waBtn.className = 'fixed bottom-6 right-6 z-[9999] bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center';
            waBtn.innerHTML = `<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>`;
            document.body.appendChild(waBtn);
        }

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
            } else {
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
    if (window.supabaseInstance && !window.isSupabaseError) {
        try {
            const { data, error } = await window.supabaseInstance.from(table).select('*').order('id', { ascending: false });
            if (error) throw error;
            return data;
        } catch (err) {
            console.error(`Failed to get ${table} from Supabase:`, err);
        }
    }
    return JSON.parse(localStorage.getItem(key)) || [];
}

async function genericSave(table, key, item) {
    if (window.supabaseInstance && !window.isSupabaseError) {
        try {
            const { error } = await window.supabaseInstance.from(table).upsert([item]);
            if (error) throw error;
        } catch (err) {
            console.error(`Failed to save ${table} to Supabase:`, err);
        }
    }
    const list = JSON.parse(localStorage.getItem(key)) || [];
    if (item.id) {
        const index = list.findIndex(i => i.id === item.id);
        if (index !== -1) list[index] = item;
        else list.unshift(item);
    } else {
        item.id = Date.now();
        list.unshift(item);
    }
    localStorage.setItem(key, JSON.stringify(list));
}

async function genericDelete(table, key, id) {
    if (window.supabaseInstance && !window.isSupabaseError) {
        try {
            const { error } = await window.supabaseInstance.from(table).delete().eq('id', id);
            if (error) throw error;
        } catch (err) {
            console.error(`Failed to delete from ${table} in Supabase:`, err);
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

console.log('admin-system.js load complete.');
