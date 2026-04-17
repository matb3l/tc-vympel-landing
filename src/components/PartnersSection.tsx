'use client'

import { Animate } from '@/components/motion'

type Partner = { id: string; name: string; logo?: any }
type Props = { data: Partner[] }

export function PartnersSection({ data }: Props) {
  // Делим на 2 ряда для двойного marquee
  const mid = Math.ceil(data.length / 2)
  const row1 = data.slice(0, mid)
  const row2 = data.slice(mid)

  return (
    <section className="min-h-screen flex flex-col justify-center bg-white overflow-hidden" style={{ padding: 'clamp(4rem, 10vw, 8rem) 0' }}>
      <div className="container-fluid w-full">
        <Animate>
          <div className="max-w-3xl" style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
            <div className="flex items-center gap-3 text-fluid-xs font-semibold text-brand-700 uppercase tracking-[0.2em]" style={{ marginBottom: 'clamp(1rem, 2vw, 1.5rem)' }}>
              <span className="w-8 h-px bg-brand-600" />
              Партнёры и бренды
            </div>
            <h2 className="font-display font-black text-dark-900 leading-[0.95]" style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)', letterSpacing: '-0.03em', marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)' }}>
              Прямые контракты с{' '}
              <span className="italic font-normal text-gradient">мировыми брендами</span>
            </h2>
            <p className="text-fluid-body text-dark-500 max-w-xl">
              Никаких посредников — цены и наличие напрямую от производителей. Стабильные поставки даже в кризис.
            </p>
          </div>
        </Animate>
      </div>

      {/* Double marquee — во всю ширину viewport */}
      <div className="relative space-y-4 -mx-[clamp(1.25rem,5vw,6rem)]">
        {/* Верхний ряд */}
        <MarqueeRow partners={row1.length ? row1 : data} />
        {/* Нижний ряд — реверс */}
        <MarqueeRow partners={row2.length ? row2 : data} reverse />

        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
      </div>
    </section>
  )
}

function MarqueeRow({ partners, reverse }: { partners: Partner[]; reverse?: boolean }) {
  // Дублируем для бесшовного зацикливания
  const doubled = [...partners, ...partners, ...partners, ...partners]
  return (
    <div className="overflow-hidden">
      <div className={`flex gap-4 ${reverse ? 'marquee-reverse' : 'marquee'} whitespace-nowrap`}>
        {doubled.map((partner, i) => (
          <div
            key={`${partner.id}-${i}`}
            className="flex-shrink-0 flex items-center justify-center px-10 bg-dark-50 border border-dark-100 hover:border-brand-300 hover:bg-brand-50/50 transition-all duration-500 group"
            style={{ height: 'clamp(4rem, 7vw, 5.5rem)', minWidth: 'clamp(12rem, 18vw, 16rem)', borderRadius: 'clamp(0.75rem, 1.25vw, 1rem)' }}
          >
            <span className="font-display text-dark-600 group-hover:text-brand-700 tracking-tight transition-colors" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.375rem)' }}>
              {partner.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
