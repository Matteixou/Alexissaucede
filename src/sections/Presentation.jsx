import { motion } from 'framer-motion'
import { Award, Clock, Users } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1]
const VP   = { once: true, margin: '80px' }

const STATS = [
  { icon: Clock,  value: '8 ans',  label: "d'expérience" },
  { icon: Users,  value: '+500',   label: 'personnes accompagnées' },
  { icon: Award,  value: '99%',    label: 'résultats durables' },
]

export default function Presentation() {
  return (
    <section id="presentation" className="relative py-28 px-6 lg:px-10 bg-obsidian overflow-hidden">

      {/* ── Watermark ────────────────────────────────────────────────────── */}
      <div className="absolute left-0 top-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span className="font-display font-black italic text-[16rem] lg:text-[22rem] leading-none text-white/[0.03]">AS</span>
      </div>

      {/* ── Décor géométrique ───────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice">
          <circle cx="1440" cy="360" r="340" fill="#111118" fillOpacity="0.55" />
          <circle cx="1440" cy="360" r="245" fill="none" stroke="#3A3A4A" strokeWidth="0.7" strokeOpacity="0.35" />
          <circle cx="0"    cy="720" r="260" fill="#0A0A0F" fillOpacity="0.60" />
          <circle cx="0"    cy="720" r="185" fill="none" stroke="#D4D4DC" strokeWidth="0.5" strokeOpacity="0.10" />
          <line x1="1300" y1="0"   x2="1440" y2="140" stroke="#3A3A4A" strokeWidth="0.65" strokeOpacity="0.35" />
          <line x1="0"    y1="580" x2="120"  y2="720" stroke="#3A3A4A" strokeWidth="0.65" strokeOpacity="0.30" />
          <circle cx="1388" cy="72"  r="5.5" fill="#D4D4DC" fillOpacity="0.35" />
          <circle cx="1410" cy="50"  r="3"   fill="#D4D4DC" fillOpacity="0.20" />
          <circle cx="52"   cy="648" r="4.5" fill="#D4D4DC" fillOpacity="0.25" />
          <rect x="1388" y="620" width="28" height="28" rx="0" fill="none" stroke="#3A3A4A" strokeWidth="0.7" strokeOpacity="0.40" />
          <rect x="14"   y="30"  width="22" height="22" rx="0" fill="none" stroke="#D4D4DC" strokeWidth="0.5" strokeOpacity="0.15" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-center">

          {/* ── Colonne photo ────────────────────────────────────────────── */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 1.6, ease: EASE }}
          >
            {/* Placeholder photo — remplacer src par la vraie photo d'Alexis */}
            <div className="relative rounded-2xl overflow-hidden border border-steel/40 aspect-[3/4] max-w-sm mx-auto lg:max-w-none bg-shadow">
              {/* Logo centré sur fond sombre */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-shadow via-obsidian to-void">
                <img
                  src="/alexis.jpeg"
                  alt="Alexis Saucede Coach"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Dégradé bas */}
              <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />

              {/* Badge expérience */}
              <div className="absolute bottom-6 left-6 right-6 bg-obsidian/95 backdrop-blur-sm rounded-xl px-5 py-4 border border-steel/40">
                <p className="text-[10px] tracking-[0.22em] uppercase text-ash mb-1">Coach certifié</p>
                <p className="font-heading font-bold text-lg text-bone uppercase tracking-wide leading-tight">
                  Alexis Saucede
                </p>
                <p className="font-marker text-sm mt-0.5" style={{ color: '#E8FF00' }}>
                  Coach sportif
                </p>
              </div>
            </div>

            {/* Ligne décorative latérale */}
            <div
              className="hidden lg:block absolute -left-6 top-12 bottom-12 w-px"
              style={{ background: 'linear-gradient(to bottom, transparent, #E8FF00, transparent)' }}
            />
          </motion.div>

          {/* ── Colonne texte ────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 1.6, ease: EASE, delay: 0.08 }}
          >
            <p className="text-[11px] tracking-[0.28em] uppercase mb-5 font-heading" style={{ color: '#E8FF00' }}>
              Qui est Alexis ?
            </p>

            <h2 className="font-display font-black italic text-4xl lg:text-5xl xl:text-[3.5rem] text-bone uppercase leading-[1.02] mb-8">
              Coach sportif
              <br />
              <em className="not-italic" style={{ color: '#E8FF00', textShadow: '0 0 28px rgba(232,255,0,0.3)' }}>depuis 8 ans.</em>
            </h2>

            <div className="space-y-5 mb-10">
              <p className="text-base text-ash leading-[1.8]">
                Éducateur sportif depuis <span className="text-bone font-medium">8 ans</span>, j'accompagne celles et ceux qui souhaitent
                perdre du poids, prendre du muscle ou simplement retrouver une meilleure forme physique grâce à un{' '}
                <span className="text-bone font-medium">accompagnement personnalisé</span> et adapté à leur quotidien.
              </p>
              <p className="text-base text-ash leading-[1.8]">
                Mon approche repose sur des méthodes <span className="text-bone font-medium">efficaces, progressives et durables</span> : pas de méthode
                miracle, pas de régime drastique, ni de cardio à outrance. L'objectif est de construire des résultats
                solides, tout en respectant votre niveau, votre rythme et votre mode de vie.
              </p>
              <p className="text-base text-ash leading-[1.8]">
                En présentiel comme en coaching à distance, je vous aide à atteindre vos objectifs avec un suivi{' '}
                <span className="text-bone font-medium">sérieux, humain et motivant</span>.
                Les résultats sont au rendez-vous sous réserve d'investissement, de régularité et de motivation.
              </p>
              <blockquote className="border-l-2 pl-4 text-sm text-ash/70 leading-relaxed italic" style={{ borderColor: '#E8FF00' }}>
                "La folie, c'est de faire toujours la même chose et de s'attendre à un résultat différent."
                <span className="not-italic block text-ash/50 text-xs mt-1">— Albert Einstein</span>
              </blockquote>
              <p className="text-base leading-[1.8] font-medium" style={{ color: '#E8FF00' }}>
                Alors si vous êtes prêt à changer vos habitudes pour obtenir de vrais résultats, commençons dès aujourd'hui.
              </p>
              <motion.button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden group text-void px-10 py-4 rounded-xl text-[11px] tracking-[0.22em] uppercase font-heading font-bold mt-2"
                style={{ background: '#E8FF00' }}
              >
                <span className="relative z-10">Réserver mon appel gratuit →</span>
                <motion.span
                  className="absolute inset-0 bg-white"
                  initial={{ x: '-105%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                />
              </motion.button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-steel/40">
              {STATS.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex flex-col items-start gap-2">
                  <Icon size={16} strokeWidth={1.5} style={{ color: '#E8FF00' }} />
                  <p className="font-marker text-2xl sm:text-3xl" style={{ color: '#E8FF00', textShadow: '0 0 14px rgba(232,255,0,0.28)' }}>
                    {value}
                  </p>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-ash leading-snug">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
