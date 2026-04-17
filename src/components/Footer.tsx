'use client'

import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react'
import { NAV, SETTINGS } from '@/lib/content'

export function Footer() {
  const phoneHref = `tel:${SETTINGS.phone.replace(/\D/g, '')}`
  return (
    <footer className="relative z-10 gradient-dark" style={{ paddingTop: 'clamp(2.5rem, 6vw, 4rem)', paddingBottom: 'clamp(1.5rem, 3vw, 2rem)', scrollSnapAlign: 'end' as const }}>
      <div className="container-fluid">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-fluid-lg" style={{ paddingBottom: 'clamp(1.5rem, 4vw, 2.5rem)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="sm:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl gradient-brand flex items-center justify-center text-white font-display font-black shadow-lg shadow-brand-900/40" style={{ fontSize: 'clamp(1rem, 1.4vw, 1.25rem)' }}>В</div>
              <div>
                <div className="font-display font-black text-white leading-none" style={{ fontSize: 'clamp(1rem, 1.3vw, 1.125rem)' }}>{SETTINGS.companyName}</div>
                <div className="text-fluid-xs text-white/40 uppercase tracking-wider mt-0.5">С 1995 года</div>
              </div>
            </div>
            <p className="text-white/60 text-fluid-sm max-w-sm leading-relaxed mb-5">
              Комплексное снабжение мясоперерабатывающих предприятий. Оболочки, специи, добавки, оборудование.
            </p>
            <div className="flex flex-col gap-2 text-fluid-sm">
              <a href={phoneHref} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"><Phone className="w-4 h-4 flex-shrink-0" /> {SETTINGS.phone}</a>
              <a href={`mailto:${SETTINGS.email}`} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"><Mail className="w-4 h-4 flex-shrink-0" /> {SETTINGS.email}</a>
              <span className="flex items-center gap-2 text-white/60"><MapPin className="w-4 h-4 flex-shrink-0" /> {SETTINGS.address}</span>
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
            <a href={SETTINGS.externalSite} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-brand-400 hover:text-brand-300 transition-colors text-fluid-sm font-medium">
              tcvympel.ru <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <div className="mt-5">
              <h4 className="text-white font-bold text-fluid-sm uppercase tracking-wider mb-2">Часы работы</h4>
              <p className="text-white/60 text-fluid-sm">{SETTINGS.workingHours.weekdays}</p>
              <p className="text-white/60 text-fluid-sm">{SETTINGS.workingHours.weekends}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} {SETTINGS.companyName}. Все права защищены.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white/60 transition-colors">Политика конфиденциальности</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
