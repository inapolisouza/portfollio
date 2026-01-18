'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  // Imagens do slide
  const slides = [
    '/sitecard.jpeg',
  ]

  // Efeito para trocar slides automaticamente a cada 2 segundos
  useEffect(() => {
    if (slides.length <= 1) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <section id="inicio" className="relative w-full h-screen min-h-[500px] sm:min-h-[600px] md:min-h-screen mt-[-12px]">
      {/* Área do slide comercial com botões sobrepostos - Ocupa toda a tela */}
      <div className="relative w-full h-full min-h-[500px] sm:min-h-[600px] md:min-h-screen">
        {/* Card comercial - Slide */}
        <div className="relative w-full h-full min-h-[500px] sm:min-h-[600px] md:min-h-screen">
          <Image
            src={slides[currentSlide]}
            alt="Card comercial"
            fill
            className="object-contain sm:object-contain md:object-contain lg:object-cover"
            priority
            sizes="100vw"
          />
        </div>

        {/* Botões sobrepostos na imagem */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 sm:gap-4 z-10 mt-[20px] mb-[10px] px-4">
          <Link
            href="#projetos"
            className="px-4 py-2 sm:px-5 sm:py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors text-center text-sm sm:text-base w-full max-w-[180px] sm:max-w-[220px]"
          >
            Ver Projetos
          </Link>
          <Link
            href="https://wa.me/5521971549767"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 sm:px-5 sm:py-2.5 border-2 border-primary text-primary hover:bg-primary/10 font-semibold rounded-lg transition-colors text-center bg-white/90 backdrop-blur-sm text-sm sm:text-base w-full max-w-[180px] sm:max-w-[220px]"
          >
            Entrar em Contato
          </Link>
        </div>
      </div>
    </section>
  )
}
