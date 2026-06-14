import { useState, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Instagram, Mail, MapPin, Phone, MessageCircle, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react'

const ContactCanvas = lazy(() => import('./ContactCanvas'))

const EASE = [0.16, 1, 0.3, 1]

const SOCIALS = [
  {
    label:  'Instagram',
    handle: '@alexissaucede',
    href:   'https://instagram.com/alexissaucede',
    icon:   Instagram,
    color:  'hover:text-pink-400',
  },
  {
    label:  'WhatsApp',
    handle: '06 35 54 48 56',
    href:   'https://wa.me/33635544856',
    icon:   MessageCircle,
    color:  'hover:text-green-400',
  },
]

const INFOS = [
  { icon: Mail,    label: 'Email',               value: 'alexis.saucede@gmail.com', href: 'mailto:alexis.saucede@gmail.com' },
  { icon: Phone,   label: 'Téléphone / WhatsApp', value: '06 35 54 48 56',          href: 'tel:+33635544856' },
  { icon: MapPin,  label: 'Localisation',         value: 'Saint-Mandé (94)',        href: null },
]

const OBJECTIFS   = ['Perte de poids', 'Prise de muscle', 'Remise en forme', 'Autre']
const NIVEAUX     = ['Débutant', 'Intermédiaire', 'Confirmé']
const ENTRAINEMENTS = ['Salle', 'Maison', 'Extérieur']

const EMPTY_FORM = {
  nom: '', prenom: '', telephone: '', email: '',
  age: '', taille: '', poids: '',
  objectif: '', objectifAutre: '',
  niveau: '',
  problematique: '',
  entrainement: [],
  materiel: '',
  pourquoi: '',
  message: '',
}

const inputClass =
  'w-full bg-shadow/50 border border-steel/40 rounded-lg px-4 py-3 text-sm text-white ' +
  'placeholder:text-white/25 outline-none transition-all duration-200 ' +
  'focus:border-[#E8FF00]/60 focus:ring-2 focus:ring-[#E8FF00]/10'

function Field({ label, required, optional, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] tracking-[0.12em] uppercase text-white/80 font-sans font-medium">
        {label}
        {required && <span className="ml-1 opacity-50">*</span>}
        {optional && <span className="ml-1.5 normal-case tracking-normal opacity-40 text-[10px]">(optionnel)</span>}
      </label>
      {children}
    </div>
  )
}

