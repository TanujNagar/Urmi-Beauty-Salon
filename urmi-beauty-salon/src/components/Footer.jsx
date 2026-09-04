import { LuInstagram, LuPhone, LuMessageCircle } from 'react-icons/lu'
import { content } from '../data/content'

const siteCredit = 'Tanuj Nagar'

export const Footer = () => {
  const whatsappUrl = `https://wa.me/${content.business.whatsapp}?text=${encodeURIComponent(
    "Hi Urmi's New Look Beauty Zone, I'd like to book an appointment."
  )}`

  return (
    <footer id="footer" className="bg-espresso text-ivory border-t border-gold/15 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 pb-8 sm:pb-12 border-b border-gold/10">

          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-wider uppercase text-ivory mb-4">
              {content.business.name}
            </h2>
            <p className="font-sans text-cream/60 text-sm leading-relaxed max-w-sm mb-6">
              {content.business.tagline}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href={content.business.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Instagram page"
                className="w-11 h-11 rounded-full border border-gold/25 hover:border-gold hover:bg-gold/10 text-ivory/80 hover:text-gold flex items-center justify-center transition-colors active:scale-95 touch-manipulation focus:outline-none"
              >
                <LuInstagram className="w-5 h-5" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Send us a message on WhatsApp"
                className="w-11 h-11 rounded-full border border-gold/25 hover:border-gold hover:bg-gold/10 text-ivory/80 hover:text-gold flex items-center justify-center transition-colors active:scale-95 touch-manipulation focus:outline-none"
              >
                <LuMessageCircle className="w-5 h-5" />
              </a>
              <a
                href={`tel:${content.business.phone}`}
                aria-label="Call our beauty salon"
                className="w-11 h-11 rounded-full border border-gold/25 hover:border-gold hover:bg-gold/10 text-ivory/80 hover:text-gold flex items-center justify-center transition-colors active:scale-95 touch-manipulation focus:outline-none"
              >
                <LuPhone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Address & Hours Column */}
          <div className="md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-serif text-base font-bold text-gold tracking-wider uppercase mb-4">
              Salon Details
            </h3>
            <div className="flex flex-col gap-3 text-sm">
              <p className="font-sans text-cream/70">
                {content.business.address}
              </p>
              <p className="font-sans text-cream/70">
                <span className="text-gold font-medium">Hours:</span> {content.business.hours}
              </p>
              <p className="font-sans text-cream/70">
                <span className="text-gold font-medium">Phone:</span>{' '}
                <a href={`tel:${content.business.phone}`} className="hover:text-gold active:text-gold transition-colors min-h-[44px] inline-flex items-center touch-manipulation">
                  {content.business.phone}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="pt-8 text-center">
          <p className="font-sans text-xs text-cream/50">
            &copy; 2026 {content.business.name}. Site by {siteCredit}.
          </p>
        </div>
      </div>
    </footer>
  )
}
