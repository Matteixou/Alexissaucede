import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronsLeftRight, Quote } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1]
const VP   = { once: true, margin: '80px' }

const TRANSFORMATIONS = [
  {
    id:      '01',
    name:    'Client 1',
    result:  '+12 kg de masse en 4 mois',
    before:  '/Transformation/1.png',
    after:   '/Transformation/2.png',
    comment: "Ma propre transformation est à l'origine de ma passion pour le coaching. J'ai voulu prouver que avec la bonne méthode et la bonne rigueur, les résultats sont au rendez-vous. +12 kg de masse musculaire en 4 mois — c'est ce parcours qui m'a donné l'envie d'accompagner les autres à atteindre leurs objectifs.",
  },
  {
    id:      '02',
    name:    'Client 2',
    result:  'Transformation visible',
    before:  '/Transformation/19.png',
    after:   '/Transformation/20.png',
    comment: "Je n'aurais jamais pensé obtenir ces résultats aussi vite. Alexis m'a donné un programme clair, progressif, et surtout adapté à ma vie. Dès le premier mois j'ai vu la différence. Très professionnel et toujours de bons conseils.",
  },
  {
    id:      '03',
    name:    'Client 3',
    result:  '-18 kg en 5 mois',
    before:  '/Transformation/3.png',
    after:   '/Transformation/4.png',
    comment: "-18 kg en 5 mois. Alexis m'a accompagné sur la nutrition et l'entraînement en même temps, c'est ce qui fait vraiment la différence. Sérieux, humain, et efficace. Transformation complète, je ne pensais pas y arriver.",
  },
  {
    id:      '04',
    name:    'Client 4',
    result:  'Transformation visible',
    before:  '/Transformation/9.png',
    after:   '/Transformation/10.png',
    comment: "Ce qui m'a le plus surpris c'est la qualité du suivi. Alexis est disponible, réactif, et il ajuste le programme dès que nécessaire. J'ai enfin compris comment m'alimenter correctement. Une vraie prise en charge globale.",
  },
  {
    id:      '05',
    name:    'Client 5',
    result:  'Transformation visible',
    before:  '/Transformation/11.png',
    after:   '/Transformation/12.png',
    comment: "J'avais peur de ne pas tenir sur la durée mais Alexis sait exactement comment te motiver sans te pousser à bout. Les séances sont intenses mais bien dosées. Résultat visible dès la 3ème semaine. Je recommande à 100%.",
  },
  {
    id:      '06',
    name:    'Client 6',
    result:  'Transformation visible',
    before:  '/Transformation/17.png',
    after:   '/Transformation/18.png',
    comment: "Alexis a su s'adapter à mes contraintes : boulot chargé, peu de temps, pas de salle près de chez moi. Il a construit un programme efficace à faire à la maison et les résultats parlent d'eux-mêmes. Coaching sérieux et humain.",
  },
]

