/**
 * Serviço de Contatos
 * 
 * Gerencia as operações relacionadas a contatos no Supabase.
 * 
 * Funcionalidades:
 * - Salvar mensagens de contato no banco de dados
 * - Tratamento de erros
 * - Validação de dados
 */
import { supabase } from '@/lib/supabase'

/**
 * Interface para dados de contato
 */
export interface ContactData {
  name: string
  email: string
  message: string
}

/**
 * Salva um contato no banco de dados Supabase
 * 
 * @param data - Dados do contato (nome, email, mensagem)
 * @returns Objeto com sucesso e mensagem de erro (se houver)
 */
export async function saveContact(data: ContactData): Promise<{ success: boolean; error?: string }> {
  try {
    // Insere os dados na tabela contacts
    const { error } = await supabase
      .from('contacts')
      .insert([
        {
          name: data.name,
          email: data.email,
          message: data.message,
        },
      ])

    // Verifica se houve erro na inserção
    if (error) {
      console.error('Erro ao salvar contato:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    // Tratamento de erros inesperados
    console.error('Erro inesperado ao salvar contato:', error)
    return { success: false, error: 'Erro ao enviar mensagem. Tente novamente.' }
  }
}

