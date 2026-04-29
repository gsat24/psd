export default function SolusiDigital() {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column */}
          <div className="space-y-8 flex flex-col">
            <div data-aos="fade-right" class="relative">
              <div class="absolute -top-10 -left-10 w-32 h-32 bg-psd-green/5 rounded-full blur-3xl -z-10"></div>
              <div class="flex items-center gap-3 mb-6">
                <span class="text-psd-green font-bold text-xs uppercase tracking-[0.2em] bg-psd-green/5 px-4 py-1 rounded-full border border-psd-green/10">Solusi Nyata</span>
              </div>
              <h2 class="text-2xl lg:text-4xl font-bold text-gray-800 mb-6 uppercase leading-tight">
                Solusi Digital <span class="text-psd-green">Cerdas</span> Untuk Pesantren Modern
              </h2>
              <p class="text-gray-600 text-sm md:text-base leading-relaxed max-w-xl">
                Masih terjebak dengan manajemen manual yang rumit? <span class="font-bold text-psd-green">PSD</span> hadir mentransformasi tata kelola pesantren Anda menjadi lebih efisien, transparan, dan terintegrasi.
              </p>
            </div>

            <div class="group relative rounded-[2rem] overflow-hidden h-[400px] cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-700" data-aos="fade-up" data-aos-delay="100">
              <div class="absolute inset-0 bg-psd-green/10"></div>
              <img src="/grid2bw.png" alt="Penanganan Data" class="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:opacity-0 group-hover:scale-110" />
              <img src="/grid2color.png" alt="Penanganan Data Color" class="absolute inset-0 w-full h-full object-cover transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-110" />
              <div class="absolute inset-0 bg-gradient-to-t from-[#1B2C24] via-[#1B2C24]/60 to-transparent opacity-90"></div>
              <div class="absolute bottom-0 left-0 right-0 p-8 pt-24">
                <p class="text-psd-yellow font-bold text-[10px] uppercase tracking-[0.2em] mb-2">Manajemen Keuangan</p>
                <h3 class="text-white font-bold uppercase text-xl mb-3 leading-tight">Kendali Penuh Data Tunggakan</h3>
                <p class="text-white/80 text-xs md:text-sm leading-relaxed">Sistem otomatis PSD memastikan data tunggakan SPP akurat dan tertata rapi, memudahkan sekolah saat musim ujian tiba.</p>
              </div>
            </div>

            <div class="group relative rounded-[2rem] overflow-hidden h-[500px] cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-700" data-aos="fade-up" data-aos-delay="200">
              <img src="/grid4.png" alt="Sistem Terintegrasi" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div class="absolute inset-0 bg-gradient-to-t from-[#1B2C24] via-[#1B2C24]/40 to-transparent opacity-80 group-hover:opacity-100"></div>
              <div class="absolute bottom-0 left-0 right-0 p-8 pt-24">
                <p class="text-psd-yellow font-bold text-[10px] uppercase tracking-[0.2em] mb-2">Integrasi Sistem</p>
                <h3 class="text-white font-bold uppercase text-xl mb-3 leading-tight">Ekosistem Digital Terpadu</h3>
                <p class="text-white/80 text-xs md:text-sm leading-relaxed">Hubungkan seluruh unit Yayasan dalam satu platform dari akademik hingga kepegawaian dalam satu dashboard efisien.</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8 flex flex-col lg:pt-12">
            <div class="group relative rounded-[2rem] overflow-hidden h-[500px] cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-700" data-aos="fade-up" data-aos-delay="300">
              <div class="absolute inset-0 bg-psd-green/10"></div>
              <img src="/grid1bw.png" alt="Keuangan" class="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:opacity-0 group-hover:scale-110" />
              <img src="/grid1color.png" alt="Keuangan Color" class="absolute inset-0 w-full h-full object-cover transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-110" />
              <div class="absolute inset-0 bg-gradient-to-t from-[#1B2C24] via-[#1B2C24]/60 to-transparent opacity-90"></div>
              <div class="absolute bottom-0 left-0 right-0 p-8 pt-24">
                <p class="text-psd-yellow font-bold text-[10px] uppercase tracking-[0.2em] mb-2">Transparansi Finansial</p>
                <h3 class="text-white font-bold uppercase text-xl mb-3 leading-tight">Optimasi Keuangan Real-Time</h3>
                <p class="text-white/80 text-xs md:text-sm leading-relaxed">Catat setiap transaksi santri secara instan dan akurat dengan fitur keuangan terintegrasi yang tanpa celah.</p>
              </div>
            </div>

            <div class="group relative rounded-[2rem] overflow-hidden h-[500px] cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-700" data-aos="fade-up" data-aos-delay="400">
              <div class="absolute inset-0 bg-psd-green/10"></div>
              <img src="/grid3bw.png" alt="Komunikasi" class="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:opacity-0 group-hover:scale-110" />
              <img src="/grid3color.png" alt="Komunikasi Color" class="absolute inset-0 w-full h-full object-cover transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-110" />
              <div class="absolute inset-0 bg-gradient-to-t from-[#1B2C24] via-[#1B2C24]/60 to-transparent opacity-90"></div>
              <div class="absolute bottom-0 left-0 right-0 p-8 pt-24">
                <p class="text-psd-yellow font-bold text-[10px] uppercase tracking-[0.2em] mb-2">Layanan Wali Santri</p>
                <h3 class="text-white font-bold uppercase text-xl mb-3 leading-tight">Jembatan Komunikasi Wali Santri</h3>
                <p class="text-white/80 text-xs md:text-sm leading-relaxed">Bangun kepercayaan orang tua melalui laporan real-time kedisiplinan dan perkembangan santri secara transparan.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
