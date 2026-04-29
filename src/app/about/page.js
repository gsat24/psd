import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AOSInit from "@/components/AOSInit";

export const metadata = {
  title: "Tentang Kami | Pesantren Smart Digital",
  description: "Mengenal lebih dekat Pesantren Smart Digital dan komitmen kami untuk memajukan pendidikan islam melalui teknologi.",
};

export default async function AboutPage() {
  const { data: companyInfo } = await supabase
    .from('company')
    .select('*')
    .single();

  return (
    <main className="min-h-screen bg-white">
      <AOSInit />
      <Navbar companyInfo={companyInfo} />
      
      {/* Hero Section */}
      <section className="hero-bg pt-40 pb-32 relative overflow-hidden text-white text-center">
        <div className="absolute bottom-0 w-full translate-y-px">
          <svg viewBox="0 0 1440 320" className="w-full h-auto text-white fill-current block">
            <path fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        <div className="container mx-auto px-6 relative z-10" data-aos="fade-up">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 uppercase leading-tight max-w-4xl mx-auto">
            Tentang Kami
          </h1>
          <p className="text-base md:text-xl max-w-2xl mx-auto opacity-90 leading-relaxed">
            Mengenal lebih dekat Pesantren Smart Digital dan komitmen kami untuk memajukan pendidikan islam.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white relative z-20 -mt-4">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div data-aos="fade-right">
              <h2 className="text-2xl md:text-3xl font-bold text-psd-green mb-6 uppercase">Tentang Pesantren Smart Digital</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Pesantren Smart Digital (PSD) adalah solusi inovatif yang dirancang khusus untuk mendigitalisasi ekosistem pesantren. Kami membantu lembaga pendidikan Islam mengelola administrasi, keuangan, hingga pemantauan santri secara real-time dan terintegrasi.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-psd-green text-white p-2 rounded-lg mt-1">
                    <i className="fas fa-check"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Visi</h4>
                    <p className="text-gray-600">Menjadi platform manajemen pesantren digital nomor satu di Indonesia yang terpercaya dan inovatif.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-psd-green text-white p-2 rounded-lg mt-1">
                    <i className="fas fa-check"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Misi</h4>
                    <p className="text-gray-600">Memberikan solusi teknologi yang mudah digunakan, aman, dan terintegrasi untuk efisiensi administrasi pesantren.</p>
                  </div>
                </div>
              </div>
            </div>
            <div data-aos="fade-left">
              <img src="/grid1color.png" alt="Pesantren Smart Digital" className="rounded-[2rem] shadow-2xl w-full object-cover h-[400px]" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1" data-aos="fade-right">
              <img src="/grid2color.png" alt="PT. Digital Teknologi Perkasa" className="rounded-[2rem] shadow-2xl w-full object-cover h-[400px]" />
            </div>
            <div className="order-1 lg:order-2" data-aos="fade-left">
              <h2 className="text-2xl md:text-3xl font-bold text-psd-green mb-6 uppercase">PT. Digital Teknologi Perkasa</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                PT. Digital Teknologi Perkasa didirikan dengan semangat untuk menjembatani kesenjangan antara ide bisnis brilian dan realisasi teknologi.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Kami percaya bahwa teknologi yang hebat dimulai dari pemahaman yang mendalam akan kebutuhan unik klien. Setiap proyek adalah kesempatan untuk berinovasi.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Dengan kombinasi keahlian teknis dan komitmen terhadap kualitas, kami telah membantu puluhan bisnis mencapai transformasi digital yang sukses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto bg-psd-green rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden" data-aos="zoom-in">
            <div className="absolute top-0 right-0 opacity-10">
              <i className="fab fa-whatsapp text-[150px] -mr-10 -mt-10"></i>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 relative z-10">Siap Mendigitalisasi Pesantren Anda?</h2>
            <p className="text-gray-100 mb-10 text-sm md:text-lg opacity-90 relative z-10">Konsultasikan kebutuhan teknologi pesantren Anda dengan tim ahli kami secara gratis via WhatsApp.</p>
            <a href={`https://wa.me/${companyInfo?.whatsapp || '6281368946818'}`} className="inline-flex items-center bg-psd-yellow text-psd-green px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-xl relative z-10">
              <i className="fab fa-whatsapp mr-3 text-2xl"></i>
              Hubungi via WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer companyInfo={companyInfo} />
    </main>
  );
}
