/**
 * Componente de Certificações
 * 
 * Exibe uma seção com as certificações obtidas pelo desenvolvedor.
 * 
 * Funcionalidades:
 * - Grid responsivo de certificações
 * - Imagens dos certificados
 * - Design consistente e moderno
 */
'use client'

import Image from 'next/image'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const certifications = [
  {
    id: 1,
    title: 'Programador Web Completo - Do Zero ao Full Stack',
    issuer: 'Genial Cursos',
    image: '/fullstack.jpeg',
    description: 'Curso completo abrangendo HTML, CSS, JavaScript, jQuery, Bootstrap 5, Git, Github, React JS, TypeScript, PHP, PHP Orientado a Objetos, Node JS e MySQL. Carga horária: 120 horas.'
  },
  {
    id: 2,
    title: 'Hacker Ético Profissional do Básico ao Avançado',
    issuer: 'Udemy',
    image: '/hacker-etico.jpeg',
    description: 'Curso completo de segurança da informação e hacking ético, cobrindo desde conceitos básicos até técnicas avançadas. Carga horária: 6 horas.'
  }
]

export default function Certifications() {
  const { ref, isRevealed } = useScrollReveal()

  return (
    <section 
      id="certificacoes" 
      ref={ref}
      className={`py-16 md:py-20 lg:py-24 bg-dark-light scroll-reveal ${isRevealed ? 'revealed' : ''}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 lg:mb-16 text-center">
          Certificações
        </h2>
        
        {/* Grid responsivo de certificações */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              className="bg-dark border border-gray-800 rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300 hover-lift shadow-card hover:shadow-card-hover group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative w-full bg-white flex items-center justify-center py-4">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain max-h-[250px] md:max-h-[280px] lg:max-h-[320px]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6 bg-dark">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                  {cert.title}
                </h3>
                <p className="text-primary text-sm mb-4 font-semibold">
                  {cert.issuer}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {cert.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
