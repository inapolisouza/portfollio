'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section id="inicio" className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-dark via-dark-light to-dark pt-[52px] pb-[52px] sm:pt-[68px] sm:pb-[68px] md:pt-[84px] md:pb-[84px] lg:py-24">
      <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          {/* Conteúdo Textual - Sempre à esquerda */}
          <div className="text-center lg:text-left animate-fade-in-up flex flex-col justify-center">
            {/* Headline Principal */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-5 md:mb-6 lg:mb-8 leading-tight">
              Transformo sites, sistemas e automações em <span className="text-primary">máquinas de gerar clientes</span> para o seu negócio.
            </h1>
            
            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 md:mb-10 lg:mb-12 leading-relaxed">
              Desenvolvimento de sites, landing pages, sistemas e chatbots focados em <span className="text-white font-semibold">conversão e resultado real</span>.
            </p>
            
            {/* Botão Principal CTA */}
            <div className="flex flex-col items-center lg:items-start gap-3 sm:gap-4">
              <Link
                href="https://wa.me/5521971549767?text=Olá!%20Quero%20um%20orçamento%20agora."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 sm:px-8 sm:py-4 md:px-10 md:py-5 lg:px-12 lg:py-5 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-base sm:text-lg md:text-xl lg:text-xl text-center flex items-center gap-3 w-full sm:w-auto justify-center"
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Quero um orçamento agora no WhatsApp
              </Link>
            </div>
          </div>

          {/* Imagem de Perfil - Sempre à direita */}
          <div className="relative w-full flex items-center justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative w-full max-w-[244px] sm:max-w-[294px] md:max-w-[344px] lg:max-w-[424px] aspect-[4/5] md:aspect-square overflow-hidden shadow-2xl rounded-lg">
              <Image
                src="/inapoli-souza-about.jpg"
                alt="Inapoli Souza"
                fill
                className="object-cover w-full h-full"
                priority
                sizes="(max-width: 640px) 244px, (max-width: 768px) 294px, (max-width: 1024px) 344px, 424px"
              />
            </div>
            {/* Efeito de brilho decorativo */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
