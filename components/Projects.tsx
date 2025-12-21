'use client'

const projects = [
  {
    id: 1,
    title: 'Sistema para Restaurante',
    description: 'Aplicação web para controle financeiro pessoal.',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    githubUrl: 'https://github.com/inapolisouza',
    demoUrl: '#',
  },
]

export default function Projects() {
  return (
    <section id="projetos" className="py-16 md:py-24 bg-dark-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16 text-center">
          Meus Projetos
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-dark border border-gray-800 rounded-lg p-6 hover:border-primary/50 transition-colors"
            >
              {/* Título e Vídeo em blocos lado a lado */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  {project.title}
                </h3>
                <div className="w-full max-w-xs mx-auto md:mx-0 rounded-lg overflow-hidden">
                  <video
                    src="/videoport.mp4"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-auto max-h-48 rounded-lg"
                    preload="auto"
                  >
                    Seu navegador não suporta o elemento de vídeo.
                  </video>
                </div>
              </div>
              <p className="text-gray-400 mb-4 leading-relaxed">
                {project.description}
              </p>
              <p className="text-sm text-gray-300">
                {project.technologies.join(' | ')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

