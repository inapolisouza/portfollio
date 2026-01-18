/**
 * Componente reutilizável para links de contato
 * Exibe um ícone e um link clicável com hover effect
 */
import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

interface ContactLinkProps {
  icon: LucideIcon
  href: string
  label: string
  isExternal?: boolean
}

export default function ContactLink({ icon: Icon, href, label, isExternal = false }: ContactLinkProps) {
  const linkContent = (
    <>
      <Icon className="w-5 h-5 text-primary flex-shrink-0" />
      <span className="hover:text-primary transition-colors">{label}</span>
    </>
  )

  if (isExternal) {
    return (
      <div className="flex items-center gap-4 text-gray-300">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors flex items-center gap-4"
        >
          {linkContent}
        </a>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4 text-gray-300">
      <Link href={href} className="hover:text-primary transition-colors flex items-center gap-4">
        {linkContent}
      </Link>
    </div>
  )
}




