import { useRef, useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'
import { ArrowDown, Zap } from 'lucide-react'
import HeroCanvas from './HeroCanvas'

const EASE = [0.16, 1, 0.3, 1]
const reveal = (delay = 0) => ({
  initial:    { opacity: 0, y: 32 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.95, ease: EASE, delay },
})

export default function Hero({ onCtaClick }) {
  const { scrollY } = useScroll()
  const scrollRef   = useRef(0)   // progression globale (pour la rotation X)
  const zoomRef     = useRef(0)   // progression hero 0→1 sur les 600 premiers px (pour le zoom 3D)

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => {
      const max = document.body.scrollHeight - window.innerHeight
      scrollRef.current = max > 0 ? v / max : 0
      zoomRef.current   = Math.min(v / 600, 1)
    })
    return unsub
  }, [scrollY])

  return (
    <section className="relative min-h-screen min-h-[100svh] flex items-center overflow-hidden bg-void">
      {/* Coupe diagonale bas */}
      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-10" style={{ background: '#0A0A0F', clipPath: 'polygon(0 100%, 100% 30%, 100% 100%)' }} aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full pt-20 pb-12 lg:pt-24 lg:pb-16">
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-20 items-center">

          {/* ─── Colonne texte ─────────────────────────────────────────────── */}
          <div className="order-2 lg:order-1">

            <motion.div {...reveal(0.2)} className="inline-flex items-center gap-2.5 mb-10">
              <Zap size={12} strokeWidth={1.5} className="text-white" />
              <span className="text-[11px] tracking-[0.28em] uppercase text-white">
                Méthode prouvée · Résultats réels
              </span>
              <Zap size={12} strokeWidth={1.5} className="text-white" />
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 90, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.15, ease: EASE, delay: 0.35 }}
                className="font-display font-black italic text-[2.4rem] sm:text-5xl lg:text-6xl xl:text-[4.25rem] leading-[1.02] text-bone uppercase text-balance"
              >
                <span className="glitch-hero">
                  Transforme
                  <br />
                  <em className="not-italic" style={{ color: '#E8FF00', textShadow: '0 0 28px rgba(232,255,0,0.35)' }}>ton physique</em>
                </span>
              </motion.h1>
            </div>

            <motion.p
              {...reveal(0.6)}
              className="mt-8 text-base lg:text-lg text-ash leading-[1.75] max-w-md"
            >
              Coaching personnalisé pour les personnes qui souhaitent être accompagnées dans leur transformation physique.
              Programme d'entraînement, nutrition, suivi hebdomadaire. Un accompagnement 100% optimisé. Pas de place aux doutes, seulement aux résultats.
              <br className="hidden sm:block" />
              Résultats visibles dès{' '}
              <span className="text-bone font-medium">4 semaines</span>.
            </motion.p>

            <motion.div
              {...reveal(0.82)}
              className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <button
                onClick={onCtaClick}
                className="relative overflow-hidden group text-void px-10 py-4 rounded-xl text-[11px] tracking-[0.22em] uppercase font-heading font-bold"
                style={{ background: '#E8FF00' }}
              >
                <span className="relative z-10">Réserver mon bilan personnalisé gratuit</span>
                <motion.span
                  className="absolute inset-0 bg-white"
                  initial={{ x: '-105%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                />
              </button>
              <a
                href="#methode"
                className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-ash hover:text-white transition-colors duration-300"
              >
                <ArrowDown size={13} strokeWidth={1.5} />
                Notre méthode
              </a>
            </motion.div>

            <motion.div
              {...reveal(1.05)}
              className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2"
            >
              <span className="flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase text-ash">
                <span style={{ color: '#E8FF00' }}>✓</span>
                Bilan personnalisé gratuit
              </span>
              <span className="text-steel/60 hidden sm:inline">·</span>
              <span className="flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase text-ash">
                <span style={{ color: '#E8FF00' }}>✓</span>
                500+ personnes transformées
              </span>
              <span className="text-steel/60 hidden sm:inline">·</span>
              <span className="flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase text-ash">
                <span style={{ color: '#E8FF00' }}>✓</span>
                Résultats en 4 semaines
              </span>
            </motion.div>

          </div>

          {/* ─── Colonne 3D ──────────────────────────────────────────────────── */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.15 }}
              className="relative h-[280px] sm:h-[420px] lg:h-[580px]"
            >

              {/* ── Fond radial — studio dark ─────────────────────────────── */}
              <div
                className="absolute inset-0 pointer-events-none select-none"
                style={{ background: 'radial-gradient(ellipse 78% 72% at 50% 50%, #0D0D22 0%, #050508 68%, transparent 100%)' }}
                aria-hidden="true"
              />

              {/* ── Quelques accents discrets dans les coins ──────────────── */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none select-none"
                viewBox="0 0 440 660"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
              >
                <circle cx="220" cy="330" r="215" fill="none" stroke="#D4D4DC" strokeWidth="0.5" strokeOpacity="0.08" />

                <circle cx="38"  cy="48"  r="3.5" fill="#D4D4DC" fillOpacity="0.45" />
                <circle cx="22"  cy="32"  r="2"   fill="#D4D4DC" fillOpacity="0.25" />
                <circle cx="404" cy="42"  r="3"   fill="#D4D4DC" fillOpacity="0.35" />
                <circle cx="416" cy="620" r="3"   fill="#D4D4DC" fillOpacity="0.25" />
                <circle cx="28"  cy="610" r="2.5" fill="#3A3A4A" fillOpacity="0.70" />

                <rect x="392" y="548" width="22" height="22" rx="0" fill="none" stroke="#D4D4DC" strokeWidth="0.6" strokeOpacity="0.18" />
                <rect x="14"  y="30"  width="16" height="16" rx="0" fill="none" stroke="#3A3A4A" strokeWidth="0.6" strokeOpacity="0.35" />
              </svg>

              {/* ── Canvas 3D ─────────────────────────────────────────────── */}
              <div className="absolute inset-0" style={{ zIndex: 0 }}>
                <HeroCanvas scrollRef={scrollRef} zoomRef={zoomRef} />
              </div>

              {/* ── Badge ─────────────────────────────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 1.6 }}
                className="absolute top-6 right-6 min-w-[170px] bg-obsidian/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-ember-sm pointer-events-none border border-steel/40"
                style={{ zIndex: 20 }}
              >
                <p className="text-[9px] tracking-widest uppercase text-ash mb-1">
                  Bilan personnalisé
                </p>
                <p className="font-heading font-bold text-sm text-bone uppercase tracking-wide">
                  Bilan personnalisé gratuit
                </p>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
