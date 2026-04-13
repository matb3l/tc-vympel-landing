import { MapPin, Phone } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Animate, Stagger, StaggerItem } from '@/components/motion'
import { cn } from '@/lib/utils'

const OFFICES = [
  { city: 'Москва', type: 'Головной офис', address: 'Высоковольтный проезд, д. 13А', phone: '8 495 787-04-76', isPrimary: true },
  { city: 'Домодедово', type: 'Офис и склад', address: 'ТПК «Шестово»', phone: '8 495 660-87-90', isPrimary: false },
  { city: 'Нижний Новгород', type: 'Филиал', address: 'пр. Ленина, д. 27, корп. 1', phone: '8 831 245-31-42', isPrimary: false },
  { city: 'Санкт-Петербург', type: 'Подразделение', address: 'ул. Крупской, д. 55', phone: '8 964 321-44-93', isPrimary: false },
]

export function GeographySection() {
  return (
    <section id="geography" className="section-padding bg-dark-50/50 relative overflow-hidden">
      <div className="container-narrow">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Animate variant="fadeUp">
            <Badge className="mb-6">География</Badge>
          </Animate>
          <Animate variant="fadeUp" delay={0.1}>
            <h2 className="text-4xl sm:text-5xl font-black text-dark-900 leading-tight mb-5">
              Доставка <span className="text-gradient">по всей России</span>
            </h2>
          </Animate>
          <Animate variant="fadeUp" delay={0.2}>
            <p className="text-lg text-dark-400">
              Собственные офисы и склады в ключевых регионах. Прямая доставка до вашего предприятия.
            </p>
          </Animate>
        </div>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.1}>
          {OFFICES.map((office) => (
            <StaggerItem key={office.city}>
              <div
                className={cn(
                  'relative p-7 rounded-[1.75rem] transition-all duration-700 hover:-translate-y-1.5',
                  office.isPrimary
                    ? 'gradient-brand text-white shadow-2xl shadow-brand-600/20'
                    : 'bg-white border border-dark-100/80 hover:shadow-2xl hover:shadow-dark-900/[0.04]',
                )}
              >
                {office.isPrimary && (
                  <div className="absolute -top-3 left-6 px-3.5 py-1 bg-white text-brand-600 text-xs font-bold rounded-full shadow-lg">
                    Главный офис
                  </div>
                )}
                <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center mb-5', office.isPrimary ? 'bg-white/15' : 'bg-brand-50')}>
                  <MapPin className={cn('w-6 h-6', office.isPrimary ? 'text-white' : 'text-brand-600')} />
                </div>
                <h3 className={cn('text-xl font-bold mb-1', office.isPrimary ? 'text-white' : 'text-dark-900')}>
                  {office.city}
                </h3>
                <p className={cn('text-sm font-medium mb-3', office.isPrimary ? 'text-white/60' : 'text-brand-600')}>
                  {office.type}
                </p>
                <p className={cn('text-sm mb-5 leading-relaxed', office.isPrimary ? 'text-white/70' : 'text-dark-400')}>
                  {office.address}
                </p>
                <a
                  href={`tel:${office.phone.replace(/\s/g, '')}`}
                  className={cn('inline-flex items-center gap-2 text-sm font-bold transition-colors', office.isPrimary ? 'text-white hover:text-white/80' : 'text-dark-900 hover:text-brand-600')}
                >
                  <Phone className="w-4 h-4" />
                  {office.phone}
                </a>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
