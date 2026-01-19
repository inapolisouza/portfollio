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
 * - Analytics da Vercel
 */
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17885807093"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17885807093');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}



