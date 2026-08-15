import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Zap } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1]

function CountUp({ num, prefix = '', suffix = '' }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration  = 1600
    const startTime = performance.now()
    const tick = (now) => {
      const p      = Math.min((now - startTime) / duration, 1)
      const eased  = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * num))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, num])

  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

const STATS = [
  { num: 8,   prefix: '',  suffix: ' ANS', bottom: "D'EXPÉRIENCE" },
  { num: 500, prefix: '+', suffix: '',     bottom: 'CLIENTS COACHÉS' },
  { num: 99,  prefix: '',  suffix: '%',    bottom: 'RÉSULTATS' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen min-h-[100svh] flex flex-col justify-center overflow-hidden bg-void">
      {/* Coupe diagonale bas */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-10"
        style={{ background: '#0A0A0F', clipPath: 'polygon(0 100%, 100% 30%, 100% 100%)' }}
        aria-hidden="true"
      />

      {/* Fond radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 30%, rgba(13,13,34,0.6) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 w-full pt-28 pb-20">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 mb-6"
        >
          <Zap size={11} strokeWidth={1.5} style={{ color: '#E8FF00' }} />
          <span className="text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.28em] uppercase text-white/80">
            Méthode prouvée · Résultats réels
          </span>
          <Zap size={11} strokeWidth={1.5} style={{ color: '#E8FF00' }} />
        </motion.div>

        {/* Titre XXL */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 110, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.25 }}
            className="font-display font-black italic leading-[0.88] uppercase text-bone"
            style={{ fontSize: 'clamp(3rem, 12vw, 10rem)' }}
          >
            <span className="glitch-hero">Transforme</span>
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-10 lg:mb-14">
          <motion.p
            initial={{ y: 110, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.38 }}
            className="font-display font-black italic leading-[0.88] uppercase"
            style={{ fontSize: 'clamp(3rem, 12vw, 10rem)', color: '#E8FF00', textShadow: '0 0 80px rgba(232,255,0,0.2)' }}
          >
            ton physique
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.65 }}
          className="grid grid-cols-3 gap-0 border-t border-b border-steel/30 py-8 mb-10 lg:mb-14"
        >
          {STATS.map(({ num, prefix, suffix, bottom }, i) => (
            <div
              key={bottom}
              className={`flex flex-col items-center px-3 sm:px-6 lg:px-10 ${i > 0 ? 'border-l border-steel/30' : ''}`}
            >
              <p
                className="font-marker text-3xl sm:text-5xl lg:text-6xl leading-none mb-1 tabular-nums"
                style={{ color: '#E8FF00', textShadow: '0 0 24px rgba(232,255,0,0.25)' }}
              >
                <CountUp num={num} prefix={prefix} suffix={suffix} />
              </p>
              <p className="text-[8px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.18em] uppercase text-ash font-heading text-center">{bottom}</p>
            </div>
          ))}
        </motion.div>

        {/* Description + preuves sociales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}
          className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-20"
        >
          <p className="text-base lg:text-lg text-ash leading-[1.75] lg:max-w-xl">
            Coaching personnalisé pour les personnes qui souhaitent être accompagnées dans leur transformation physique.
            Programme d'entraînement, nutrition, suivi hebdomadaire.
            Résultats visibles dès <span className="text-bone font-medium">4 semaines</span>.
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 lg:ml-auto">
            <span className="flex items-center gap-1.5 text-[11px] tracking-[0.14em] uppercase text-white/80 font-semibold">
              <span style={{ color: '#E8FF00' }}>✓</span> Bilan gratuit
            </span>
            <span className="flex items-center gap-1.5 text-[11px] tracking-[0.14em] uppercase text-white/80 font-semibold">
              <span style={{ color: '#E8FF00' }}>✓</span> 100% personnalisé
            </span>
            <span className="flex items-center gap-1.5 text-[11px] tracking-[0.14em] uppercase text-white/80 font-semibold">
              <span style={{ color: '#E8FF00' }}>✓</span> Résultats en 4 semaines
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
