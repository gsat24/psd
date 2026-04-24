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
DROP POLICY IF EXISTS "Enable insert for all users" ON feedback;
CREATE POLICY "Enable insert for all users" ON feedback FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Enable select for all" ON feedback;
CREATE POLICY "Enable select for all" ON feedback FOR SELECT USING (true);

-- 2. MESSAGES TABLE (Live Chat)
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    sender_id TEXT NOT NULL, -- UUID or session ID for anonymous users
    sender_name TEXT,
    text TEXT NOT NULL,
    is_admin BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable insert for all" ON messages;
CREATE POLICY "Enable insert for all" ON messages FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Enable select for all" ON messages;
CREATE POLICY "Enable select for all" ON messages FOR SELECT USING (true);

-- Enable Realtime for messages (Jalankan sekali saja)
-- ALTER PUBLICATION supabase_realtime ADD TABLE messages;

-- 3. FEATURES TABLE
CREATE TABLE IF NOT EXISTS features (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT, -- SVG or FontAwesome class
    order_num INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE features ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read for all" ON features;
CREATE POLICY "Enable read for all" ON features FOR SELECT USING (true);
DROP POLICY IF EXISTS "Enable all for anon" ON features;
CREATE POLICY "Enable all for anon" ON features FOR ALL USING (true) WITH CHECK (true);

-- 4. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS testimonials (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT, -- e.g. Wali Santri, Pengurus
    content TEXT NOT NULL,
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read for all" ON testimonials;
CREATE POLICY "Enable read for all" ON testimonials FOR SELECT USING (true);
DROP POLICY IF EXISTS "Enable all for anon" ON testimonials;
CREATE POLICY "Enable all for anon" ON testimonials FOR ALL USING (true) WITH CHECK (true);

-- 5. FAQ TABLE
CREATE TABLE IF NOT EXISTS faq (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    order_num INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE faq ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read for all" ON faq;
CREATE POLICY "Enable read for all" ON faq FOR SELECT USING (true);
DROP POLICY IF EXISTS "Enable all for anon" ON faq;
CREATE POLICY "Enable all for anon" ON faq FOR ALL USING (true) WITH CHECK (true);

-- 6. ANALYTICS TABLE
CREATE TABLE IF NOT EXISTS analytics (
    id SERIAL PRIMARY KEY,
    page_path TEXT NOT NULL,
    visitor_id TEXT,
    referrer TEXT,
    browser TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable insert for all" ON analytics;
CREATE POLICY "Enable insert for all" ON analytics FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Enable select for authenticated" ON analytics;
CREATE POLICY "Enable select for authenticated" ON analytics FOR SELECT USING (true);

-- 7. UPDATE COMPANY TABLE
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

-- 8. NEWS TABLE (Fixing RLS & Redirect bugs)
CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    date TEXT,
    summary TEXT,
    content TEXT,
    image TEXT,
    meta_title TEXT,
    meta_description TEXT,
    meta_keywords TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE news ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read for all" ON news;
CREATE POLICY "Enable read for all" ON news FOR SELECT USING (true);
DROP POLICY IF EXISTS "Enable all for anon" ON news;
CREATE POLICY "Enable all for anon" ON news FOR ALL USING (true) WITH CHECK (true);

-- 9. CHAT SESSIONS TABLE
CREATE TABLE IF NOT EXISTS chat_sessions (
    sender_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable insert for all" ON chat_sessions;
CREATE POLICY "Enable insert for all" ON chat_sessions FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Enable update for all" ON chat_sessions;
CREATE POLICY "Enable update for all" ON chat_sessions FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Enable select for all" ON chat_sessions;
CREATE POLICY "Enable select for all" ON chat_sessions FOR SELECT USING (true);

-- 10. COMPANY TABLE RLS
ALTER TABLE company ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read for all" ON company;
CREATE POLICY "Enable read for all" ON company FOR SELECT USING (true);
DROP POLICY IF EXISTS "Enable all for anon" ON company;
CREATE POLICY "Enable all for anon" ON company FOR ALL USING (true) WITH CHECK (true);

-- 11. REFRESH SCHEMA CACHE
NOTIFY pgrst, 'reload schema';

