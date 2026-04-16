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

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.92])
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0])
  const borderRadius = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, 24])

  if (isLast) {
    return (
      <div className="relative" style={{ zIndex: index + 1 }}>
        {children}
      </div>
    )
  }

  return (
    <div ref={trackRef} style={{ height: '130vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden" style={{ zIndex: index + 1 }}>
        <motion.div
          className="h-full will-change-transform"
          style={{ scale, opacity, borderRadius }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
