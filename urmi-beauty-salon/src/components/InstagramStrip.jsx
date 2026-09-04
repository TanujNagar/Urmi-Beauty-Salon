import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { LuInstagram, LuHeart } from 'react-icons/lu'
import { content } from '../data/content'

const instagramHandle = content.business.instagram.replace('https://www.instagram.com/', '@')

export const InstagramStrip = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })

  return (
    <section id="instagram" className="bg-ivory text-ink py-12 sm:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-gold font-sans text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold mb-2 block">
            Follow Along
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-espresso tracking-tight">
            {instagramHandle}
          </h2>
          <div className="w-12 h-0.5 bg-gold/60 mx-auto my-4 sm:my-5" />
          <p className="font-sans text-ink/75 text-sm sm:text-base leading-relaxed">
            See our latest bridal transformations on Instagram.
          </p>
        </div>

        {/* Gallery Image Row */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 sm:gap-4 mb-8 sm:mb-12"
        >
          {content.gallery.map((img) => (
            <a
              key={img.id}
              href={content.business.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${img.alt} on Instagram`}
              className="group aspect-square rounded-xl overflow-hidden relative border border-gold/25 bg-gradient-to-br from-espresso via-[#32231c] to-gold/30 active:scale-95 sm:active:scale-100 sm:hover:scale-104 touch-manipulation transition-transform duration-300 shadow-sm"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-104 group-active:scale-104"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 group-active:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <LuInstagram className="w-6 h-6 text-ivory opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300" />
              </div>
              {/* Heart badge */}
              <div className="absolute bottom-1.5 right-1.5 z-10 flex items-center gap-1 text-[10px] font-sans text-ivory opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity">
                <LuHeart className="w-3 h-3 fill-gold text-gold" />
              </div>
            </a>
          ))}
        </motion.div>

        {/* Gold Pill CTA Button */}
        <div className="text-center">
          <a
            href={content.business.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold hover:bg-gold/90 active:scale-95 text-ivory rounded-full px-8 py-3.5 text-xs sm:text-sm tracking-wider uppercase font-semibold inline-flex items-center gap-2.5 min-h-[48px] touch-manipulation shadow-sm transition-all"
          >
            <LuInstagram className="w-4 h-4" />
            <span>Follow on Instagram</span>
          </a>
        </div>
      </div>
    </section>
  )
}
