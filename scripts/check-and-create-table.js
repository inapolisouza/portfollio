/**
 * Script para verificar e criar a tabela de comentários
 * Execute: node scripts/check-and-create-table.js
 */

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ulhjpiunowuizquogzir.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsaGpwaXVub3d1aXpxdW9nemlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0MjM3MzQsImV4cCI6MjA4MTk5OTczNH0.C7qX2k-j1tOHlJU-3tj_B3XqGwRkYl1TXrtoxfg7row'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function checkTable() {
  console.log('🔍 Verificando se a tabela comments existe...\n')

  try {
    // Tenta buscar da tabela (se existir, não dará erro)
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .limit(1)

    if (error) {
      if (error.code === '42P01' || error.message.includes('does not exist')) {
        console.log('❌ Tabela comments não existe!\n')
        console.log('📋 Execute o seguinte SQL no Supabase Dashboard:\n')
        console.log('─'.repeat(60))
        console.log(require('fs').readFileSync('./supabase_migrations/create_comments_table.sql', 'utf8'))
        console.log('─'.repeat(60))
        console.log('\n📍 Como executar:')
        console.log('   1. Acesse: https://app.supabase.com')
        console.log('   2. Selecione seu projeto')
        console.log('   3. Vá em SQL Editor')
        console.log('   4. Cole o SQL acima')
        console.log('   5. Clique em Run\n')
        return false
      } else {
        console.error('❌ Erro ao verificar tabela:', error.message)
        return false
      }
    }

    console.log('✅ Tabela comments já existe!')
    console.log(`📊 Total de comentários: ${data?.length || 0}\n`)
    return true

  } catch (error) {
    console.error('❌ Erro:', error.message)
    return false
  }
}

checkTable()

