// Simple Data Management System using localStorage

const DB_KEYS = {
    NEWS: 'psd_news',
    FEEDBACK: 'psd_feedback',
    COMPANY: 'psd_company',
    AUTH: 'psd_auth_v2', // Versi 2 dengan enkripsi
    SESSION: 'psd_session'
};

// Initialize with mock data if empty
function initDB() {
    // Check if we need to update existing mock data to longer version
    const existingNews = localStorage.getItem(DB_KEYS.NEWS);
    if (existingNews) {
        const news = JSON.parse(existingNews);
        // If the first item's content is short, it's probably the old mock data
        if (news.length > 0 && news[0].id === 1 && news[0].content.length < 1000) {
            localStorage.removeItem(DB_KEYS.NEWS); // Force re-initialization
        }
    }

    if (!localStorage.getItem(DB_KEYS.NEWS)) {
        const mockNews = [
            {
                id: 1,
                title: 'Implementasi Sistem Digital di Pesantren Modern',
                date: '05 Jan 2026',
                summary: 'Langkah besar menuju digitalisasi pendidikan islam di Indonesia mulai menunjukkan hasil yang signifikan dengan sistem manajemen terpadu.',
                content: `
                    <p class="mb-4 text-lg leading-relaxed">Digitalisasi di lingkungan pesantren bukan lagi sekadar pilihan, melainkan kebutuhan mendasar di era revolusi industri 4.0. Pesantren Smart Digital (PSD) telah berhasil mengimplementasikan sistem manajemen terpadu yang mencakup administrasi, kurikulum, hingga sistem pembayaran santri secara cashless di berbagai mitra pesantren modern di seluruh Indonesia.</p>
                    
                    <h2 class="text-2xl font-bold text-psd-green mt-8 mb-4">Transformasi Manajemen Tradisional ke Digital</h2>
                    <p class="mb-4">Selama puluhan tahun, banyak pesantren mengandalkan pencatatan manual yang rentan terhadap kesalahan manusia dan kehilangan data. Dengan hadirnya sistem PSD, seluruh data santri mulai dari pendaftaran (PPDB), perkembangan tahfidz, hingga rekam medis tersimpan dengan aman di cloud dan dapat diakses kapan saja oleh pihak berwenang.</p>
                    
                    <p class="mb-4">Direktur Pesantren Smart Digital menyatakan bahwa transisi ini bertujuan untuk meningkatkan efisiensi kerja staf and transparansi data bagi orang tua santri. "Kami ingin guru dan pengasuh lebih fokus pada pendidikan karakter santri, bukan malah disibukkan dengan urusan administrasi kertas yang menumpuk," ujarnya dalam wawancara terbaru.</p>
                    
                    <div class="bg-gray-50 p-6 rounded-2xl my-8 border-l-4 border-psd-green">
                        <p class="italic text-gray-700 font-medium">"Dengan aplikasi mobile PSD, orang tua kini bisa memantau perkembangan akademik, absensi shalat jamaah, hingga kesehatan anak mereka secara real-time dari rumah masing-masing."</p>
                    </div>

                    <h2 class="text-2xl font-bold text-psd-green mt-8 mb-4">Ekosistem Belajar yang Lebih Modern</h2>
                    <p class="mb-4">Sistem ini juga mencakup Learning Management System (LMS) khusus pesantren. Di dalamnya terdapat perpustakaan digital dengan ribuan kitab kuning digital dan literatur modern yang bisa diakses melalui tablet yang disediakan di setiap asrama. Santri dapat mempelajari teks klasik dengan bantuan teknologi pencarian kata yang memudahkan riset mereka.</p>
                    
                    <img src="src/berita1.webp" class="rounded-2xl my-8 w-full shadow-lg object-cover max-h-[500px]" alt="Digitalization">
                    
                    <p class="mb-4">Selain itu, sistem pembayaran santri kini menggunakan kartu pintar (Smart Card) yang berfungsi sebagai kartu identitas sekaligus dompet digital. Orang tua dapat mengisi saldo kartu tersebut melalui transfer bank atau e-wallet, dan membatasi pengeluaran harian anak mereka untuk melatih kedisiplinan finansial sejak dini.</p>
                    
                    <p class="mb-4">Diharapkan dengan langkah ini, santri lulusan pesantren mitra PSD tidak hanya mahir dalam ilmu agama dan bahasa Arab, tetapi juga memiliki literasi digital yang tinggi sehingga siap bersaing di kancah global. Hingga saat ini, lebih dari 50 pesantren telah mengadopsi modul dasar dari sistem ini, menandakan antusiasme yang sangat tinggi dari komunitas pendidikan Islam.</p>
                `,
                image: 'src/berita1.webp'
            },
            {
                id: 2,
                title: 'Pelatihan Manajemen Keuangan Digital Untuk Admin Pesantren',
                date: '02 Jan 2026',
                summary: 'Workshop intensif untuk meningkatkan akuntabilitas dan transparansi keuangan pesantren melalui sistem pelaporan otomatis.',
                content: `
                    <p class="mb-4 text-lg leading-relaxed">Transparansi keuangan merupakan pilar penting dalam pengelolaan lembaga pendidikan yang berbasis kepercayaan masyarakat. Pekan lalu, Pesantren Smart Digital menyelenggarakan workshop intensif selama tiga hari yang diikuti oleh lebih dari 100 bendahara dan admin keuangan pesantren dari berbagai provinsi.</p>
                    
                    <h2 class="text-2xl font-bold text-psd-green mt-8 mb-4">Menghapus Budaya Laporan Manual</h2>
                    <p class="mb-4">Workshop ini fokus pada penggunaan dashboard keuangan otomatis yang dapat menghasilkan laporan arus kas, neraca, and laporan tunggakan santri hanya dalam beberapa klik. Banyak pesantren yang sebelumnya masih menggunakan buku besar fisik atau spreadsheet sederhana yang tidak saling terhubung antara bagian SPP, katering, dan unit usaha pesantren.</p>
                    
                    <p class="mb-4">"Dulu kami butuh waktu setidaknya satu minggu di setiap akhir bulan untuk menyusun laporan untuk pimpinan. Sekarang, karena semua transaksi sudah tercatat otomatis saat santri melakukan pembayaran, laporan sudah tersedia secara real-time," ungkap Ustaz Ahmad, salah satu peserta dari Lampung.</p>
                    
                    <img src="src/berita2.webp" class="rounded-2xl my-8 w-full shadow-lg object-cover max-h-[500px]" alt="Financial Training">

                    <h2 class="text-2xl font-bold text-psd-green mt-8 mb-4">Keamanan Data dan Audit Internal</h2>
                    <p class="mb-4">Selain teknis pencatatan, pelatihan ini juga memberikan sesi khusus mengenai keamanan siber (cyber security). Para admin diajarkan cara mengelola password yang kuat, enkripsi data keuangan, and pentingnya melakukan backup data secara berkala untuk menghindari serangan ransomware yang marak belakangan ini.</p>
                    
                    <p class="mb-4">Instruktur pelatihan menekankan bahwa sistem digital bukan hanya soal kemudahan, tapi juga soal integritas. Sistem PSD memiliki fitur 'Audit Trail' yang mencatat setiap perubahan data, sehingga meminimalisir risiko manipulasi data keuangan oleh pihak yang tidak bertanggung jawab.</p>
                    
                    <div class="bg-psd-green/5 p-6 rounded-2xl my-8 border-r-4 border-psd-yellow">
                        <p class="text-gray-800 leading-relaxed">Pelatihan ini merupakan bagian dari program CSR Pesantren Smart Digital untuk memastikan bahwa bantuan sosial maupun dana pendidikan dari wali santri dikelola dengan standar akuntansi yang profesional.</p>
                    </div>

                    <p class="mb-4">Pesantren Smart Digital berkomitmen untuk terus memberikan pendampingan berkelanjutan bagi seluruh mitra agar ekosistem digital di pesantren dapat berjalan dengan optimal dan aman.</p>
                `,
                image: 'src/berita2.webp'
            }
        ];
        localStorage.setItem(DB_KEYS.NEWS, JSON.stringify(mockNews));
    }

    if (!localStorage.getItem(DB_KEYS.COMPANY)) {
        const mockCompany = {
            name: 'Pesantren Smart Digital',
            email: 'info@pesantrendigital.id',
            phone: '+62 812-3456-7890',
            address: 'Jl. Teknologi No. 45, Jakarta Selatan, Indonesia',
            logo: 'src/logo.png',
            social: {
                instagram: 'https://instagram.com/pesantrensmartdigital',
                facebook: 'https://facebook.com/pesantrensmartdigital',
                tiktok: 'https://tiktok.com/@pesantrensmartdigital'
            }
        };
        localStorage.setItem(DB_KEYS.COMPANY, JSON.stringify(mockCompany));
    }

    if (!localStorage.getItem(DB_KEYS.FEEDBACK)) {
        localStorage.setItem(DB_KEYS.FEEDBACK, JSON.stringify([]));
    }

    // Initialize Auth (Default: admin / admin123)
    const currentAuth = localStorage.getItem(DB_KEYS.AUTH);
    const defaultHash = '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9';
    
    if (!currentAuth) {
        const defaultAuth = {
            username: 'admin',
            passwordHash: defaultHash
        };
        localStorage.setItem(DB_KEYS.AUTH, JSON.stringify(defaultAuth));
    } else {
        // Migrasi atau perbaikan jika hash salah (khusus untuk pengembangan)
        const authData = JSON.parse(currentAuth);
        if (authData.passwordHash === '240be518fabd2724ddb6f0403f3597447e0419d0a22e65c08d96206d912423c4') {
            authData.passwordHash = defaultHash;
            localStorage.setItem(DB_KEYS.AUTH, JSON.stringify(authData));
        }
    }
}

