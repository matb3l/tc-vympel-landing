'use client'

import { Stamp, Printer, FlaskConical, Wrench, Package, BookOpen } from 'lucide-react'
import { Animate, Stagger, StaggerItem } from '@/components/motion'

const ICONS = [Stamp, Package, Printer, FlaskConical, BookOpen, Wrench]

type Service = { id: string; title: string; description: string }
type Props = { data: Service[] }

export function ServicesSection({ data }: Props) {
  return (
    <section id="services" className="min-h-screen flex items-center gradient-dark" style={{ padding: 'clamp(3rem, 8vw, 7rem) 0' }}>
      <div className="container-fluid w-full">
        <Animate>
          <div className="text-center max-w-2xl mx-auto" style={{ marginBottom: 'clamp(2rem, 5vw, 3.5rem)' }}>
            <span className="inline-block text-fluid-sm font-semibold text-brand-400 uppercase tracking-wider" style={{ marginBottom: 'clamp(0.5rem, 1vw, 0.75rem)' }}>Услуги</span>
            <h2 className="text-fluid-h2 font-black text-white leading-tight" style={{ marginBottom: 'clamp(0.75rem, 2vw, 1rem)' }}>
              Не просто поставки — <span className="text-gradient">комплексные решения</span>
            </h2>
            <p className="text-fluid-body text-white/60">
              Собственный цех маркировки, гофрирования и печати. Всё на одной площадке.
            </p>
          </div>
        </Animate>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-fluid" staggerDelay={0.08}>
          {data.map((service, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <StaggerItem key={service.id}>
                <div className="group bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-brand-500/20 transition-all duration-500" style={{ padding: 'clamp(1rem, 2.5vw, 1.5rem)', borderRadius: 'clamp(0.75rem, 2vw, 1.25rem)' }}>
                  <div className="w-11 h-11 rounded-xl bg-brand-600/20 flex items-center justify-center mb-4 group-hover:bg-brand-600/30 transition-colors">
                    <Icon className="w-5 h-5 text-brand-400" />
                  </div>
                  <h3 className="text-fluid-h3 font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">{service.title}</h3>
                  <p className="text-fluid-sm text-white/60">{service.description}</p>
                </div>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
