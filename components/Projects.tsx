/**
 * Componente de Projetos na Prática
 * 
 * Exibe projetos com vídeos demonstrativos focados em resultados.
 * Cada projeto mostra o problema resolvido e benefícios entregues.
 * 
 * Funcionalidades:
 * - Vídeos integrados demonstrando soluções
 * - Foco em benefícios e resultados
 * - CTAs para WhatsApp em cada projeto
 */
'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import Link from 'next/link'

// Dados dos projetos desenvolvidos
const projects = [
  {
    id: 1,
    title: 'Sistema de gestão para empresa de serviços',
    description: 'Projeto desenvolvido para automatizar processos, melhorar o controle de clientes e otimizar o atendimento.',
    benefits: [
      'Sistema responsivo',
      'Foco em usabilidade',
      'Solução sob medida para o negócio'
    ],
    hasVideo: true,
    videoSrc: '/videoport.mp4',
  },
  {
    id: 2,
    title: 'Chatbot IA WhatsApp',
    description: 'Solução de atendimento automatizado para captação de clientes 24/7 com inteligência artificial.',
    benefits: [
      'Atendimento automático 24h',
      'Captação de leads inteligente',
      'Integração completa com WhatsApp'
    ],
    hasVideo: true,
    videoSrc: '/chat ia.mp4',
  }
]

export default function Projects() {
  const { ref, isRevealed } = useScrollReveal()

  return (
    <section 
      id="projetos" 
      ref={ref}
      className={`py-16 md:py-20 lg:py-24 bg-dark scroll-reveal ${isRevealed ? 'revealed' : ''}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
            Veja na prática alguns projetos
          </h2>
          <p className="text-xl md:text-2xl text-gray-300">
            Que Desenvolvi
          </p>
        </div>
        
        {/* Lista de projetos com vídeos */}
        <div className="space-y-12 md:space-y-16 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="bg-dark-light border border-gray-800 rounded-lg p-6 md:p-8 hover:border-primary/50 transition-all duration-300 shadow-card hover:shadow-card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Título */}
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">
                {project.title}
              </h3>
              
              {/* Descrição */}
              <p className="text-gray-300 mb-6 md:mb-8 leading-relaxed text-base md:text-lg">
                {project.description}
              </p>

              {/* Vídeo */}
              {project.hasVideo && (
                <div className="mb-6 md:mb-8 rounded-lg overflow-hidden bg-black">
                  <video
                    src={project.videoSrc || '/videoport.mp4'}
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-auto rounded-lg"
                    preload="auto"
                    style={{ maxHeight: '500px' }}
                  >
                    Seu navegador não suporta o elemento de vídeo.
                  </video>
                </div>
              )}

              {/* Lista de benefícios */}
              <div className="mb-6 md:mb-8">
                <ul className="space-y-3">
                  {project.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-300 text-base md:text-lg">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="text-center">
                <Link
                  href="https://wa.me/5521971549767?text=Quer%20um%20projeto%20parecido?%20Fale%20comigo%20no%20WhatsApp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm md:text-base"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Quer um projeto parecido? Fale comigo no WhatsApp
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

