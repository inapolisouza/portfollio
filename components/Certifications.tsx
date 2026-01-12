/**
 * Componente de Certificações
 * 
 * Exibe uma seção com os certificados obtidos pelo desenvolvedor.
 * 
 * Funcionalidades:
 * - Grid responsivo de certificados
 * - Imagens dos certificados com zoom ao hover
 * - Design consistente e moderno
 */
'use client'

import Image from 'next/image'

// Dados das certificações
const certifications = [
  {
    id: 1,
    title: 'Programador Web Completo - Do Zero ao Full Stack',
    description: 'Curso completo abrangendo HTML, CSS, JavaScript, jQuery, Bootstrap 5, Git, Github, React JS, TypeScript, PHP, PHP Orientado a Objetos, Node JS e MySQL. Carga horária: 120 horas.',
    image: '/fullstack.jpeg',
    issuer: 'Genial Cursos',
  },
  {
    id: 2,
    title: 'Hacker Ético Profissional do Básico ao Avançado',
    description: 'Curso completo de segurança da informação e hacking ético, cobrindo desde conceitos básicos até técnicas avançadas. Carga horária: 6 horas.',
    image: '/hacker-etico.jpeg',
    issuer: 'Udemy',
  },
]

export default function Certifications() {
  return (
    <section id="certificacoes" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16 text-center">
          Certificações
        </h2>
        
        {/* Grid responsivo de certificações */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          {certifications.map((certification) => (
            <div
              key={certification.id}
              className="bg-dark-light border border-gray-800 rounded-lg p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              {/* Imagem do certificado */}
              <div className="relative w-full h-[300px] md:h-[400px] mb-4 rounded-lg overflow-hidden bg-gray-900">
                <Image
                  src={certification.image}
                  alt={certification.title}
                  fill
                  className="object-contain p-2 hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              
              {/* Informações do certificado */}
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  {certification.title}
                </h3>
                <p className="text-sm text-primary font-semibold">
                  {certification.issuer}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {certification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

