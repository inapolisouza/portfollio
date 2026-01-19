import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ForWho from '@/components/ForWho'
import Solutions from '@/components/Solutions'
import Projects from '@/components/Projects'
import Differentials from '@/components/Differentials'
import Technologies from '@/components/Technologies'
import Testimonials from '@/components/Testimonials'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ForWho />
      <Solutions />
      <Projects />
      <Differentials />
      <Technologies />
      <Testimonials />
      <FinalCTA />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}



