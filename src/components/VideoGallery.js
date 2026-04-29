'use client';

import { useState } from 'react';

export default function VideoGallery({ videos }) {
  const [activeVideo, setActiveVideo] = useState(null);

  const getYoutubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  if (!videos || videos.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12" data-aos="fade-up">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-psd-green uppercase mb-4">Gallery Kegiatan</h2>
            <p className="text-gray-600 max-w-xl">Dokumentasi kegiatan dan tutorial penggunaan sistem Pesantren Smart Digital.</p>
          </div>
          <a href="/gallery" className="mt-6 md:mt-0 px-8 py-3 bg-psd-green text-white rounded-full font-bold hover:bg-opacity-90 transition shadow-lg">Lihat Semua</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videos.map((video, index) => {
            const id = getYoutubeId(video.video_url);
            return (
              <div key={video.id} className="group cursor-pointer" data-aos="fade-up" data-aos-delay={index * 100} onClick={() => setActiveVideo(id)}>
                <div className="relative rounded-[2rem] overflow-hidden shadow-xl aspect-video mb-4">
                  <img src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`} alt={video.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 bg-psd-yellow text-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition transform">
                      <i className="fas fa-play text-xl ml-1"></i>
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-gray-800 group-hover:text-psd-green transition">{video.title}</h3>
              </div>
            );
          })}
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90" onClick={() => setActiveVideo(null)}>
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl">
            <iframe src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`} className="w-full h-full" allowFullScreen allow="autoplay"></iframe>
            <button className="absolute top-4 right-4 text-white hover:text-psd-yellow text-2xl" onClick={() => setActiveVideo(null)}><i className="fas fa-times"></i></button>
          </div>
        </div>
      )}
    </section>
  );
}
