'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-dark/98 backdrop-blur-md border-b border-gray-800/50 shadow-lg' 
        : 'bg-dark/95 backdrop-blur-sm border-b border-gray-800'
    }`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link 
            href="#inicio" 
            className="text-xl md:text-2xl font-bold text-white hover:text-primary transition-colors duration-300"
          >
            Inapoli Souza
          </Link>
          <ul className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <li>
              <Link 
                href="#inicio" 
                className="text-sm lg:text-base text-gray-300 hover:text-primary transition-colors duration-300 relative group"
              >
                Inicio
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link 
                href="#o-que-faco" 
                className="text-sm lg:text-base text-gray-300 hover:text-primary transition-colors duration-300 relative group"
              >
                Serviços
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link 
                href="#projetos" 
                className="text-sm lg:text-base text-gray-300 hover:text-primary transition-colors duration-300 relative group"
              >
                Projetos
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link 
                href="#tecnologias" 
                className="text-sm lg:text-base text-gray-300 hover:text-primary transition-colors duration-300 relative group"
              >
                Tecnologias
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          </ul>
          <button 
            onClick={toggleMenu}
            className="md:hidden text-white hover:text-primary transition-colors duration-300"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <ul className="flex flex-col space-y-3 pt-4 border-t border-gray-800">
              <li>
                <Link 
                  href="#inicio" 
                  onClick={toggleMenu}
                  className="block text-gray-300 hover:text-primary transition-colors duration-300 py-2"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link 
                  href="#o-que-faco" 
                  onClick={toggleMenu}
                  className="block text-gray-300 hover:text-primary transition-colors duration-300 py-2"
                >
                  Serviços
                </Link>
              </li>
              <li>
                <Link 
                  href="#projetos" 
                  onClick={toggleMenu}
                  className="block text-gray-300 hover:text-primary transition-colors duration-300 py-2"
                >
                  Projetos
                </Link>
              </li>
              <li>
                <Link 
                  href="#tecnologias" 
                  onClick={toggleMenu}
                  className="block text-gray-300 hover:text-primary transition-colors duration-300 py-2"
                >
                  Tecnologias
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}