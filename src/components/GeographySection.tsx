'use client'

import { MapPin, Building, Truck, Globe2 } from 'lucide-react'
import { Animate, Stagger, StaggerItem, CountUp } from '@/components/motion'

const ICON_MAP: Record<string, any> = {
  'map-pin': MapPin,
  building: Building,
  truck: Truck,
  globe: Globe2,
}

type GeoStat = { value: number; suffix: string; label: string; icon: string; primary: boolean }
type Props = {
  data: { title: string; subtitle: string; stats: GeoStat[] }
}

export function GeographySection({ data }: Props) {
  return (
    <section className="min-h-screen flex items-center bg-[#f8fafc]" style={{ padding: 'clamp(3rem, 8vw, 7rem) 0' }}>
      <div className="container-fluid w-full">
        <Animate>
          <div className="text-center max-w-2xl mx-auto" style={{ marginBottom: 'clamp(2rem, 5vw, 3.5rem)' }}>
            <span className="inline-block text-fluid-sm font-semibold text-brand-600 uppercase tracking-wider" style={{ marginBottom: 'clamp(0.5rem, 1vw, 0.75rem)' }}>География</span>
            <h2 className="text-fluid-h2 font-black text-dark-900 leading-tight" style={{ marginBottom: 'clamp(0.75rem, 2vw, 1rem)' }}>
              {data.title.split(' ').slice(0, -2).join(' ')}{' '}
              <span className="text-gradient">{data.title.split(' ').slice(-2).join(' ')}</span>
            </h2>
            <p className="text-fluid-body text-dark-500">{data.subtitle}</p>
          </div>
        </Animate>

        <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-fluid" staggerDelay={0.1}>
          {data.stats.map((stat) => {
            const Icon = ICON_MAP[stat.icon] || MapPin
            return (
              <StaggerItem key={stat.label}>
                <div className={`text-center transition-all duration-500 ${
                  stat.primary
                    ? 'gradient-brand text-white shadow-lg shadow-brand-700/20'
                    : 'bg-white hover:shadow-lg hover:shadow-dark-900/[0.04] border border-dark-200/60 hover:border-dark-200'
                }`} style={{ padding: 'clamp(1rem, 3vw, 1.75rem)', borderRadius: 'clamp(0.75rem, 2vw, 1.25rem)' }}>
                  <Icon className={`mx-auto mb-3 ${stat.primary ? 'text-white/80' : 'text-brand-600'}`} style={{ width: 'clamp(1.25rem, 2vw, 1.5rem)', height: 'clamp(1.25rem, 2vw, 1.5rem)' }} />
                  <div className={`font-black tracking-tight mb-1 ${stat.primary ? 'text-white' : 'text-dark-900'}`} style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
                    <CountUp target={stat.value} suffix={stat.suffix} duration={2} />
                  </div>
                  <div className={`font-medium ${stat.primary ? 'text-white/70' : 'text-dark-500'}`} style={{ fontSize: 'clamp(0.75rem, 1vw, 0.875rem)' }}>{stat.label}</div>
                </div>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
