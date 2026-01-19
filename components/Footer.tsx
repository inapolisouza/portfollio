/**
 * Componente Footer
 * 
 * Rodapé do site com informações de copyright e links sociais.
 * 
 * Funcionalidades:
 * - Copyright
 * - Links para redes sociais (LinkedIn, GitHub)
 * - Design responsivo
 */
import Link from 'next/link'
import { Linkedin, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="py-8 border-t border-gray-800 bg-dark-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} - Inapoli Souza. Todos os direitos reservados.
          </p>
          
          <div className="flex items-center gap-6">
            <Link
              href="https://www.linkedin.com/in/inapoli-souza-9513b7268"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-all duration-300 transform hover:scale-110"
            >
              <Linkedin size={20} />
            </Link>
            <Link
              href="https://github.com/inapolisouza"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-all duration-300 transform hover:scale-110"
            >
              <Github size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}




