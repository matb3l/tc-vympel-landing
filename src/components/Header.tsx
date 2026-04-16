'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'О компании', href: '#about' },
  { label: 'Продукция', href: '#products' },
  { label: 'Услуги', href: '#services' },
  { label: 'Контакты', href: '#contact' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-dark-100/50' : 'bg-transparent',
      )}
    >
      <div className="container-fluid flex items-center justify-between" style={{ height: 'clamp(3.5rem, 6vw, 4.5rem)' }}>
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg gradient-brand flex items-center justify-center text-white font-black text-base shadow-md shadow-brand-600/20">В</div>
          <div className="hidden sm:block">
            <span className={cn('font-bold tracking-tight transition-colors', scrolled ? 'text-dark-900' : 'text-white')} style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1rem)' }}>ТЦ ВЫМПЕЛ</span>
            <span className={cn('block font-medium transition-colors', scrolled ? 'text-dark-400' : 'text-white/50')} style={{ fontSize: 'clamp(0.5625rem, 0.8vw, 0.6875rem)' }}>всё для мясопереработки</span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className={cn('px-3 py-2 rounded-lg text-fluid-sm font-medium transition-colors', scrolled ? 'text-dark-500 hover:text-dark-900 hover:bg-dark-50' : 'text-white/70 hover:text-white hover:bg-white/10')}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+74957870476" className={cn('flex items-center gap-2 text-fluid-sm font-bold transition-colors', scrolled ? 'text-dark-900' : 'text-white')}>
            <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', scrolled ? 'bg-brand-50' : 'bg-white/10')}>
              <Phone className="w-3.5 h-3.5 text-brand-600" />
            </div>
            8 495 787-04-76
          </a>
          <Button asChild size="sm"><a href="#contact">Заявка</a></Button>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className={cn('lg:hidden p-2 rounded-lg transition-colors', scrolled ? 'text-dark-900 hover:bg-dark-50' : 'text-white hover:bg-white/10')}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} className="lg:hidden bg-white border-t border-dark-100 overflow-hidden">
            <div className="container-fluid py-4 space-y-1">
              {NAV_ITEMS.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-dark-700 font-medium rounded-lg hover:bg-dark-50 transition-colors">{item.label}</a>
              ))}
              <div className="pt-3 mt-3 border-t border-dark-100 space-y-3">
                <a href="tel:+74957870476" className="flex items-center gap-2 px-3 py-2.5 text-dark-900 font-bold">
                  <Phone className="w-4 h-4 text-brand-600" /> 8 495 787-04-76
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
