import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, X } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1]
const VP   = { once: true, margin: '80px' }

const MODULES = [
  {
    id:          'force',
    name:        'Force & Hypertrophie',
    subtitle:    'Protocole avancé',
    effect:      'Masse musculaire',
    description: "Un système d'entraînement basé sur la surcharge progressive et la variation des stimuli mécaniques. Alternance de phases de force (80–90 % 1RM) et d'hypertrophie (65–75 % 1RM) pour un développement musculaire optimal et durable.",
    imageSrc:    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=700&q=80',
  },
  {
    id:          'nutrition',
    name:        'Nutrition Stratégique',
    subtitle:    'Macros & Timing',
    effect:      'Composition corporelle',
    description: "Un plan nutritionnel ajusté à la semaine selon vos objectifs (prise de masse, sèche, recomposition) et votre dépense calorique réelle. Calcul précis des macronutriments, timing des repas et suppléments nécessaires.",
    imageSrc:    'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=700&q=80',
  },
  {
    id:          'recovery',
    name:        'Récupération Active',
    subtitle:    'Performance durable',
    effect:      'Prévention & Longévité',
    description: "La récupération représente 50 % du travail. Protocoles de mobilité, gestion du stress et du sommeil intégrés dans votre planning. Réduction des courbatures, prévention des blessures et maintien des niveaux hormonaux optimaux pour progresser sur le long terme.",
    imageSrc:    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=700&q=80',
  },
]


export default function Ingredients() {
  const [expanded, setExpanded] = useState(null)
  const toggle = (id) => setExpanded(expanded === id ? null : id)

  return (
    <section id="resultats" className="relative py-28 px-6 lg:px-10 bg-abyss">

      {/* ── Décor géométrique ───────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1440 820" preserveAspectRatio="xMidYMid slice">
          <circle cx="1440" cy="0"   r="318" fill="#111118" fillOpacity="0.60" />
          <circle cx="1440" cy="0"   r="232" fill="none" stroke="#3A3A4A" strokeWidth="0.8" strokeOpacity="0.35" />
          <circle cx="1440" cy="0"   r="158" fill="none" stroke="#D4D4DC" strokeWidth="0.5" strokeOpacity="0.10" />
          <circle cx="0"    cy="820" r="245" fill="#111118" fillOpacity="0.55" />
          <circle cx="0"    cy="820" r="175" fill="none" stroke="#3A3A4A" strokeWidth="0.7" strokeOpacity="0.30" />
          <circle cx="0"    cy="0"   r="160" fill="none" stroke="#3A3A4A" strokeWidth="0.6" strokeOpacity="0.22" />
          <circle cx="58"   cy="298" r="7"   fill="#D4D4DC" fillOpacity="0.30" />
          <circle cx="34"   cy="326" r="4"   fill="#D4D4DC" fillOpacity="0.20" />
          <circle cx="74"   cy="344" r="2.5" fill="#3A3A4A" fillOpacity="0.80" />
          <circle cx="1394" cy="534" r="5.5" fill="#D4D4DC" fillOpacity="0.28" />
          <circle cx="1418" cy="512" r="3.5" fill="#3A3A4A" fillOpacity="0.70" />
          <line x1="0"    y1="178" x2="90"   y2="178" stroke="#3A3A4A" strokeWidth="0.8" strokeOpacity="0.55" />
          <line x1="1350" y1="752" x2="1440" y2="752" stroke="#D4D4DC" strokeWidth="0.6" strokeOpacity="0.15" />
          <rect x="42" y="712" width="26" height="26" rx="0" fill="none" stroke="#3A3A4A" strokeWidth="0.65" strokeOpacity="0.45" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* En-tête */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 1.6, ease: EASE }}
        >
          <p className="text-[11px] tracking-[0.28em] uppercase mb-4" style={{ color: '#E8FF00' }}>
            Ce qui est inclus
          </p>
          <h2 className="font-display font-black italic text-4xl lg:text-5xl text-bone uppercase mb-4">
            Les modules qui transforment
          </h2>
          <p className="text-ash max-w-lg mx-auto leading-relaxed text-sm">
            Chaque module est conçu pour maximiser votre progression à chaque phase du cycle.
            Un système complet — pas un simple programme PDF.
          </p>
        </motion.div>

        {/* Grille des modules */}
        <div className="grid md:grid-cols-3 gap-6">
          {MODULES.map((module, i) => {
            const isOpen = expanded === module.id
            return (
              <motion.article
                key={module.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 1.6, ease: EASE, delay: i * 0.15 }}
                onClick={() => toggle(module.id)}
                className="group rounded-xl overflow-hidden border border-steel/40 hover:border-white/20 hover:shadow-ember-sm transition-all duration-500 bg-obsidian/60 cursor-pointer"
              >
                {/* Image avec zoom au hover */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <motion.img
                    src={module.imageSrc}
                    alt={module.name}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-70"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.75, ease: EASE }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="bg-obsidian/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-steel/50">
                      <span className="text-[10px] tracking-wide font-heading" style={{ color: '#E8FF00' }}>
                        {module.effect}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Corps de la carte */}
                <div className="p-7">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-heading font-bold text-xl text-bone leading-snug uppercase tracking-wide">
                        {module.name}
                      </h3>
                      <p className="text-[11px] tracking-wide mt-1.5 font-heading" style={{ color: '#E8FF00', opacity: 0.85 }}>
                        {module.subtitle}
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-steel/50 flex items-center justify-center flex-shrink-0 group-hover:border-white/30 transition-colors duration-300 mt-0.5">
                      {isOpen
                        ? <X    size={12} strokeWidth={1.5} className="text-ash" />
                        : <Plus size={12} strokeWidth={1.5} style={{ color: '#E8FF00' }} />
                      }
                    </div>
                  </div>

                  {/* Description révélée */}
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p className="text-sm text-ash leading-relaxed pt-5">
                      {module.description}
                    </p>
                  </motion.div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
