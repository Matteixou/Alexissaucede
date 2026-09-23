import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ParallaxBanner({ banner, position = 'center' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <div ref={ref} className="relative h-[220px] sm:h-[300px] md:h-[400px] overflow-hidden">
      <motion.div
        className="absolute inset-0 w-full"
        style={{ height: '110%', top: '-5%', y, willChange: 'transform' }}
      >
        <img
          src={`/banner-${banner}-960.webp`}
          srcSet={`/banner-${banner}-640.webp 640w, /banner-${banner}-960.webp 960w`}
          sizes="100vw"
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
          style={{ objectPosition: position }}
        />
      </motion.div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #0A0A0F 0%, transparent 25%, transparent 75%, #111118 100%)' }}
      />
      <div className="absolute inset-0 bg-void/20 pointer-events-none" />
    </div>
  )
}
