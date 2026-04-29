export default function Testimonials({ list }) {
  if (!list || list.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-2xl md:text-4xl font-bold text-psd-green uppercase mb-4">Apa Kata Mereka?</h2>
          <div className="w-20 h-1.5 bg-psd-yellow mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((t, index) => (
            <div key={t.id} className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden group" data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="absolute -right-6 -top-6 text-gray-100 opacity-50 group-hover:text-psd-green group-hover:opacity-10 transition-colors duration-500 pointer-events-none">
                <i className="fas fa-quote-right text-8xl"></i>
              </div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <img src={t.image} 
                       onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=0A5C4F&color=fff'" 
                       className="h-16 w-16 rounded-full object-cover mr-4 shadow-md border-2 border-psd-green/10" 
                       alt={t.name} />
                  <div className="text-left">
                    <h4 className="font-bold text-gray-800 text-lg">{t.name}</h4>
                    <p className="text-psd-yellow font-bold text-xs uppercase tracking-wider mt-1">{t.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm italic relative">
                  "{t.content}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
