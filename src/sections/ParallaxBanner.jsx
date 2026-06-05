import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ParallaxBanner({ src, position = 'center' }) {
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
        style={{
          backgroundImage:    `url('${src}')`,
          backgroundSize:     'cover',
          backgroundPosition: position,
          height:             '110%',
          top:                '-5%',
          y,
          willChange:         'transform',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #0A0A0F 0%, transparent 25%, transparent 75%, #111118 100%)' }}
      />
      <div className="absolute inset-0 bg-void/20 pointer-events-none" />
    </div>
  )
}
