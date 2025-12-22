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

// Componente para o logo do TypeScript (SVG)
const TypeScriptIcon = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-12 h-12 md:w-16 md:h-16"
  >
    <rect width="64" height="64" rx="8" fill="#3178C6" />
    <path
      d="M15.5 32.5L15.5 31.5L32.5 31.5L32.5 33.5L18.5 33.5L18.5 36.5L31.5 36.5L31.5 38.5L18.5 38.5L18.5 42.5L32.5 42.5L32.5 44.5L15.5 44.5L15.5 32.5Z"
      fill="white"
    />
    <path
      d="M40.5 44.5L40.5 42.5L48.5 42.5C50.1569 42.5 51.5 41.1569 51.5 39.5C51.5 37.8431 50.1569 36.5 48.5 36.5C46.8431 36.5 45.5 37.8431 45.5 39.5L43.5 39.5C43.5 36.7386 45.7386 34.5 48.5 34.5C51.2614 34.5 53.5 36.7386 53.5 39.5C53.5 42.2614 51.2614 44.5 48.5 44.5L40.5 44.5Z"
      fill="white"
    />
  </svg>
)

// Lista de tecnologias com ícones e cores
const technologies = [
  { name: 'React', icon: '⚛️', color: 'text-blue-400', customIcon: null },
  { name: 'Node.js', icon: '🟢', color: 'text-green-400', customIcon: null },
  { name: 'Next.js', icon: '▲', color: 'text-white', customIcon: null },
  { name: 'TypeScript', icon: '📘', color: 'text-blue-500', customIcon: <TypeScriptIcon /> },
  { name: 'PostgreSQL', icon: '🐘', color: 'text-blue-300', customIcon: null },
  { name: 'MongoDB', icon: '🍃', color: 'text-green-300', customIcon: null },
  { name: 'Docker', icon: '🐳', color: 'text-blue-300', customIcon: null },
]

export default function Technologies() {
  return (
    <section id="tecnologias" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16 text-center">
          Tecnologias
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6 md:gap-8">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="flex flex-col items-center justify-center p-6 bg-dark-light rounded-lg hover:bg-dark-light/80 transition-colors border border-gray-800"
            >
              {tech.customIcon ? (
                <div className="mb-4 flex items-center justify-center">{tech.customIcon}</div>
              ) : (
                <div className={`text-5xl md:text-6xl mb-4 ${tech.color}`}>{tech.icon}</div>
              )}
              <p className="text-sm md:text-base text-gray-300 font-medium">{tech.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

