/**
 * Componente About (Sobre Mim)
 * 
 * Seção que apresenta informações sobre o desenvolvedor.
 * 
 * Funcionalidades:
 * - Descrição profissional
 * - Imagem de perfil
 * - Layout responsivo em duas colunas
 */
'use client'

import Image from 'next/image'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function About() {
  const { ref, isRevealed } = useScrollReveal()

  return (
    <section 
      id="sobre" 
      ref={ref}
      className={`py-16 md:py-20 lg:py-24 bg-dark-light scroll-reveal ${isRevealed ? 'revealed' : ''}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center">
          Sobre Mim
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 text-gray-300 text-lg leading-relaxed animate-fade-in-up">
            <p className="text-xl text-white font-semibold mb-4">
              Desenvolvedor Fullstack
            </p>
            <p>
              Sou desenvolvedor fullstack com experiência no desenvolvimento de aplicações web completas, 
              do frontend ao backend, focado em <span className="text-primary font-semibold">qualidade</span>, <span className="text-primary font-semibold">performance</span> e <span className="text-primary font-semibold">segurança</span>.
            </p>
            <p className="text-gray-400">
              Especializado em criar soluções modernas e escaláveis que impulsionam o crescimento dos negócios.
            </p>
          </div>
          
          <div className="relative w-full h-[300px] md:h-[400px] order-first lg:order-last flex items-center justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative w-full h-full rounded-lg overflow-hidden flex items-center justify-center border-2 border-gray-800 hover:border-primary/50 transition-all duration-300 shadow-card hover:shadow-card-hover">
              <Image
                src="/inapoli-souza-about.jpg"
                alt="Inapoli Souza"
                fill
                className="object-contain rounded-lg transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

