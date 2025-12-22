/**
 * Componente reutilizável para cards de projetos
 * Exibe título, descrição, tecnologias e opcionalmente um vídeo
 */
'use client'

interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  demoUrl?: string
  hasVideo?: boolean
  videoSrc?: string
}

export default function ProjectCard({
  title,
  description,
  technologies,
  demoUrl,
  hasVideo = false,
  videoSrc,
}: ProjectCardProps) {
  /**
   * Handler para redirecionar ao clicar no card (exceto no vídeo)
   */
  const handleCardClick = () => {
    if (demoUrl && demoUrl !== '#') {
      window.open(demoUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="bg-dark border border-gray-800 rounded-lg p-6 hover:border-primary/50 transition-colors">
      {/* Título e Vídeo em blocos lado a lado (apenas se tiver vídeo) */}
      {hasVideo ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
          <h3
            className="text-xl md:text-2xl font-bold text-white cursor-pointer"
            onClick={handleCardClick}
          >
            {title}
          </h3>
          <div className="w-full max-w-xs mx-auto md:mx-0 rounded-lg overflow-hidden">
            <video
              src={videoSrc || '/videoport.mp4'}
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
          onClick={handleCardClick}
        >
          {title}
        </h3>
      )}
      <p
        className="text-gray-400 mb-4 leading-relaxed cursor-pointer"
        onClick={handleCardClick}
      >
        {description}
      </p>
      <p
        className="text-sm text-gray-300 cursor-pointer"
        onClick={handleCardClick}
      >
        {technologies.join(' | ')}
      </p>
    </div>
  )
}


