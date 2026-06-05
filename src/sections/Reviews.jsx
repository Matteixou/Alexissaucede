import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronDown } from 'lucide-react'
import useGoogleReviews from '../hooks/useGoogleReviews'

const EASE = [0.16, 1, 0.3, 1]
const VP   = { once: true, margin: '80px' }

const STATIC_REVIEWS = [
  {
    id:     '01',
    name:   'Matthieu V.',
    date:   'Il y a 2 mois',
    rating: 5,
    text:   "J'ai commencé la musculation seul, sans vraiment savoir par où commencer... Puis j'ai rencontré Alexis, grâce à un contact, et clairement, ça a tout changé. Au-delà des résultats impressionnants obtenus en seulement quelques mois, c'est surtout une personne incroyable. Il prend le temps, s'investit à fond dans chaque séance. Une vraie source de motivation. Je recommande les yeux fermés.",
  },
  {
    id:     '02',
    name:   'Carla S.',
    date:   'Il y a un mois',
    rating: 5,
    text:   "Super lieu de coaching, coach attentif et bienveillant. On ressort toujours d'une séance reboosté ! J'y vais depuis 5 ans et je recommande les yeux fermés.",
  },
  {
    id:     '03',
    name:   'Miléna L.',
    date:   'Il y a un mois',
    rating: 5,
    text:   "Alexis me suit depuis plus d'un an, c'est vraiment un coach exceptionnel. Il s'adapte vraiment à mes besoins, mes limites, et me prépare semaine après semaine un programme sur mesure. Les résultats sont époustouflants. Je me sens bien mieux physiquement et psychologiquement grâce à lui. Merci !",
  },
  {
    id:     '04',
    name:   'Rachel S.',
    date:   'Il y a un mois',
    rating: 5,
    text:   "Ça fait des années que je suis accompagnée par Alexis, et honnêtement je ne pourrais pas rêver mieux. Toujours à l'écoute, motivant, hyper professionnel, et surtout passionné par ce qu'il fait. Il sait exactement comment pousser à se dépasser tout en restant bienveillant. Un coach en or !",
  },
]

function Stars({ count }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={12} style={{ fill: '#E8FF00', color: '#E8FF00' }} />
      ))}
    </div>
  )
}

function InitialAvatar({ name }) {
  const initial = name.charAt(0).toUpperCase()
  return (
    <div className="w-10 h-10 rounded-full bg-shadow border border-steel/60 flex items-center justify-center flex-shrink-0">
      <span className="font-heading font-bold text-sm text-bone">{initial}</span>
    </div>
  )
}

function normalizeApiReview(r, i) {
  return {
    id:     String(i),
    name:   r.authorAttribution?.displayName ?? 'Anonyme',
    date:   r.relativePublishTimeDescription  ?? '',
    rating: r.rating ?? 5,
    text:   r.text?.text ?? r.originalText?.text ?? '',
  }
}

