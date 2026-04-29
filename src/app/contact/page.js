'use client';

import { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AOSInit from "@/components/AOSInit";

export default function ContactPage() {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from('company').select('*').single();
      setCompanyInfo(data);
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const { error } = await supabase
        .from('feedback')
        .insert([{
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          whatsapp: formData.whatsapp,
          created_at: new Date()
        }]);

      if (error) throw error;

      setStatus({ type: 'success', message: 'Pesan Anda telah terkirim! Tim kami akan segera menghubungi Anda.' });
      setFormData({ name: '', email: '', whatsapp: '', subject: '', message: '' });
    } catch (err) {
      console.error('Submit error:', err);
      setStatus({ type: 'error', message: 'Gagal mengirim pesan. Silakan coba lagi nanti.' });
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <h1 className="text-3xl md:text-5xl font-bold mb-6 uppercase leading-tight max-w-4xl mx-auto">
            Hubungi Kami
          </h1>
          <p className="text-gray-200 text-base md:text-lg max-w-2xl mx-auto opacity-90 leading-relaxed">
            Punya pertanyaan atau ingin bergabung menjadi mitra kami? Jangan ragu untuk menghubungi tim kami.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white relative z-20 -mt-4">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Info */}
            <div className="space-y-8" data-aos="fade-right">
              <h2 className="text-2xl md:text-3xl font-bold text-psd-green mb-8 uppercase">Informasi Kontak</h2>
              <div className="flex items-start space-x-6">
                <div className="bg-psd-yellow p-4 rounded-2xl text-psd-green">
                  <i className="fas fa-map-marker-alt text-xl"></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-base md:text-lg">Alamat</h4>
                  <p className="text-sm md:text-base text-gray-600">{companyInfo?.address || 'Lampung, Indonesia'}</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="bg-psd-yellow p-4 rounded-2xl text-psd-green">
                  <i className="fas fa-envelope text-xl"></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-base md:text-lg">Email</h4>
                  <p className="text-sm md:text-base text-gray-600">{companyInfo?.email || 'info@pesantrendigital.id'}</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="bg-psd-yellow p-4 rounded-2xl text-psd-green">
                  <i className="fab fa-whatsapp text-xl"></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-base md:text-lg">WhatsApp</h4>
                  <p className="text-sm md:text-base text-gray-600">{companyInfo?.whatsapp || '+62 813-6894-6818'}</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div data-aos="fade-left">
              <h2 className="text-2xl md:text-3xl font-bold text-psd-green mb-8 uppercase">Kirim Pesan</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {status.message && (
                  <div className={`p-4 rounded-xl text-sm font-bold ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {status.message}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input 
                    type="text" required placeholder="Nama Lengkap" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-psd-green transition"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  <input 
                    type="email" required placeholder="Alamat Email" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-psd-green transition"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <input 
                  type="tel" required placeholder="No. WhatsApp" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-psd-green transition"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                />
                <input 
                  type="text" required placeholder="Subjek" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-psd-green transition"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
                <textarea 
                  required rows="5" placeholder="Pesan Anda" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-psd-green transition"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
                <button 
                  type="submit" disabled={isSubmitting}
                  className="w-full bg-psd-green text-white font-bold py-4 rounded-xl hover:bg-opacity-90 transition shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? 'Mengirim...' : 'Kirim Pesan Sekarang'}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      <Footer companyInfo={companyInfo} />
    </main>
  );
}