function ToggleSingle({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => {
        const active = value === opt
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className="px-4 py-2 rounded-lg text-xs font-heading font-semibold tracking-[0.1em] uppercase transition-all duration-200 border"
            style={{
              background:   active ? '#E8FF00' : 'transparent',
              color:        active ? '#050508' : '#D4D4DC',
              borderColor:  active ? '#E8FF00' : '#3A3A4A',
            }}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}

function ToggleMulti({ options, values, onChange }) {
  const toggle = (opt) => {
    const next = values.includes(opt)
      ? values.filter(v => v !== opt)
      : [...values, opt]
    onChange(next)
  }
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => {
        const active = values.includes(opt)
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className="px-4 py-2 rounded-lg text-xs font-heading font-semibold tracking-[0.1em] uppercase transition-all duration-200 border"
            style={{
              background:   active ? '#E8FF00' : 'transparent',
              color:        active ? '#050508' : '#D4D4DC',
              borderColor:  active ? '#E8FF00' : '#3A3A4A',
            }}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}

export default function Contact() {
  const [form, setForm]     = useState(EMPTY_FORM)
  const [status, setStatus] = useState('idle')

  const set = (key) => (e) => setForm(prev => ({ ...prev, [key]: e.target.value }))
  const setVal = (key) => (val) => setForm(prev => ({ ...prev, [key]: val }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formspreeId = import.meta.env.VITE_FORMSPREE_ID

    if (!formspreeId) {
      const lines = [
        `Nom: ${form.nom}`,
        `Prénom: ${form.prenom}`,
        `Email: ${form.email}`,
        `Téléphone: ${form.telephone}`,
        `Âge: ${form.age}`,
        `Taille: ${form.taille} cm`,
        `Poids: ${form.poids} kg`,
        `Objectif: ${form.objectif}${form.objectif === 'Autre' ? ` — ${form.objectifAutre}` : ''}`,
        `Niveau: ${form.niveau}`,
        `Entraînement: ${form.entrainement.join(', ')}`,
        `Matériel: ${form.materiel}`,
        `Problématique: ${form.problematique}`,
        `Pourquoi un coach: ${form.pourquoi}`,
        `Message: ${form.message}`,
      ].join('\n')
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ event: 'form-submit' })
      window.location.href = `mailto:alexis.saucede@gmail.com?subject=Questionnaire — ${form.prenom} ${form.nom}&body=${encodeURIComponent(lines)}`
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...form,
          objectif:     form.objectif === 'Autre' ? `Autre — ${form.objectifAutre}` : form.objectif,
          entrainement: form.entrainement.join(', '),
        }),
      })
      if (res.ok) {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({ event: 'form-submit' })
        setStatus('success')
        setForm(EMPTY_FORM)
      } else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <section id="contact" className="relative py-28 px-6 lg:px-10 bg-obsidian border-t border-steel/40">

      <Suspense fallback={null}>
        <div className="absolute inset-0 pointer-events-none select-none" style={{ opacity: 0.28 }} aria-hidden="true">
          <ContactCanvas />
        </div>
      </Suspense>
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{ background: 'radial-gradient(ellipse 85% 80% at 50% 50%, transparent 30%, #111118 100%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto">

        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '200px' }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <p className="text-[11px] tracking-[0.28em] uppercase mb-4" style={{ color: '#E8FF00' }}>
            Bilan personnalisé gratuit
          </p>
          <h2 className="font-marker text-4xl lg:text-5xl text-bone mb-4">
            Parlons de ton projet
          </h2>
          <p className="text-ash max-w-lg mx-auto leading-relaxed text-sm">
            Bilan personnalisé 100% gratuit · Alexis te répond sous 24 h · 500+ personnes coachées
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <span className="text-[11px] tracking-[0.12em] text-ash/70">⭐ 5.0 — 42 avis Google</span>
            <span className="text-steel/50">·</span>
            <span className="text-[11px] tracking-[0.12em] text-ash/70">8 ans d'expérience</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16 items-start">

          {/* ── Colonne gauche ───────────────────────────────────────────── */}
          <motion.div
            className="flex flex-col gap-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '200px' }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          >
            <div>
              <p className="text-[10px] tracking-[0.22em] uppercase text-ash mb-5 font-heading">
                Retrouve-moi sur
              </p>
              <div className="flex flex-col gap-3">
                {SOCIALS.map(({ label, handle, href, icon: Icon, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-4 rounded-xl border border-steel/40 hover:border-white/25 bg-shadow/60 transition-all duration-300 hover:shadow-ember-sm"
                  >
                    <div className="w-10 h-10 rounded-full border border-steel/60 flex items-center justify-center flex-shrink-0 group-hover:border-white/30 transition-colors duration-300">
                      <Icon size={16} strokeWidth={1.5} className={`text-chrome ${color} transition-colors duration-300`} />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.15em] uppercase text-ash">{label}</p>
                      <p className="text-sm font-heading font-semibold mt-0.5 transition-colors duration-300" style={{ color: '#E8FF00' }}>
                        {handle}
                      </p>
                    </div>
                    <svg className="ml-auto text-ash group-hover:text-white transition-colors duration-300 flex-shrink-0" width="13" height="13" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] tracking-[0.22em] uppercase text-ash mb-5 font-heading">
                Coordonnées
              </p>
              <div className="flex flex-col gap-4">
                {INFOS.map(({ icon: Icon, label, value, href }) => {
                  const inner = (
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full border border-steel/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon size={14} strokeWidth={1.5} className="text-white" />
                      </div>
                      <div>
                        <p className="text-[10px] tracking-[0.15em] uppercase text-ash">{label}</p>
                        <p className="text-sm text-bone font-heading font-semibold mt-0.5">{value}</p>
                      </div>
                    </div>
                  )
                  return href
                    ? <a key={label} href={href} className="hover:opacity-80 transition-opacity duration-200">{inner}</a>
                    : <div key={label}>{inner}</div>
                })}
              </div>
            </div>
          </motion.div>

          {/* ── Colonne droite : questionnaire ──────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '200px' }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
          >
            <div className="bg-shadow/30 border border-steel/40 rounded-2xl p-7 lg:p-9">
              <p className="text-[11px] tracking-[0.18em] uppercase text-white/70 mb-7 font-sans font-medium">
                Questionnaire
              </p>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="flex flex-col items-center text-center gap-5 py-10"
                  >
                    <CheckCircle size={48} strokeWidth={1.2} style={{ color: '#E8FF00' }} />
                    <div>
                      <p className="font-heading font-bold text-xl text-bone uppercase tracking-wide mb-2">
                        Questionnaire envoyé !
                      </p>
                      <p className="text-sm text-ash leading-relaxed">
                        Alexis reviendra vers toi dans les 24 h.
                      </p>
                    </div>
                    <button
                      onClick={() => setStatus('idle')}
                      className="text-[10px] tracking-[0.18em] uppercase text-ash hover:text-white transition-colors duration-200 underline underline-offset-4"
                    >
                      Envoyer un autre message
                    </button>
                  </motion.div>

                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                  >

                    {/* Nom + Prénom */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="Nom" required>
                        <input type="text" required placeholder="Dupont" value={form.nom} onChange={set('nom')} className={inputClass} />
                      </Field>
                      <Field label="Prénom" required>
                        <input type="text" required placeholder="Thomas" value={form.prenom} onChange={set('prenom')} className={inputClass} />
                      </Field>
                    </div>

                    {/* Tel + Email */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="Téléphone" optional>
                        <input type="tel" placeholder="06 XX XX XX XX" value={form.telephone} onChange={set('telephone')} className={inputClass} />
                      </Field>
                      <Field label="Email" required>
                        <input type="email" required placeholder="ton@email.fr" value={form.email} onChange={set('email')} className={inputClass} />
                      </Field>
                    </div>

                    {/* Séparateur infos physiques */}
                    <div className="flex items-center gap-3 my-1">
                      <div className="flex-1 h-px bg-steel/25" />
                      <span className="text-[9px] tracking-[0.18em] uppercase text-white/30 font-sans">Infos physiques (optionnel)</span>
                      <div className="flex-1 h-px bg-steel/25" />
                    </div>

                    {/* Age + Taille + Poids */}
                    <div className="grid grid-cols-1 min-[420px]:grid-cols-3 gap-4">
                      <Field label="Âge" optional>
                        <input type="number" min="10" max="99" placeholder="25" value={form.age} onChange={set('age')} className={inputClass} />
                      </Field>
                      <Field label="Taille (cm)" optional>
                        <input type="number" min="100" max="250" placeholder="175" value={form.taille} onChange={set('taille')} className={inputClass} />
                      </Field>
                      <Field label="Poids (kg)" optional>
                        <input type="number" min="30" max="300" placeholder="75" value={form.poids} onChange={set('poids')} className={inputClass} />
                      </Field>
                    </div>

                    {/* Séparateur */}
                    <div className="border-t border-steel/30 my-1" />

                    {/* Objectif */}
                    <Field label="Objectif" required>
                      <ToggleSingle options={OBJECTIFS} value={form.objectif} onChange={setVal('objectif')} />
                    </Field>
                    <AnimatePresence>
                      {form.objectif === 'Autre' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <input
                            type="text"
                            placeholder="Précisez votre objectif…"
                            value={form.objectifAutre}
                            onChange={set('objectifAutre')}
                            className={inputClass}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Niveau */}
                    <Field label="Niveau de pratique">
                      <ToggleSingle options={NIVEAUX} value={form.niveau} onChange={setVal('niveau')} />
                    </Field>

                    {/* Entraînement */}
                    <Field label="Lieu d'entraînement">
                      <ToggleMulti options={ENTRAINEMENTS} values={form.entrainement} onChange={setVal('entrainement')} />
                    </Field>

                    {/* Matériel */}
                    <Field label="Matériel disponible" optional>
                      <input type="text" placeholder="ex : haltères, barre, TRX, aucun…" value={form.materiel} onChange={set('materiel')} className={inputClass} />
                    </Field>

                    {/* Séparateur */}
                    <div className="flex items-center gap-3 my-1">
                      <div className="flex-1 h-px bg-steel/25" />
                      <span className="text-[9px] tracking-[0.18em] uppercase text-white/30 font-sans">En savoir plus (optionnel)</span>
                      <div className="flex-1 h-px bg-steel/25" />
                    </div>

                    {/* Problématique */}
                    <Field label="Problématique" optional>
                      <textarea rows={2} placeholder="Blessures, contraintes particulières, blocages…" value={form.problematique} onChange={set('problematique')} className={inputClass + ' resize-none'} />
                    </Field>

                    {/* Pourquoi */}
                    <Field label="Pourquoi prendre un coach ?" optional>
                      <textarea rows={2} placeholder="Ce qui t'a décidé à te faire accompagner…" value={form.pourquoi} onChange={set('pourquoi')} className={inputClass + ' resize-none'} />
                    </Field>

                    {/* Message supplémentaire */}
                    <Field label="Message supplémentaire" optional>
                      <textarea rows={3} placeholder="Toute autre information utile…" value={form.message} onChange={set('message')} className={inputClass + ' resize-none'} />
                    </Field>

                    {/* Erreur */}
                    <AnimatePresence>
                      {status === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2 text-red-400 text-xs"
                        >
                          <AlertCircle size={14} strokeWidth={1.5} />
                          Une erreur est survenue. Réessaie ou contacte-moi directement par mail.
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={status === 'sending'}
                      whileHover={{ scale: status === 'sending' ? 1 : 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="mt-1 flex items-center justify-center gap-3 w-full py-4 rounded-xl text-[11px] tracking-[0.22em] uppercase font-heading font-bold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{
                        background: status === 'sending' ? '#3A3A4A' : '#E8FF00',
                        color: '#050508',
                      }}
                    >
                      {status === 'sending' ? (
                        <>
                          <Loader size={14} strokeWidth={2} className="animate-spin" />
                          Envoi en cours…
                        </>
                      ) : (
                        <>
                          <Send size={14} strokeWidth={2} />
                          Envoyer mon questionnaire
                        </>
                      )}
                    </motion.button>

                    <p className="text-[10px] text-ash/50 text-center">
                      * Champs obligatoires · Réponse sous 24 h
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
