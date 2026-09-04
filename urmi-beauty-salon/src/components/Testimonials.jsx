import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { LuStar, LuQuote, LuExternalLink } from 'react-icons/lu'
import { content } from '../data/content'

// Review Badge component built from stats
const ReviewBadge = () => {
  const stats = content.business.stats

  const rating = stats.find(s => s.label === 'Google Rating')
  const reviews = stats.find(s => s.label === 'Client Reviews')

  const ratingValue = rating ? `${rating.value}${rating.suffix}` : '4.8★'
  const reviewsValue = reviews ? `${reviews.value}${reviews.suffix}` : '430+'

  return (
    <div className="bg-gold/10 border border-gold/20 rounded-2xl p-6 sm:p-8 mb-8 text-center">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <span className="text-2xl sm:text-3xl font-serif text-gold">{ratingValue}</span>
        <span className="text-cream/80 text-sm sm:text-base">on Google</span>
        <span className="text-cream/80 text-sm sm:text-base">·</span>
        <span className="text-cream/80 text-sm sm:text-base">{reviewsValue} Reviews</span>
      </div>
      <a
        href={content.business.googleListingUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View Google My Business listing"
        className="mt-2 sm:mt-0 inline-flex items-center gap-1 px-4 py-2 rounded-full bg-gold text-ivory text-sm sm:text-base font-semibold uppercase tracking-wider transition-colors hover:bg-gold/90 focus:outline-none"
      >
        <LuExternalLink className="w-4 h-4" />
        <span>View on Google Maps</span>
      </a>
    </div>
  )
}

// Testimonial card for real reviews
const TestimonialCard = ({ quote, name, rating }) => (
  <motion.div
    className="bg-gold/5 border border-gold/20 rounded-2xl p-6 sm:p-8 flex flex-col transition-colors hover:bg-gold/10 hover:border-gold/30 focus:outline-none"
    role="article"
    aria-label={quote}
  >
    <div className="relative mb-4">
      <LuQuote className="absolute top-0 left-0 text-gold/20 text-4xl" />
      <p className="font-serif italic text-cream/90 text-base sm:text-lg leading-relaxed relative z-10">
        "{quote}"
      </p>
    </div>
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-4 border-t border-gold/15">
      <div>
        <p className="font-serif text-base sm:text-lg font-bold text-gold">{name}</p>
        <div className="flex items-center gap-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <LuStar
              key={i}
              className={`w-4 h-4 ${
                i < rating ? 'fill-gold text-gold' : 'text-gold/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  </motion.div>
)

export const Testimonials = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="bg-espresso text-cream py-24 sm:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Animated Divider */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="text-gold font-sans text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold mb-2 block">
            What Our Clients Say
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gold tracking-tight">
            Client Testimonials
          </h2>
          <div className="w-12 h-0.5 bg-gold/60 mx-auto my-4 sm:my-5" />
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

        {/* Review Badge from stats */}
        <ReviewBadge />

        {/* Testimonials Content - Responsive Layout */}
        <div className="space-y-8">
          {content.testimonials.length > 0 ? (
            // Horizontal scroll-snap on mobile, grid on desktop
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 px-2">
              {content.testimonials.map((item, idx) => (
                <TestimonialCard
                  key={item.name}
                  quote={item.quote}
                  name={item.name}
                  rating={item.rating}
                />
              ))}
            </div>
          ) : (
            // Fallback placeholder (should not show since we have data)
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gold/5 border border-gold/20 rounded-2xl p-8 sm:p-10 text-center"
            >
              <p className="text-cream/70 text-base sm:text-lg leading-relaxed">
                <strong>Video & written client testimonials coming soon</strong>
              </p>
              <p className="text-cream/50 text-sm mt-3">
                We are curating real client stories and video interviews.
                Check back soon to hear from brides and clients who have
                experienced Urmi's artistry firsthand.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}