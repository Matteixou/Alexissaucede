import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

function grantConsent() {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage:        'granted',
    })
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cookieConsent')
      if (!saved) {
        setVisible(true)
      } else if (saved === 'granted') {
        grantConsent()
      }
    } catch {}
  }, [])

  const accept = () => {
    try { localStorage.setItem('cookieConsent', 'granted') } catch {}
    grantConsent()
    setVisible(false)
  }

  const refuse = () => {
    try { localStorage.setItem('cookieConsent', 'denied') } catch {}
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6"
          role="dialog"
          aria-label="Gestion des cookies"
          aria-live="polite"
        >
          <div className="max-w-4xl mx-auto bg-abyss border border-steel/60 rounded-xl px-5 py-4 sm:px-6 sm:py-5 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <p className="flex-1 text-sm text-ash leading-relaxed">
              Ce site utilise des cookies (Google Analytics) pour mesurer l'audience et améliorer les performances.{' '}
              <Link
                to="/mentions-legales"
                className="text-bone underline underline-offset-4 decoration-steel/50 hover:text-white transition-colors duration-200"
              >
                En savoir plus
              </Link>
            </p>
            <div className="flex gap-3 flex-shrink-0 w-full sm:w-auto">
              <button
                onClick={refuse}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-[11px] tracking-[0.14em] uppercase font-heading font-bold border border-steel/60 text-ash hover:text-white hover:border-white/30 transition-all duration-200"
              >
                Refuser
              </button>
              <button
                onClick={accept}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-[11px] tracking-[0.14em] uppercase font-heading font-bold text-void transition-all duration-200 hover:opacity-90"
                style={{ background: '#E8FF00' }}
              >
                Accepter
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
