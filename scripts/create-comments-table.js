/**
 * Script para criar a tabela de comentários no Supabase
 * 
 * Execute: node scripts/create-comments-table.js
 * 
 * IMPORTANTE: Este script precisa da SERVICE ROLE KEY do Supabase
 * Configure a variável de ambiente: SUPABASE_SERVICE_ROLE_KEY
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ulhjpiunowuizquogzir.supabase.co'
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!serviceRoleKey) {
  console.error('❌ Erro: SUPABASE_SERVICE_ROLE_KEY não encontrada!')
  console.error('Configure a variável de ambiente SUPABASE_SERVICE_ROLE_KEY no arquivo .env.local')
  console.error('Você pode encontrar a Service Role Key no Supabase Dashboard > Settings > API')
  process.exit(1)
}

// Cliente com service role key (tem permissões administrativas)
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createCommentsTable() {
  console.log('🔄 Criando tabela de comentários...')

  const sql = `
    -- Verifica se a tabela já existe e a remove se necessário
    DROP TABLE IF EXISTS public.comments CASCADE;

    -- Criação da tabela de comentários
    CREATE TABLE public.comments (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL CHECK (char_length(trim(name)) > 0 AND char_length(name) <= 100),
      message TEXT NOT NULL CHECK (char_length(trim(message)) > 0 AND char_length(message) <= 1000),
      created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
    );

    -- Comentários na tabela
    COMMENT ON TABLE public.comments IS 'Armazena comentários deixados pelos visitantes do portfólio';
    COMMENT ON COLUMN public.comments.id IS 'ID único do comentário (UUID)';
    COMMENT ON COLUMN public.comments.name IS 'Nome do autor do comentário (máximo 100 caracteres)';
    COMMENT ON COLUMN public.comments.message IS 'Mensagem do comentário com HTML sanitizado (máximo 1000 caracteres)';
    COMMENT ON COLUMN public.comments.created_at IS 'Data e hora de criação do comentário';

    -- Índice para ordenação por data (mais recentes primeiro)
    CREATE INDEX idx_comments_created_at_desc ON public.comments(created_at DESC);

    -- Habilitar RLS (Row Level Security)
    ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

    -- Política para permitir leitura pública (qualquer um pode ver comentários)
    CREATE POLICY "Permitir leitura pública de comentários"
      ON public.comments
      FOR SELECT
      USING (true);

    -- Política para permitir inserção pública (qualquer um pode criar comentários)
    CREATE POLICY "Permitir inserção pública de comentários"
      ON public.comments
      FOR INSERT
      WITH CHECK (true);
  `

  try {
    // Executa o SQL usando a função rpc ou diretamente
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql })
    
    if (error) {
      // Se o RPC não existir, tenta executar via REST API
      console.log('⚠️  RPC não disponível, tentando método alternativo...')
      
      // Usa a API REST diretamente
      const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': serviceRoleKey,
          'Authorization': `Bearer ${serviceRoleKey}`
        },
        body: JSON.stringify({ sql_query: sql })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    }

    console.log('✅ Tabela de comentários criada com sucesso!')
    console.log('✅ Políticas RLS configuradas!')
    console.log('✅ Índices criados!')
    
  } catch (error) {
    console.error('❌ Erro ao criar tabela:', error.message)
    console.error('\n💡 Alternativa: Execute o SQL manualmente no Supabase Dashboard:')
    console.error('   1. Acesse: https://app.supabase.com')
    console.error('   2. Vá em SQL Editor')
    console.error('   3. Cole o conteúdo de: supabase_migrations/create_comments_table.sql')
    process.exit(1)
  }
}

createCommentsTable()

