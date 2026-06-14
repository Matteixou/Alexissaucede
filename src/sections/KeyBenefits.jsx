import { motion } from 'framer-motion'
import { Target, Dumbbell, TrendingUp } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1]
const VP   = { once: true, margin: '200px' }

const BENEFITS = [
  {
    icon:        Target,
    tag:         'Personnalisé',
    title:       'Programme Sur-Mesure',
    description: "Chaque programme est conçu selon votre morphologie, votre niveau et vos objectifs précis. Pas de copié-collé — votre plan d'entraînement est unique, comme votre physique.",
  },
  {
    icon:        Dumbbell,
    tag:         'Méthode prouvée',
    title:       'Entraînements Optimisés',
    description: "Des séances structurées autour de la surcharge progressive, de la récupération et de la périodisation. Chaque session maximise vos gains tout en minimisant le risque de blessure.",
  },
  {
    icon:        TrendingUp,
    tag:         'Suivi continu',
    title:       'Coaching & Progression',
    description: "Rdv bilan en visio toutes les 2 semaines pour optimiser et ajuster le suivi. Disponibilité constante pour répondre aux questions et problématiques. La clé de la réussite repose sur l'accompagnement humain et l'individualisation.",
  },
]

export default function KeyBenefits() {
  return (
    <section id="methode" className="relative py-28 px-6 lg:px-10 bg-abyss">

      <div className="absolute right-6 top-4 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span className="font-display font-black italic text-[11rem] lg:text-[16rem] leading-none text-white/[0.04]">02</span>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ top: '18%', transform: 'rotate(-1.5deg) scaleX(1.4)' }} />
      </div>

      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice">
          <circle cx="0"    cy="0"   r="270" fill="#111118" fillOpacity="0.80" />
          <circle cx="0"    cy="0"   r="195" fill="none" stroke="#3A3A4A" strokeWidth="0.9" strokeOpacity="0.35" />
          <circle cx="1440" cy="600" r="215" fill="#111118" fillOpacity="0.70" />
          <circle cx="1440" cy="600" r="152" fill="none" stroke="#D4D4DC" strokeWidth="0.7" strokeOpacity="0.12" />
          <line x1="44" y1="175" x2="44" y2="425" stroke="#3A3A4A" strokeWidth="0.75" strokeOpacity="0.50" />
          <circle cx="1388" cy="182" r="6"   fill="#D4D4DC" fillOpacity="0.40" />
          <circle cx="1412" cy="158" r="3.5" fill="#D4D4DC" fillOpacity="0.30" />
          <rect x="1388" y="42" width="32" height="32" rx="0" fill="none" stroke="#3A3A4A" strokeWidth="0.75" strokeOpacity="0.40" />
          <circle cx="82"   cy="538" r="5"   fill="#3A3A4A" fillOpacity="0.70" />
          <circle cx="58"   cy="558" r="3"   fill="#D4D4DC" fillOpacity="0.25" />
          <line x1="1358" y1="88" x2="1440" y2="88" stroke="#3A3A4A" strokeWidth="0.65" strokeOpacity="0.40" />
          <line x1="0"    y1="550" x2="80"  y2="600" stroke="#D4D4DC" strokeWidth="0.5" strokeOpacity="0.15" />
          <line x1="1440" y1="50"  x2="1360" y2="0"  stroke="#D4D4DC" strokeWidth="0.5" strokeOpacity="0.15" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.9, ease: EASE }}
          className="text-center mb-20"
        >
          <p className="text-[11px] tracking-[0.28em] uppercase mb-4" style={{ color: '#E8FF00' }}>
            Notre approche
          </p>
          <h2 className="font-display font-black italic text-4xl lg:text-5xl text-bone uppercase">
            Trois piliers. Zéro compromis.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
                className="group flex flex-col items-center text-center px-6 py-8 md:px-10 md:py-12 rounded-xl border border-steel/40 hover:border-white/20 hover:shadow-ember-sm transition-all duration-500 bg-obsidian/60"
              >
                <div className="w-14 h-14 rounded-full bg-shadow flex items-center justify-center mb-8 group-hover:bg-white/10 transition-colors duration-500 border border-steel/40">
                  <Icon size={22} strokeWidth={1.5} className="text-white" />
                </div>
                <p className="text-[10px] tracking-[0.22em] uppercase mb-4" style={{ color: '#E8FF00', textShadow: '0 0 10px rgba(232,255,0,0.25)' }}>{b.tag}</p>
                <h3 className="font-heading font-bold text-2xl text-bone mb-5 uppercase tracking-wide">{b.title}</h3>
                <p className="text-sm text-ash leading-relaxed">{b.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
