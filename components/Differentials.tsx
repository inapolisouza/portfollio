'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function Differentials() {
  const { ref, isRevealed } = useScrollReveal()

  const differentials = [
    {
      id: 1,
      title: 'Foco em resultado',
      description: 'Não entregamos apenas código, mas soluções que realmente geram resultados para seu negócio.'
    },
    {
      id: 2,
      title: 'Código limpo, rápido e eficiente',
      description: 'Desenvolvimento seguindo as melhores práticas do mercado para garantir performance e escalabilidade.'
    },
    {
      id: 3,
      title: 'Comunicação clara e objetiva',
      description: 'Transparência total durante todo o processo, com atualizações regulares e suporte dedicado.'
    },
    {
      id: 4,
      title: 'Soluções personalizadas',
      description: 'Cada projeto é único e desenvolvido especialmente para atender às necessidades do seu negócio.'
    }
  ]

  return (
    <section 
      id="diferenciais" 
      ref={ref}
      className={`py-16 md:py-20 lg:py-24 bg-dark-light scroll-reveal ${isRevealed ? 'revealed' : ''}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 text-center text-white">
          Por que escolher meu trabalho?
        </h2>
        
        {/* Grid de diferenciais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {differentials.map((differential, index) => (
            <div
              key={differential.id}
              className="bg-dark border border-gray-800 rounded-lg p-6 md:p-8 hover:border-primary/50 transition-all duration-300 hover-lift shadow-card hover:shadow-card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center mt-1">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                    {differential.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {differential.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
