/**
 * Componente Header
 * 
 * Cabeçalho fixo com navegação responsiva.
 * 
 * Funcionalidades:
 * - Navegação fixa no topo
 * - Destaque automático da seção ativa durante o scroll
 * - Menu hambúrguer funcional para mobile
 * - Transições suaves
 */
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// Itens do menu de navegação
const navItems = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#tecnologias', label: 'Tecnologias' },
  { href: '#certificacoes', label: 'Certificações' },
  { href: '#depoimentos', label: 'Depoimentos' },
  { href: '#comentarios', label: 'Comentários' },
  { href: '#contato', label: 'Contato' },
]

export default function Header() {
  // Estado da seção ativa (para destacar no menu)
  const [activeSection, setActiveSection] = useState('inicio')

  // Estado do menu mobile (aberto/fechado)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  /**
   * Effect para detectar a seção ativa durante o scroll
   * Atualiza o estado activeSection para destacar o link correto no menu
   */
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.replace('#', ''))
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /**
   * Toggle do menu mobile (abre/fecha)
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  /**
   * Fecha o menu mobile
   * Chamado quando um link é clicado no menu mobile
   */
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-sm border-b border-gray-800">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo/Nome do portfólio */}
          <Link href="#inicio" className="text-xl md:text-2xl font-bold text-white">
            Inapoli Souza
          </Link>
          
          {/* Menu de navegação desktop */}
          <ul className="hidden lg:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => {
              const sectionId = item.href.replace('#', '')
              const isActive = activeSection === sectionId
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-sm lg:text-base transition-colors ${
                      isActive
                        ? 'text-primary font-semibold'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Botão do menu mobile (hambúrguer) - visível em telas menores que lg */}
          <button 
            className="lg:hidden text-white p-2 hover:bg-gray-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary z-50"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            type="button"
          >
            {isMobileMenuOpen ? (
              // Ícone X quando o menu está aberto
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Ícone hambúrguer quando o menu está fechado
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            )}
          </button>
        </div>

        {/* Menu mobile dropdown - visível em telas menores que lg */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-800 bg-dark/98 backdrop-blur-sm animate-in slide-in-from-top-2 duration-200">
            <ul className="flex flex-col py-4">
              {navItems.map((item) => {
                const sectionId = item.href.replace('#', '')
                const isActive = activeSection === sectionId
                
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={`block px-4 py-3 text-base transition-colors ${
                        isActive
                          ? 'text-primary font-semibold bg-primary/10'
                          : 'text-gray-300 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}
