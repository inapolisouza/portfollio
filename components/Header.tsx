'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const navItems = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#tecnologias', label: 'Tecnologias' },
  { href: '#contato', label: 'Contato' },
]

export default function Header() {
  const [activeSection, setActiveSection] = useState('inicio')

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-sm border-b border-gray-800">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="#inicio" className="text-xl md:text-2xl font-bold text-white">
            Inapoli Souza
          </Link>
          
          <ul className="hidden md:flex items-center space-x-6 lg:space-x-8">
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

          {/* Botão do menu mobile */}
          <button className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
}



