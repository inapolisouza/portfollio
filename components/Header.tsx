'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-sm border-b border-gray-800">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="#inicio" className="text-xl md:text-2xl font-bold text-white">
            Inapoli Souza
          </Link>
          <ul className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <li><Link href="#inicio" className="text-sm lg:text-base text-gray-300 hover:text-white">Inicio</Link></li>
            <li><Link href="#projetos" className="text-sm lg:text-base text-gray-300 hover:text-white">Projetos</Link></li>
            <li><Link href="#certificacoes" className="text-sm lg:text-base text-gray-300 hover:text-white">Certificações</Link></li>
            <li><Link href="#sobre" className="text-sm lg:text-base text-gray-300 hover:text-white">Sobre</Link></li>
            <li><Link href="#tecnologias" className="text-sm lg:text-base text-gray-300 hover:text-white">Tecnologias</Link></li>
            <li><Link href="#contato" className="text-sm lg:text-base text-gray-300 hover:text-white">Contato</Link></li>
          </ul>
          <button 
            onClick={toggleMenu}
            className="md:hidden text-white"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <ul className="flex flex-col space-y-3 pt-4 border-t border-gray-800">
              <li>
                <Link 
                  href="#inicio" 
                  onClick={toggleMenu}
                  className="block text-gray-300 hover:text-white py-2"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link 
                  href="#projetos" 
                  onClick={toggleMenu}
                  className="block text-gray-300 hover:text-white py-2"
                >
                  Projetos
                </Link>
              </li>
              <li>
                <Link 
                  href="#certificacoes" 
                  onClick={toggleMenu}
                  className="block text-gray-300 hover:text-white py-2"
                >
                  Certificações
                </Link>
              </li>
              <li>
                <Link 
                  href="#sobre" 
                  onClick={toggleMenu}
                  className="block text-gray-300 hover:text-white py-2"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link 
                  href="#tecnologias" 
                  onClick={toggleMenu}
                  className="block text-gray-300 hover:text-white py-2"
                >
                  Tecnologias
                </Link>
              </li>
              <li>
                <Link 
                  href="#contato" 
                  onClick={toggleMenu}
                  className="block text-gray-300 hover:text-white py-2"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}