'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import Image from 'next/image'

export default function Testimonials() {
  const { ref, isRevealed } = useScrollReveal()

  const testimonials = [
    {
      id: 1,
      name: 'Cliente Satisfeito',
      quote: 'Projeto incrível! Aumentamos nossas vendas em 40%.',
      image: '/depoimento1.jpeg'
    },
    {
      id: 2,
      name: 'Cliente Satisfeito',
      quote: 'Ótimo suporte! Superou minhas expectativas.',
      image: '/depoimento2.jpeg'
    },
    {
      id: 3,
      name: 'Cliente Satisfeito',
      quote: 'Nosso sistema superou as expectativas.',
      image: '/depoimento1.jpeg'
    }
  ]

  return (
    <section 
      id="depoimentos" 
      ref={ref}
      className={`py-16 md:py-20 lg:py-24 bg-dark scroll-reveal ${isRevealed ? 'revealed' : ''}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 text-center text-white">
          O que dizem sobre meu trabalho
        </h2>
        
        {/* Grid de depoimentos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-dark-light border border-gray-800 rounded-lg p-6 md:p-8 hover:border-primary/50 transition-all duration-300 hover-lift shadow-card hover:shadow-card-hover text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-center mb-4">
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-primary">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
              </div>
              <p className="text-gray-300 mb-4 italic leading-relaxed">
                "{testimonial.quote}"
              </p>
              <p className="text-white font-semibold">
                {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
