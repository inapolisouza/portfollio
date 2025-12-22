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
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ulhjpiunowuizquogzir.supabase.co'

// Chave anon (pública) do Supabase
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsaGpwaXVub3d1aXpxdW9nemlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0MjM3MzQsImV4cCI6MjA4MTk5OTczNH0.C7qX2k-j1tOHlJU-3tj_B3XqGwRkYl1TXrtoxfg7row'

// Cliente Supabase exportado para uso em toda a aplicação
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

