import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronsLeftRight } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1]
const VP   = { once: true, margin: '200px' }

function shuffle(arr) {
  const s = [...arr]
  for (let i = s.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [s[i], s[j]] = [s[j], s[i]]
  }
  return s
}

// Garantit au moins 1 femme dans les n résultats
function pickRandom(arr, n) {
  const femmes     = shuffle(arr.filter(t => t.gender === 'femme'))
  const hommes     = shuffle(arr.filter(t => t.gender === 'homme'))
  const guaranteed = femmes.length > 0 ? [femmes[0]] : []
  const rest       = shuffle([...femmes.slice(1), ...hommes]).slice(0, n - guaranteed.length)
  return shuffle([...guaranteed, ...rest])
}

const ALL_TRANSFORMATIONS = [
  {
    id:      '01',
    gender:  'homme',
    name:    'Client #47',
    result:  'Sèche en 4 mois',
    before:  '/Transformation/1.webp',
    after:   '/Transformation/2.webp',
    comment: "Objectif sèche : partir d'un physique musclé mais couvert de gras et atteindre une définition maximale. En 4 mois, le physique est méconnaissable. La méthode m'a permis de perdre le gras sans sacrifier le muscle.",
  },
  {
    id:      '02',
    gender:  'homme',
    name:    'Client #83',
    result:  '-15 kg en 5 mois',
    before:  '/Transformation/3.webp',
    after:   '/Transformation/4.webp',
    comment: "Objectif perte de poids : -15 kg en 5 mois. Alexis m'a accompagné sur la nutrition et l'entraînement en même temps. Je ne pensais pas y arriver si vite. Le suivi régulier change vraiment tout.",
  },
  {
    id:      '03',
    gender:  'homme',
    name:    'Client #12',
    result:  'Recomposition en 6 mois',
    before:  '/Transformation/9.webp',
    after:   '/Transformation/10.webp',
    comment: "Objectif recomposition corporelle : perdre du gras et gagner du muscle simultanément. En 6 mois, le résultat est flagrant. Alexis ajuste le programme chaque semaine selon mes retours.",
  },
  {
    id:      '04',
    gender:  'homme',
    name:    'Client #61',
    result:  '+8 kg de masse en 3 mois',
    before:  '/Transformation/11.webp',
    after:   '/Transformation/12.webp',
    comment: "Objectif prise de masse : +8 kg en 3 mois. J'étais trop mince et je ne savais pas comment prendre du poids. Alexis a calibré ma nutrition et mon entraînement. Résultats visibles dès le premier mois.",
  },
  {
    id:      '05',
    gender:  'femme',
    name:    'Cliente #29',
    result:  '-22 kg en 7 mois',
    before:  '/Transformation/17.webp',
    after:   '/Transformation/18.webp',
    comment: "Objectif : retrouver confiance en moi et perdre du poids durablement. -22 kg en 7 mois avec un suivi bienveillant et efficace. Alexis m'a appris à manger correctement sans me frustrer.",
  },
  {
    id:      '06',
    gender:  'femme',
    name:    'Cliente #74',
    result:  '-14 kg en 5 mois',
    before:  '/Transformation/19.webp',
    after:   '/Transformation/20.webp',
    comment: "Objectif : perdre le ventre et retrouver une silhouette. En 5 mois je voyais ma silhouette changer chaque semaine. Alexis m'a donné les clés pour transformer mon corps sans me priver de tout.",
  },
  {
    id:      '07',
    gender:  'homme',
    name:    'Client #38',
    result:  '+10 kg de masse en 4 mois',
    before:  '/Transformation/21.webp',
    after:   '/Transformation/22.webp',
    comment: "Objectif prise de masse : +10 kg en 4 mois. J'étais trop mince et j'avais essayé plein de programmes sans résultat. Alexis a tout changé avec un plan adapté à mon métabolisme.",
  },
  {
    id:      '08',
    gender:  'homme',
    name:    'Client #55',
    result:  '+12 kg de masse en 5 mois',
    before:  '/Transformation/23.webp',
    after:   '/Transformation/24.webp',
    comment: "Objectif prise de masse : +12 kg en 5 mois. J'étais déjà sportif mais je stagnais depuis des mois. Alexis a optimisé ma nutrition et augmenté le volume d'entraînement. Les résultats sont arrivés vite.",
  },
  {
    id:      '09',
    gender:  'homme',
    name:    'Client #91',
    result:  '+14 kg de masse en 6 mois',
    before:  '/Transformation/25.webp',
    after:   '/Transformation/26.webp',
    comment: "Objectif : sortir de la maigreur et enfin prendre du volume. +14 kg en 6 mois. Ectomorphe pur, j'avais abandonné l'idée de prendre du poids avant de rencontrer Alexis. Programme taillé pour mon profil.",
  },
  {
    id:      '10',
    gender:  'homme',
    name:    'Client #16',
    result:  'Recomposition en 4 mois',
    before:  '/Transformation/27.webp',
    after:   '/Transformation/28.webp',
    comment: "Objectif : améliorer ma silhouette sans forcément perdre beaucoup de poids. Recomposition réussie en 4 mois. Programme 100% personnalisé selon mon équipement, mon emploi du temps et mon niveau.",
  },
  {
    id:      '11',
    gender:  'homme',
    name:    'Client #67',
    result:  '-18 kg en 5 mois',
    before:  '/Transformation/29.webp',
    after:   '/Transformation/30.webp',
    comment: "Objectif perte de poids : -18 kg en 5 mois après des années d'entraînement sans résultats. À 48 ans je pensais que c'était trop tard. Alexis m'a prouvé le contraire avec un suivi adapté à mon âge.",
  },
  {
    id:      '12',
    gender:  'homme',
    name:    'Client #43',
    result:  '+16 kg de masse en 6 mois',
    before:  '/Transformation/31.webp',
    after:   '/Transformation/32.webp',
    comment: "Objectif transformation complète : partir de maigre et construire un physique musclé. +16 kg en 6 mois. Le programme d'Alexis m'a appris à m'entraîner et à manger correctement pour la première fois.",
  },
  {
    id:      '13',
    gender:  'homme',
    name:    'Client #58',
    result:  'Transformation en 5 mois',
    before:  '/Transformation/33.webp',
    after:   '/Transformation/34.webp',
    comment: "Un suivi complet qui a tout changé. En 5 mois, Alexis m'a aidé à atteindre des résultats que je n'aurais jamais obtenus seul. Programme et nutrition entièrement adaptés à mon mode de vie.",
  },
  {
    id:      '14',
    gender:  'homme',
    name:    'Client #72',
    result:  'Transformation en 4 mois',
    before:  '/Transformation/35.webp',
    after:   '/Transformation/36.webp',
    comment: "4 mois de travail acharné avec le bon accompagnement. Alexis a su adapter le programme à mes contraintes et mon emploi du temps. Les résultats parlent d'eux-mêmes.",
  },
  {
    id:      '15',
    gender:  'femme',
    name:    'Cliente #19',
    result:  'Transformation en 4 mois',
    before:  '/Transformation/37.webp',
    after:   '/Transformation/38.webp',
    comment: "Je cherchais un coaching sérieux et bienveillant. Alexis a su me guider avec patience et efficacité. En 4 mois, ma silhouette a complètement changé et je me sens bien dans mon corps.",
  },
]

