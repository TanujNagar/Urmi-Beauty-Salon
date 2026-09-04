import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  LuMapPin,
  LuPhone,
  LuClock,
  LuMessageCircle,
  LuExternalLink,
} from 'react-icons/lu'
import { content } from '../data/content'

export const LocationContact = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })

  const whatsappUrl = `https://wa.me/${content.business.whatsapp}?text=${encodeURIComponent(
    "Hi Urmi's New Look Beauty Zone, I'd like to book an appointment."
  )}`

  const callUrl = `tel:${content.business.phone}`

  return (
    <section id="location-contact" className="bg-cream/40 text-ink py-12 sm:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="text-gold font-sans text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold mb-2 block">
            Visit & Contact
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-espresso tracking-tight">
            Find Us in Bundi
          </h2>
          <div className="w-12 h-0.5 bg-gold/60 mx-auto my-4 sm:my-5" />
          <p className="font-sans text-ink/75 text-sm sm:text-base leading-relaxed">
            We welcome brides, beauty enthusiasts, and clients across Bundi and surrounding areas.
          </p>
        </div>

        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start"
        >
          {/* Left Column: Map */}
          <div className="flex flex-col">
            <div className="relative w-full rounded-2xl overflow-hidden border-2 border-gold/40 shadow-xl min-h-[300px] sm:min-h-[380px] lg:min-h-[420px]">
              <iframe
                src={content.business.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Urmi's New Look Beauty Zone Location"
                className="absolute inset-0 w-full h-full"
              />
            </div>
            {/* View on Google Maps link below map */}
            <div className="mt-3 text-center sm:text-left">
              <a
                href={content.business.googleListingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-gold hover:text-espresso active:text-espresso text-xs sm:text-sm font-semibold transition-colors min-h-[44px] touch-manipulation focus:outline-none"
              >
                <LuExternalLink className="w-3.5 h-3.5" />
                <span>View on Google Maps</span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Card */}
          <div className="bg-ivory border border-gold/25 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col">
            <span className="text-gold font-sans text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold mb-2 block">
              Get in Touch
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-espresso tracking-tight mb-6">
              Contact & Hours
            </h3>

            {/* Address */}
            <div className="flex items-start gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center shrink-0 mt-0.5">
                <LuMapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="font-sans text-xs uppercase tracking-wider text-ink/60 font-semibold mb-0.5">Address</p>
                <address className="not-italic font-sans text-sm sm:text-base text-ink/85 leading-relaxed">
                  {content.business.address}
                </address>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center shrink-0 mt-0.5">
                <LuClock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-sans text-xs uppercase tracking-wider text-ink/60 font-semibold mb-0.5">Hours</p>
                <p className="font-sans text-sm sm:text-base text-ink/85">
                  {content.business.hours}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center shrink-0 mt-0.5">
                <LuPhone className="w-5 h-5" />
              </div>
              <div>
                <p className="font-sans text-xs uppercase tracking-wider text-ink/60 font-semibold mb-0.5">Phone</p>
                <a
                  href={callUrl}
                  className="font-sans text-sm sm:text-base text-gold hover:text-espresso active:text-espresso font-medium transition-colors min-h-[44px] inline-flex items-center touch-manipulation"
                >
                  {content.business.phone}
                </a>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gold hover:bg-gold/90 active:scale-[0.98] text-ivory rounded-full py-4 text-sm sm:text-base font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2.5 min-h-[52px] touch-manipulation"
            >
              <LuMessageCircle className="w-5 h-5" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
