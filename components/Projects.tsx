/**
 * Componente de Projetos
 * 
 * Exibe uma grid de cards com os projetos desenvolvidos.
 * Cada projeto pode ter um vídeo demonstrativo e link para demo.
 * 
 * Funcionalidades:
 * - Grid responsivo de projetos
 * - Vídeos integrados com autoplay
 * - Links clicáveis para demos (exceto no vídeo)
 * - Design consistente e moderno
 */
'use client'

// Dados dos projetos desenvolvidos
const projects = [
  {
    id: 1,
    title: 'Sistema para Restaurante',
    description: 'Sistema completo para gestão de restaurante com controle de pedidos, cardápio e gestão financeira.',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    githubUrl: 'https://github.com/inapolisouza',
    demoUrl: 'https://cristorta.vercel.app/',
    hasVideo: true,
    videoSrc: '/videoport.mp4',
  },
  {
    id: 2,
    title: 'Chatbot IA WhatsApp',
    description: 'IA para atendimento whatsapp com captação de clientes — configurável e rápido.',
    technologies: ['Node.js', 'React', 'PostgreSQL'],
    githubUrl: 'https://github.com/inapolisouza',
    demoUrl: '#',
    hasVideo: true,
    videoSrc: '/chat ia.mp4',
  },
  {
    id: 3,
    title: 'NPFlix',
    description: 'Plataforma de streaming inspirada na Netflix, desenvolvida com tecnologias modernas.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    githubUrl: 'https://github.com/inapolisouza/npflix',
    demoUrl: 'https://inapolisouza.github.io/napoliflix/',
    hasVideo: true,
    videoSrc: '/videoport3.mp4',
  }
]

export default function Projects() {
  /**
   * Handler para redirecionar ao clicar no card do projeto
   * Abre o link de demo em nova aba (se existir)
   */
  const handleCardClick = (demoUrl: string) => {
    if (demoUrl && demoUrl !== '#') {
      window.open(demoUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <section id="projetos" className="py-16 md:py-24 bg-dark-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16 text-center">
          Alguns projetos
        </h2>
        
        {/* Grid responsivo de projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => {

            return (
            <div
              key={project.id}
              className="bg-dark border border-gray-800 rounded-lg p-6 hover:border-primary/50 transition-colors"
            >
                {/* Título e Vídeo em blocos lado a lado (apenas se tiver vídeo) */}
                {project.hasVideo ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <h3 
                      className="text-xl md:text-2xl font-bold text-white cursor-pointer"
                      onClick={() => handleCardClick(project.demoUrl || '#')}
                    >
                      {project.title}
                    </h3>
                    {/* Container do vídeo - não é clicável */}
                    <div className="w-full max-w-xs mx-auto md:mx-0 rounded-lg overflow-hidden">
                      <video
                        src={project.videoSrc || '/videoport.mp4'}
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
                ) : (
                  <h3 
                    className="text-xl md:text-2xl font-bold text-white mb-3 cursor-pointer"
                    onClick={() => handleCardClick(project.demoUrl || '#')}
                  >
                {project.title}
              </h3>
                )}
                
                {/* Descrição do projeto - clicável */}
                <p 
                  className="text-gray-400 mb-4 leading-relaxed cursor-pointer"
                  onClick={() => handleCardClick(project.demoUrl || '#')}
                >
                  {project.description}
                </p>
                
                {/* Tecnologias utilizadas - clicável */}
                <p 
                  className="text-sm text-gray-300 cursor-pointer"
                  onClick={() => handleCardClick(project.demoUrl || '#')}
                >
                  {project.technologies.join(' | ')}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

