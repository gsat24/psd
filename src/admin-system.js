// Simple Data Management System using Supabase & localStorage (Hybrid)
console.log('admin-system.js starting to load...');

// Define DB_KEYS first
const DB_KEYS = {
    NEWS: 'psd_news',
    FEEDBACK: 'psd_feedback',
    COMPANY: 'psd_company',
    AUTH: 'psd_auth_v2',
    SESSION: 'psd_session'
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
                social: { instagram: '#', facebook: '#', tiktok: '#' }
            };
            localStorage.setItem(DB_KEYS.COMPANY, JSON.stringify(mockCompany));
        } else {
            // Ensure playstore_url exists in existing data
            const current = JSON.parse(localStorage.getItem(DB_KEYS.COMPANY));
            if (current && !current.hasOwnProperty('playstore_url')) {
                current.playstore_url = '#';
                localStorage.setItem(DB_KEYS.COMPANY, JSON.stringify(current));
            }
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
    
    let success = true;
    let errorMsg = null;

    if (window.supabaseInstance && !window.isSupabaseError) {
        try {
            const { error } = await window.supabaseInstance.from('feedback').insert([newFeedback]);
            if (error) throw error;
            console.log('Feedback saved to Supabase successfully');
        } catch (err) {
            console.error('Failed to save feedback to Supabase:', err);
            success = false;
            errorMsg = err.message;
        }
    } else {
        console.warn('Supabase not available, feedback only saved locally');
    }

    try {
        const feedback = JSON.parse(localStorage.getItem(DB_KEYS.FEEDBACK)) || [];
        newFeedback.id = Date.now();
        feedback.unshift(newFeedback);
        localStorage.setItem(DB_KEYS.FEEDBACK, JSON.stringify(feedback));
    } catch (e) {
        console.error('Failed to save feedback to LocalStorage:', e);
        success = false;
    }

    return { success, error: errorMsg };
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
                social: info.social
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
        const emailEl = document.getElementById('footer-email');
        const phoneEl = document.getElementById('footer-phone');
        const addrEl = document.getElementById('footer-address');
        if (emailEl) emailEl.innerText = info.email;
        if (phoneEl) phoneEl.innerText = info.phone;
        if (addrEl) addrEl.innerText = info.address;
        const socialInsta = document.getElementById('footer-social-instagram');
        const socialFB = document.getElementById('footer-social-facebook');
        const socialTikTok = document.getElementById('footer-social-tiktok');
        if (socialInsta) socialInsta.href = info.social?.instagram || '#';
        if (socialFB) socialFB.href = info.social?.facebook || '#';
        if (socialTikTok) socialTikTok.href = info.social?.tiktok || '#';
        
        const playStoreLink = document.getElementById('footer-playstore-link');
        if (playStoreLink) playStoreLink.href = info.playstore_url || '#';
    } catch (e) {
        console.error('syncCompanyInfo error:', e);
    }
};

// 2. SUPABASE INITIALIZATION
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
});

console.log('admin-system.js load complete.');