function ReviewCard({ review, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      className="flex flex-col rounded-xl border border-steel/40 hover:border-white/20 bg-obsidian/60 transition-colors duration-500 hover:shadow-ember-sm overflow-hidden"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      transition={{ duration: 1.6, ease: EASE, delay: index * 0.08 }}
    >
      {/* Partie toujours visible */}
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-center gap-3">
          <InitialAvatar name={review.name} />
          <div>
            <p className="text-sm font-heading font-semibold text-bone leading-snug">{review.name}</p>
            <p className="text-[10px] text-ash mt-0.5">{review.date}</p>
          </div>
        </div>

        <Stars count={review.rating} />
      </div>

      {/* Bouton extensible */}
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center justify-between gap-2 px-5 py-3 border-t border-steel/30 text-[10px] tracking-[0.18em] uppercase text-ash hover:text-bone transition-colors duration-200 group"
      >
        <span>{open ? 'Masquer' : 'Lire le commentaire'}</span>
        <ChevronDown
          size={13}
          className="transition-transform duration-300"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      {/* Texte dépliable */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="text"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 flex flex-col gap-3">
              <p className="text-xs text-ash leading-relaxed">
                "{review.text}"
              </p>
              <div className="flex items-center gap-1.5 pt-2 border-t border-steel/30">
                <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
                  <span className="font-heading font-black text-[8px] text-void leading-none">G</span>
                </div>
                <span className="text-[9px] tracking-[0.15em] uppercase text-steel font-heading">
                  Avis Google
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Reviews() {
  const { data, loading } = useGoogleReviews()

  const reviews = data?.reviews?.length
    ? data.reviews.slice(0, 4).map(normalizeApiReview)
    : STATIC_REVIEWS

  const displayRating       = data?.rating       ?? 5.0
  const displayTotalRatings = data?.totalRatings  ?? 42

  return (
    <section id="avis" className="relative py-28 px-6 lg:px-10 bg-void">

      <div className="absolute right-6 top-4 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span className="font-display font-black italic text-[11rem] lg:text-[16rem] leading-none text-white/[0.04]">03</span>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" style={{ top: '15%', transform: 'rotate(-1deg) scaleX(1.4)' }} />
      </div>

      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1440 680" preserveAspectRatio="xMidYMid slice">
          <circle cx="720" cy="340" r="400" fill="none" stroke="#3A3A4A" strokeWidth="0.5" strokeOpacity="0.15" />
          <circle cx="720" cy="340" r="280" fill="none" stroke="#D4D4DC" strokeWidth="0.4" strokeOpacity="0.07" />
          <circle cx="0"   cy="0"   r="220" fill="#111118" fillOpacity="0.60" />
          <circle cx="0"   cy="0"   r="158" fill="none" stroke="#3A3A4A" strokeWidth="0.7" strokeOpacity="0.30" />
          <circle cx="1440" cy="680" r="200" fill="#111118" fillOpacity="0.55" />
          <line x1="0"    y1="0"   x2="140" y2="190" stroke="#3A3A4A" strokeWidth="0.55" strokeOpacity="0.28" />
          <line x1="1440" y1="680" x2="1300" y2="490" stroke="#3A3A4A" strokeWidth="0.55" strokeOpacity="0.28" />
          <circle cx="50"   cy="50"  r="4"   fill="#D4D4DC" fillOpacity="0.28" />
          <circle cx="1400" cy="630" r="4"   fill="#D4D4DC" fillOpacity="0.25" />
          <rect x="1390" y="40"  width="24" height="24" rx="0" fill="none" stroke="#D4D4DC" strokeWidth="0.6" strokeOpacity="0.16" />
          <rect x="14"   y="610" width="24" height="24" rx="0" fill="none" stroke="#3A3A4A" strokeWidth="0.6" strokeOpacity="0.40" />
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
            Ce qu'ils disent
          </p>
          <h2 className="font-display font-black italic text-4xl lg:text-5xl text-bone uppercase mb-8">
            Avis Google
          </h2>

          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-xl bg-obsidian border border-steel/40">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center flex-shrink-0">
              <span className="font-heading font-black text-lg text-void leading-none">G</span>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-marker text-2xl leading-none" style={{ color: '#E8FF00', textShadow: '0 0 14px rgba(232,255,0,0.35)' }}>
                  {displayRating}
                </span>
                <Stars count={5} />
              </div>
              <p className="text-[10px] tracking-[0.18em] uppercase text-ash">
                Basé sur {displayTotalRatings} avis Google
              </p>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 rounded-xl border border-steel/40 bg-obsidian/60 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
            {reviews.map((review, i) => (
              <ReviewCard key={review.id} review={review} index={i} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <a
            href="https://www.google.com/search?sca_esv=91390b2ecb4203d7&sxsrf=ANbL-n5HI2thOCTp2Zxq8at-ec26De0eHA:1780663568919&q=Alexis+Saucede+Coaching&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOUmCWK73XdpyndXMpUHZ4b0_-ixjWdkDx5lv5P-KBcgw4uMs2AU3e-SKGVALw-z9T0-8oRw%3D&uds=ALYpb_laoggYFqOKyTbpHCEixPsCPNysPoAIUtEoFQOTFdaT2D3wZC1mJziLW2nkjt8kcNw1acjkSl-fFb0Syu7tWzOCKsQGESGRtac9pFhGp3pMYYWqOvBa0Dd-zm9YQ0-oKu8VG9kC&sa=X&ved=2ahUKEwj9pvXbkPCUAxURUKQEHaIiC2wQ3PALegQIHBAE"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-ash hover:text-white transition-colors duration-300 underline underline-offset-4 decoration-steel/50 hover:decoration-white/40"
          >
            Voir tous les avis sur Google
          </a>
        </div>
      </div>
    </section>
  )
}