// --- Authentication Functions ---

function isLoggedIn() {
    return sessionStorage.getItem(DB_KEYS.SESSION) === 'true';
}

function login(username, password) {
    const authData = JSON.parse(localStorage.getItem(DB_KEYS.AUTH));
    
    // Hash input password menggunakan CryptoJS (harus diload di HTML)
    const inputHash = CryptoJS.SHA256(password).toString();
    
    if (username === authData.username && inputHash === authData.passwordHash) {
        sessionStorage.setItem(DB_KEYS.SESSION, 'true');
        return true;
    }
    return false;
}

function logout() {
    sessionStorage.removeItem(DB_KEYS.SESSION);
    window.location.reload();
}

function updateAdminPassword(newPassword) {
    const authData = JSON.parse(localStorage.getItem(DB_KEYS.AUTH));
    const newHash = CryptoJS.SHA256(newPassword).toString();
    authData.passwordHash = newHash;
    localStorage.setItem(DB_KEYS.AUTH, JSON.stringify(authData));
    return true;
}

// News Functions
function getNews() {
    return JSON.parse(localStorage.getItem(DB_KEYS.NEWS)) || [];
}

function getNewsById(id) {
    const news = getNews();
    return news.find(item => item.id == id);
}

function saveNewsItem(title, content, imageFile) {
    const news = getNews();
    const newItem = {
        id: Date.now(),
        title,
        content,
        summary: content.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
        date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
        image: imageFile || 'src/berita1.webp' // Fallback image
    };
    news.unshift(newItem);
    localStorage.setItem(DB_KEYS.NEWS, JSON.stringify(news));
    return newItem;
}

