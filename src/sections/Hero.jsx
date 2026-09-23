import { Zap } from 'lucide-react'

const STATS = [
  { num: 8,   prefix: '',  suffix: ' ANS', bottom: "D'EXPÉRIENCE" },
  { num: 500, prefix: '+', suffix: '',     bottom: 'CLIENTS COACHÉS' },
  { num: 99,  prefix: '',  suffix: '%',    bottom: 'RÉSULTATS' },
]

const delay = (s) => ({ animationDelay: `${s}s` })

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
        <div className="anim-rise inline-flex items-center gap-2.5 mb-6" style={delay(0.05)}>
          <Zap size={11} strokeWidth={1.5} style={{ color: '#E8FF00' }} />
          <span className="text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.28em] uppercase text-white/80">
            Méthode prouvée · Résultats réels
          </span>
          <Zap size={11} strokeWidth={1.5} style={{ color: '#E8FF00' }} />
        </div>

        {/* Titre XXL */}
        <div className="overflow-hidden">
          <h1
            className="anim-reveal font-display font-black italic leading-[0.88] uppercase text-bone"
            style={{ fontSize: 'clamp(3rem, 12vw, 10rem)', ...delay(0.1) }}
          >
            <span className="glitch-hero">Transforme</span>
          </h1>
        </div>
        <div className="overflow-hidden mb-10 lg:mb-14">
          <p
            className="anim-reveal font-display font-black italic leading-[0.88] uppercase"
            style={{ fontSize: 'clamp(3rem, 12vw, 10rem)', color: '#E8FF00', textShadow: '0 0 80px rgba(232,255,0,0.2)', ...delay(0.2) }}
          >
            ton physique
          </p>
        </div>

        {/* Stats */}
        <div
          className="anim-rise grid grid-cols-3 gap-0 border-t border-b border-steel/30 py-8 mb-10 lg:mb-14"
          style={delay(0.4)}
        >
          {STATS.map(({ num, prefix, suffix, bottom }, i) => (
            <div
              key={bottom}
              className={`flex flex-col items-center px-3 sm:px-6 lg:px-10 ${i > 0 ? 'border-l border-steel/30' : ''}`}
            >
              <p
                className="font-marker text-3xl sm:text-5xl lg:text-6xl leading-none mb-1 tabular-nums"
                style={{ color: '#E8FF00', textShadow: '0 0 24px rgba(232,255,0,0.25)' }}
                aria-hidden="true"
              >
                {prefix}<span className="count-up" style={{ '--to': num }} />{suffix}
              </p>
              <span className="sr-only">{prefix}{num}{suffix}</span>
              <p className="text-[8px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.18em] uppercase text-ash font-heading text-center">{bottom}</p>
            </div>
          ))}
        </div>

        {/* Description + preuves sociales — le paragraphe est l'élément LCP mobile : aucune animation d'opacité */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-20">
          <p className="text-base lg:text-lg text-ash leading-[1.75] lg:max-w-xl">
            Coaching personnalisé pour les personnes qui souhaitent être accompagnées dans leur transformation physique.
            Programme d'entraînement, nutrition, suivi hebdomadaire.
            Résultats visibles dès <span className="text-bone font-medium">4 semaines</span>.
          </p>

          <div className="anim-rise flex flex-wrap gap-x-6 gap-y-2 lg:ml-auto" style={delay(0.55)}>
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
        </div>

        {/* CTA */}
        <div className="anim-rise mt-8" style={delay(0.7)}>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative overflow-hidden text-void px-10 py-4 rounded-xl text-[14px] tracking-[0.18em] uppercase font-heading font-bold transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: '#E8FF00' }}
          >
            <span className="relative z-10">Réserver mon bilan personnalisé gratuit →</span>
            <span
              className="absolute inset-0 bg-white -translate-x-[105%] group-hover:translate-x-0 transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              aria-hidden="true"
            />
          </button>
        </div>

      </div>
    </section>
  )
}
