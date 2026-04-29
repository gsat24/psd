'use client';

import { useEffect, useState } from 'react';

const Counter = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [target, duration]);

  return <span>{count.toLocaleString('id-ID')}</span>;
};

export default function Hero({ info }) {
  return (
    <section className="hero-bg relative flex items-center overflow-hidden pt-40 pb-32 lg:pt-48 lg:pb-40">
      <div className="absolute bottom-0 w-full translate-y-px">
        <svg viewBox="0 0 1440 320" className="w-full h-auto text-white fill-current block">
          <path fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-white">
          
          <div className="lg:col-span-4 text-center lg:text-left" data-aos="fade-right">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 uppercase">
              {info?.hero_headline || "Platform Manajemen Pesantren"}
            </h1>
            <div className="mb-8 flex justify-center lg:justify-start">
              <svg width="120" height="12" viewBox="0 0 150 15" className="text-psd-yellow md:w-[150px] md:h-[15px]">
                <path d="M0 10c15 0 15-7 30-7s15 7 30 7 15-7 30-7 15 7 30 7 15-7 30-7" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none"/>
              </svg>
            </div>
            <p className="text-gray-200 text-sm md:text-lg mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed">
              {info?.hero_subheadline || "Solusi digital terintegrasi untuk modernisasi tata kelola pesantren Anda."}
            </p>
          </div>

          <div className="lg:col-span-5 relative flex justify-center" data-aos="zoom-in">
            <div className="bg-white rounded-full w-[250px] h-[250px] md:w-[350px] md:h-[350px] lg:w-[450px] lg:h-[450px] flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"></div>
            <img src="/hero.png" alt="App Showcase" className="relative z-10 w-full max-w-[250px] md:max-w-sm lg:max-w-md transform hover:scale-105 transition duration-500" />
          </div>

          <div className="lg:col-span-3 text-center lg:text-right grid grid-cols-2 md:grid-cols-3 gap-6 lg:block lg:space-y-8 mt-12 lg:mt-0" data-aos="fade-left">
            <div>
              <h3 className="text-sm md:text-lg text-gray-200 mb-1">Mitra Pesantren</h3>
              <div className="text-xl md:text-4xl lg:text-5xl font-bold flex justify-center lg:justify-end">
                <Counter target={350} />+
              </div>
            </div>
            <div>
              <h3 className="text-sm md:text-lg text-gray-200 mb-1">Provinsi</h3>
              <div className="text-xl md:text-4xl lg:text-5xl font-bold flex justify-center lg:justify-end">
                <Counter target={20} />+
              </div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-sm md:text-lg text-gray-200 mb-1">Wali Santri</h3>
              <div className="text-xl md:text-4xl lg:text-5xl font-bold flex justify-center lg:justify-end">
                <Counter target={500000} />+
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
