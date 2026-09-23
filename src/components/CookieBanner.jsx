import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]
const GTM_ID = 'GTM-W7VT43L8'

function loadGTM() {
  if (document.getElementById('gtm-script')) return
  // Consent defaults before GTM loads
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage:        'denied',
    wait_for_update:   2000,
  })
  // Inject GTM script
  const s = document.createElement('script')
  s.id = 'gtm-script'
  s.async = true
  s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
  document.head.appendChild(s)
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
}

function grantConsent() {
  gtag('consent', 'update', {
    analytics_storage: 'granted',
    ad_storage:        'granted',
  })
}

// ~500 KB of tag JavaScript (GA4, Google Ads, Meta, Contentsquare): for returning visitors it waits
// for the first interaction, or for the page to have been loaded and idle for a while.
const TAGS_FALLBACK_DELAY_MS = 6000
const INTERACTION_EVENTS = ['pointerdown', 'keydown', 'scroll', 'wheel', 'touchstart']

function loadTagsWhenEngaged() {
  let timer
  let started = false
  const start = () => {
    if (started) return
    started = true
    INTERACTION_EVENTS.forEach((e) => window.removeEventListener(e, start))
    window.removeEventListener('load', arm)
    clearTimeout(timer)
    loadGTM()
    grantConsent()
  }
  const arm = () => {
    timer = setTimeout(() => {
      if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 2000 })
      else start()
    }, TAGS_FALLBACK_DELAY_MS)
  }
  INTERACTION_EVENTS.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }))
  if (document.readyState === 'complete') arm()
  else window.addEventListener('load', arm, { once: true })
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cookieConsent')
      if (!saved) {
        setVisible(true)
      } else if (saved === 'granted') {
        loadTagsWhenEngaged()
      }
      // if 'denied': GTM never loads, no cookies
    } catch {}
  }, [])

  const accept = () => {
    try { localStorage.setItem('cookieConsent', 'granted') } catch {}
    loadGTM()
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
