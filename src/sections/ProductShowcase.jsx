import { motion } from 'framer-motion'
import { Check, MessageCircle, MapPin, Monitor, Zap } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1]
const VP   = { once: true, margin: '200px' }

const PLAN_PRESENTIEL = {
  id:        'presentiel',
  label:     'Forfait Présentiel',
  sessions:  '10 séances',
  price:     '700 €',
  perUnit:   '70 € / séance',
  highlight: false,
  badge:     null,
  cta:       'Réserver mes 10 séances',
  features:  [
    'Séance d\'essai offerte',
    'Entraînements en présentiel',
    'Programme sur-mesure',
    'Suivi de progression',
    'Correction technique en direct',
  ],
}

const PLANS_ONLINE = [
  {
    id:        'suivi3',
    label:     'Suivi 3 mois',
    sessions:  '3 mois',
    price:     '600 €',
    perUnit:   '200 € / mois',
    highlight: false,
    badge:     null,
    cta:       'Démarrer 3 mois',
    features:  [
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
    ],
  },
  {
    id:        'suivi6',
    label:     'Suivi 6 mois',
    sessions:  '6 mois',
    price:     '900 €',
    perUnit:   '150 € / mois',
    highlight: true,
    badge:     'Meilleure valeur',
    cta:       'Je commence ce suivi →',
    features:  [
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
    ],
  },
]

function PlanCard({ plan, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      transition={{ duration: 0.9, ease: EASE, delay: index * 0.08 }}
      className={`relative flex flex-col rounded-xl border transition-all duration-500 overflow-hidden ${
        plan.highlight
          ? 'border-white/40 shadow-ember-glow bg-obsidian'
          : 'border-steel/40 hover:border-white/25 hover:shadow-ember-sm bg-obsidian/60'
      }`}
    >
      {plan.badge && (
        <div className="absolute top-0 left-0 right-0 py-1.5 text-center" style={{ background: '#E8FF00' }}>
          <span className="text-[10px] tracking-[0.22em] uppercase text-void font-heading font-bold">
            {plan.badge}
          </span>
        </div>
      )}

      <div className={`flex flex-col flex-1 p-7 ${plan.badge ? 'pt-12' : ''}`}>

        <p className="text-[10px] tracking-[0.22em] uppercase text-ash mb-2">
          {plan.sessions}
        </p>
        <h3 className="font-heading font-bold text-xl text-bone uppercase tracking-wide mb-6">
          {plan.label}
        </h3>

        <div className="mb-6 pb-6 border-b border-steel/40">
          <p className="font-marker text-4xl leading-none" style={{ color: '#E8FF00', textShadow: '0 0 16px rgba(232,255,0,0.28)' }}>
            {plan.price}
          </p>
          <p className="font-marker text-sm text-white/70 mt-1.5">
            {plan.perUnit}
          </p>
        </div>

        <ul className="flex flex-col gap-3 flex-1 mb-8">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <Check size={13} strokeWidth={2} className="flex-shrink-0 mt-0.5" style={{ color: plan.highlight ? '#E8FF00' : '#ffffff' }} />
              <span className="text-xs text-ash leading-relaxed">{f}</span>
            </li>
          ))}
        </ul>

        {plan.highlight && (
          <p className="flex items-center justify-center gap-1.5 text-[9px] tracking-[0.14em] uppercase text-ash/60 mb-3">
            <Zap size={9} style={{ color: '#E8FF00' }} />
            Places limitées ce mois — disponibilité à confirmer
          </p>
        )}

        <a
          href="#contact"
          className={`flex items-center justify-center gap-2 py-3.5 rounded-lg text-[11px] tracking-[0.18em] uppercase font-heading font-bold transition-all duration-300 ${
            plan.highlight
              ? 'text-void hover:opacity-90'
              : 'bg-shadow text-bone border border-steel/60 hover:border-white/40 hover:text-white'
          }`}
          style={plan.highlight ? { background: '#E8FF00' } : {}}
        >
          {plan.highlight ? (
            <>
              <Zap size={13} strokeWidth={1.5} />
              {plan.cta}
            </>
          ) : (
            <>
              <MessageCircle size={13} strokeWidth={1.5} />
              {plan.cta}
            </>
          )}
        </a>
      </div>
    </motion.div>
  )
}

function CategoryHeader({ Icon, title, subtitle, index }) {
  return (
    <motion.div
      className="flex items-center gap-4 mb-8"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={VP}
      transition={{ duration: 1, ease: EASE, delay: index * 0.1 }}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-white/5 border border-steel/40 flex items-center justify-center flex-shrink-0">
          <Icon size={14} strokeWidth={1.5} style={{ color: '#E8FF00' }} />
        </div>
        <div>
          <p className="text-sm font-heading font-bold text-bone uppercase tracking-[0.18em]">{title}</p>
          <p className="text-[10px] text-ash tracking-[0.12em] uppercase mt-0.5">{subtitle}</p>
        </div>
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-steel/40 to-transparent" />
    </motion.div>
  )
}

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
            Deux modes d'accompagnement adaptés à votre situation, vos objectifs et votre niveau de départ — En salle ou à domicile.
          </p>
        </motion.div>

        {/* ── Bloc En ligne ────────────────────────────────────────────────── */}
        <div className="mb-16">
          <CategoryHeader Icon={Monitor} title="Coaching En Ligne" subtitle="100 % à distance · Partout en France" index={0} />
          <div className="grid sm:grid-cols-2 gap-6">
            {PLANS_ONLINE.map((plan, i) => (
              <PlanCard key={plan.id} plan={plan} index={i} />
            ))}
          </div>
        </div>

        {/* Séparateur */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VP}
          transition={{ duration: 1, ease: EASE }}
        >
          <div className="flex-1 h-px bg-steel/25" />
          <span className="text-[10px] tracking-[0.22em] uppercase text-ash/50 font-heading px-2">ou</span>
          <div className="flex-1 h-px bg-steel/25" />
        </motion.div>

        {/* ── Bloc Présentiel ─────────────────────────────────────────────── */}
        <div>
          <CategoryHeader Icon={MapPin} title="Coaching Présentiel" subtitle="Séances en studio privatif · Saint-Mandé 94160" index={1} />
          <div className="max-w-sm mx-auto">
            <PlanCard plan={PLAN_PRESENTIEL} index={2} />
          </div>
        </div>

        <p className="text-center text-xs text-white/40 mt-10">
          Tarifs indicatifs · Contactez-moi pour un devis personnalisé adapté à votre situation
        </p>
      </div>
    </section>
  )
}
