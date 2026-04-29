export default function MitraMarquee() {
  const mitras = [
    { name: "YPI Dayah Budi Al-Mukhtari", location: "Bireuen, Aceh" },
    { name: "Pondok Pesantren Darul Muttaqien", location: "Siak, Riau" },
    { name: "Pondok Pesantren Tebuireng-3", location: "Indragiri Hilir, Riau" },
    { name: "Ma'had Tahfidzul Qu'ran Daarul Iman", location: "Bangka Belitung" },
    { name: "Pondok Pesantren Darul Ulum", location: "Lampung Tengah" },
    { name: "SMK Yapemi PP Madinatul Ilmi", location: "Pringsewu, Lampung" },
    { name: "Pondok Pesantren Al-Amin", location: "Lampung Selatan" },
    { name: "Pondok Pesantren Roudhotussolihin", location: "Lampung Selatan" },
  ];

  return (
    <section className="py-12 bg-white overflow-hidden border-t border-b border-gray-100">
      <div className="container mx-auto px-6 text-center mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 uppercase tracking-wide">Mitra Pesantren Kami</h2>
        <div className="w-16 h-1 bg-psd-yellow mx-auto mt-3 rounded-full"></div>
      </div>
      
      <div className="relative w-full flex overflow-hidden group py-4">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused] space-x-6 min-w-max px-3">
          {[...mitras, ...mitras].map((m, i) => (
            <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 w-72 flex-shrink-0 flex flex-col justify-center items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300">
              <p className="font-bold text-gray-800 text-sm mb-2">{m.name}</p>
              <p className="text-xs text-psd-green font-semibold bg-green-50 px-3 py-1 rounded-full">{m.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
