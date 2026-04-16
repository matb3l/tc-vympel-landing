'use client'

import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Animate, MagneticHover } from '@/components/motion'

const BENEFITS = [
  'Бесплатная консультация технолога',
  'Каталог с актуальными ценами',
  'Персональная скидка на первый заказ',
  'Отгрузка со склада в день заказа',
]

export function CTASection() {
  return (
    <section className="min-h-screen flex items-center gradient-brand relative overflow-hidden" style={{ padding: 'clamp(3rem, 8vw, 7rem) 0' }}>
      <div className="container-fluid relative w-full">
        <div className="text-center max-w-3xl mx-auto">
          <Animate>
            <h2 className="text-fluid-h2 font-black text-white leading-tight" style={{ marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}>
              Готовы оптимизировать закупки?
            </h2>
          </Animate>
          <Animate delay={0.1}>
            <p className="text-fluid-body text-white/80 max-w-xl mx-auto" style={{ marginBottom: 'clamp(1.5rem, 3vw, 2rem)' }}>
              Более 500 предприятий уже экономят с нами до 20% на ингредиентах. Присоединяйтесь.
            </p>
          </Animate>
          <Animate delay={0.15}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-fluid max-w-lg mx-auto text-left" style={{ marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
              {BENEFITS.map((b) => (
                <div key={b} className="flex items-center gap-2 text-white/90 text-fluid-sm">
                  <CheckCircle2 className="w-4 h-4 text-white/70 flex-shrink-0" />
                  {b}
                </div>
              ))}
            </div>
          </Animate>
          <Animate delay={0.2}>
            <MagneticHover strength={0.1}>
              <Button asChild size="lg" variant="secondary" className="bg-white text-brand-700 hover:bg-white/90 shadow-xl shadow-brand-900/30">
                <a href="#contact" className="group">
                  Получить предложение
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Button>
            </MagneticHover>
          </Animate>
        </div>
      </div>
    </section>
  )
}
