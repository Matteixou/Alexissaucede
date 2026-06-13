import { useEffect, lazy, Suspense } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import Hero from './sections/Hero'

const Transformations  = lazy(() => import('./sections/Transformations'))
const ParallaxBanner   = lazy(() => import('./sections/ParallaxBanner'))
const Presentation     = lazy(() => import('./sections/Presentation'))
const KeyBenefits      = lazy(() => import('./sections/KeyBenefits'))
const Reviews          = lazy(() => import('./sections/Reviews'))
const ProductShowcase  = lazy(() => import('./sections/ProductShowcase'))
const Ingredients      = lazy(() => import('./sections/Ingredients'))
const FAQ              = lazy(() => import('./sections/FAQ'))
const Contact          = lazy(() => import('./sections/Contact'))
const MentionsLegales  = lazy(() => import('./pages/MentionsLegales'))

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

  const scrollToContact = () => {
    const target = document.getElementById('contact')
    if (!target) return
    if (window.__lenis) {
      window.__lenis.scrollTo(target, { duration: 0.9, easing: (t) => 1 - Math.pow(1 - t, 4) })
    } else {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const MainPage = (
    <div className="min-h-screen bg-void font-sans antialiased grain-overlay">
      <CustomCursor />
      <Navbar />

      <main>
        <Hero onCtaClick={scrollToContact} />
        <Suspense fallback={null}>
          <Transformations />
          <ParallaxBanner src="/banner 1.webp" position="center" />
          <Presentation />
          <KeyBenefits />
          <ParallaxBanner src="/banner 2.webp" position="left bottom" />
          <Reviews />
          <ParallaxBanner src="/banner 3.webp" position="center" />
          <ProductShowcase />
          <Ingredients />
          <ParallaxBanner src="/banner 4.webp" position="right bottom" />
          <FAQ />
          <Contact />
        </Suspense>
      </main>

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
          <picture>
            <source srcSet="/logoalexissaucede.webp" type="image/webp" />
            <img
              src="/logoalexissaucede.jpg"
              alt="Alexis Saucede Coaching"
              className="h-14 w-14 object-contain rounded-xl"
              width="56"
              height="56"
              loading="lazy"
            />
          </picture>

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

          <div className="flex items-center gap-2 text-xs text-ash/40">
            <p>© {new Date().getFullYear()} Alexis Saucede. Tous droits réservés.</p>
            <span>·</span>
            <Link to="/mentions-legales" className="hover:text-ash transition-colors duration-300">
              Mentions légales
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
      </Routes>
    </Suspense>
  )
}
