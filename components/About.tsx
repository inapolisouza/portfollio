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
import Image from 'next/image'

export default function About() {
  return (
    <section id="sobre" className="py-16 md:py-24 bg-dark-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center">
          Sobre Mim
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
            <p>
              Sou desenvolvedor fullstack com experiência no desenvolvimento de aplicações web completas, 
              do frontend ao backend, focado em qualidade e performance.
            </p>
          </div>
          
          <div className="relative w-full h-[300px] md:h-[400px] order-first lg:order-last flex items-center justify-center">
            <div className="relative w-full h-full rounded-lg overflow-hidden flex items-center justify-center">
              <Image
                src="/inapoli-souza-about.jpg"
                alt="Inapoli Souza"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

