import { motion } from 'framer-motion'
import { Check, MapPin, Monitor, Zap, MessageCircle } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1]
const VP   = { once: true, margin: '200px' }

const FEATURES_ONLINE = [
  'Suivi en ligne',
  'Rdv analyse de début de suivi offert',
  'Coaching à distance. Rdv en visio récurrents pour une progression assurée',
  "Programme d'entraînement personnalisé avec application dédiée",
  'Directives nutritionnelles et calcul de macro nutriments',
  "Suivi hebdomadaire des séances et de l'évolution du poids",
  'Ajustements réguliers pour optimisation des résultats',
  'Disponibilité continue pour répondre aux problématiques',
  'Adaptations des dépenses énergétiques quotidiennes',
  'Photos avant après',
]

const FEATURES_PRESENTIEL = [
  "Séance d'essai offerte",
  'Entraînements en présentiel',
  'Programme sur-mesure',
  'Suivi de progression',
  'Correction technique en direct',
]

export default function ProductShowcase() {
  return (
    <section id="tarifs" className="relative py-28 px-6 lg:px-10 bg-void">

      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
          <circle cx="0"    cy="400" r="320" fill="#111118" fillOpacity="0.50" />
          <circle cx="0"    cy="400" r="230" fill="none" stroke="#3A3A4A" strokeWidth="0.7" strokeOpacity="0.40" />
          <circle cx="1440" cy="400" r="280" fill="#111118" fillOpacity="0.45" />
          <circle cx="1440" cy="400" r="200" fill="none" stroke="#D4D4DC" strokeWidth="0.5" strokeOpacity="0.10" />
          <line x1="0"    y1="0"   x2="140" y2="180" stroke="#3A3A4A" strokeWidth="0.6" strokeOpacity="0.30" />
          <line x1="1440" y1="0"   x2="1300" y2="180" stroke="#3A3A4A" strokeWidth="0.6" strokeOpacity="0.30" />
          <circle cx="60"   cy="80"  r="5.5" fill="#D4D4DC" fillOpacity="0.35" />
          <circle cx="38"   cy="58"  r="3"   fill="#D4D4DC" fillOpacity="0.25" />
          <circle cx="1400" cy="80"  r="5.5" fill="#D4D4DC" fillOpacity="0.35" />
          <rect x="12"   y="700" width="28" height="28" rx="0" fill="none" stroke="#3A3A4A" strokeWidth="0.65" strokeOpacity="0.45" />
          <rect x="1400" y="700" width="28" height="28" rx="0" fill="none" stroke="#D4D4DC" strokeWidth="0.65" strokeOpacity="0.20" />
        </svg>
      </div>

      <div className="relative max-w-5xl mx-auto">

        {/* En-tête */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <p className="text-[11px] tracking-[0.28em] uppercase mb-4" style={{ color: '#E8FF00' }}>
            Investissez dans votre physique
          </p>
          <h2 className="font-display font-black italic text-4xl lg:text-5xl text-bone uppercase mb-4">
            Tarifs & Formules
          </h2>
          <p className="text-ash max-w-xl mx-auto leading-relaxed text-sm">
            Deux modes d'accompagnement adaptés à votre situation, vos objectifs et votre niveau de départ.
          </p>
        </motion.div>

        {/* ── Grille deux cartes ───────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* ── Carte En ligne ─────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.9, ease: EASE }}
            className="flex flex-col rounded-xl border border-white/40 shadow-ember-glow bg-obsidian overflow-hidden"
          >
            {/* Header carte */}
            <div className="flex items-center gap-3 px-7 pt-7 pb-5 border-b border-steel/40">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-steel/40 flex items-center justify-center flex-shrink-0">
                <Monitor size={14} strokeWidth={1.5} style={{ color: '#E8FF00' }} />
              </div>
              <div>
                <p className="text-sm font-heading font-bold text-bone uppercase tracking-[0.18em]">Coaching En Ligne</p>
                <p className="text-[10px] text-ash tracking-[0.12em] uppercase mt-0.5">100 % à distance · Partout en France</p>
              </div>
            </div>

            <div className="p-7 flex flex-col flex-1">
              {/* Prix */}
              <div className="mb-6 pb-6 border-b border-steel/40">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-[11px] tracking-[0.15em] uppercase text-white/60 font-heading">À partir de</span>
                  <span className="font-marker text-5xl leading-none" style={{ color: '#E8FF00', textShadow: '0 0 20px rgba(232,255,0,0.32)' }}>
                    100 €
                  </span>
                  <span className="font-marker text-lg text-white/70">/ mois</span>
                </div>
                <p className="mt-3 text-sm font-heading font-semibold text-bone tracking-wide">
                  Ton suivi personnalisé et ton tarif sur mesure
                </p>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-3 flex-1 mb-8">
                {FEATURES_ONLINE.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check size={13} strokeWidth={2} className="flex-shrink-0 mt-0.5" style={{ color: '#E8FF00' }} />
                    <span className="text-xs text-ash leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>

              <p className="flex items-center justify-center gap-1.5 text-[9px] tracking-[0.14em] uppercase text-ash/60 mb-4">
                <Zap size={9} style={{ color: '#E8FF00' }} />
                Places limitées ce mois — disponibilité à confirmer
              </p>

              <a
                href="#contact"
                className="flex items-center justify-center gap-2 py-3.5 rounded-lg text-[11px] tracking-[0.18em] uppercase font-heading font-bold transition-all duration-300 text-void hover:opacity-90"
                style={{ background: '#E8FF00' }}
              >
                <Zap size={13} strokeWidth={1.5} />
                Je commence ce suivi →
              </a>
            </div>
          </motion.div>

          {/* ── Carte Présentiel ────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="flex flex-col rounded-xl border border-steel/40 hover:border-white/25 hover:shadow-ember-sm bg-obsidian/60 overflow-hidden transition-all duration-500"
          >
            {/* Header carte */}
            <div className="flex items-center gap-3 px-7 pt-7 pb-5 border-b border-steel/40">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-steel/40 flex items-center justify-center flex-shrink-0">
                <MapPin size={14} strokeWidth={1.5} style={{ color: '#E8FF00' }} />
              </div>
              <div>
                <p className="text-sm font-heading font-bold text-bone uppercase tracking-[0.18em]">Coaching Présentiel</p>
                <p className="text-[10px] text-ash tracking-[0.12em] uppercase mt-0.5">Studio privatif · Saint-Mandé 94160</p>
              </div>
            </div>

            <div className="p-7 flex flex-col flex-1">
              {/* Prix */}
              <div className="mb-6 pb-6 border-b border-steel/40">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-[11px] tracking-[0.15em] uppercase text-white/60 font-heading">À partir de</span>
                  <span className="font-marker text-5xl leading-none" style={{ color: '#E8FF00', textShadow: '0 0 20px rgba(232,255,0,0.32)' }}>
                    70 €
                  </span>
                  <span className="font-marker text-lg text-white/70">/ séance</span>
                </div>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-3 flex-1 mb-8">
                {FEATURES_PRESENTIEL.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check size={13} strokeWidth={2} className="flex-shrink-0 mt-0.5 text-white" />
                    <span className="text-xs text-ash leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="flex items-center justify-center gap-2 py-3.5 rounded-lg text-[11px] tracking-[0.18em] uppercase font-heading font-bold transition-all duration-300 bg-shadow text-bone border border-steel/60 hover:border-white/40 hover:text-white"
              >
                <MessageCircle size={13} strokeWidth={1.5} />
                Réserver mes séances
              </a>
            </div>
          </motion.div>

        </div>

        <p className="text-center text-xs text-white/40 mt-10">
          Tarifs indicatifs · Contactez-moi pour un devis personnalisé adapté à votre situation
        </p>
      </div>
    </section>
  )
}
