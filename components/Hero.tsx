'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section id="inicio" className="pt-24 md:pt-32 pb-16 md:pb-24 min-h-screen flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Lado esquerdo - Conteúdo de texto */}
          <div className="text-center lg:text-left space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Olá, eu sou{' '}
              <span className="block text-primary">Inapoli Souza</span>
            </h1>
            <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-300">
              Desenvolvedor Fullstack
            </p>
            <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0">
              Construo aplicações web modernas e escaláveis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link
                href="#projetos"
                className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors text-center"
              >
                Ver Projetos
              </Link>
              <Link
                href="#contato"
                className="px-6 py-3 border-2 border-primary text-primary hover:bg-primary/10 font-semibold rounded-lg transition-colors text-center"
              >
                Entrar em Contato
              </Link>
            </div>
          </div>

          {/* Lado direito - Imagem */}
          <div className="relative w-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px] order-first lg:order-last flex items-center justify-center">
            <div className="relative w-full rounded-lg flex items-center justify-center">
              <Image
                src="/inapoli-souza.jpg"
                alt="Inapoli Souza - Desenvolvedor Fullstack"
                width={600}
                height={800}
                className="object-contain rounded-lg w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

