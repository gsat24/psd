import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MiniFeatures from "@/components/MiniFeatures";
import SolusiDigital from "@/components/SolusiDigital";
import InnovatorSection from "@/components/InnovatorSection";
import InteractiveMap from "@/components/InteractiveMap";
import MitraMarquee from "@/components/MitraMarquee";
import Testimonials from "@/components/Testimonials";
import VideoGallery from "@/components/VideoGallery";
import FAQ from "@/components/FAQ";
import AOSInit from "@/components/AOSInit";

// This is a Server Component - Excellent for SEO!
export default async function HomePage() {
  // Fetch data directly from Supabase on the server
  const { data: companyInfo } = await supabase
    .from('psd_company')
    .select('*')
    .single();

  const { data: news } = await supabase
    .from('psd_news')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3);

  const { data: testimonials } = await supabase
    .from('psd_testimonials')
    .select('*');

  const { data: faqs } = await supabase
    .from('psd_faq')
    .select('*')
    .order('sort_order', { ascending: true });

  const { data: videos } = await supabase
    .from('youtube_gallery')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3);

  return (
    <main className="min-h-screen">
      <AOSInit />
      <Navbar companyInfo={companyInfo} />
      
      <Hero info={companyInfo} />
      
      <MiniFeatures />
      
      <SolusiDigital />

      <InnovatorSection />
      
      <InteractiveMap />
      
      <MitraMarquee />

      <VideoGallery videos={videos} />
      
      <Testimonials list={testimonials} />
      
      <FAQ list={faqs} />
      
      <Footer companyInfo={companyInfo} />
    </main>
  );
}