function ComparisonSlider({ before, after, name, hintIndex = 0 }) {
  const containerRef = useRef(null)
  const [position, setPosition]   = useState(50)
  const [hinted, setHinted]       = useState(false)
  const dragging = useRef(false)

  useEffect(() => {
    if (!before || hintIndex > 0) return
    const t = setTimeout(() => setHinted(true), 900)
    return () => clearTimeout(t)
  }, [before, hintIndex])

  const getPos = (clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pct  = Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100))
    setPosition(pct)
  }

  // Attach/detach global mouse listeners for smooth drag outside the card
  const startDrag = (clientX) => {
    dragging.current = true
    getPos(clientX)

    const onMove = (e) => {
      if (!dragging.current) return
      getPos('clientX' in e ? e.clientX : e.touches[0].clientX)
    }
    const stopDrag = () => {
      dragging.current = false
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', stopDrag)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', stopDrag)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', stopDrag)
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('touchend', stopDrag)
  }

  // Carte simple si pas de "before"
  if (!before) {
    return (
      <div className="relative overflow-hidden h-64 sm:h-80 md:h-96 bg-[#0A0A0F]">
        <img
          src={after}
          alt={`Transformation — ${name}`}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/10 to-transparent pointer-events-none" />
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-white/10 backdrop-blur-sm text-[9px] tracking-[0.2em] uppercase text-bone px-2.5 py-1 rounded font-heading">
            Résultat
          </span>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden select-none cursor-default md:cursor-ew-resize h-64 sm:h-80 md:h-96 bg-[#0A0A0F]"
      onMouseDown={(e) => startDrag(e.clientX)}
      onTouchStart={(e) => startDrag(e.touches[0].clientX)}
    >
      {/* ── Image APRÈS (base, pleine largeur) ── */}
      <img
        src={after}
        alt={`Après — ${name}`}
        className="absolute inset-0 w-full h-full object-contain object-top pointer-events-none" loading="lazy"
        draggable={false}
      />

      {/* ── Image AVANT (clippée côté gauche) ── */}
      <img
        src={before}
        alt={`Avant — ${name}`}
        className="absolute inset-0 w-full h-full object-contain object-top pointer-events-none" loading="lazy"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        draggable={false}
      />

      {/* ── Gradient bas ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent pointer-events-none z-[5]" />

      {/* ── Barre de séparation ── */}
      <div
        className="absolute top-0 bottom-0 z-20 pointer-events-none"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        {/* Ligne */}
        <div className="absolute inset-0 w-[2px] mx-auto bg-white/90"
          style={{ boxShadow: '0 0 12px rgba(255,255,255,0.45), 0 0 4px rgba(255,255,255,0.8)' }}
        />

        {/* Handle */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center pointer-events-auto cursor-default md:cursor-ew-resize"
          style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.5), 0 0 0 2px rgba(255,255,255,0.3)' }}
        >
          <ChevronsLeftRight size={15} strokeWidth={2.5} className="text-void" />
        </div>
      </div>

      {/* ── Labels ── */}
      <div className="absolute top-3 left-3 z-10">
        <span className="bg-void/80 backdrop-blur-sm text-[9px] tracking-[0.2em] uppercase text-ash px-2.5 py-1 rounded font-heading">
          Avant
        </span>
      </div>
      <div className="absolute top-3 right-3 z-10">
        <span className="bg-white/10 backdrop-blur-sm text-[9px] tracking-[0.2em] uppercase text-bone px-2.5 py-1 rounded font-heading">
          Après
        </span>
      </div>

      {/* ── Indice de glissement (première apparition) ── */}
      {hinted && (
        <motion.div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 pointer-events-none"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        >
          <span className="text-[10px] tracking-[0.16em] uppercase text-white/60 font-heading">
            ← glisser →
          </span>
        </motion.div>
      )}
    </div>
  )
}

function TransformationCard({ t, i }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      transition={{ duration: 1.6, ease: EASE, delay: i * 0.08 }}
      className="group flex flex-col rounded-xl overflow-hidden border border-steel/40 hover:border-white/20 transition-colors duration-500 bg-obsidian/60 hover:shadow-ember-sm"
    >
      <ComparisonSlider before={t.before} after={t.after} name={t.name} hintIndex={i} />

      {/* Nom + résultat */}
      <div className="px-3 py-3 sm:px-5 sm:py-4 flex flex-wrap items-center justify-between gap-1 sm:gap-2">
        <p className="text-xs sm:text-sm font-heading font-semibold text-bone">{t.name}</p>
        <p
          className="font-marker text-xs sm:text-sm text-right"
          style={{ color: '#E8FF00', textShadow: '0 0 10px rgba(232,255,0,0.25)' }}
        >
          {t.result}
        </p>
      </div>

      <div className="mt-auto">
        {/* Bouton */}
        <button
          disabled={!t.comment}
          onClick={() => t.comment && setOpen(v => !v)}
          className={`w-full flex items-center gap-3 px-4 sm:px-5 py-3 border-t transition-all duration-300 ${
            !t.comment
              ? 'border-steel/20 opacity-40 cursor-default'
              : open
                ? 'border-[#E8FF00]/25 bg-[#E8FF00]/[0.06] cursor-pointer'
                : 'border-steel/30 hover:bg-white/[0.03] cursor-pointer'
          }`}
        >
          <span
            className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
              open && t.comment ? 'bg-[#E8FF00]/20' : 'bg-steel/20'
            }`}
          >
            <Quote
              size={12}
              className={`transition-colors duration-300 ${open && t.comment ? 'text-[#E8FF00]' : 'text-ash'}`}
            />
          </span>

          <span
            className={`flex-1 text-left text-[9px] tracking-[0.2em] uppercase font-heading transition-colors duration-300 ${
              !t.comment
                ? 'text-steel/50'
                : open
                  ? 'text-[#E8FF00]'
                  : 'text-ash group-hover:text-bone'
            }`}
          >
            {!t.comment ? 'Témoignage à venir' : open ? 'Masquer' : 'Témoignage'}
          </span>

          {t.comment && (
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className={`flex-shrink-0 transition-colors duration-300 ${open ? 'text-[#E8FF00]' : 'text-steel'}`}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.span>
          )}
        </button>

        {/* Texte dépliable */}
        <AnimatePresence initial={false}>
          {open && t.comment && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="relative px-4 sm:px-5 pt-4 pb-5 bg-[#E8FF00]/[0.03] border-t border-[#E8FF00]/10">
                <span
                  aria-hidden="true"
                  className="absolute top-2 left-3 font-display text-5xl leading-none select-none pointer-events-none"
                  style={{ color: 'rgba(232,255,0,0.12)' }}
                >
                  "
                </span>
                <p className="relative text-[11px] text-ash/90 leading-relaxed pl-2">
                  {t.comment}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function Transformations() {
  return (
    <section id="transformations" className="relative py-28 px-6 lg:px-10 bg-abyss">

      <div className="absolute left-6 top-4 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span className="font-display font-black italic text-[11rem] lg:text-[16rem] leading-none text-white/[0.04]">02</span>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent"
          style={{ top: '22%', transform: 'rotate(1.5deg) scaleX(1.4)' }}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMid slice">
          <circle cx="0"    cy="0"   r="250" fill="#111118" fillOpacity="0.70" />
          <circle cx="1440" cy="700" r="250" fill="#111118" fillOpacity="0.65" />
          <circle cx="0"    cy="0"   r="180" fill="none" stroke="#3A3A4A" strokeWidth="0.7" strokeOpacity="0.35" />
          <circle cx="1440" cy="700" r="180" fill="none" stroke="#D4D4DC" strokeWidth="0.5" strokeOpacity="0.12" />
          <line x1="0"    y1="0"   x2="160" y2="220" stroke="#3A3A4A" strokeWidth="0.6" strokeOpacity="0.30" />
          <line x1="1440" y1="700" x2="1280" y2="480" stroke="#3A3A4A" strokeWidth="0.6" strokeOpacity="0.30" />
          <circle cx="52"   cy="52"  r="4.5" fill="#D4D4DC" fillOpacity="0.30" />
          <circle cx="1400" cy="650" r="4.5" fill="#D4D4DC" fillOpacity="0.28" />
          <rect x="12"   y="620" width="26" height="26" rx="0" fill="none" stroke="#3A3A4A" strokeWidth="0.6" strokeOpacity="0.45" />
          <rect x="1400" y="42"  width="26" height="26" rx="0" fill="none" stroke="#D4D4DC" strokeWidth="0.6" strokeOpacity="0.18" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto">

        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 1.6, ease: EASE }}
        >
          <p className="text-[11px] tracking-[0.28em] uppercase mb-4" style={{ color: '#E8FF00' }}>
            Ils ont transformé leur physique
          </p>
          <h2 className="font-display font-black italic text-4xl lg:text-5xl text-bone uppercase mb-4">
            Avant / Après
          </h2>
          <p className="text-ash max-w-lg mx-auto leading-relaxed text-sm">
            Glissez la barre pour voir la transformation. Des résultats réels, obtenus avec de la régularité et la bonne méthode.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 items-start">
          {TRANSFORMATIONS.map((t, i) => (
            <TransformationCard key={t.id} t={t} i={i} />
          ))}
        </div>

        <p className="text-center text-xs text-white/70 mt-10">
          Les résultats varient selon l'engagement, la nutrition et le profil de chaque athlète.
        </p>
      </div>
    </section>
  )
}
