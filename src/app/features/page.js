'use client';

import { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AOSInit from "@/components/AOSInit";

const icons = {
  card: `<rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="10" r="2" fill="currentColor"/>`,
  parent: `<rect x="7" y="2" width="10" height="20" rx="2"/><circle cx="12" cy="18" r="1.2" fill="currentColor"/>`,
  staff: `<path d="M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm6 8H6a1 1 0 0 1-1-1c0-3.314 4.03-5 7-5s7 1.686 7 5a1 1 0 0 1-1 1Z"/>`,
  teacher: `<path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm10 12h-8v-2h8v2zm0-4h-8v-2h8v2zm0-4h-8V9h8v2zm0-4h-8V5h8v2zm4 12h-2v-2h2v2zm0-4h-2v-2h2v2z"/>`,
  archive: `<path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.47 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h10.14l.82 1H5.12z"/>`,
  database: `<path d="M12 2C6.48 2 2 4.01 2 6.5s4.48 4.5 10 4.5 10-2.01 10-4.5S17.52 2 12 2zm0 18c-5.52 0-10-2.01-10-4.5V18c0 2.49 4.48 4.5 10 4.5s10-2.01 10-4.5v-2.5c0 2.49-4.48 4.5-10 4.5zm0-9c-5.52 0-10-2.01-10-4.5V12c0 2.49 4.48 4.5 10 4.5s10-2.01 10-4.5v-2.5c0 2.49-4.48 4.5-10 4.5z"/>`,
  shop: `<path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"/>`,
  student: `<path d="M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm6 8H6a1 1 0 0 1-1-1c0-3.314 4.03-5 7-5s7 1.686 7 5a1 1 0 0 1-1 1Z"/>`,
  star: `<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>`,
  report: `<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>`,
  money: `<path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>`,
  monitor: `<path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7l-2 3v1h8v-1l-2-3h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z"/>`,
  clock: `<path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>`,
  news: `<path d="M20 5H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 12H4v-2h7v2zm9 0h-7v-2h7v2zm0-4H4v-2h16v2zm0-4H4V7h16v2z"/>`,
  chat: `<path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"/>`,
  broadcast: `<path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 11c-.46 0-.91-.19-1.24-.53L12 10.71l-7.7 7.76c-.33.34-.78.53-1.24.53-.94 0-1.7-.76-1.7-1.7 0-.46.19-.91.53-1.24l9.17-9.24c.66-.67 1.74-.67 2.41 0l9.17 9.24c.34.33.53.78.53 1.24 0 .94-.76 1.7-1.7 1.7z"/>`,
  payment: `<path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>`,
  mail: `<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>`,
  activity: `<path d="M13.5 1.5c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zM13 14h-2v-2h2v2zm0-4h-2V6h2v4z"/>`,
  gate: `<path d="M19 19V5h-2V3H7v2H5v14H3v2h18v-2h-2zm-2 0H7V5h10v14zm-3-8h-2v2h2v-2z"/>`,
  users: `<path d="M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm6 8H6a1 1 0 0 1-1-1c0-3.314 4.03-5 7-5s7 1.686 7 5a1 1 0 0 1-1 1Z"/>`,
  'credit-card': `<path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>`,
};

export default function FeaturesPage() {
  const [allFeatures, setAllFeatures] = useState([]);
  const [filter, setFilter] = useState('');
  const [companyInfo, setCompanyInfo] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data: feats } = await supabase.from('psd_features').select('*').order('created_at', { ascending: true });
      const { data: info } = await supabase.from('psd_company').select('*').single();
      setAllFeatures(feats || []);
      setCompanyInfo(info);
    }
    fetchData();
  }, []);

  const filteredFeatures = allFeatures.filter(f => 
    f.title.toLowerCase().includes(filter.toLowerCase()) || 
    (f.description && f.description.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <main className="min-h-screen bg-white">
      <AOSInit />
      <Navbar companyInfo={companyInfo} />
      
      <section className="hero-bg pt-40 pb-32 relative overflow-hidden text-white text-center">
        <div className="absolute bottom-0 w-full translate-y-px">
          <svg viewBox="0 0 1440 320" className="w-full h-auto text-white fill-current block">
            <path fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        <div className="container mx-auto px-6 relative z-10" data-aos="fade-up">
          <h1 className="text-3xl lg:text-5xl font-bold mb-6 uppercase leading-tight max-w-4xl mx-auto">
            Dapatkan Kemudahan Dalam Satu Genggaman
          </h1>
          <p className="text-sm md:text-lg lg:text-xl max-w-3xl mx-auto opacity-90 leading-relaxed">
            Fitur lengkap yang terintegrasi untuk mendukung digitalisasi ekosistem pesantren Anda.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white relative z-20 -mt-4">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Cari fitur yang anda butuhkan..." 
                className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-psd-green transition duration-300"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <i className="fas fa-search text-xl"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white pb-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {filteredFeatures.map((f, index) => (
              <div key={f.id} className="group bg-white border border-gray-100 rounded-[1rem] md:rounded-[2rem] p-4 md:p-8 relative overflow-hidden h-full min-h-[200px] md:min-h-[400px] flex flex-col justify-between hover:shadow-2xl transition-all duration-500 cursor-pointer" data-aos="fade-up" data-aos-delay={(index % 3) * 100}>
                <div className="absolute inset-0 bg-psd-green opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-2 md:mb-8">
                    <div className="text-psd-green group-hover:text-psd-yellow transition-colors duration-300">
                      <svg className="w-8 h-8 md:w-16 md:h-16" viewBox="0 0 24 24" fill="currentColor" dangerouslySetInnerHTML={{ __html: icons[f.icon] || icons['star'] }} />
                    </div>
                    <div className="text-lg md:text-3xl font-bold text-psd-green opacity-10 group-hover:text-white group-hover:opacity-20 transition-all duration-300">0{index + 1}.</div>
                  </div>
                  <h3 className="text-sm md:text-2xl font-bold text-gray-800 mb-1 md:mb-4 uppercase group-hover:text-white transition-colors duration-300">{f.title}</h3>
                  <p className="text-sm md:text-base leading-relaxed text-gray-600 group-hover:text-white transition-colors duration-300 line-clamp-3 md:line-clamp-none">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer companyInfo={companyInfo} />
    </main>
  );
}
