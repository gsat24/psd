-- COMPREHENSIVE SQL MIGRATION SCRIPT FOR PSD WEBSITE
-- Run this in your Supabase SQL Editor

-- 1. FEEDBACK TABLE (Fixing existing issue)
CREATE TABLE IF NOT EXISTS feedback (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    date TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable insert for all users" ON feedback FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable select for authenticated users" ON feedback FOR SELECT TO authenticated USING (true);

-- 2. FEATURES TABLE
CREATE TABLE IF NOT EXISTS features (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT, -- SVG or FontAwesome class
    order_num INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE features ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read for all" ON features FOR SELECT USING (true);
CREATE POLICY "Enable all for authenticated" ON features FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 3. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS testimonials (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT, -- e.g. Wali Santri, Pengurus
    content TEXT NOT NULL,
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read for all" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Enable all for authenticated" ON testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 4. FAQ TABLE
CREATE TABLE IF NOT EXISTS faq (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    order_num INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE faq ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read for all" ON faq FOR SELECT USING (true);
CREATE POLICY "Enable all for authenticated" ON faq FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 5. ANALYTICS TABLE
CREATE TABLE IF NOT EXISTS analytics (
    id SERIAL PRIMARY KEY,
    page_path TEXT NOT NULL,
    visitor_id TEXT,
    referrer TEXT,
    browser TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable insert for all" ON analytics FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable select for authenticated" ON analytics FOR SELECT TO authenticated USING (true);

-- 6. UPDATE COMPANY TABLE
ALTER TABLE company 
ADD COLUMN IF NOT EXISTS hero_headline TEXT,
ADD COLUMN IF NOT EXISTS hero_subheadline TEXT,
ADD COLUMN IF NOT EXISTS whatsapp_number TEXT,
ADD COLUMN IF NOT EXISTS social JSONB;

-- Initial data for Hero if not exists
UPDATE company SET 
    hero_headline = 'Solusi Digital Cerdas Untuk Pesantren Modern',
    hero_subheadline = 'PSD hadir mentransformasi tata kelola pesantren Anda menjadi lebih efisien, transparan, dan terintegrasi.',
    whatsapp_number = '6281368946818',
    social = '{"instagram": "#", "facebook": "#", "tiktok": "#"}'::jsonb
WHERE id = 1;

-- Seed initial features if table is empty
INSERT INTO features (title, description, icon) 
SELECT 'Manajemen Santri', 'Mengelola data hingga ribuan santri tanpa repot.', 'user'
WHERE NOT EXISTS (SELECT 1 FROM features);
