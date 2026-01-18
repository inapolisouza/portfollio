import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Technologies from '@/components/Technologies'
import Certifications from '@/components/Certifications'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Projects />
      <Certifications />
      <About />
      <Technologies />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}



