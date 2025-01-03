export const getEnvValues = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_API || '',
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
}
