import { useRef, useEffect, lazy, Suspense } from 'react'
import { useScroll } from 'framer-motion'

const HeroCanvas = lazy(() => import('./HeroCanvas'))

const zeroRef = { current: 0 }

export default function LogoSection() {
  const { scrollY } = useScroll()
  const scrollRef   = useRef(0)

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => {
      const max = document.body.scrollHeight - window.innerHeight
      scrollRef.current = max > 0 ? v / max : 0
    })
    return unsub
  }, [scrollY])

  return (
    <div className="relative bg-void h-[340px] sm:h-[460px] lg:h-[540px] overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 50%, #0D0D22 0%, #050508 65%, transparent 100%)' }}
        aria-hidden="true"
      />
      <Suspense fallback={null}>
        <HeroCanvas scrollRef={scrollRef} zoomRef={zeroRef} />
      </Suspense>
    </div>
  )
}
