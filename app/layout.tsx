/**
 * Layout Principal
 * 
 * Define a estrutura base da aplicação Next.js.
 * 
 * Funcionalidades:
 * - Metadata para SEO
 * - Fonte Google (Inter)
 * - Estilos globais
 * - Idioma português brasileiro
 */
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// Configuração da fonte Inter do Google Fonts
const inter = Inter({ subsets: ['latin'] })

// Metadata para SEO
export const metadata: Metadata = {
  title: 'Inapoli Souza - Desenvolvedor Fullstack',
  description: 'Portfólio de Inapoli Souza - Desenvolvedor Fullstack',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}



