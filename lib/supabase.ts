/**
 * Cliente Supabase centralizado
 * 
 * Configuração única do cliente Supabase para toda a aplicação.
 * Usa variáveis de ambiente ou valores padrão como fallback.
 * 
 * Segurança:
 * - Usa apenas a chave anon (pública)
 * - RLS (Row Level Security) habilitado no banco
 * - Nunca expor service role key no frontend
 */
import { createClient } from '@supabase/supabase-js'

// URL do projeto Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kzyvzwkbrmuoydghqrcs.supabase.co'

// Chave anon (pública) do Supabase
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6eXZ6d2ticm11b3lkZ2hxcmNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwMTgxNTksImV4cCI6MjA4MjU5NDE1OX0.nHpUPuEHc_wdWHV7XQIpzsCMkQQ5Wr40YRnLNBvnjAA'

// Verifica se as variáveis estão configuradas
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ Supabase não configurado. Verifique as variáveis de ambiente.')
}

// Cliente Supabase exportado para uso em toda a aplicação
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
})

