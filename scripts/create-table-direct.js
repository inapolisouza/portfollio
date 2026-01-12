/**
 * Script para criar a tabela de comentários diretamente
 * 
 * IMPORTANTE: Este script precisa da SERVICE ROLE KEY
 * Adicione no arquivo .env.local:
 * SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_aqui
 * 
 * Execute: node scripts/create-table-direct.js
 */

const https = require('https')

const supabaseUrl = 'https://ulhjpiunowuizquogzir.supabase.co'
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!serviceRoleKey) {
  console.log('⚠️  SERVICE ROLE KEY não encontrada')
  console.log('📝 Adicione no arquivo .env.local:')
  console.log('   SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_aqui\n')
  console.log('💡 Você pode encontrar a Service Role Key em:')
  console.log('   Supabase Dashboard > Settings > API > service_role (secret)\n')
  console.log('📋 Enquanto isso, execute o SQL manualmente:\n')
  const fs = require('fs')
  console.log(fs.readFileSync('./supabase_migrations/create_comments_table.sql', 'utf8'))
  process.exit(1)
}

const sql = `
DROP TABLE IF EXISTS public.comments CASCADE;

CREATE TABLE public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(trim(name)) > 0 AND char_length(name) <= 100),
  message TEXT NOT NULL CHECK (char_length(trim(message)) > 0 AND char_length(message) <= 1000),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

COMMENT ON TABLE public.comments IS 'Armazena comentários deixados pelos visitantes do portfólio';
COMMENT ON COLUMN public.comments.id IS 'ID único do comentário (UUID)';
COMMENT ON COLUMN public.comments.name IS 'Nome do autor do comentário (máximo 100 caracteres)';
COMMENT ON COLUMN public.comments.message IS 'Mensagem do comentário com HTML sanitizado (máximo 1000 caracteres)';
COMMENT ON COLUMN public.comments.created_at IS 'Data e hora de criação do comentário';

CREATE INDEX idx_comments_created_at_desc ON public.comments(created_at DESC);

ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Permitir leitura pública de comentários" ON public.comments;
CREATE POLICY "Permitir leitura pública de comentários"
  ON public.comments
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Permitir inserção pública de comentários" ON public.comments;
CREATE POLICY "Permitir inserção pública de comentários"
  ON public.comments
  FOR INSERT
  WITH CHECK (true);
`.trim()

console.log('🔄 Tentando criar tabela via Supabase Management API...\n')

// Infelizmente, o Supabase não permite executar DDL via API REST
// A única forma é via SQL Editor ou migrations
console.log('❌ O Supabase não permite executar DDL (CREATE TABLE) via API REST por segurança.\n')
console.log('✅ Solução: Execute o SQL manualmente no Supabase Dashboard\n')
console.log('📋 SQL para executar:\n')
console.log('─'.repeat(70))
console.log(sql)
console.log('─'.repeat(70))
console.log('\n📍 Passos:')
console.log('   1. Acesse: https://app.supabase.com/project/ulhjpiunowuizquogzir')
console.log('   2. Vá em "SQL Editor" no menu lateral')
console.log('   3. Clique em "New Query"')
console.log('   4. Cole o SQL acima')
console.log('   5. Clique em "Run" ou pressione Ctrl+Enter')
console.log('   6. Aguarde a confirmação de sucesso\n')

