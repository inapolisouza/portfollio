import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Technologies from '@/components/Technologies'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Technologies />
      <Projects />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}



