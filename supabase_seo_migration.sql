-- SQL MIGRATION SCRIPT UNTUK FITUR SEO
-- Jalankan script ini di menu "SQL Editor" pada dashboard Supabase Anda.

-- 1. Menambahkan kolom SEO ke tabel 'news' yang sudah ada
ALTER TABLE news
ADD COLUMN IF NOT EXISTS meta_title TEXT,
ADD COLUMN IF NOT EXISTS meta_description TEXT,
ADD COLUMN IF NOT EXISTS meta_keywords TEXT;

-- 2. Membuat tabel baru untuk Global SEO
CREATE TABLE IF NOT EXISTS global_seo (
    id SERIAL PRIMARY KEY,
    meta_title TEXT NOT NULL,
    meta_description TEXT,
    meta_keywords TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Mengatur Row Level Security (RLS) untuk tabel global_seo agar bisa diakses secara publik dan diupdate oleh admin
ALTER TABLE global_seo ENABLE ROW LEVEL SECURITY;

-- Policy untuk read (Select) - Semua orang bisa membaca
CREATE POLICY "Enable read access for all users" ON global_seo
    FOR SELECT USING (true);

-- Policy untuk insert/update - Dalam environment nyata harus dibatasi untuk admin,
-- Namun untuk pengetesan/demo (sesuai setup saat ini menggunakan anon key), kita buka aksesnya:
CREATE POLICY "Enable insert for all users" ON global_seo
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON global_seo
    FOR UPDATE USING (true);

-- 4. Memasukkan data awal (default) untuk Global SEO
INSERT INTO global_seo (id, meta_title, meta_description, meta_keywords)
VALUES (
    1, 
    'Pesantren Smart Digital - Solusi Manajemen Pesantren', 
    'Platform manajemen pesantren digital terintegrasi untuk modernisasi pendidikan islam di Indonesia.', 
    'pesantren, pesantren digital, manajemen pesantren, aplikasi pesantren, spp online'
)
ON CONFLICT (id) DO NOTHING;
