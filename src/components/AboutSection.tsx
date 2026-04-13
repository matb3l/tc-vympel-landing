import { Award, Users, Globe, Headset, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Animate, Stagger, StaggerItem } from '@/components/motion'

interface AboutProps {
  title?: string
  description?: string
  advantages?: Array<{ title: string; description: string; icon?: string }>
}

const DEFAULT_ADVANTAGES = [
  { icon: 'Award', title: 'Проверенное качество', description: 'Только сертифицированная продукция от мировых лидеров отрасли' },
  { icon: 'Users', title: 'Персональный менеджер', description: 'Индивидуальный подход и учёт всех требований вашего производства' },
  { icon: 'Globe', title: 'Мировые поставщики', description: 'Прямые контракты с производителями из 5+ стран мира' },
  { icon: 'Headset', title: 'Техподдержка 24/7', description: 'Консультации технологов по подбору ингредиентов и рецептур' },
]

const iconMap: Record<string, React.ElementType> = { Award, Users, Globe, Headset }

export function AboutSection({
  title = 'О компании',
  description,
  advantages = DEFAULT_ADVANTAGES,
}: AboutProps) {
  return (
    <section id="about" className="section-padding bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-50/50 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-dark-50 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3" />

      <div className="container-narrow relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text */}
          <div>
            <Animate variant="fadeUp">
              <Badge className="mb-6">О компании</Badge>
            </Animate>

            <Animate variant="fadeUp" delay={0.1}>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-dark-900 leading-[1.1] mb-8">
                Более <span className="text-gradient">30 лет</span>
                <br />на рынке России
              </h2>
            </Animate>

            <Animate variant="fadeUp" delay={0.2}>
              <p className="text-lg text-dark-400 leading-relaxed mb-6">
                {description || 'Компания ТЦ ВЫМПЕЛ была основана в 1995 году и на сегодняшний день готова предложить клиентам широкий ассортимент товаров для мясопереработки.'}
              </p>
              <p className="text-lg text-dark-400 leading-relaxed mb-10">
                Нашими поставщиками становятся ведущие компании-производители, расположенные по всему
                миру, что позволяет нам успешно работать с крупными и средними мясоперерабатывающими
                предприятиями по всей России и странам СНГ.
              </p>
            </Animate>

            <Animate variant="fadeUp" delay={0.3}>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <a href="#contact">
                    Связаться с нами
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
                <Button asChild variant="secondary">
                  <a href="#products">Смотреть продукцию</a>
                </Button>
              </div>
            </Animate>
          </div>

          {/* Right side */}
          <div className="space-y-6">
            <Animate variant="slideRight" delay={0.2}>
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] bg-gradient-to-br from-dark-100 to-dark-200 shadow-2xl shadow-dark-900/10">
                <div className="absolute inset-0 flex items-center justify-center text-dark-300">
                  <div className="text-center p-6">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-dark-200/80 flex items-center justify-center">
                      <Award className="w-10 h-10" />
                    </div>
                    <p className="text-base font-semibold">Фото компании / производства</p>
                    <p className="text-sm text-dark-300 mt-1">Замените на своё изображение через CMS</p>
                  </div>
                </div>
                <div className="absolute bottom-5 left-5 px-6 py-4 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl">
                  <div className="text-3xl font-black text-dark-900">1995</div>
                  <div className="text-xs text-dark-500 font-medium">год основания</div>
                </div>
                <div className="absolute top-5 right-5 px-4 py-2.5 bg-brand-600 text-white rounded-xl shadow-xl text-sm font-bold">
                  30+ лет опыта
                </div>
              </div>
            </Animate>

            <Stagger className="grid grid-cols-2 gap-4" staggerDelay={0.08}>
              {advantages.map((item) => {
                const Icon = iconMap[item.icon || 'Award'] || Award
                return (
                  <StaggerItem key={item.title}>
                    <div className="group p-5 rounded-2xl bg-dark-50/80 hover:bg-white hover:shadow-2xl hover:shadow-dark-900/[0.04] border border-transparent hover:border-dark-100 transition-all duration-500">
                      <Icon className="w-6 h-6 text-brand-600 mb-3 transition-transform duration-500 group-hover:scale-110" />
                      <h3 className="font-bold text-dark-900 text-sm mb-1.5">{item.title}</h3>
                      <p className="text-[13px] text-dark-400 leading-relaxed">{item.description}</p>
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
