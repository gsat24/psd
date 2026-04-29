import Link from 'next/link';

export default function InnovatorSection() {
  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-psd-green/5 -skew-x-12 transform origin-top shadow-inner"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 justify-center">
          
          <div className="w-full lg:w-5/12 flex lg:justify-end" data-aos="fade-right">
            <div className="relative mx-auto lg:mx-0 lg:ml-auto max-w-[320px] md:max-w-[380px]">
              <div className="absolute -top-6 -left-6 w-full h-full border-2 border-psd-yellow rounded-[2rem] z-0"></div>
              <div className="absolute top-6 left-6 w-full h-full bg-psd-green/5 rounded-[2rem] z-0"></div>
              
              <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white bg-white group">
                <img src="/priozada.png" alt="Prio Nur Utomo" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1B2C24] via-[#1B2C24]/80 to-transparent p-8 pt-16">
                  <h3 className="text-xl font-bold text-white mb-0.5">Prio Nur Utomo</h3>
                  <p className="text-psd-yellow font-semibold text-[10px] uppercase tracking-widest">Founder & CEO</p>
                  <p className="text-white/60 text-[9px] mt-1">PT. Digital Teknologi Perkasa</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-7/12" data-aos="fade-left">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-psd-green font-bold text-xs uppercase tracking-[0.2em] bg-psd-green/5 px-4 py-1 rounded-full border border-psd-green/10">Inovasi Digital</span>
              </div>
              
              <h2 className="text-xl md:text-3xl font-bold text-gray-800 leading-tight mb-5 uppercase">
                Membangun <span className="text-psd-green">Masa Depan</span><br />Digital Pesantren
              </h2>
              
              <div className="relative mb-5 bg-white p-6 md:p-8 rounded-[1.5rem] shadow-xl shadow-psd-green/5 border border-psd-green/5 overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-psd-yellow"></div>
                <div className="absolute top-4 right-6 text-gray-100">
                  <i className="fas fa-quote-right text-5xl"></i>
                </div>
                <p className="relative z-10 text-sm md:text-base text-gray-700 leading-relaxed font-medium italic">
                  "Pesantren Smart Digital (PSD) diproduksi sebagai pintu gerbang revolusioner untuk tranformasi digital pesantren. PSD bukan hanya menyajikan fitur terlengkap dan sesuai dengan kebutuhan pesantren tapi juga layanan pendampingan total untuk menjamin kesuksesan program digitalisasi."
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 mb-6">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-7 h-7 bg-psd-green/10 rounded-lg flex items-center justify-center text-psd-green">
                    <i className="fas fa-microscope text-[10px]"></i>
                  </div>
                  <p className="text-[11px] md:text-xs text-gray-600 leading-relaxed">
                    PSD lahir dari riset mendalam untuk menyelesaikan problem solving manajemen pesantren secara total guna menghadapi tantangan zaman.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-7 h-7 bg-psd-yellow/10 rounded-lg flex items-center justify-center text-psd-yellow">
                    <i className="fas fa-hands-helping text-[10px]"></i>
                  </div>
                  <p className="text-[11px] md:text-xs text-gray-600 leading-relaxed">
                    Kami mengkolaborasikan riset, ide, dan keluhan pengelola pesantren menjadi solusi nyata yang dapat diterapkan sesuai kebutuhan.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-6 pt-4 border-t border-gray-100">
                <p className="text-sm md:text-base font-bold text-psd-green flex-1 text-center md:text-left">
                  Mari bergabung bersama PSD, wujudkan Pesantren unggul dan smart!
                </p>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-[#1B2C24] text-white font-bold py-3.5 px-7 rounded-full hover:bg-psd-green transition-all duration-300 shadow-lg group text-sm">
                  Gabung Sekarang
                  <i className="fas fa-arrow-right text-xs transition-transform group-hover:translate-x-1"></i>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
