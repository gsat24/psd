export default function InteractiveMap() {
  const hotspots = [
    { name: 'Sumatera', top: '25%', left: '15%', yayasan: '120+', delay: '0s' },
    { name: 'Jawa', top: '75%', left: '32%', yayasan: '100+', delay: '0.2s' },
    { name: 'Kalimantan', top: '40%', left: '40%', yayasan: '50+', delay: '0.4s' },
    { name: 'Sulawesi', top: '48%', left: '60%', yayasan: '20+', delay: '0.6s' },
    { name: 'Papua', top: '55%', left: '88%', yayasan: '5+', delay: '0.8s' },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="relative" data-aos="zoom-in">
            <img src="/map.png" alt="Peta Persebaran" className="w-full h-auto" />
            
            {hotspots.map((h) => (
              <div key={h.name} className="absolute group" style={{ top: h.top, left: h.left }}>
                <div className="w-6 h-6 bg-psd-yellow rounded-full animate-bounce flex items-center justify-center cursor-pointer relative z-10" style={{ animationDelay: h.delay }}>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="w-6 h-6 bg-psd-yellow rounded-full absolute top-0 left-0 animate-ping opacity-75" style={{ animationDelay: h.delay }}></div>
                
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-40 bg-white shadow-xl rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 text-center">
                  <p className="text-psd-green font-bold text-sm">{h.name}</p>
                  <p className="text-gray-600 text-xs">{h.yayasan} Yayasan</p>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-white"></div>
                </div>
              </div>
            ))}
          </div>

          <div data-aos="fade-left">
            <h2 className="text-2xl lg:text-4xl font-bold text-psd-green mb-6 uppercase leading-tight">
              DIPERCAYA SEBAGAI SISTEM UTAMA BANYAK YAYASAN
            </h2>
            <p className="text-gray-600 text-sm md:text-lg leading-relaxed mb-6">
              PSD Telah dipercaya dan digunakan sebagai sistem manajemen utama ratusan yayasan tersebar dari Aceh hingga Papua di seluruh Indonesia.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
