'use client'

import { Mail, Linkedin, Github } from 'lucide-react'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você pode adicionar a lógica de envio do formulário
    console.log('Formulário enviado:', formData)
    // Limpar formulário
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contato" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16 text-center">
          Entre em Contato
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Coluna esquerda - Informações de contato */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-gray-300">
              <Mail className="w-5 h-5 text-primary flex-shrink-0" />
              <a 
                href="mailto:inapoli.souza2013@gmail.com"
                className="hover:text-primary transition-colors"
              >
                Email: inapoli.souza2013@gmail.com
              </a>
            </div>
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
            <button
              type="submit"
              className="w-full px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

