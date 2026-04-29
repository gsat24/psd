export default function MiniFeatures() {
  const features = [
    { name: 'Manajemen\nSantri', icon: 'fas fa-users', delay: 0 },
    { name: 'Manajemen\nKeuangan', icon: 'fas fa-file-invoice-dollar', delay: 100 },
    { name: 'Sistem\nAbsensi', icon: 'fas fa-user-clock', delay: 200 },
    { name: 'Prestasi &\nPelanggaran', icon: 'fas fa-trophy', delay: 300 },
    { name: 'Kartu Santri', icon: 'fas fa-id-card', delay: 400 },
    { name: 'Aplikasi Wali\nSantri', icon: 'fas fa-mobile-alt', delay: 500 },
  ];

  return (
    <section className="py-12 md:py-16 bg-white relative z-20 -mt-4">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {features.map((f) => (
            <div key={f.name} className="group rounded-[2rem] p-6 text-center shadow-md bg-white text-psd-green border border-gray-200 transition-all duration-300 hover:shadow-xl hover:bg-psd-green hover:text-white" data-aos="fade-up" data-aos-delay={f.delay}>
              <div className="flex justify-center mb-3 text-psd-green group-hover:text-psd-yellow transition-colors duration-300">
                <i className={`${f.icon} text-3xl`}></i>
              </div>
              <div className="font-semibold text-sm md:text-base whitespace-pre-line">{f.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
