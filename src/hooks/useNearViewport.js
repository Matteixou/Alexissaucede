import { useEffect, useState } from 'react'

export default function useNearViewport(ref, rootMargin = '400px') {
  const [near, setNear] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || near) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setNear(true)
        io.disconnect()
      }
    }, { rootMargin })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, rootMargin, near])

  return near
}
