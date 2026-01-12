/**
 * Serviço de Comentários
 * 
 * Gerencia as operações relacionadas a comentários no Supabase.
 * 
 * 🔒 SEGURANÇA IMPLEMENTADA:
 * 
 * 1. Proteção contra SQL Injection:
 *    - O Supabase usa prepared statements automaticamente
 *    - Todos os dados são passados como parâmetros, nunca concatenados
 *    - Exemplo: .insert([{ name: data.name }]) - seguro ✅
 *    - Nunca: `INSERT INTO comments VALUES ('${data.name}')` - inseguro ❌
 * 
 * 2. Proteção contra XSS (Cross-Site Scripting):
 *    - A sanitização HTML é feita no componente Comments.tsx usando DOMPurify
 *    - Apenas tags HTML seguras são permitidas
 *    - Scripts e eventos JavaScript são removidos automaticamente
 * 
 * 3. Validação de dados:
 *    - Nome: máximo 100 caracteres, obrigatório
 *    - Mensagem: máximo 1000 caracteres, obrigatório
 *    - Campos são validados antes de salvar no banco
 */
import { supabase } from '@/lib/supabase'

/**
 * Interface para dados de comentário
 */
export interface CommentData {
  name: string
  message: string
}

/**
 * Interface para comentário retornado do banco
 */
export interface Comment {
  id: string
  name: string
  message: string
  created_at: string
}

/**
 * Valida os dados do comentário
 * 
 * @param data - Dados do comentário
 * @returns Dados validados ou erro
 */
function validate(data: CommentData): { valid: boolean; sanitized?: CommentData; error?: string } {
  // Validação do nome
  if (!data.name || data.name.trim().length === 0) {
    return { valid: false, error: 'Nome é obrigatório' }
  }
  
  if (data.name.trim().length > 100) {
    return { valid: false, error: 'Nome muito longo (máximo 100 caracteres)' }
  }
  
  // Validação da mensagem
  if (!data.message || data.message.trim().length === 0) {
    return { valid: false, error: 'Mensagem é obrigatória' }
  }
  
  if (data.message.trim().length > 1000) {
    return { valid: false, error: 'Mensagem muito longa (máximo 1000 caracteres)' }
  }
  
  return {
    valid: true,
    sanitized: {
      name: data.name.trim(),
      message: data.message.trim(), // A sanitização será feita no componente
    },
  }
}

/**
 * Salva um comentário no banco de dados Supabase
 * 
 * O Supabase usa parâmetros preparados automaticamente, prevenindo SQL Injection.
 * A sanitização de HTML previne XSS.
 * 
 * @param data - Dados do comentário (nome, mensagem)
 * @returns Objeto com sucesso e mensagem de erro (se houver)
 */
export async function saveComment(data: CommentData): Promise<{ success: boolean; error?: string }> {
  try {
    // Validação dos dados
    const validation = validate(data)
    
    if (!validation.valid || !validation.sanitized) {
      return { success: false, error: validation.error || 'Dados inválidos' }
    }
    
    // Verifica se o supabase está configurado
    if (!supabase) {
      console.error('Cliente Supabase não está configurado')
      return { success: false, error: 'Cliente Supabase não está configurado' }
    }
    
    // Insere os dados na tabela comments
    // 
    // 🔒 PROTEÇÃO CONTRA SQL INJECTION:
    // O Supabase usa prepared statements automaticamente.
    // Os dados são passados como parâmetros, nunca concatenados na query.
    // Isso previne SQL Injection mesmo se dados maliciosos forem inseridos.
    //
    // Exemplo de como o Supabase protege:
    // Query gerada: INSERT INTO comments (name, message) VALUES ($1, $2)
    // Parâmetros: ['Nome do usuário', 'Mensagem do usuário']
    // 
    // Mesmo se alguém tentar: name = "'; DROP TABLE comments; --"
    // O Supabase tratará como um valor literal, não como código SQL.
    const { data: result, error } = await supabase
      .from('comments')
      .insert([
        {
          name: validation.sanitized.name,
          message: validation.sanitized.message, // HTML já sanitizado no componente
        },
      ])
      .select()

    // Verifica se houve erro na inserção
    if (error) {
      console.error('Erro ao salvar comentário:', error)
      console.error('Código do erro:', error.code)
      console.error('Detalhes do erro:', error.details)
      return { success: false, error: error.message || 'Erro ao salvar comentário' }
    }

    return { success: true }
  } catch (error) {
    // Tratamento de erros inesperados (incluindo erros de rede)
    console.error('Erro inesperado ao salvar comentário:', error)
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return { success: false, error: 'Erro de conexão. Verifique sua conexão com a internet.' }
    }
    
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
    return { success: false, error: `Erro ao enviar comentário: ${errorMessage}` }
  }
}

/**
 * Busca todos os comentários do banco de dados
 * 
 * @returns Lista de comentários ou erro
 */
export async function getComments(): Promise<{ success: boolean; comments?: Comment[]; error?: string }> {
  try {
    // Verifica se o supabase está configurado
    if (!supabase) {
      console.error('Cliente Supabase não está configurado')
      return { success: false, error: 'Cliente Supabase não está configurado' }
    }

    // Busca comentários ordenados por data (mais recentes primeiro)
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar comentários:', error)
      console.error('Código do erro:', error.code)
      console.error('Detalhes do erro:', error.details)
      console.error('Hint do erro:', error.hint)
      return { success: false, error: error.message || 'Erro ao buscar comentários' }
    }

    return { success: true, comments: data || [] }
  } catch (error) {
    console.error('Erro inesperado ao buscar comentários:', error)
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return { success: false, error: 'Erro de conexão. Verifique sua conexão com a internet.' }
    }
    
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
    return { success: false, error: `Erro ao carregar comentários: ${errorMessage}` }
  }
}

/**
 * Atualiza um comentário existente no banco de dados
 * 
 * @param id - ID do comentário a ser atualizado
 * @param data - Novos dados do comentário
 * @returns Objeto com sucesso e mensagem de erro (se houver)
 */
export async function updateComment(id: string, data: CommentData): Promise<{ success: boolean; error?: string }> {
  try {
    // Validação dos dados
    const validation = validate(data)
    
    if (!validation.valid || !validation.sanitized) {
      return { success: false, error: validation.error || 'Dados inválidos' }
    }
    
    // Atualiza o comentário usando parâmetros do Supabase
    // A sanitização HTML será feita no componente antes de exibir
    const { error } = await supabase
      .from('comments')
      .update({
        name: validation.sanitized.name,
        message: validation.sanitized.message,
      })
      .eq('id', id)

    if (error) {
      console.error('Erro ao atualizar comentário:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Erro inesperado ao atualizar comentário:', error)
    return { success: false, error: 'Erro ao atualizar comentário. Tente novamente.' }
  }
}

/**
 * Deleta um comentário do banco de dados
 * 
 * @param id - ID do comentário a ser deletado
 * @returns Objeto com sucesso e mensagem de erro (se houver)
 */
export async function deleteComment(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Deleta o comentário usando parâmetros do Supabase
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Erro ao deletar comentário:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Erro inesperado ao deletar comentário:', error)
    return { success: false, error: 'Erro ao deletar comentário. Tente novamente.' }
  }
}

