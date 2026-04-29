import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";

// Generate dynamic metadata for SEO!
export async function generateMetadata({ params }) {
  const { data: article } = await supabase
    .from('news')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!article) return { title: "Artikel Tidak Ditemukan" };

  return {
    title: `${article.title} | Pesantren Smart Digital`,
    description: article.excerpt || article.content?.substring(0, 160),
    openGraph: {
      images: [article.image],
    },
  };
}

export default async function BeritaDetail({ params }) {
  const { data: article } = await supabase
    .from('news')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!article) notFound();

  const { data: companyInfo } = await supabase
    .from('company')
    .select('*')
    .single();

  return (
    <main className="min-h-screen bg-white">
      <Navbar companyInfo={companyInfo} />
      
      {/* Article Header */}
      <section className="hero-bg pt-40 pb-20 text-center text-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-xs font-bold text-psd-yellow bg-white/10 px-4 py-1.5 rounded-full uppercase tracking-widest border border-white/20">
              {article.category || 'Berita'}
            </span>
            <span className="text-sm opacity-80">
              {new Date(article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight uppercase">{article.title}</h1>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="rounded-[3rem] overflow-hidden shadow-2xl -mt-32 relative z-10 bg-white">
            <img src={article.image} alt={article.title} className="w-full h-auto max-h-[500px] object-cover" />
            <div className="p-8 md:p-16 news-content text-gray-700">
              <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <a href="/berita" className="inline-flex items-center gap-2 text-psd-green font-bold hover:underline">
              <i className="fas fa-arrow-left text-xs"></i> Kembali ke Daftar Berita
            </a>
          </div>
        </div>
      </section>

      <Footer companyInfo={companyInfo} />
    </main>
  );
}
