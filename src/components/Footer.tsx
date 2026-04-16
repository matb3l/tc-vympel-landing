import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react'

const NAV = [
  { label: 'О компании', href: '#about' },
  { label: 'Продукция', href: '#products' },
  { label: 'Услуги', href: '#services' },
  { label: 'Контакты', href: '#contact' },
]

export function Footer() {
  return (
    <footer className="relative z-10 gradient-dark" style={{ paddingTop: 'clamp(2.5rem, 6vw, 4rem)', paddingBottom: 'clamp(1.5rem, 3vw, 2rem)' }}>
      <div className="container-fluid">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-fluid-lg" style={{ paddingBottom: 'clamp(1.5rem, 4vw, 2.5rem)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg gradient-brand flex items-center justify-center text-white font-black text-base">В</div>
              <span className="font-bold text-white tracking-tight" style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1rem)' }}>ТЦ Вымпел</span>
            </div>
            <p className="text-white/60 text-fluid-sm max-w-sm leading-relaxed mb-5">
              Комплексное снабжение мясоперерабатывающих предприятий. Оболочки, специи, добавки, оборудование.
            </p>
            <div className="flex flex-col gap-2 text-fluid-sm">
              <a href="tel:+74957870476" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"><Phone className="w-4 h-4 flex-shrink-0" /> 8 (495) 787-04-76</a>
              <a href="mailto:info@tcvympel.ru" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"><Mail className="w-4 h-4 flex-shrink-0" /> info@tcvympel.ru</a>
              <span className="flex items-center gap-2 text-white/60"><MapPin className="w-4 h-4 flex-shrink-0" /> г. Москва, ул. Докукина, д.16, стр.2</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-fluid-sm uppercase tracking-wider mb-4">Навигация</h4>
            <ul className="space-y-2.5">
              {NAV.map((item) => (
                <li key={item.label}><a href={item.href} className="text-white/60 hover:text-white transition-colors text-fluid-sm">{item.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-fluid-sm uppercase tracking-wider mb-4">Сайт</h4>
            <a href="https://www.tcvympel.ru/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-brand-400 hover:text-brand-300 transition-colors text-fluid-sm font-medium">
              tcvympel.ru <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <div className="mt-5">
              <h4 className="text-white font-bold text-fluid-sm uppercase tracking-wider mb-2">Часы работы</h4>
              <p className="text-white/60 text-fluid-sm">Пн–Пт: 9:00–18:00</p>
              <p className="text-white/60 text-fluid-sm">Сб–Вс: выходные</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} ТЦ Вымпел. Все права защищены.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white/60 transition-colors">Политика конфиденциальности</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
