/**
 * Componente Technologies
 * 
 * Exibe as tecnologias e ferramentas utilizadas.
 * 
 * Funcionalidades:
 * - Grid responsivo de tecnologias
 * - Ícones e cores personalizadas
 * - Hover effects
 */

// Lista de tecnologias com ícones e cores
const technologies = [
  { name: 'React', icon: '⚛️', color: 'text-blue-400' },
  { name: 'Node.js', icon: '🟢', color: 'text-green-400' },
  { name: 'Next.js', icon: '▲', color: 'text-white' },
  { name: 'PostgreSQL', icon: '🐘', color: 'text-blue-300' },
  { name: 'MongoDB', icon: '🍃', color: 'text-green-300' },
  { name: 'Docker', icon: '🐳', color: 'text-blue-300' },
]

export default function Technologies() {
  return (
    <section id="tecnologias" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16 text-center">
          Tecnologias
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="flex flex-col items-center justify-center p-6 bg-dark-light rounded-lg hover:bg-dark-light/80 transition-colors border border-gray-800"
            >
              <div className={`text-5xl md:text-6xl mb-4 ${tech.color}`}>{tech.icon}</div>
              <p className="text-sm md:text-base text-gray-300 font-medium">{tech.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

