'use client'

import { MapPin, Building, Truck, Globe2 } from 'lucide-react'
import { Animate, Stagger, StaggerItem, CountUp } from '@/components/motion'

const GEO_STATS = [
  { icon: MapPin, value: 70, suffix: '+', label: 'регионов доставки', primary: true },
  { icon: Building, value: 2, suffix: '', label: 'склада в Москве', primary: false },
  { icon: Truck, value: 3, suffix: '', label: 'дня — средний срок', primary: false },
  { icon: Globe2, value: 5, suffix: '+', label: 'стран-поставщиков', primary: false },
]

export function GeographySection() {
  return (
    <section className="min-h-screen flex items-center bg-[#f8fafc]" style={{ padding: 'clamp(3rem, 8vw, 7rem) 0' }}>
      <div className="container-fluid w-full">
        <Animate>
          <div className="text-center max-w-2xl mx-auto" style={{ marginBottom: 'clamp(2rem, 5vw, 3.5rem)' }}>
            <span className="inline-block text-fluid-sm font-semibold text-brand-600 uppercase tracking-wider" style={{ marginBottom: 'clamp(0.5rem, 1vw, 0.75rem)' }}>География</span>
            <h2 className="text-fluid-h2 font-black text-dark-900 leading-tight" style={{ marginBottom: 'clamp(0.75rem, 2vw, 1rem)' }}>
              Работаем <span className="text-gradient">по всей России</span>
            </h2>
            <p className="text-fluid-body text-dark-500">Собственные склады. Отгрузка в день заказа. Доставка в любой регион.</p>
          </div>
        </Animate>

        <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-fluid" staggerDelay={0.1}>
          {GEO_STATS.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className={`text-center transition-all duration-500 ${
                stat.primary
                  ? 'gradient-brand text-white shadow-lg shadow-brand-700/20'
                  : 'bg-white hover:shadow-lg hover:shadow-dark-900/[0.04] border border-dark-200/60 hover:border-dark-200'
              }`} style={{ padding: 'clamp(1rem, 3vw, 1.75rem)', borderRadius: 'clamp(0.75rem, 2vw, 1.25rem)' }}>
                <stat.icon className={`mx-auto mb-3 ${stat.primary ? 'text-white/80' : 'text-brand-600'}`} style={{ width: 'clamp(1.25rem, 2vw, 1.5rem)', height: 'clamp(1.25rem, 2vw, 1.5rem)' }} />
                <div className={`font-black tracking-tight mb-1 ${stat.primary ? 'text-white' : 'text-dark-900'}`} style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
                  <CountUp target={stat.value} suffix={stat.suffix} duration={2} />
                </div>
                <div className={`font-medium ${stat.primary ? 'text-white/70' : 'text-dark-500'}`} style={{ fontSize: 'clamp(0.75rem, 1vw, 0.875rem)' }}>{stat.label}</div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
