/**
 * Componente de Contato
 * 
 * Exibe informações de contato e um formulário funcional que salva
 * as mensagens no banco de dados Supabase.
 * 
 * Funcionalidades:
 * - Formulário com validação
 * - Integração com Supabase para salvar mensagens
 * - Feedback visual de sucesso/erro
 * - Mensagens desaparecem automaticamente após 5 segundos
 */
'use client'

import { Mail, Linkedin, Github } from 'lucide-react'
import { useState, useEffect } from 'react'
import { saveContact } from '@/services/contactService'

export default function Contact() {
  // Estado do formulário
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  // Estado de submissão (loading)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Estado da mensagem de feedback (sucesso ou erro)
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  /**
   * Handler para submissão do formulário
   * Salva os dados no Supabase e exibe feedback ao usuário
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage(null)

    try {
      const result = await saveContact(formData)
      
      if (result.success) {
        setSubmitMessage({ type: 'success', text: 'Mensagem enviada com sucesso!' })
        // Limpa o formulário após sucesso
    setFormData({ name: '', email: '', message: '' })
      } else {
        setSubmitMessage({ type: 'error', text: result.error || 'Erro ao enviar mensagem.' })
      }
    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'Erro ao enviar mensagem. Tente novamente.' })
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

  return (
    <section id="contato" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16 text-center">
          Entre em Contato
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Coluna esquerda - Informações de contato */}
          <div className="space-y-6">
            {/* Link de Email */}
            <div className="flex items-center gap-4 text-gray-300">
              <Mail className="w-5 h-5 text-primary flex-shrink-0" />
              <a 
                href="mailto:inapoli.souza2013@gmail.com"
                className="hover:text-primary transition-colors"
              >
                Email: inapoli.souza2013@gmail.com
              </a>
            </div>
            
            {/* Link do LinkedIn */}
            <div className="flex items-center gap-4 text-gray-300">
              <Linkedin className="w-5 h-5 text-primary flex-shrink-0" />
              <a 
                href="https://www.linkedin.com/in/inapoli-souza-9513b7268" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                LinkedIn: /in/inapoli-souza-9513b7268
              </a>
            </div>
            
            {/* Link do GitHub */}
            <div className="flex items-center gap-4 text-gray-300">
              <Github className="w-5 h-5 text-primary flex-shrink-0" />
              <a 
                href="https://github.com/inapolisouza" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                GitHub: /inapolisouza
              </a>
            </div>
          </div>

          {/* Coluna direita - Formulário de contato */}
          <form onSubmit={handleSubmit} className="space-y-4">
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
                className="w-full px-4 py-2 bg-dark-light border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                placeholder="Seu nome"
              />
            </div>
            
            {/* Campo Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-dark-light border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                placeholder="seu@email.com"
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
                rows={5}
                className="w-full px-4 py-2 bg-dark-light border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary resize-none"
                placeholder="Sua mensagem"
              />
            </div>
            
            {/* Botão de Envio */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </button>
            
            {/* Mensagem de Feedback (sucesso ou erro) */}
            {submitMessage && (
              <div
                className={`mt-4 p-4 rounded-lg ${
                  submitMessage.type === 'success'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                    : 'bg-red-500/20 text-red-400 border border-red-500/50'
                }`}
              >
                {submitMessage.text}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

