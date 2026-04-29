import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Berita & Artikel | Pesantren Smart Digital",
  description: "Update terbaru seputar digitalisasi pesantren dan inovasi pendidikan islam.",
};

export default async function BeritaPage() {
  const { data: news } = await supabase
    .from('psd_news')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: companyInfo } = await supabase
    .from('psd_company')
    .select('*')
    .single();

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar companyInfo={companyInfo} />
      
      {/* Header */}
      <section className="hero-bg pt-40 pb-20 text-center text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase">Berita & Artikel</h1>
          <p className="text-gray-200 max-w-2xl mx-auto">Informasi terkini seputar perkembangan teknologi di dunia pesantren.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news?.map((item) => (
              <Link key={item.id} href={`/berita/${item.id}`} className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all group">
                <div className="relative h-64 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-xs font-bold text-psd-green bg-psd-green/5 px-3 py-1 rounded-full uppercase tracking-wider">
                      {item.category || 'Berita'}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-psd-green transition">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-6">
                    {item.excerpt || item.content?.substring(0, 150) + '...'}
                  </p>
                  <span className="text-psd-green font-bold text-sm inline-flex items-center gap-2">
                    Baca Selengkapnya <i className="fas fa-arrow-right text-xs"></i>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer companyInfo={companyInfo} />
    </main>
  );
}
