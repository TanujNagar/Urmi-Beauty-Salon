import { content } from './data/content'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Services } from './components/Services'
import { Gallery } from './components/Gallery'
import { SignatureVideo } from './components/SignatureVideo'
import { Testimonials } from './components/Testimonials'
import { InstagramStrip } from './components/InstagramStrip'
import { LocationContact } from './components/LocationContact'
import { Footer } from './components/Footer'
import { FloatingWhatsApp } from './components/FloatingWhatsApp'

export const App = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <Header />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <SignatureVideo />
      <Testimonials />
      <InstagramStrip />
      <LocationContact />
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}