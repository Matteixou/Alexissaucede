import { useRef, useEffect, lazy, Suspense } from 'react'
import { useScroll } from 'framer-motion'
import useNearViewport from '../hooks/useNearViewport'

const HeroCanvas = lazy(() => import('./HeroCanvas'))

const zeroRef = { current: 0 }

export default function LogoSection() {
  const sectionRef = useRef(null)
  const near = useNearViewport(sectionRef, '600px')
  const { scrollY } = useScroll()
  const scrollRef = useRef(0)
  const maxScroll = useRef(1)

  // Page height cached via ResizeObserver: reading scrollHeight on every scroll event forces a reflow
  useEffect(() => {
    const measure = () => { maxScroll.current = Math.max(1, document.documentElement.scrollHeight - window.innerHeight) }
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    window.addEventListener('resize', measure)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure) }
  }, [])

  useEffect(() => {
    return scrollY.on('change', (v) => { scrollRef.current = v / maxScroll.current })
  }, [scrollY])

  return (
    <div ref={sectionRef} className="relative bg-void h-[340px] sm:h-[460px] lg:h-[540px] overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 50%, #0D0D22 0%, #050508 65%, transparent 100%)' }}
        aria-hidden="true"
      />
      {near && (
        <Suspense fallback={null}>
          <HeroCanvas scrollRef={scrollRef} zoomRef={zeroRef} />
        </Suspense>
      )}
    </div>
  )
}
