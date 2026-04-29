import Link from 'next/link';

export default function Footer({ companyInfo }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A5C4F] text-white pt-20 pb-10 relative overflow-hidden">
      {/* Decorative background shape */}
      <div className="absolute right-0 bottom-0 w-1/3 h-1/2 bg-white/5 rounded-tl-[10rem] -z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <img src="/logo.png" alt="PSD Logo" className="h-20 w-auto" />
            <p className="text-gray-200 text-sm leading-relaxed">
              Platform Manajemen Pesantren Digital terintegrasi yang memudahkan pengasuh, pengurus, dan wali santri dalam satu ekosistem.
            </p>
            <div className="flex space-x-4">
              <a href={companyInfo?.instagram_url} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-psd-yellow hover:text-psd-green transition duration-300">
                <i className="fab fa-instagram"></i>
              </a>
              <a href={companyInfo?.facebook_url} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-psd-yellow hover:text-psd-green transition duration-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href={companyInfo?.tiktok_url} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-psd-yellow hover:text-psd-green transition duration-300">
                <i className="fab fa-tiktok"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-8 relative inline-block">
              Navigasi
              <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-psd-yellow rounded-full"></span>
            </h4>
            <ul className="space-y-4 text-sm text-gray-200">
              <li><Link href="/" className="hover:text-psd-yellow transition">Home</Link></li>
              <li><Link href="/features" className="hover:text-psd-yellow transition">Fitur Utama</Link></li>
              <li><Link href="/gallery" className="hover:text-psd-yellow transition">Gallery</Link></li>
              <li><Link href="/berita" className="hover:text-psd-yellow transition">Berita & Artikel</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-8 relative inline-block">
              Hubungi Kami
              <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-psd-yellow rounded-full"></span>
            </h4>
            <ul className="space-y-4 text-sm text-gray-200">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-psd-yellow"></i>
                <span>{companyInfo?.address || "Lampung, Indonesia"}</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-3 text-psd-yellow"></i>
                <span>{companyInfo?.phone || "+62 812-3456-7890"}</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3 text-psd-yellow"></i>
                <span>{companyInfo?.email || "info@pesantrendigital.id"}</span>
              </li>
            </ul>
          </div>

          {/* Apps */}
          <div>
            <h4 className="text-lg font-bold mb-8 relative inline-block">
              Download App
              <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-psd-yellow rounded-full"></span>
            </h4>
            <div className="space-y-4">
              <p className="text-xs text-gray-300 mb-6 italic">Aplikasi khusus wali santri segera hadir di PlayStore & AppStore.</p>
              
              <div className="flex flex-col space-y-4">
                <a href="#" className="inline-flex items-center bg-black text-white px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-900 transition duration-300 w-fit opacity-50 cursor-not-allowed">
                  <i className="fab fa-google-play text-xl mr-3"></i>
                  <div className="text-left">
                    <div className="text-[8px] uppercase leading-none">Tersedia di</div>
                    <div className="text-xs font-semibold leading-none mt-1">Google Play</div>
                  </div>
                </a>

                <a href="#" className="inline-flex items-center bg-black text-white px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-900 transition duration-300 w-fit opacity-50 cursor-not-allowed">
                  <i className="fab fa-apple text-xl mr-3"></i>
                  <div className="text-left">
                    <div className="text-[8px] uppercase leading-none">Tersedia di</div>
                    <div className="text-xs font-semibold leading-none mt-1">App Store</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-10 text-center text-sm text-gray-400">
          <p>© {currentYear} Pesantren Smart Digital. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
