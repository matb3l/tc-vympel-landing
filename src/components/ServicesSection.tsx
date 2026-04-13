import { Stamp, Printer, FlaskConical, Wrench, Package, BookOpen } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Animate, Stagger, StaggerItem } from '@/components/motion'

const SERVICES = [
  { icon: Stamp, title: 'Маркировка оболочки', description: 'Нанесение логотипов, надписей и маркировки на колбасные оболочки любых типов.' },
  { icon: Package, title: 'Гофрирование оболочки', description: 'Гофрирование натуральных и искусственных оболочек на современном оборудовании.' },
  { icon: Printer, title: 'Флексографическая печать', description: 'Печать этикеток, плёнок и упаковочных материалов. Высокое качество и быстрые сроки.' },
  { icon: FlaskConical, title: 'Технологическая поддержка', description: 'Консультации по подбору ингредиентов, рецептур и решению технологических задач.' },
  { icon: BookOpen, title: 'Документирование', description: 'Помощь в подготовке технической документации и спецификаций на мясную продукцию.' },
  { icon: Wrench, title: 'Подбор инвентаря', description: 'Подбор и поставка профессионального инвентаря для мясоперерабатывающих цехов.' },
]

export function ServicesSection() {
  return (
    <section id="services" className="section-padding gradient-dark relative overflow-hidden">
      <div className="absolute top-0 left-1/2 w-[700px] h-[700px] bg-brand-600/[0.04] rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/3" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-600/[0.04] rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />

      <div className="container-narrow relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Animate variant="fadeUp">
            <Badge variant="glass" className="mb-6">Услуги</Badge>
          </Animate>
          <Animate variant="fadeUp" delay={0.1}>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-5">
              Не просто поставки —{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-400 to-brand-500">
                комплексные решения
              </span>
            </h2>
          </Animate>
          <Animate variant="fadeUp" delay={0.2}>
            <p className="text-lg text-white/40">
              На базе ТЦ Вымпел работает цех по маркировке и гофрированию оболочки,
              печати этикеток и упаковки. Оснащены новейшим оборудованием.
            </p>
          </Animate>
        </div>

        <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.08}>
          {SERVICES.map((service) => (
            <StaggerItem key={service.title}>
              <div className="group p-8 rounded-[1.75rem] bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] hover:bg-white/[0.08] hover:border-brand-500/20 transition-all duration-700">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-600/20 to-brand-600/5 flex items-center justify-center mb-6 group-hover:from-brand-600/30 group-hover:to-brand-600/10 transition-all duration-700">
                  <service.icon className="w-7 h-7 text-brand-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-300 transition-colors duration-500">
                  {service.title}
                </h3>
                <p className="text-white/40 leading-relaxed group-hover:text-white/50 transition-colors duration-500">
                  {service.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
