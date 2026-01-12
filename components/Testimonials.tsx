/**
 * Componente de Depoimentos
 * 
 * Exibe depoimentos de clientes em formato de slider profissional.
 * 
 * Funcionalidades:
 * - Slider com navegação por setas
 * - Transições suaves
 * - Autoplay opcional
 * - Design profissional e atraente
 */
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Dados dos depoimentos
const testimonials = [
  {
    id: 1,
    image: '/depoimento1.jpeg',
  },
  {
    id: 2,
    image: '/depoimento2.jpeg',
  },
]

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  /**
   * Vai para o próximo slide
   */
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length)
  }

  /**
   * Vai para o slide anterior
   */
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  /**
   * Autoplay do slider
   */
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    }, 6000) // Muda de slide a cada 6 segundos

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  return (
    <section id="depoimentos" className="py-16 md:py-24 bg-dark-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16 text-center">
          Depoimentos
        </h2>
        
        {/* Container do slider */}
        <div className="relative max-w-4xl mx-auto">
          {/* Slider principal */}
          <div className="relative overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="min-w-full flex-shrink-0"
                >
                  <div className="bg-dark border border-gray-800 rounded-lg p-4 md:p-6 hover:border-primary/50 transition-all duration-300">
                    {/* Imagem do depoimento */}
                    <div className="relative w-full h-auto rounded-lg overflow-hidden max-w-[calc(100%-145px)] mx-auto">
                      <Image
                        src={testimonial.image}
                        alt={`Depoimento ${testimonial.id}`}
                        width={600}
                        height={800}
                        className="w-full h-auto object-contain rounded-lg"
                        sizes="(max-width: 768px) calc(100vw - 145px), calc(100% - 145px)"
                        priority={currentSlide === testimonial.id - 1}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botão de navegação - Anterior */}
          <button
            onClick={prevSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-dark/90 hover:bg-dark border border-gray-700 hover:border-primary rounded-full p-2 md:p-3 transition-all duration-300 z-10 shadow-lg"
            aria-label="Depoimento anterior"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>

          {/* Botão de navegação - Próximo */}
          <button
            onClick={nextSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-dark/90 hover:bg-dark border border-gray-700 hover:border-primary rounded-full p-2 md:p-3 transition-all duration-300 z-10 shadow-lg"
            aria-label="Próximo depoimento"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>

        </div>
      </div>
    </section>
  )
}

