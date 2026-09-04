import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LuMenu, LuX, LuMessageCircle } from 'react-icons/lu'
import { content } from '../data/content'

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const whatsappUrl = `https://wa.me/${content.business.whatsapp}?text=${encodeURIComponent(
    "Hi Urmi's New Look Beauty Zone, I'd like to book an appointment."
  )}`

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#location-contact' },
  ]

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      const offset = 70
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-ivory/95 backdrop-blur-md shadow-sm border-b border-gold/15 py-3 text-espresso'
          : 'bg-transparent py-4 text-ivory'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Business Name */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="group flex flex-col focus:outline-none"
        >
          <span
            className={`font-serif text-sm sm:text-base lg:text-lg font-bold tracking-wider uppercase leading-tight transition-colors ${
              isScrolled ? 'text-espresso' : 'text-ivory'
            }`}
          >
            Urmi's New Look
          </span>
          <span className="text-[10px] sm:text-xs font-sans tracking-[0.25em] uppercase text-gold font-medium">
            Beauty Zone
          </span>
        </a>

        {/* Right: Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`font-sans text-xs lg:text-sm uppercase tracking-widest font-medium transition-colors hover:text-gold focus:outline-none ${
                isScrolled ? 'text-ink/80 hover:text-gold' : 'text-ivory/90 hover:text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold hover:bg-gold/90 active:scale-95 text-ivory rounded-full px-5 py-2 text-xs lg:text-sm font-semibold tracking-wider uppercase transition-all shadow-sm flex items-center gap-2 min-h-[44px]"
          >
            <LuMessageCircle className="w-4 h-4" />
            <span>Book Now</span>
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className={`md:hidden min-w-[44px] min-h-[44px] p-2.5 rounded-full flex items-center justify-center transition-colors focus:outline-none active:scale-95 ${
            isScrolled
              ? 'text-espresso hover:bg-gold/10 active:bg-gold/20'
              : 'text-ivory hover:bg-white/10 active:bg-white/20'
          }`}
        >
          {isMobileMenuOpen ? <LuX className="w-6 h-6" /> : <LuMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Fullscreen Overlay — portaled to body to escape header stacking context */}
      {createPortal(
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="fixed inset-0 z-[9999] bg-espresso flex flex-col justify-between px-6 py-8 text-ivory md:hidden"
            >
            {/* Top Row: Brand & Close */}
            <div className="flex items-center justify-between border-b border-gold/20 pb-4">
              <div className="flex flex-col">
                <span className="font-serif text-base font-bold tracking-wider uppercase text-ivory">
                  Urmi's New Look
                </span>
                <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-gold font-medium">
                  Beauty Zone
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
                className="min-w-[44px] min-h-[44px] p-2.5 text-ivory hover:text-gold rounded-full flex items-center justify-center focus:outline-none active:bg-white/10"
              >
                <LuX className="w-7 h-7" />
              </button>
            </div>

            {/* Middle Nav Links */}
            <div className="flex flex-col gap-2 my-auto py-6">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * (index + 1) }}
                  className="font-serif text-2xl py-3 text-ivory/90 hover:text-gold active:text-gold border-b border-gold/10 flex items-center justify-between min-h-[44px] transition-colors"
                >
                  <span>{link.name}</span>
                  <span className="text-gold text-sm font-sans">→</span>
                </motion.a>
              ))}
            </div>

            {/* Bottom CTA Button */}
            <div className="pt-4 border-t border-gold/20">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full min-h-[48px] py-3.5 rounded-full bg-gold hover:bg-gold/90 text-ivory text-center font-bold font-sans uppercase tracking-wider text-sm shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
              >
                <LuMessageCircle className="w-5 h-5" />
                <span>Book on WhatsApp</span>
              </a>
              <p className="text-center text-xs text-ivory/60 mt-3 font-sans">
                {content.business.phone} • {content.business.hours}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </header>
  )
}