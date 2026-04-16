'use client'

import { Animate, Stagger, StaggerItem } from '@/components/motion'

type Partner = { id: string; name: string; logo?: any }
type Props = { data: Partner[] }

export function PartnersSection({ data }: Props) {
  return (
    <section className="min-h-screen flex items-center bg-white" style={{ padding: 'clamp(3rem, 8vw, 7rem) 0' }}>
      <div className="container-fluid w-full">
        <Animate>
          <div className="text-center max-w-2xl mx-auto" style={{ marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
            <span className="inline-block text-fluid-sm font-semibold text-brand-600 uppercase tracking-wider" style={{ marginBottom: 'clamp(0.5rem, 1vw, 0.75rem)' }}>Партнёры</span>
            <h2 className="text-fluid-h2 font-black text-dark-900 leading-tight" style={{ marginBottom: 'clamp(0.75rem, 2vw, 1rem)' }}>
              Мировые <span className="text-gradient">производители</span>
            </h2>
            <p className="text-fluid-body text-dark-500">Прямые контракты — лучшие цены и стабильные поставки.</p>
          </div>
        </Animate>

        <Stagger className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-fluid" staggerDelay={0.04}>
          {data.map((partner) => (
            <StaggerItem key={partner.id}>
              <div className="group flex items-center justify-center rounded-xl bg-dark-50 hover:bg-white hover:shadow-md hover:shadow-dark-900/[0.04] border border-transparent hover:border-dark-200 transition-all" style={{ height: 'clamp(3.5rem, 6vw, 5rem)' }}>
                <span className="text-fluid-sm font-semibold text-dark-400 group-hover:text-dark-700 tracking-wide transition-colors">
                  {partner.name}
                </span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
