/**
 * Componente de Comentários
 * 
 * Permite que visitantes deixem comentários no portfólio.
 * 
 * Segurança implementada:
 * - ✅ Sanitização de HTML (DOMPurify) para prevenir XSS (Cross-Site Scripting)
 * - ✅ Proteção contra SQL Injection (Supabase usa prepared statements automaticamente)
 * - ✅ Validação de dados de entrada (tamanho máximo, campos obrigatórios)
 * - ✅ Apenas tags HTML seguras são permitidas: b, i, em, strong, a, p, br, ul, ol, li
 * - ✅ Apenas atributo 'href' é permitido em links
 * 
 * Funcionalidades:
 * - Formulário para adicionar comentários
 * - Lista de comentários existentes
 * - CRUD completo (Create, Read, Update, Delete)
 * - Feedback visual de sucesso/erro
 */
'use client'

import { useState, useEffect } from 'react'
import { saveComment, getComments, updateComment, deleteComment, type Comment } from '@/services/commentService'
import { Edit2, Trash2, X, Check } from 'lucide-react'
import DOMPurify from 'isomorphic-dompurify'

export default function Comments() {
  // Estado do formulário
  const [formData, setFormData] = useState({
    name: '',
    message: '',
  })

  // Estado de submissão (loading)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Estado da mensagem de feedback (sucesso ou erro)
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Estado dos comentários
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoadingComments, setIsLoadingComments] = useState(true)
  
  // Estado para edição de comentários
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<{ name: string; message: string }>({ name: '', message: '' })
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  
  // IDs dos comentários criados pelo usuário atual (armazenados no localStorage)
  const [myCommentIds, setMyCommentIds] = useState<Set<string>>(new Set())
  
  /**
   * Carrega os IDs dos comentários do usuário do localStorage
   */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('my_comment_ids')
      if (stored) {
        try {
          const ids = JSON.parse(stored)
          setMyCommentIds(new Set(ids))
        } catch (error) {
          console.error('Erro ao carregar IDs dos comentários:', error)
        }
      }
    }
  }, [])
  
  /**
   * Verifica se um comentário pertence ao usuário atual
   */
  const isMyComment = (commentId: string): boolean => {
    return myCommentIds.has(commentId)
  }
  
  /**
   * Adiciona um ID de comentário à lista do usuário
   */
  const addMyCommentId = (commentId: string) => {
    const newIds = new Set(myCommentIds)
    newIds.add(commentId)
    setMyCommentIds(newIds)
    
    // Salva no localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('my_comment_ids', JSON.stringify(Array.from(newIds)))
    }
  }

  /**
   * Carrega os comentários do banco de dados
   */
  const loadComments = async () => {
    setIsLoadingComments(true)
    try {
      const result = await getComments()
      
      if (result.success && result.comments) {
        setComments(result.comments)
        console.log('Comentários carregados:', result.comments.length)
      } else {
        // Se a tabela não existir, não mostra erro, apenas lista vazia
        if (result.error && result.error.includes('does not exist')) {
          console.warn('Tabela de comentários ainda não foi criada. Execute o SQL em supabase_migrations/create_comments_table.sql')
          setComments([])
        } else {
          console.error('Erro ao carregar comentários:', result.error)
          setComments([])
        }
      }
    } catch (error) {
      console.error('Erro inesperado ao carregar comentários:', error)
      // Em caso de erro, define lista vazia para não quebrar a UI
      setComments([])
    } finally {
      setIsLoadingComments(false)
    }
  }

  /**
   * Carrega comentários ao montar o componente
   */
  useEffect(() => {
    loadComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Sanitiza HTML removendo scripts e tags perigosas
   * 
   * Proteção contra XSS (Cross-Site Scripting):
   * - Remove todas as tags <script>
   * - Remove eventos JavaScript (onclick, onerror, etc.)
   * - Remove atributos perigosos (data-*, style, etc.)
   * - Permite apenas tags HTML seguras para formatação
   * 
   * Tags permitidas: b, i, em, strong, a, p, br, ul, ol, li
   * Atributos permitidos: href (apenas em links)
   * 
   * @param html - String HTML a ser sanitizada
   * @returns String HTML sanitizada e segura
   */
  const sanitizeHtml = (html: string): string => {
    const config = {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li'],
      ALLOWED_ATTR: ['href'],
      ALLOW_DATA_ATTR: false,
      ALLOW_UNKNOWN_PROTOCOLS: false, // Previne javascript: e data: URLs
    }
    return DOMPurify.sanitize(html, config)
  }

  /**
   * Handler para submissão do formulário
   * Salva os dados no Supabase e exibe feedback ao usuário
   */
  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitMessage(null)

    try {
      // Sanitiza a mensagem antes de enviar
      // Isso previne XSS (Cross-Site Scripting) removendo scripts e tags perigosas
      // O Supabase previne SQL Injection usando prepared statements automaticamente
      const sanitizedData = {
        name: formData.name.trim(),
        message: sanitizeHtml(formData.message), // HTML sanitizado e seguro
      }
      
      const result = await saveComment(sanitizedData)
      
      if (result.success) {
        setSubmitMessage({ type: 'success', text: 'Comentário enviado com sucesso!' })
        // Limpa o formulário após sucesso
        setFormData({ name: '', message: '' })
        // Recarrega os comentários para mostrar o novo
        await loadComments()
        
        // Busca o ID do comentário recém-criado e adiciona à lista do usuário
        const newComments = await getComments()
        if (newComments.success && newComments.comments) {
          // Pega o comentário mais recente com o mesmo nome
          const latestComment = newComments.comments.find(
            (c) => c.name === sanitizedData.name && 
                   Math.abs(new Date(c.created_at).getTime() - Date.now()) < 5000 // Criado nos últimos 5 segundos
          )
          if (latestComment) {
            addMyCommentId(latestComment.id)
          }
        }
      } else {
        setSubmitMessage({ type: 'error', text: result.error || 'Erro ao enviar comentário.' })
      }
    } catch (error) {
      console.error('Erro ao enviar comentário:', error)
      setSubmitMessage({ type: 'error', text: 'Erro ao enviar comentário. Tente novamente.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  /**
   * Handler para atualizar os campos do formulário
   * Atualiza o estado conforme o usuário digita
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  /**
   * Effect para remover mensagem de feedback automaticamente
   * Após 5 segundos, a mensagem desaparece da tela
   */
  useEffect(() => {
    if (submitMessage) {
      const timer = setTimeout(() => {
        setSubmitMessage(null)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [submitMessage])

  /**
   * Formata a data do comentário
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  /**
   * Inicia a edição de um comentário
   */
  const startEdit = (comment: Comment) => {
    setEditingId(comment.id)
    setEditData({
      name: comment.name,
      message: comment.message.replace(/<[^>]*>/g, ''), // Remove HTML tags para edição
    })
  }

  /**
   * Cancela a edição
   */
  const cancelEdit = () => {
    setEditingId(null)
    setEditData({ name: '', message: '' })
  }

  /**
   * Salva a edição do comentário
   */
  const handleSaveEdit = async (id: string) => {
    try {
      // Sanitiza a mensagem antes de enviar
      const sanitizedEditData = {
        name: editData.name.trim(),
        message: sanitizeHtml(editData.message),
      }
      
      const result = await updateComment(id, sanitizedEditData)
      
      if (result.success) {
        setSubmitMessage({ type: 'success', text: 'Comentário atualizado com sucesso!' })
        setEditingId(null)
        setEditData({ name: '', message: '' })
        await loadComments()
      } else {
        setSubmitMessage({ type: 'error', text: result.error || 'Erro ao atualizar comentário.' })
      }
    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'Erro ao atualizar comentário. Tente novamente.' })
    }
  }

  /**
   * Deleta um comentário
   */
  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este comentário?')) {
      return
    }

    setIsDeleting(id)
    try {
      const result = await deleteComment(id)
      
      if (result.success) {
        setSubmitMessage({ type: 'success', text: 'Comentário deletado com sucesso!' })
        await loadComments()
      } else {
        setSubmitMessage({ type: 'error', text: result.error || 'Erro ao deletar comentário.' })
      }
    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'Erro ao deletar comentário. Tente novamente.' })
    } finally {
      setIsDeleting(null)
    }
  }

  return (
    <section id="comentarios" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16 text-center">
          Comentários
        </h2>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Formulário de comentário */}
          <div className="bg-dark-light border border-gray-800 rounded-lg p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold mb-6 text-white">
              Deixe seu comentário
            </h3>
            
            <div className="space-y-4">
              {/* Campo Nome */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  className="w-full px-4 py-2 bg-dark border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                  placeholder="Seu nome"
                />
              </div>
              
              {/* Campo Mensagem */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  maxLength={1000}
                  rows={5}
                  className="w-full px-4 py-2 bg-dark border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary resize-none"
                  placeholder="Digite seu comentário aqui... (HTML seguro permitido: negrito, itálico, links)"
                  style={{ backgroundColor: '#0F172A', minHeight: '120px' }}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.message.length}/1000 caracteres
                </p>
              </div>
              
              {/* Botão de Envio */}
              <button
                type="button"
                disabled={isSubmitting || !formData.name.trim() || !formData.message.trim()}
                onClick={async (e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  
                  // Validação básica
                  if (!formData.name.trim() || !formData.message.trim()) {
                    setSubmitMessage({ type: 'error', text: 'Por favor, preencha todos os campos.' })
                    return
                  }
                  
                  // Chama o handler de submit
                  await handleSubmit()
                }}
                className="w-full px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Comentário'}
              </button>
              
              {/* Mensagem de Feedback (sucesso ou erro) */}
              {submitMessage && (
                <div
                  id="submit-message"
                  className={`mt-4 p-4 rounded-lg ${
                    submitMessage.type === 'success'
                      ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                      : 'bg-red-500/20 text-red-400 border border-red-500/50'
                  }`}
                >
                  {submitMessage.text}
                </div>
              )}
            </div>
          </div>

          {/* Lista de comentários */}
          <div className="space-y-6">
            <h3 className="text-xl md:text-2xl font-bold text-white">
              Comentários ({comments.length})
            </h3>
            
            {isLoadingComments ? (
              <div className="text-center py-8 text-gray-400">
                Carregando comentários...
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                Nenhum comentário ainda. Seja o primeiro a comentar!
              </div>
            ) : (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-dark-light border border-gray-800 rounded-lg p-6 hover:border-primary/50 transition-colors"
                  >
                    {editingId === comment.id ? (
                      // Modo de edição
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Nome
                          </label>
                          <input
                            type="text"
                            value={editData.name}
                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                            className="w-full px-4 py-2 bg-dark border border-gray-700 rounded-lg text-white"
                            maxLength={100}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Mensagem
                          </label>
                          <textarea
                            value={editData.message}
                            onChange={(e) => setEditData({ ...editData, message: e.target.value })}
                            className="w-full px-4 py-2 bg-dark border border-gray-700 rounded-lg text-white resize-none"
                            rows={5}
                            maxLength={1000}
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            {editData.message.length}/1000 caracteres
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSaveEdit(comment.id)}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
                          >
                            <Check size={16} />
                            Salvar
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center gap-2"
                          >
                            <X size={16} />
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      // Modo de visualização
                      <>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-white mb-1">
                              {comment.name}
                            </h4>
                            <p className="text-sm text-gray-400">
                              {formatDate(comment.created_at)}
                            </p>
                          </div>
                          {/* Mostra botões de editar/deletar apenas para comentários do próprio usuário */}
                          {isMyComment(comment.id) && (
                            <div className="flex gap-2 ml-4">
                              <button
                                onClick={() => startEdit(comment)}
                                className="p-2 text-gray-400 hover:text-primary transition-colors"
                                title="Editar meu comentário"
                              >
                                <Edit2 size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(comment.id)}
                                disabled={isDeleting === comment.id}
                                className="p-2 text-gray-400 hover:text-red-400 transition-colors disabled:opacity-50"
                                title="Deletar meu comentário"
                              >
                                {isDeleting === comment.id ? (
                                  <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  <Trash2 size={18} />
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                        
                        {/* 
                          Exibe o HTML sanitizado do comentário
                          O HTML já foi sanitizado antes de salvar no banco usando DOMPurify,
                          então é seguro usar dangerouslySetInnerHTML aqui.
                          DOMPurify removeu todos os scripts e tags perigosas.
                          
                          🔒 SEGURANÇA:
                          - HTML sanitizado (sem <script>, sem eventos JavaScript)
                          - Apenas tags seguras: b, i, em, strong, a, p, br, ul, ol, li
                          - SQL Injection prevenida pelo Supabase (prepared statements)
                        */}
                        <div 
                          className="text-gray-300 leading-relaxed max-w-none"
                          dangerouslySetInnerHTML={{ __html: comment.message }}
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
