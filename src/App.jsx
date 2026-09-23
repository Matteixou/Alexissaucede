import { useEffect, useState, startTransition, lazy, Suspense } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import CookieBanner from './components/CookieBanner'
import CustomCursor from './components/CustomCursor'
import Hero from './sections/Hero'

const load = {
  Presentation:    () => import('./sections/Presentation'),
  LogoSection:     () => import('./sections/LogoSection'),
  Transformations: () => import('./sections/Transformations'),
  ProductShowcase: () => import('./sections/ProductShowcase'),
  ParallaxBanner:  () => import('./sections/ParallaxBanner'),
  Reviews:         () => import('./sections/Reviews'),
  KeyBenefits:     () => import('./sections/KeyBenefits'),
  Ingredients:     () => import('./sections/Ingredients'),
  FAQ:             () => import('./sections/FAQ'),
  Contact:         () => import('./sections/Contact'),
}
const Presentation     = lazy(load.Presentation)
const LogoSection      = lazy(load.LogoSection)
const Transformations  = lazy(load.Transformations)
const ProductShowcase  = lazy(load.ProductShowcase)
const ParallaxBanner   = lazy(load.ParallaxBanner)
const Reviews          = lazy(load.Reviews)
const KeyBenefits      = lazy(load.KeyBenefits)
const Ingredients      = lazy(load.Ingredients)
const FAQ              = lazy(load.FAQ)
const Contact          = lazy(load.Contact)
const MentionsLegales  = lazy(() => import('./pages/MentionsLegales'))
const CGV              = lazy(() => import('./pages/CGV'))

const YEAR = new Date().getFullYear()

const SECTIONS = [
  <Presentation key="presentation" />,
  <LogoSection key="logo" />,
  <Transformations key="transformations" />,
  <ProductShowcase key="tarifs" />,
  <ParallaxBanner key="banner1" banner={1} position="center" />,
  <Reviews key="avis" />,
  <ParallaxBanner key="banner2" banner={2} position="left bottom" />,
  <KeyBenefits key="methode" />,
  <ParallaxBanner key="banner3" banner={3} position="center" />,
  <Ingredients key="modules" />,
  <ParallaxBanner key="banner4" banner={4} position="right bottom" />,
  <FAQ key="faq" />,
  <Contact key="contact" />,
]

// The pre-rendered HTML holds only the hero. The other sections mount after hydration one per
// frame, in page order: mounting them together meant a single ~200 ms layout task, and a section
// revealed out of order could sit under the hero and trigger the 3D logos' near-viewport loading.
function HomeSections() {
  const [count, setCount] = useState(0)

  useEffect(() => { Object.values(load).forEach((fn) => fn()) }, [])

  useEffect(() => {
    if (count >= SECTIONS.length) return
    let timer
    const frame = requestAnimationFrame(() => {
      timer = setTimeout(() => startTransition(() => setCount((c) => c + 1)), 0)
    })
    return () => { cancelAnimationFrame(frame); clearTimeout(timer) }
  }, [count])

  return <Suspense fallback={null}>{SECTIONS.slice(0, count)}</Suspense>
}

export default function App() {

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    const lenis = new Lenis({
      duration:        1.1,
      easing:          (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel:     true,
      wheelMultiplier: 0.9,
      infinite:        false,
    })
    window.__lenis = lenis

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  const MainPage = (
    <div className="min-h-screen bg-void font-sans antialiased grain-overlay">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-void focus:border focus:border-steel/60 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-heading focus:tracking-wide"
      >
        Passer au contenu principal
      </a>
      <CustomCursor />
      <Navbar />

      <main id="main-content">
        <Hero />
        <HomeSections />
      </main>

      <CookieBanner />

      <footer className="relative border-t border-steel/40 py-12 bg-abyss overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
          viewBox="0 0 1440 120"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <line x1="0"    y1="0"   x2="80"   y2="120" stroke="#3A3A4A" strokeWidth="0.75" strokeOpacity="0.40" />
          <line x1="1440" y1="0"   x2="1360" y2="120" stroke="#3A3A4A" strokeWidth="0.75" strokeOpacity="0.40" />
          <circle cx="40"   cy="38"  r="3.5" fill="#D4D4DC" fillOpacity="0.50" />
          <circle cx="1400" cy="38"  r="3.5" fill="#D4D4DC" fillOpacity="0.50" />
        </svg>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 flex flex-col items-center gap-6">
          <img
            src="/logo-112.webp"
            alt="Alexis Saucede Coaching"
            className="h-14 w-14 object-contain rounded-xl"
            width="56"
            height="56"
            loading="lazy"
          />

          <p className="text-xs tracking-[0.22em] uppercase text-ash text-center">
            Coaching Musculation · Suivi Personnalisé · Méthode Prouvée
          </p>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs tracking-widest uppercase text-ash">
            <a href="#presentation"    className="hover:text-white transition-colors duration-300">Coach</a>
            <a href="#methode"         className="hover:text-white transition-colors duration-300">Méthode</a>
            <a href="#transformations" className="hover:text-white transition-colors duration-300">Transformations</a>
            <a href="#avis"            className="hover:text-white transition-colors duration-300">Avis</a>
            <a href="#tarifs"          className="hover:text-white transition-colors duration-300">Tarifs</a>
            <a href="#faq"             className="hover:text-white transition-colors duration-300">FAQ</a>
            <a href="#contact"         className="hover:text-white transition-colors duration-300">Contact</a>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-xs text-ash/40">
            {/* Le HTML pré-rendu porte l'année du build : React la corrige sans erreur d'hydratation */}
            <p suppressHydrationWarning>{`© ${YEAR} Alexis Saucede. Tous droits réservés.`}</p>
            <span aria-hidden="true">·</span>
            <Link to="/mentions-legales" className="hover:text-ash transition-colors duration-300">
              Mentions légales
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/cgv" className="hover:text-ash transition-colors duration-300">
              CGV
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={MainPage} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/cgv" element={<CGV />} />
      </Routes>
    </Suspense>
  )
}
