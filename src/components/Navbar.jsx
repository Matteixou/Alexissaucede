import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Coach',          href: '#presentation' },
  { label: 'Méthode',        href: '#methode' },
  { label: 'Transformations', href: '#transformations' },
  { label: 'Avis',           href: '#avis' },
  { label: 'Tarifs',         href: '#tarifs' },
  { label: 'FAQ',            href: '#faq' },
  { label: 'Contact',        href: '#contact' },
]

const EASE = [0.16, 1, 0.3, 1]

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Bloque le scroll du body quand le menu est ouvert */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const close = () => setMobileOpen(false)

  const scrollTo = (href, delay = 0) => {
    const run = () => {
      const target = document.querySelector(href)
      if (!target) return
      if (window.__lenis) {
        window.__lenis.scrollTo(target, { duration: 0.9, easing: (t) => 1 - Math.pow(1 - t, 4) })
      } else {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
    delay ? setTimeout(run, delay) : run()
  }

  const handleMobileNav = (href) => { close(); scrollTo(href, 350) }

  return (
    <>
      {/* ── Backdrop mobile (derrière le menu, devant le contenu) ─────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 z-20 bg-void/80 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <motion.header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-500 ${
          scrolled
            ? 'bg-abyss/90 backdrop-blur-md border-b border-steel/40'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="flex items-center select-none" onClick={close}>
            <img
              src="/logoalexissaucede.jpg"
              alt="Alexis Saucede Coaching"
              className="h-11 w-11 object-contain rounded-lg"
              width="44"
              height="44"
            />
          </a>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                className="text-[11px] tracking-[0.2em] uppercase text-ash hover:text-white transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA desktop + burger mobile */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('#contact') }}
              className="hidden md:inline-flex items-center px-5 py-2 rounded-lg bg-white text-void text-[11px] tracking-[0.18em] uppercase font-heading font-bold hover:bg-bone transition-colors duration-300"
            >
              Réserver mon bilan personnalisé gratuit
            </a>

            <button
              className="md:hidden p-2 rounded-full hover:bg-obsidian border border-transparent hover:border-steel/60 transition-all duration-300"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen
                  ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0,   opacity: 1 }}
                      exit={{   rotate:  90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ display: 'flex' }}
                    >
                      <X size={20} strokeWidth={1.5} className="text-bone" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="open"
                      initial={{ rotate: 90,  opacity: 0 }}
                      animate={{ rotate: 0,   opacity: 1 }}
                      exit={{   rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ display: 'flex' }}
                    >
                      <Menu size={20} strokeWidth={1.5} className="text-chrome" />
                    </motion.span>
                  )
                }
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* ── Menu déroulant mobile (visible uniquement sur mobile) ────── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.38, ease: EASE }}
              className="md:hidden overflow-hidden bg-abyss border-t border-steel/40 shadow-2xl"
            >
              {/* Liens de navigation */}
              <nav className="flex flex-col divide-y divide-steel/30">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.045 + 0.08, ease: EASE }}
                    className="flex items-center justify-between px-6 py-5 text-sm tracking-[0.18em] uppercase text-ash hover:text-white hover:bg-obsidian/60 active:bg-obsidian transition-colors duration-200"
                    onClick={(e) => { e.preventDefault(); handleMobileNav(link.href) }}
                  >
                    <span>{link.label}</span>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                      <path d="M2 6.5h9M6.5 2l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.a>
                ))}
              </nav>

              {/* CTA mobile */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: NAV_LINKS.length * 0.045 + 0.12, ease: EASE }}
                className="px-6 py-5 border-t border-steel/40"
              >
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); handleMobileNav('#contact') }}
                  className="flex items-center justify-center w-full py-4 rounded-xl bg-white text-void text-[11px] tracking-[0.22em] uppercase font-heading font-bold hover:bg-bone active:bg-bone transition-colors duration-300"
                >
                  Réserver mon bilan personnalisé gratuit
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