function updateNewsItem(id, title, content, imageFile) {
    let news = getNews();
    const index = news.findIndex(item => item.id == id);
    if (index !== -1) {
        news[index] = {
            ...news[index],
            title,
            content,
            summary: content.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
            image: imageFile || news[index].image
        };
        localStorage.setItem(DB_KEYS.NEWS, JSON.stringify(news));
        return news[index];
    }
    return null;
}

function deleteNewsItem(id) {
    let news = getNews();
    news = news.filter(item => item.id !== id);
    localStorage.setItem(DB_KEYS.NEWS, JSON.stringify(news));
}

// Feedback Functions
function getFeedback() {
    return JSON.parse(localStorage.getItem(DB_KEYS.FEEDBACK)) || [];
}

function saveFeedback(name, email, subject, message) {
    const feedback = getFeedback();
    const newFeedback = {
        id: Date.now(),
        name,
        email,
        subject,
        message,
        date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
    };
    feedback.unshift(newFeedback);
    localStorage.setItem(DB_KEYS.FEEDBACK, JSON.stringify(feedback));
}

// Company Functions
function getCompanyInfo() {
    return JSON.parse(localStorage.getItem(DB_KEYS.COMPANY));
}

function updateCompanyInfo(info) {
    const current = getCompanyInfo();
    const updated = { ...current, ...info };
    localStorage.setItem(DB_KEYS.COMPANY, JSON.stringify(updated));
}

// Global Sync Function for Frontend
function syncCompanyInfo() {
    const info = getCompanyInfo();
    if (!info) return;

    // Update Footer Contact Info
    const emailEl = document.getElementById('footer-email');
    const phoneEl = document.getElementById('footer-phone');
    const addressEl = document.getElementById('footer-address');
    
    if (emailEl) emailEl.textContent = info.email || '';
    if (phoneEl) phoneEl.textContent = info.phone || '';
    if (addressEl) addressEl.textContent = info.address || '';

    // Update Contact Page Specific Info
    const contactEmailEl = document.getElementById('contact-email');
    const contactPhoneEl = document.getElementById('contact-phone');
    const contactAddressEl = document.getElementById('contact-address');
    
    if (contactEmailEl) contactEmailEl.textContent = info.email || '';
    if (contactPhoneEl) contactPhoneEl.textContent = info.phone || '';
    if (contactAddressEl) contactAddressEl.textContent = info.address || '';

    // Sync Social Links (Navbar, Mobile & Footer)
    if (info.social) {
        const socials = [
            { id: 'nav-social-instagram', url: info.social.instagram },
            { id: 'nav-social-facebook', url: info.social.facebook },
            { id: 'nav-social-tiktok', url: info.social.tiktok },
            { id: 'mobile-social-instagram', url: info.social.instagram },
            { id: 'mobile-social-facebook', url: info.social.facebook },
            { id: 'mobile-social-tiktok', url: info.social.tiktok },
            { id: 'footer-social-instagram', url: info.social.instagram },
            { id: 'footer-social-facebook', url: info.social.facebook },
            { id: 'footer-social-tiktok', url: info.social.tiktok }
        ];

        socials.forEach(s => {
            const el = document.getElementById(s.id);
            if (el) {
                if (s.url) {
                    el.href = s.url;
                    el.classList.remove('hidden');
                } else {
                    el.href = '#';
                    // We might not want to hide them if they are part of a specific layout
                    // but for social links, hiding if empty is usually good.
                    el.classList.add('hidden');
                }
            }
        });
    }
}

// Run sync on load if not on admin page
if (typeof window !== 'undefined' && !window.location.pathname.includes('admin.html')) {
    window.addEventListener('DOMContentLoaded', syncCompanyInfo);
}

// Auto-init
initDB();
