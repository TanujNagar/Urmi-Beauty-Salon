import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  LuSparkles,
  LuStar,
  LuScissors,
  LuDroplet,
  LuHeart,
  LuFeather,
  LuFlower,
  LuMessageCircle,
} from 'react-icons/lu'
import { content } from '../data/content'

const iconMap = {
  Sparkles: LuSparkles,
  Star: LuStar,
  Scissors: LuScissors,
  Droplet: LuDroplet,
  Heart: LuHeart,
  Feather: LuFeather,
  Flower: LuFlower,
}

// Animated divider line that grows from 0 to full width on scroll
const AnimatedDivider = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className={`flex h-0.5 w-0 bg-gold overflow-hidden transition-width duration-750 ${
        isInView ? 'w-full' : 'w-0'
      }`}
    />
  )
}

export const Services = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  const whatsappServiceUrl = `https://wa.me/${content.business.whatsapp}?text=${encodeURIComponent(
    "Hi Dr. Urmila, I'd like to inquire about our services."
  )}`

  return (
    <section id="services" className="bg-cream/40 text-ink py-12 sm:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Animated Divider */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="text-gold font-sans text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold mb-2 block">
            Our Signature Services
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-espresso tracking-tight">
            Our Services
          </h2>
          <div className="w-12 h-0.5 bg-gold/60 mx-auto my-4 sm:my-5" />
          <p className="font-sans text-ink/75 text-sm sm:text-base leading-relaxed">
            Tailored beauty, bridal, and skincare treatments crafted with high-quality products, modern techniques, and personalized care.
          </p>
        </div>

        {/* Animated Divider growing on scroll */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-10 sm:mb-16"
        >
          <AnimatedDivider />
        </motion.div>

        {/* Services Grid */}
        <motion.div
          ref={sectionRef}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          {content.services.map((service) => {
            const isBridal = service.title === 'Bridal Makeup'
            const IconComponent = iconMap[service.icon] || LuSparkles
            const hasTag = service.tag ? true : false
            const whatsappServiceUrl = `https://wa.me/${content.business.whatsapp}?text=${encodeURIComponent(
              `Hi Dr. Urmila, I'd like to inquire about ${service.title}.`
            )}`

            return (
              <motion.div
                key={service.title}
                className="group relative bg-ivory border border-gold/20 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-gold/50 active:scale-[0.99] touch-manipulation transition-all duration-300"
              >
                <div>
                  {/* Card top: photo when present, otherwise icon badge */}
                  {service.image ? (
                    <div className="rounded-2xl overflow-hidden mb-5 border border-gold/20 aspect-[3/4]">
                      <img
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isBridal ? 'object-[center_20%]' : ''}`}
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold flex items-center justify-center mb-5 group-hover:bg-gold group-hover:text-ivory transition-colors duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-espresso mb-3 group-hover:text-gold transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-ink/80 text-sm sm:text-base leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Tag label (only for services with tag, e.g. Signature Treatment) */}
                  {hasTag && (
                    <span className="absolute top-2 left-2 bg-gold/90 text-ivory text-xs sm:text-xs font-medium uppercase tracking-widest px-2 py-0.5 rounded">
                      {service.tag}
                    </span>
                  )}

                  {/* On-Venue Badge (only for Bridal Makeup) */}
                  {isBridal && (
                    <span className="absolute top-2 right-2 bg-gold/90 text-ivory text-xs sm:text-xs font-medium uppercase tracking-widest px-2 py-0.5 rounded">
                      On-Venue Available
                    </span>
                  )}

                  {/* Card Action Link */}
                  <div className="pt-4 border-t border-gold/15 flex items-center justify-between">
                    <a
                      href={whatsappServiceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-gold hover:text-espresso active:text-espresso text-xs sm:text-sm font-semibold uppercase tracking-wider min-h-[44px] focus:outline-none"
                    >
                      <LuMessageCircle className="w-4 h-4" />
                      <span>Inquire via WhatsApp</span>
                    </a>
                    <span className="text-gold opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                      →
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}