import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1]
const VP   = { once: true, margin: '80px' }

const QUESTIONS = [
  {
    id:       'niveau',
    question: "Ce coaching convient-il aux débutants ?",
    answer:   "Absolument. Nos programmes s'adaptent à tous les niveaux — du débutant complet à l'athlète confirmé. Lors de l'entretien initial, votre coach évalue votre condition physique, votre historique d'entraînement et vos objectifs pour construire un plan parfaitement calibré. Vous ne serez jamais perdu ni dépassé.",
  },
  {
    id:       'materiel',
    question: "Ai-je besoin d'une salle de sport ou de matériel spécifique ?",
    answer:   "Nos programmes sont disponibles en version salle (barres, haltères, machines) et en version home gym (avec ou sans matériel). Précisez simplement votre équipement lors de l'inscription et le programme sera adapté en conséquence. Pas d'équipement imposé — juste des résultats.",
  },
  {
    id:       'duree',
    question: "Combien de temps faut-il consacrer aux entraînements ?",
    answer:   "Les séances durent entre 45 et 75 minutes, 3 à 5 fois par semaine selon le programme choisi. L'intensité prime toujours sur la durée : chaque minute en salle est structurée et optimisée. Un programme de 4 séances bien exécuté surpassera toujours 6 séances improvisées.",
  },
  {
    id:       'resultats',
    question: "En combien de temps vais-je voir des résultats ?",
    answer:   "Les premières adaptations neuromusculaires sont visibles dès 2 à 3 semaines (force, coordination, pump). Des changements physiques mesurables apparaissent entre 4 et 8 semaines selon votre assiduité et votre alimentation. Sur 12 semaines, les transformations sont significatives et durables.",
  },
]

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div
      className="border-b border-steel/40 cursor-pointer group"
      onClick={onToggle}
      role="button"
      aria-expanded={isOpen}
    >
      <div className="flex items-start justify-between py-6 gap-4 sm:gap-8">
        <h3 className="font-heading font-semibold text-base sm:text-xl text-bone group-hover:text-white transition-colors duration-300 leading-snug">
          {item.question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="flex-shrink-0 mt-1"
        >
          <ChevronDown size={18} strokeWidth={1.5} style={{ color: isOpen ? '#E8FF00' : undefined }} className={isOpen ? '' : 'text-ash'} />
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{ overflow: 'hidden' }}
          >
            <p className="text-sm text-ash leading-[1.85] pb-8 max-w-2xl">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openId, setOpenId] = useState(null)
  const toggle = (id) => setOpenId(openId === id ? null : id)

  return (
    <section id="faq" className="relative py-28 px-6 lg:px-10 bg-void">

      {/* ── Décor géométrique ───────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1440 580" preserveAspectRatio="xMidYMid slice">
          <circle cx="720"  cy="290" r="395" fill="none" stroke="#3A3A4A" strokeWidth="0.6" strokeOpacity="0.18" />
          <circle cx="720"  cy="290" r="305" fill="none" stroke="#3A3A4A" strokeWidth="0.5" strokeOpacity="0.12" />
          <circle cx="720"  cy="290" r="215" fill="none" stroke="#D4D4DC" strokeWidth="0.4" strokeOpacity="0.07" />
          <circle cx="0"    cy="0"   r="148" fill="none" stroke="#3A3A4A" strokeWidth="0.75" strokeOpacity="0.28" />
          <circle cx="1440" cy="580" r="122" fill="none" stroke="#D4D4DC" strokeWidth="0.65" strokeOpacity="0.10" />
          <circle cx="1400" cy="66"  r="6.5" fill="#D4D4DC" fillOpacity="0.35" />
          <circle cx="1422" cy="90"  r="4"   fill="#3A3A4A" fillOpacity="0.70" />
          <circle cx="56"   cy="502" r="5.5" fill="#D4D4DC" fillOpacity="0.30" />
          <circle cx="34"   cy="522" r="3.5" fill="#3A3A4A" fillOpacity="0.65" />
          <line x1="0"    y1="104" x2="74"   y2="104" stroke="#3A3A4A" strokeWidth="0.8"  strokeOpacity="0.45" />
          <line x1="1366" y1="476" x2="1440" y2="476" stroke="#3A3A4A" strokeWidth="0.7"  strokeOpacity="0.40" />
          <rect x="1384" y="34" width="24" height="24" rx="0" fill="none" stroke="#D4D4DC" strokeWidth="0.65" strokeOpacity="0.18" />
        </svg>
      </div>

      <div className="relative max-w-3xl mx-auto">

        {/* En-tête */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 1.6, ease: EASE }}
        >
          <p className="text-[11px] tracking-[0.28em] uppercase mb-4" style={{ color: '#E8FF00' }}>
            Questions fréquentes
          </p>
          <h2 className="font-display font-black italic text-4xl lg:text-5xl text-bone uppercase">
            Vos questions, nos réponses
          </h2>
        </motion.div>

        {/* Accordéon */}
        <motion.div
          className="border-t border-steel/40"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 1.6, ease: EASE, delay: 0.15 }}
        >
          {QUESTIONS.map((item) => (
            <FAQItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => toggle(item.id)}
            />
          ))}
        </motion.div>

        <p className="text-center text-sm text-ash mt-14">
          Une autre question ?{' '}
          <a
            href="mailto:contact@alexissaucede.fr"
            className="text-bone underline underline-offset-4 decoration-white/30 hover:text-white hover:decoration-white transition-colors duration-300"
          >
            Écrivez-nous
          </a>
        </p>
      </div>
    </section>
  )
}
