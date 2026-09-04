import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { LuSparkles, LuAward, LuHeartHandshake } from 'react-icons/lu'
import { content } from '../data/content'

const AnimatedStat = ({ label, value, suffix, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const [count, setCount] = useState(0)
  const isDecimal = value % 1 !== 0

  useEffect(() => {
    if (isInView) {
      const duration = 1500
      const startTime = performance.now()

      const updateCount = (currentTime) => {
        const elapsedTime = currentTime - startTime
        const progress = Math.min(elapsedTime / duration, 1)
        // Smooth easeOutQuad function
        const easeProgress = 1 - (1 - progress) * (1 - progress)
        const currentCount = easeProgress * value

        setCount(currentCount)

        if (progress < 1) {
          requestAnimationFrame(updateCount)
        } else {
          setCount(value)
        }
      }

      requestAnimationFrame(updateCount)
    }
  }, [isInView, value])

  const formattedCount = isDecimal ? count.toFixed(1) : Math.floor(count)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.15 * index }}
      className="flex flex-col bg-cream/50 p-4 rounded-xl border border-gold/15 sm:bg-transparent sm:p-0 sm:border-0"
    >
      <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gold tracking-tight">
        <span>{formattedCount}</span>
        <span className="text-gold/90 ml-0.5">{suffix}</span>
      </div>
      <span className="font-sans text-xs sm:text-sm text-ink/75 font-medium uppercase tracking-wider mt-1 sm:mt-2">
        {label}
      </span>
    </motion.div>
  )
}

export const About = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="about" className="bg-ivory text-ink py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-center"
        >
          {/* Left: Portrait Placeholder with Decorative Gold Border */}
          <div className="md:col-span-5 relative max-w-sm sm:max-w-md mx-auto w-full">
            <div className="relative aspect-[3/4] w-full">
              {/* Decorative offset gold box */}
              <div className="absolute -bottom-3 -right-3 sm:-bottom-5 sm:-right-5 w-full h-full border-2 border-gold/70 rounded-2xl -z-10" />

              {/* Main Image Container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-gold bg-gradient-to-tr from-espresso via-[#2c1d18] to-gold/30 shadow-xl flex flex-col items-center justify-between p-6 sm:p-8 text-center text-ivory">
                {/* Top badge */}
                <div className="w-full flex justify-between items-center text-gold/80 text-xs font-sans uppercase tracking-widest border-b border-gold/20 pb-3">
                  <span>Bundi's Finest</span>
                  <LuSparkles className="w-4 h-4 text-gold" />
                </div>

                {/* Center Monogram / Placeholder */}
                <div className="my-auto flex flex-col items-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-gold/60 flex items-center justify-center bg-gold/10 mb-4 shadow-inner">
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-gold">US</span>
                  </div>
                  <p className="font-serif text-xl sm:text-2xl font-bold text-ivory">
                    {content.business.ownerName}
                  </p>
                  <p className="font-sans text-xs sm:text-sm text-gold font-medium mt-1">
                    {content.business.ownerTitle}
                  </p>
                </div>

                {/* Bottom caption */}
                <div className="w-full text-center border-t border-gold/20 pt-3">
                  <span className="text-[11px] font-sans tracking-widest text-cream/70 uppercase">
                    [ Artist Portrait Placeholder ]
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Artist Story & Stats */}
          <div className="md:col-span-7 flex flex-col text-left">
            {/* Eyebrow Label */}
            <span className="text-gold font-sans text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold mb-2 block">
              Meet the Artist
            </span>

            {/* Owner Name */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-espresso tracking-tight mb-2">
              {content.business.ownerName}
            </h2>

            {/* Owner Title */}
            <p className="text-gold font-sans font-medium text-base sm:text-lg mb-6">
              {content.business.ownerTitle}
            </p>

            {/* Story Paragraph */}
            <p className="font-sans text-ink/80 text-base sm:text-lg leading-relaxed mb-8">
              {content.business.story}
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-gold/25">
              {content.business.stats.map((stat, index) => (
                <AnimatedStat
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  index={index}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}