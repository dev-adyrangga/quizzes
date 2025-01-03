import { getEnvValues } from '@/utils/get-env-values'
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  getEnvValues.supabaseUrl,
  getEnvValues.supabaseKey
)

export const authenticatedSupabase = (authorization: string) =>
  createClient(getEnvValues.supabaseUrl, getEnvValues.supabaseKey, {
    global: {
      headers: {
        Authorization: authorization
      }
    }
  })
