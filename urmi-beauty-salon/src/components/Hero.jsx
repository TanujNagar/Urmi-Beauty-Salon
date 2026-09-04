import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { LuMessageCircle, LuArrowDown, LuSparkles } from 'react-icons/lu'
import { content } from '../data/content'

export const Hero = () => {
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Lightweight 35% parallax speed
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  const whatsappUrl = `https://wa.me/${content.business.whatsapp}?text=${encodeURIComponent(
    "Hi Urmi's New Look Beauty Zone, I'd like to book an appointment."
  )}`

  const handleScrollToSection = (e, sectionId) => {
    e.preventDefault()
    const element = document.querySelector(sectionId)
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-espresso text-ivory pt-20 pb-12 px-4 sm:px-6 lg:px-8"
    >
      {/* Background Image Layer with Parallax & Dark Overlay */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0 bg-gradient-to-b from-espresso via-[#2a1c17] to-espresso will-change-transform transform-gpu"
      >
        {/* Placeholder decorative gradient/pattern for photo background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/15 via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      </motion.div>

      {/* Foreground Content */}
      <motion.div
        style={{ opacity: contentOpacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center my-auto"
      >
        {/* Eyebrow badge */}
        <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs sm:text-sm font-sans font-medium tracking-widest uppercase">
            <LuSparkles className="w-3.5 h-3.5 text-gold" />
            <span>Luxury Beauty & Makeup</span>
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="font-serif text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.12] text-ivory max-w-3xl drop-shadow-sm"
        >
          {content.business.name}
        </motion.h1>

        {/* National Award Badge */}
        <motion.div variants={itemVariants} className="mt-3.5">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/90 text-ivory text-xs sm:text-sm font-sans font-semibold tracking-wider uppercase shadow-md border border-gold/40">
            <span>🏆 National Award-Winning Makeup Artist</span>
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="font-sans text-base sm:text-xl lg:text-2xl font-light tracking-wide text-cream/90 mt-4 sm:mt-6 max-w-2xl leading-relaxed"
        >
          {content.business.tagline}
        </motion.p>

        {/* Hero Quote */}
        <motion.p
          variants={itemVariants}
          className="font-serif italic text-2xl sm:text-lg lg:text-xl text-cream/80 mt-2 sm:mt-4 leading-relaxed"
        >
          {content.business.heroQuote}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto mt-8 sm:mt-10"
        >
          {/* Primary CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold hover:bg-gold/90 active:scale-95 text-ivory rounded-full px-7 py-3.5 text-sm sm:text-base font-semibold tracking-wider uppercase transition-all shadow-lg hover:shadow-gold/25 flex items-center justify-center gap-2.5 min-h-[48px] touch-manipulation"
          >
            <LuMessageCircle className="w-5 h-5" />
            <span>Book on WhatsApp</span>
          </a>

          {/* Secondary CTA */}
          <a
            href="#gallery"
            onClick={(e) => handleScrollToSection(e, '#gallery')}
            className="border-2 border-gold/80 hover:border-gold hover:bg-gold/10 active:bg-gold/20 active:scale-95 text-ivory rounded-full px-7 py-3.5 text-sm sm:text-base font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2.5 min-h-[48px] touch-manipulation"
          >
            <span>View Our Work</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Down-Arrow Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="relative z-10 mt-auto pt-6 hidden xs:flex flex-col items-center"
      >
        <a
          href="#about"
          onClick={(e) => handleScrollToSection(e, '#about')}
          aria-label="Scroll down to About section"
          className="group flex flex-col items-center gap-1.5 text-ivory/60 hover:text-gold transition-colors p-2 focus:outline-none"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-medium">Scroll</span>
          <div className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/10 transition-colors">
            <LuArrowDown className="w-4 h-4 text-gold animate-bounce" />
          </div>
        </a>
      </motion.div>
    </section>
  )
}