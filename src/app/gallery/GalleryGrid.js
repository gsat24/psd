'use client';

import { useState } from 'react';

export default function GalleryGrid({ initialVideos }) {
  const [activeVideo, setActiveVideo] = useState(null);

  const getYoutubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  if (!initialVideos || initialVideos.length === 0) {
    return <div className="text-center py-20 text-gray-500 italic">Belum ada video di gallery.</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {initialVideos.map((v, index) => {
          const videoId = getYoutubeId(v.video_url);
          return (
            <div 
              key={v.id} 
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 group cursor-pointer transition-transform hover:-translate-y-2"
              onClick={() => setActiveVideo(videoId)}
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
                  onerror="this.src='https://img.youtube.com/vi/${videoId}/hqdefault.jpg'"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt={v.title}
                />
                <div className="absolute inset-0 bg-psd-green/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-14 h-14 bg-psd-yellow rounded-full flex items-center justify-center text-psd-green shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                    <i className="fas fa-play ml-1"></i>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-gray-800 text-base md:text-lg leading-tight group-hover:text-psd-green transition-colors line-clamp-2">
                  {v.title || 'Video PSD'}
                </h3>
                <div className="flex items-center gap-2 mt-4 text-psd-green font-bold text-[10px] uppercase tracking-widest">
                  <i className="fab fa-youtube"></i>
                  <span>Tonton Video</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={() => setActiveVideo(null)}>
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button className="absolute top-4 right-4 text-white text-3xl hover:text-psd-yellow transition z-20 drop-shadow-lg" onClick={() => setActiveVideo(null)}>
              <i className="fas fa-times"></i>
            </button>
            <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        </div>
      )}
    </>
  );
}
