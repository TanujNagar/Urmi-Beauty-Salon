import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { LuX, LuChevronLeft, LuChevronRight } from 'react-icons/lu'
import { content } from '../data/content'

export const Gallery = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })

  const [lightboxIndex, setLightboxIndex] = useState(null)
  const images = content.gallery
  const isOpen = lightboxIndex !== null

  const openLightbox = useCallback((idx) => {
    setLightboxIndex(idx)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  const goToPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  // Escape to close, arrow keys to navigate
  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') goToPrev()
      if (e.key === 'ArrowRight') goToNext()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, closeLightbox, goToPrev, goToNext])

  // Lock body scroll while lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Touch/swipe support
  const touchStartX = useRef(null)
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToPrev()
      else goToNext()
    }
    touchStartX.current = null
  }

  const current = isOpen ? images[lightboxIndex] : null

  return (
    <section id="gallery" className="bg-ivory text-ink py-12 sm:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Animated Divider */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="text-gold font-sans text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold mb-2 block">
            Portfolio
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-espresso tracking-tight">
            Transformation Gallery
          </h2>
          <div className="w-12 h-0.5 bg-gold/60 mx-auto my-4 sm:my-5" />
          <p className="font-sans text-ink/75 text-sm sm:text-base leading-relaxed">
            A showcase of bridal transformations, party looks, and expert styling crafted by Dr. Urmila Solanki and her team.
          </p>
        </div>

        {/* Animated Divider growing on scroll */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-10 sm:mb-16"
        >
          <motion.div
            className="flex h-0.5 w-0 bg-gold overflow-hidden transition-width duration-750"
          />
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 break-inside-avoid"
        >
          {images.map((item, idx) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => openLightbox(idx)}
              className="group aspect-[4/3] rounded-2xl overflow-hidden border border-gold/25 bg-gradient-to-br from-espresso via-[#2c1d18] to-gold/20 shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-500 touch-manipulation cursor-pointer"
              aria-label={`View ${item.alt} in lightbox`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stills))] from-gold/20 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center text-ivory text-xs font-medium uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                <span>{item.alt}</span>
              </div>
            </motion.button>
          ))}
        </motion.div>

        <p className="mt-8 text-center text-ink/60 text-sm">
          Click any image to view in lightbox
        </p>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/70"
            onClick={closeLightbox}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2.5 transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              <LuX className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Previous arrow */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); goToPrev() }}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 sm:p-3 transition-colors cursor-pointer"
              aria-label="Previous image"
            >
              <LuChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Next arrow */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); goToNext() }}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 sm:p-3 transition-colors cursor-pointer"
              aria-label="Next image"
            >
              <LuChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Image container — stop backdrop click from propagating */}
            <motion.div
              key={current.src}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-[90vw] max-h-[85vh] sm:max-w-[80vw] md:max-w-[70vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={current.src}
                alt={current.alt}
                className="w-full h-full object-contain rounded-lg select-none"
                draggable={false}
              />
              {/* Caption */}
              <p className="text-center text-white/80 text-sm mt-3 font-sans">
                {current.alt} &middot; {lightboxIndex + 1} / {images.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
