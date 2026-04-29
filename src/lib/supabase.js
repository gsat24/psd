import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tcorbpybtgxhtwarfwyf.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_u3hZyGYv3X_tj6saDtjFtQ_ylo7zl7j';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
