// Simple Data Management System using Supabase & localStorage (Hybrid)

const SUPABASE_URL = 'https://ayzpxozlytuzpxjqyvsw.supabase.co';
const SUPABASE_ANON_KEY = 'sb_secret_7OTmCCC9gav9jjHWvIaZRw_oLqbkXcX';

let supabase = null;

// Initialize Supabase Client safely
function initSupabase() {
    try {
        // Try both possible variable names from the CDN
        const sbClient = window.supabase || (typeof supabasejs !== 'undefined' ? supabasejs : null);
        
        if (sbClient && SUPABASE_URL && SUPABASE_ANON_KEY) {
            supabase = sbClient.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log('Supabase initialized successfully');
            return true;
        }
    } catch (e) {
        console.error('Supabase initialization error:', e);
    }
    console.warn('Supabase not initialized, falling back to LocalStorage');
    return false;
}

// Run initialization
initSupabase();

const DB_KEYS = {
    NEWS: 'psd_news',
    FEEDBACK: 'psd_feedback',
    COMPANY: 'psd_company',
    AUTH: 'psd_auth_v2',
    SESSION: 'psd_session'
};

// Initialize with mock data if empty
window.initDB = function() {
    console.log('Initializing Database...');
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
            social: { instagram: '#', facebook: '#', tiktok: '#' }
        };
        localStorage.setItem(DB_KEYS.COMPANY, JSON.stringify(mockCompany));
    }

    // ALWAYS reset auth in development if login fails
    const defaultAuth = { username: 'admin', passwordHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918' }; // password: admin
    localStorage.setItem(DB_KEYS.AUTH, JSON.stringify(defaultAuth));
    console.log('Auth Reset to default (admin/admin)');
};

// --- Authentication Functions ---
window.isLoggedIn = function() {
    return sessionStorage.getItem(DB_KEYS.SESSION) === 'true';
};

window.login = function(username, password) {
    console.log('Attempting login for:', username);
    try {
        const storedAuth = localStorage.getItem(DB_KEYS.AUTH);
        const authData = storedAuth ? JSON.parse(storedAuth) : { username: 'admin', passwordHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918' };
        
        if (typeof CryptoJS === 'undefined') {
            console.error('CryptoJS is not loaded!');
            alert('Error: Sistem keamanan (CryptoJS) tidak termuat. Periksa koneksi internet Anda.');
            return false;
        }

        const inputHash = CryptoJS.SHA256(password).toString();
        if (username === authData.username && inputHash === authData.passwordHash) {
            sessionStorage.setItem(DB_KEYS.SESSION, 'true');
            console.log('Login successful');
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
    try {
        const authData = JSON.parse(localStorage.getItem(DB_KEYS.AUTH)) || { username: 'admin' };
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
    sessionStorage.removeItem(DB_KEYS.SESSION);
    window.location.reload();
};

// --- Data Functions ---
window.getNews = async function() {
    if (supabase) {
        try {
            const { data, error } = await supabase.from('news').select('*').order('id', { ascending: false });
            if (error) throw error;
            return data;
        } catch (err) {
            console.error('Failed to get news from Supabase:', err);
        }
    }
    return JSON.parse(localStorage.getItem(DB_KEYS.NEWS)) || [];
};

window.saveNews = async function(newsItem) {
    console.log('Attempting to save news:', newsItem);
    if (supabase) {
        try {
            const { error } = await supabase.from('news').upsert([newsItem]);
            if (error) throw error;
            console.log('News saved to Supabase');
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

window.deleteNews = async function(id) {
    if (supabase) {
        try {
            const { error } = await supabase.from('news').delete().eq('id', id);
            if (error) throw error;
            console.log('News deleted from Supabase');
        } catch (err) {
            console.error('Failed to delete news from Supabase:', err);
        }
    }
    const news = JSON.parse(localStorage.getItem(DB_KEYS.NEWS)) || [];
    const filtered = news.filter(n => n.id !== id);
    localStorage.setItem(DB_KEYS.NEWS, JSON.stringify(filtered));
};

window.getFeedback = async function() {
    if (supabase) {
        try {
            const { data, error } = await supabase.from('feedback').select('*').order('id', { ascending: false });
            if (error) throw error;
            return data;
        } catch (err) {
            console.error('Failed to get feedback from Supabase:', err);
        }
    }
    return JSON.parse(localStorage.getItem(DB_KEYS.FEEDBACK)) || [];
};

window.saveFeedback = async function(name, email, subject, message) {
    const newFeedback = {
        name, email, subject, message,
        date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
    };

    console.log('Attempting to save feedback:', newFeedback);

    if (supabase) {
        try {
            const { error } = await supabase.from('feedback').insert([newFeedback]);
            if (error) throw error;
            console.log('Feedback saved to Supabase');
        } catch (err) {
            console.error('Failed to save feedback to Supabase:', err);
        }
    }

    const feedback = JSON.parse(localStorage.getItem(DB_KEYS.FEEDBACK)) || [];
    newFeedback.id = Date.now();
    feedback.unshift(newFeedback);
    localStorage.setItem(DB_KEYS.FEEDBACK, JSON.stringify(feedback));
};

window.getCompanyInfo = async function() {
    if (supabase) {
        try {
            const { data, error } = await supabase.from('company').select('*').eq('id', 1).single();
            if (error) throw error;
            return data;
        } catch (err) {
            console.error('Failed to get company info from Supabase:', err);
        }
    }
    return JSON.parse(localStorage.getItem(DB_KEYS.COMPANY));
};

window.updateCompanyInfo = async function(info) {
    console.log('Attempting to update company info:', info);
    if (supabase) {
        try {
            const { error } = await supabase.from('company').update(info).eq('id', 1);
            if (error) throw error;
            console.log('Company info updated in Supabase');
        } catch (err) {
            console.error('Failed to update company info in Supabase:', err);
        }
    }
    const current = JSON.parse(localStorage.getItem(DB_KEYS.COMPANY));
    const updated = { ...current, ...info };
    localStorage.setItem(DB_KEYS.COMPANY, JSON.stringify(updated));
};

// Sync function for UI
window.syncCompanyInfo = async function() {
    const info = await getCompanyInfo();
    if (!info) return;

    const emailEl = document.getElementById('footer-email');
    const phoneEl = document.getElementById('footer-phone');
    const addrEl = document.getElementById('footer-address');

    if (emailEl) emailEl.innerText = info.email;
    if (phoneEl) phoneEl.innerText = info.phone;
    if (addrEl) addrEl.innerText = info.address;

    // Social Links
    const socialInsta = document.getElementById('footer-social-instagram');
    const socialFB = document.getElementById('footer-social-facebook');
    const socialTikTok = document.getElementById('footer-social-tiktok');

    if (socialInsta) socialInsta.href = info.social.instagram;
    if (socialFB) socialFB.href = info.social.facebook;
    if (socialTikTok) socialTikTok.href = info.social.tiktok;
};

// Initialize database and sync UI
document.addEventListener('DOMContentLoaded', () => {
    syncCompanyInfo();
});
