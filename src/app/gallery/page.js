import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryGrid from "./GalleryGrid";

export const metadata = {
  title: "Gallery Video | Pesantren Smart Digital",
  description: "Dokumentasi perjalanan, fitur, dan testimoni transformasi digital pesantren di seluruh Indonesia bersama PSD.",
};

export default async function GalleryPage() {
  const { data: videos } = await supabase
    .from('youtube_gallery')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: companyInfo } = await supabase
    .from('psd_company')
    .select('*')
    .single();

  return (
    <main className="min-h-screen bg-white">
      <Navbar companyInfo={companyInfo} />
      
      <section className="hero-bg pt-40 pb-32 relative overflow-hidden text-white text-center">
        <div className="absolute bottom-0 w-full translate-y-px">
          <svg viewBox="0 0 1440 320" className="w-full h-auto text-white fill-current block">
            <path fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 uppercase leading-tight max-w-4xl mx-auto">
            Gallery <span className="text-psd-yellow">Video</span>
          </h1>
          <p className="text-gray-200 text-base md:text-lg max-w-2xl mx-auto">
            Dokumentasi perjalanan, fitur, dan testimoni transformasi digital pesantren di seluruh Indonesia bersama PSD.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white relative z-20 -mt-4">
        <div className="container mx-auto px-6">
          <GalleryGrid initialVideos={videos} />
        </div>
      </section>

      <Footer companyInfo={companyInfo} />
    </main>
  );
}
