// Simple Data Management System using Supabase & localStorage (Hybrid)

const SUPABASE_URL = 'https://ayzpxozlytuzpxjqyvsw.supabase.co';
const SUPABASE_ANON_KEY = 'sb_secret_7OTmCCC9gav9jjHWvIaZRw_oLqbkXcX';

let supabase = null;
if (typeof supabasejs !== 'undefined' && SUPABASE_URL && SUPABASE_ANON_KEY) {
    supabase = supabasejs.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('Supabase initialized successfully');
} else {
    console.warn('Supabase not initialized, falling back to LocalStorage');
}

const DB_KEYS = {
    NEWS: 'psd_news',
    FEEDBACK: 'psd_feedback',
    COMPANY: 'psd_company',
    AUTH: 'psd_auth_v2',
    SESSION: 'psd_session'
};

// Initialize with mock data if empty
function initDB() {
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
}

// --- Authentication Functions ---
function isLoggedIn() {
    return sessionStorage.getItem(DB_KEYS.SESSION) === 'true';
}

function login(username, password) {
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
}

function updateAdminPassword(newPassword) {
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
}

function logout() {
    sessionStorage.removeItem(DB_KEYS.SESSION);
    window.location.reload();
}

// --- ASYNC CRUD FUNCTIONS (SUPABASE READY) ---

async function getNews() {
    if (supabase) {
        const { data, error } = await supabase.from('news').select('*').order('created_at', { ascending: false });
        if (!error) return data;
    }
    return JSON.parse(localStorage.getItem(DB_KEYS.NEWS)) || [];
}

async function getNewsById(id) {
    if (supabase) {
        const { data, error } = await supabase.from('news').select('*').eq('id', id).single();
        if (!error) return data;
    }
    const news = JSON.parse(localStorage.getItem(DB_KEYS.NEWS)) || [];
    return news.find(item => item.id == id);
}

async function saveNewsItem(title, content, imageFile) {
    const newItem = {
        title,
        content,
        summary: content.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
        date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
        image: imageFile || 'src/berita1.webp'
    };

    if (supabase) {
        const { data, error } = await supabase.from('news').insert([newItem]).select();
        if (!error) return data[0];
    }

    const news = JSON.parse(localStorage.getItem(DB_KEYS.NEWS)) || [];
    newItem.id = Date.now();
    news.unshift(newItem);
    localStorage.setItem(DB_KEYS.NEWS, JSON.stringify(news));
    return newItem;
}

async function updateNewsItem(id, title, content, imageFile) {
    const updatedItem = {
        title,
        content,
        summary: content.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
        image: imageFile
    };

    if (supabase) {
        const { data, error } = await supabase.from('news').update(updatedItem).eq('id', id).select();
        if (!error) return data[0];
    }

    const news = JSON.parse(localStorage.getItem(DB_KEYS.NEWS)) || [];
    const index = news.findIndex(item => item.id == id);
    if (index !== -1) {
        news[index] = { ...news[index], ...updatedItem };
        localStorage.setItem(DB_KEYS.NEWS, JSON.stringify(news));
        return news[index];
    }
    return null;
}

async function deleteNewsItem(id) {
    if (supabase) {
        await supabase.from('news').delete().eq('id', id);
    }
    let news = JSON.parse(localStorage.getItem(DB_KEYS.NEWS)) || [];
    news = news.filter(item => item.id !== id);
    localStorage.setItem(DB_KEYS.NEWS, JSON.stringify(news));
}

async function saveFeedback(name, email, subject, message) {
    const newFeedback = {
        name, email, subject, message,
        date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
    };

    if (supabase) {
        await supabase.from('feedback').insert([newFeedback]);
    }

    const feedback = JSON.parse(localStorage.getItem(DB_KEYS.FEEDBACK)) || [];
    newFeedback.id = Date.now();
    feedback.unshift(newFeedback);
    localStorage.setItem(DB_KEYS.FEEDBACK, JSON.stringify(feedback));
}

async function getCompanyInfo() {
    if (supabase) {
        const { data, error } = await supabase.from('company').select('*').eq('id', 1).single();
        if (!error) return data;
    }
    return JSON.parse(localStorage.getItem(DB_KEYS.COMPANY));
}

async function updateCompanyInfo(info) {
    if (supabase) {
        await supabase.from('company').update(info).eq('id', 1);
    }
    const current = JSON.parse(localStorage.getItem(DB_KEYS.COMPANY));
    const updated = { ...current, ...info };
    localStorage.setItem(DB_KEYS.COMPANY, JSON.stringify(updated));
}

// Sync function for UI
async function syncCompanyInfo() {
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
}

// Initialize database and sync UI
// initDB() called from window.onload in admin.html for safety
document.addEventListener('DOMContentLoaded', () => {
    syncCompanyInfo();
});
