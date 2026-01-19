'use client'

import Image from 'next/image'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function ForWho() {
  const { ref, isRevealed } = useScrollReveal()

  const painPoints = [
    {
      id: 1,
      title: 'Precisa de um site que gere clientes',
      description: 'Não apenas um site bonito, mas uma ferramenta que realmente converta visitantes em clientes.'
    },
    {
      id: 2,
      title: 'Quer automatizar atendimento ou processos',
      description: 'Reduza custos e ganhe eficiência com automações inteligentes que trabalham 24/7.'
    },
    {
      id: 3,
      title: 'Está perdendo leads com site fraco',
      description: 'Seu site atual não está convertendo? Transforme-o em uma máquina de gerar oportunidades.'
    },
    {
      id: 4,
      title: 'Busca presença profissional online',
      description: 'Tenha uma presença digital forte que gere credibilidade e confiança nos seus clientes.'
    }
  ]

  return (
    <section 
      id="para-quem" 
      ref={ref}
      className={`py-16 md:py-20 lg:py-24 bg-dark scroll-reveal ${isRevealed ? 'revealed' : ''}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          {/* Conteúdo Textual */}
          <div className="animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
              Esse serviço é para você que:
            </h2>
            
            <div className="space-y-4 md:space-y-6">
              {painPoints.map((point, index) => (
                <div
                  key={point.id}
                  className="flex items-start gap-4 p-4 rounded-lg bg-dark-light border border-gray-800 hover:border-primary/50 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                      {point.title}
                    </h3>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Imagem */}
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/inapoli-souza-about.jpg"
                alt="Inapoli Souza"
                fill
                className="object-cover w-full h-full"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
