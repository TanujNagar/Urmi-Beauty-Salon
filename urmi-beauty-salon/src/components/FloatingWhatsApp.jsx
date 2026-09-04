import { LuMessageCircle } from 'react-icons/lu'
import { content } from '../data/content'

export const FloatingWhatsApp = () => {
  const whatsappUrl = `https://wa.me/${content.business.whatsapp}?text=${encodeURIComponent(
    "Hi Urmi's New Look Beauty Zone, I'd like to book an appointment."
  )}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-gold hover:bg-gold/90 active:scale-90 text-ivory shadow-lg hover:shadow-xl flex items-center justify-center touch-manipulation transition-all duration-200"
      style={{
        animation: 'whatsapp-pulse 2s ease-in-out infinite',
      }}
    >
      <LuMessageCircle className="w-6 h-6" />

      <style>{`
        @keyframes whatsapp-pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(184, 147, 95, 0.5);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(184, 147, 95, 0);
          }
        }
      `}</style>
    </a>
  )
}
