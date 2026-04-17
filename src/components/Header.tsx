'use client'

import { useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Phone, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NAV, SETTINGS } from '@/lib/content'

const NAV_ITEMS = NAV
const phoneHref = `tel:${SETTINGS.phone.replace(/\D/g, '')}`

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()

  const bg = useTransform(scrollY, [0, 80], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.95)'])
  const blur = useTransform(scrollY, [0, 80], ['blur(0px)', 'blur(20px)'])
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.08])
  const shadow = useTransform(scrollY, [0, 80], ['0 0 0 0 rgba(0,0,0,0)', '0 1px 12px 0 rgba(0,0,0,0.06)'])
  const textColor = useTransform(scrollY, [0, 60], ['rgba(255,255,255,1)', 'rgba(15,23,42,1)'])
  const textSubColor = useTransform(scrollY, [0, 60], ['rgba(255,255,255,0.5)', 'rgba(148,163,184,1)'])
  const navColor = useTransform(scrollY, [0, 60], ['rgba(255,255,255,0.7)', 'rgba(100,116,139,1)'])
  const borderBottom = useTransform(borderOpacity, (v) => `1px solid rgba(15,23,42,${v})`)

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        backgroundColor: bg,
        backdropFilter: blur,
        WebkitBackdropFilter: blur,
        boxShadow: shadow,
        borderBottom,
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="container-fluid flex items-center justify-between" style={{ height: 'clamp(3.5rem, 6vw, 4.5rem)' }}>
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center text-white font-display font-black text-lg shadow-md shadow-brand-900/30">В</div>
          <div className="hidden sm:block">
            <motion.span className="font-display font-black tracking-tight block leading-none" style={{ color: textColor, fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)' }}>ТЦ ВЫМПЕЛ</motion.span>
            <motion.span className="block font-medium" style={{ color: textSubColor, fontSize: 'clamp(0.5625rem, 0.8vw, 0.6875rem)' }}>всё для мясопереработки</motion.span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <motion.a key={item.href} href={item.href} className="px-3 py-2 rounded-lg text-fluid-sm font-medium hover:bg-black/[0.04] transition-colors" style={{ color: navColor }}>
              {item.label}
            </motion.a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <motion.a href={phoneHref} className="flex items-center gap-2 text-fluid-sm font-bold" style={{ color: textColor }}>
            <div className="w-8 h-8 rounded-lg bg-brand-50/80 flex items-center justify-center">
              <Phone className="w-3.5 h-3.5 text-brand-600" />
            </div>
            {SETTINGS.phone}
          </motion.a>
          <Button asChild size="sm"><a href="#contact">Заявка</a></Button>
        </div>

        <motion.button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg" style={{ color: textColor }}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </motion.button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-t border-dark-100 overflow-hidden"
          >
            <div className="container-fluid py-4 space-y-1">
              {NAV_ITEMS.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-dark-700 font-medium rounded-lg hover:bg-dark-50 transition-colors">{item.label}</a>
              ))}
              <div className="pt-3 mt-3 border-t border-dark-100 space-y-3">
                <a href={phoneHref} className="flex items-center gap-2 px-3 py-2.5 text-dark-900 font-bold">
                  <Phone className="w-4 h-4 text-brand-600" /> {SETTINGS.phone}
                </a>
                <Button asChild className="w-full" size="lg"><a href="#contact" onClick={() => setMobileOpen(false)}>Оставить заявку</a></Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
