import { Badge } from '@/components/ui/badge'
import { Animate, Stagger, StaggerItem } from '@/components/motion'

const PARTNERS = [
  { name: 'Promar', country: 'Польша', flag: '🇵🇱', description: 'Натуральные колбасные оболочки' },
  { name: 'Royal Protein', country: 'Испания', flag: '🇪🇸', description: 'Животные и растительные белки' },
  { name: 'Jelu', country: 'Германия', flag: '🇩🇪', description: 'Функциональные пищевые добавки' },
  { name: 'Биган', country: 'Беларусь', flag: '🇧🇾', description: 'Колбасные оболочки и ингредиенты' },
  { name: 'NDV Foods', country: 'Индия', flag: '🇮🇳', description: 'Специи и натуральные ингредиенты' },
  { name: 'Collaflex', country: 'Чехия', flag: '🇨🇿', description: 'Коллагеновые оболочки' },
]

export function PartnersSection() {
  return (
    <section id="partners" className="section-padding bg-white relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-50/40 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3" />

      <div className="container-narrow relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Animate variant="fadeUp">
            <Badge className="mb-6">Партнёры</Badge>
          </Animate>
          <Animate variant="fadeUp" delay={0.1}>
            <h2 className="text-4xl sm:text-5xl font-black text-dark-900 leading-tight mb-5">
              Работаем с{' '}
              <span className="text-gradient">лидерами отрасли</span>
            </h2>
          </Animate>
          <Animate variant="fadeUp" delay={0.2}>
            <p className="text-lg text-dark-400">
              Прямые контракты с ведущими мировыми производителями гарантируют лучшие цены и стабильное качество.
            </p>
          </Animate>
        </div>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.08}>
          {PARTNERS.map((partner) => (
            <StaggerItem key={partner.name}>
              <div className="group p-7 rounded-[1.75rem] bg-dark-50/60 hover:bg-white hover:shadow-2xl hover:shadow-dark-900/[0.04] border border-transparent hover:border-dark-100 transition-all duration-700">
                <div className="w-full h-20 rounded-2xl bg-white flex items-center justify-center mb-6 group-hover:bg-dark-50/50 transition-colors duration-500 border border-dark-100/80">
                  <span className="text-3xl mr-3">{partner.flag}</span>
                  <span className="font-bold text-dark-300 text-xl group-hover:text-dark-400 transition-colors">{partner.name}</span>
                </div>
                <h3 className="font-bold text-dark-900 text-lg mb-1.5">{partner.name}</h3>
                <p className="text-brand-600 text-sm font-semibold mb-2">{partner.country}</p>
                <p className="text-dark-400 text-sm leading-relaxed">{partner.description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
