'use client'

import { Stamp, Printer, FlaskConical, Wrench, Package, BookOpen } from 'lucide-react'
import { Animate, Stagger, StaggerItem } from '@/components/motion'

const ICONS = [Stamp, Package, Printer, FlaskConical, BookOpen, Wrench]

type Service = { id: string; title: string; description: string }
type Props = { data: Service[] }

export function ServicesSection({ data }: Props) {
  return (
    <section id="services" className="relative min-h-screen flex items-center gradient-dark grain overflow-hidden" style={{ padding: 'clamp(4rem, 10vw, 8rem) 0' }}>
      <div className="container-fluid w-full relative">
        <Animate>
          <div className="max-w-3xl" style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
            <div className="flex items-center gap-3 text-fluid-xs font-semibold text-brand-400 uppercase tracking-[0.2em]" style={{ marginBottom: 'clamp(1rem, 2vw, 1.5rem)' }}>
              <span className="w-8 h-px bg-brand-500" />
              Услуги
            </div>
            <h2 className="font-display font-black text-white leading-[0.95]" style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)', letterSpacing: '-0.03em', marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)' }}>
              Больше, чем{' '}
              <span className="italic font-normal text-gradient">просто поставки</span>
            </h2>
            <p className="text-fluid-body text-white/60 max-w-xl">
              Собственный цех маркировки, гофрирования, печати. Технологи с опытом 20+ лет. Сопровождение от идеи до серийной партии.
            </p>
          </div>
        </Animate>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10 border-y sm:border border-white/10" staggerDelay={0.06}>
          {data.map((service, i) => {
            const Icon = ICONS[i % ICONS.length]
            const num = String(i + 1).padStart(2, '0')
            return (
              <StaggerItem key={service.id}>
                <div className="group relative h-full p-8 lg:p-10 hover:bg-white/[0.03] transition-colors duration-500">
                  <div className="flex items-start justify-between mb-8">
                    <div className="font-display font-black text-white/20 group-hover:text-brand-500 transition-colors duration-500" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', lineHeight: 1 }}>
                      {num}
                    </div>
                    <Icon className="w-6 h-6 text-white/40 group-hover:text-brand-400 transition-colors" />
                  </div>
                  <h3 className="font-display font-bold text-white leading-tight mb-3" style={{ fontSize: 'clamp(1.25rem, 2vw, 1.625rem)', letterSpacing: '-0.015em' }}>
                    {service.title}
                  </h3>
                  <p className="text-fluid-sm text-white/55 leading-relaxed">{service.description}</p>
                </div>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
