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
    <section className="relative min-h-screen flex items-center bg-bone overflow-hidden" style={{ padding: 'clamp(4rem, 10vw, 8rem) 0' }}>
      {/* Giant watermark "РФ" */}
      <div className="absolute pointer-events-none select-none left-[-2vw] bottom-[-4vw] font-display font-black text-[#0a0604]/[0.04]" style={{ fontSize: 'clamp(10rem, 24vw, 24rem)', lineHeight: 0.85, letterSpacing: '-0.05em' }}>
        РФ
      </div>

      <div className="container-fluid w-full relative">
        <div className="grid lg:grid-cols-12 gap-fluid-lg items-start">
          <div className="lg:col-span-5">
            <Animate>
              <div className="flex items-center gap-3 text-fluid-xs font-semibold text-brand-700 uppercase tracking-[0.2em]" style={{ marginBottom: 'clamp(1rem, 2vw, 1.5rem)' }}>
                <span className="w-8 h-px bg-brand-600" />
                География
              </div>
            </Animate>
            <Animate delay={0.1}>
              <h2 className="font-display font-black text-dark-900 leading-[0.95]" style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)', letterSpacing: '-0.03em', marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)' }}>
                {data.title.split(' ').slice(0, -2).join(' ')}{' '}
                <span className="italic font-normal text-gradient">{data.title.split(' ').slice(-2).join(' ')}</span>
              </h2>
            </Animate>
            <Animate delay={0.15}>
              <p className="text-fluid-body text-dark-500 max-w-md">{data.subtitle}</p>
            </Animate>
          </div>

          <div className="lg:col-span-7">
            <Stagger className="grid grid-cols-2 gap-fluid" staggerDelay={0.1}>
              {data.stats.map((stat) => {
                const Icon = ICON_MAP[stat.icon] || MapPin
                return (
                  <StaggerItem key={stat.label}>
                    <div className={`relative overflow-hidden transition-all duration-500 h-full ${
                      stat.primary
                        ? 'bg-[#0a0604] text-white border border-[#0a0604]'
                        : 'bg-white hover:shadow-2xl hover:shadow-dark-900/[0.08] border border-dark-200/50 hover:border-brand-300'
                    }`} style={{ padding: 'clamp(1.5rem, 3vw, 2rem)', borderRadius: 'clamp(1rem, 2vw, 1.5rem)' }}>
                      <Icon className={`mb-6 ${stat.primary ? 'text-brand-400' : 'text-brand-600'}`} style={{ width: 'clamp(1.5rem, 2.5vw, 2rem)', height: 'clamp(1.5rem, 2.5vw, 2rem)' }} />
                      <div className={`font-display font-black tracking-tight leading-none mb-2 ${stat.primary ? 'text-white' : 'text-dark-900'}`} style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', letterSpacing: '-0.04em' }}>
                        <CountUp target={stat.value} suffix={stat.suffix} duration={2} />
                      </div>
                      <div className={`font-medium ${stat.primary ? 'text-white/70' : 'text-dark-500'} text-fluid-sm`}>{stat.label}</div>
                    </div>
                  </StaggerItem>
                )
              })}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  )
}
