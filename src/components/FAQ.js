'use client';

import { useState } from 'react';

export default function FAQ({ list }) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!list || list.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-2xl md:text-4xl font-bold text-psd-green uppercase mb-4">Pertanyaan Umum</h2>
          <p className="text-gray-600">Beberapa hal yang sering ditanyakan mengenai sistem PSD.</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {list.map((item, index) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-md overflow-hidden" data-aos="fade-up" data-aos-delay={index * 50}>
              <button 
                className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                <span className={`font-bold transition-colors ${openIndex === index ? 'text-psd-green' : 'text-gray-800'}`}>
                  {item.question}
                </span>
                <i className={`fas fa-chevron-${openIndex === index ? 'up' : 'down'} text-psd-yellow transition-transform duration-300`}></i>
              </button>
              <div className={`transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-[500px] border-t border-gray-100' : 'max-h-0'}`}>
                <div className="p-6 text-gray-600 leading-relaxed text-sm md:text-base whitespace-pre-line">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
