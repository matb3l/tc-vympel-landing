'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

type Props = {
  children: React.ReactNode
  index: number
  total: number
}

export function StickyCard({ children, index, total }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isLast = index === total - 1

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 0.65, 1], [1, 1, 0.15])
  const borderRadius = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0, 24])

  if (isLast) {
    return (
      <div className="relative" style={{ zIndex: index + 1 }}>
        {children}
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className="sticky top-0 h-screen"
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        className="h-screen overflow-hidden will-change-transform"
        style={{ scale, opacity, borderRadius }}
      >
        {children}
      </motion.div>
    </div>
  )
}