// 6 transformations tirées aléatoirement à chaque chargement de page — zéro coût au re-render
const TRANSFORMATIONS = pickRandom(ALL_TRANSFORMATIONS, 6)

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      transition={{ duration: 0.9, ease: EASE, delay: i * 0.08 }}
      className="flex flex-col h-full rounded-xl overflow-hidden border border-steel/40 hover:border-white/20 transition-colors duration-500 bg-obsidian/60 hover:shadow-ember-sm"
    >
      <ComparisonSlider before={t.before} after={t.after} name={t.name} hintIndex={i} />

      {/* Nom + résultat */}
      <div className="px-3 py-3 sm:px-5 sm:py-4 flex flex-wrap items-center justify-between gap-1 sm:gap-2 border-b border-steel/30">
        <p className="text-xs sm:text-sm font-heading font-semibold text-bone">{t.name}</p>
        <p
          className="font-marker text-xs sm:text-sm text-right"
          style={{ color: '#E8FF00', textShadow: '0 0 10px rgba(232,255,0,0.25)' }}
        >
          {t.result}
        </p>
      </div>

      {/* Témoignage affiché directement — hauteur fixe pour égaliser toutes les cartes */}
      <div className="relative px-4 sm:px-5 pt-4 pb-5 bg-[#E8FF00]/[0.03] h-[88px] overflow-hidden flex-shrink-0">
        <span
          aria-hidden="true"
          className="absolute top-2 left-3 font-display text-5xl leading-none select-none pointer-events-none"
          style={{ color: 'rgba(232,255,0,0.12)' }}
        >
          "
        </span>
        <p className="relative text-[11px] text-ash/90 leading-relaxed pl-2 line-clamp-3">
          {t.comment || ''}
        </p>
      </div>
    </motion.div>
  )
}

export default function Transformations() {
  return (
    <section id="transformations" className="relative pt-28 pb-14 px-6 lg:px-10 bg-abyss">

      <div className="absolute left-6 top-4 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span className="font-display font-black italic text-[11rem] lg:text-[16rem] leading-none text-white/[0.04]">01</span>
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
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.9, ease: EASE }}
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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 items-stretch">
          {TRANSFORMATIONS.map((t, i) => (
            <TransformationCard key={t.id} t={t} i={i} />
          ))}
        </div>

        <p className="text-center text-xs text-white/70 mt-10">
          Les résultats varient selon l'engagement, la nutrition et le profil de chaque athlète.
        </p>

        <motion.div
          className="flex justify-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <motion.button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden text-void px-10 py-4 rounded-xl text-[14px] tracking-[0.18em] uppercase font-heading font-bold"
            style={{ background: '#E8FF00' }}
          >
            <span className="relative z-10">Réserver mon bilan personnalisé gratuit →</span>
            <motion.span
              className="absolute inset-0 bg-white"
              initial={{ x: '-105%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
            />
          </motion.button>
        </motion.div>

      </div>
    </section>
  )
}
