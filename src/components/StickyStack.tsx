'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

type Props = {
  children: React.ReactNode
  index: number
  total: number
}

export function StickyCard({ children, index, total }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const isLast = index === total - 1

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end start'],
  })

  // 120vh container → 20vh sticking room → animation plays in first ~17% of progress
  const scale = useTransform(scrollYProgress, [0, 0.05, 0.18], [1, 1, 0.93])
  const y = useTransform(scrollYProgress, [0, 0.05, 0.18], [0, 0, -40])
  const borderRadius = useTransform(scrollYProgress, [0, 0.05, 0.18], [0, 0, 24])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.08, 0.18], [0, 0, 0.4])

  if (isLast) {
    return (
      <div
        className="relative"
        style={{ zIndex: index + 1, scrollSnapAlign: 'start' }}
      >
        {children}
      </div>
    )
  }

  return (
    <div
      ref={trackRef}
      style={{
        height: '120vh',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
      }}
    >
      <div className="sticky top-0 h-screen" style={{ zIndex: index + 1 }}>
        <motion.div
          className="relative h-full will-change-transform overflow-hidden"
          style={{ scale, y, borderRadius }}
        >
          {children}
          <motion.div
            className="absolute inset-0 bg-black pointer-events-none"
            style={{ opacity: overlayOpacity, borderRadius }}
          />
        </motion.div>
      </div>
    </div>
  )
}
