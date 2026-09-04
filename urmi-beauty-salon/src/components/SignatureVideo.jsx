import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { content } from '../data/content'

export const SignatureVideo = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      id="signature-video"
      ref={sectionRef}
      className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh] min-h-[400px] sm:min-h-[500px] w-full overflow-hidden bg-espresso text-ivory flex items-end"
    >
      {/* Background Video Layer */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          src={content.videos.signatureProcess.src}
          muted
          playsInline
          loop
          autoPlay
          className="w-full h-full object-cover"
          preload="metadata"
        />
        {/* Dark Gradient Overlay for perfect text contrast at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
      </div>

      {/* Caption in the lower third */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl text-left"
        >
          <span className="text-gold font-sans text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold mb-2 block">
            Signature Process
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ivory mb-3 leading-tight">
            Every Look, Perfected
          </h2>
          <p className="font-sans text-cream/80 text-sm sm:text-base max-w-sm">
            Experience our meticulously detailed, award-winning bridal makeup and styling routine designed to endure beautifully.
          </p>
        </motion.div>
      </div>
    </section>
  )
}