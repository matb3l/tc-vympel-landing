'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, Phone, Mail, MapPin, Clock, CheckCircle2, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Animate, MagneticHover } from '@/components/motion'

const phoneRegex = /^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/

const contactSchema = z.object({
  name: z.string().min(2, 'Введите имя (минимум 2 символа)'),
  phone: z.string().regex(phoneRegex, 'Введите полный номер: +7 (999) 999-99-99'),
  email: z.string().email('Некорректный email').or(z.literal('')),
  company: z.string().optional(),
  message: z.string().optional(),
})

type ContactFormData = z.infer<typeof contactSchema>

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  const d = digits.startsWith('8') ? '7' + digits.slice(1) : digits.startsWith('7') ? digits : '7' + digits
  if (d.length <= 1) return '+7'
  if (d.length <= 4) return `+7 (${d.slice(1)}`
  if (d.length <= 7) return `+7 (${d.slice(1, 4)}) ${d.slice(4)}`
  if (d.length <= 9) return `+7 (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7)}`
  return `+7 (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7, 9)}-${d.slice(9, 11)}`
}

type Props = {
  settings: { phone: string; email: string; address: string }
}

export function ContactForm({ settings }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', phone: '', email: '', company: '', message: '' },
  })

  const phoneValue = watch('phone')

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    setValue('phone', formatted, { shouldValidate: true })
  }

  const onSubmit = async (data: ContactFormData) => {
    setServerError('')
    try {
      const res = await fetch('/api/contact-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      setServerError('Ошибка отправки. Позвоните нам напрямую.')
    }
  }

  const contacts = [
    { icon: Phone, label: 'Телефон', value: settings.phone, href: `tel:${settings.phone.replace(/\D/g, '')}` },
    { icon: Mail, label: 'Email', value: settings.email, href: `mailto:${settings.email}` },
    { icon: MapPin, label: 'Адрес', value: settings.address },
    { icon: Clock, label: 'График', value: 'Пн–Пт: 9:00–18:00' },
  ]

  const inputBase = 'w-full rounded-xl bg-dark-50 border text-dark-900 placeholder:text-dark-400 outline-none transition-all duration-200 text-fluid-body'
  const inputOk = 'border-dark-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20'
  const inputErr = 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'

  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center bg-dark-50" style={{ padding: 'clamp(3rem, 8vw, 7rem) 0' }}>
      <div className="container-fluid">
        <Animate>
          <div className="text-center max-w-2xl mx-auto" style={{ marginBottom: 'clamp(2rem, 5vw, 3.5rem)' }}>
            <span className="inline-block text-fluid-sm font-semibold text-brand-600 uppercase tracking-wider" style={{ marginBottom: 'clamp(0.5rem, 1vw, 0.75rem)' }}>Обсудим ваше производство</span>
            <h2 className="text-fluid-h2 font-black text-dark-900 leading-tight" style={{ marginBottom: 'clamp(0.75rem, 2vw, 1rem)' }}>
              Перезвоним <span className="text-gradient">за 15 минут</span>
            </h2>
            <p className="text-fluid-body text-dark-500">
              Подберём позиции под ваши рецептуры, проверим наличие на складе, предложим альтернативы. NDA — по запросу.
            </p>
          </div>
        </Animate>

        <div className="grid lg:grid-cols-2 gap-fluid-lg items-start">
          <Animate delay={0.1}>
            <div className="bg-white shadow-sm border border-dark-200/60" style={{ borderRadius: 'clamp(0.75rem, 2vw, 1.25rem)', padding: 'clamp(1.25rem, 3vw, 2rem)' }}>
              {submitted ? (
                <div className="text-center" style={{ padding: 'clamp(2rem, 5vw, 3rem) 0' }}>
                  <div className="w-14 h-14 rounded-full bg-emerald-50 mx-auto flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-dark-900 mb-2">Заявка отправлена!</h3>
                  <p className="text-dark-500">Менеджер свяжется с вами в ближайшее время.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="grid sm:grid-cols-2 gap-fluid" style={{ marginBottom: 'clamp(0.75rem, 1.5vw, 1rem)' }}>
                    <div>
                      <label className="block text-fluid-sm font-semibold text-dark-900 mb-1.5">Имя <span className="text-red-500">*</span></label>
                      <input
                        {...register('name')}
                        placeholder="Иван Петров"
                        className={`${inputBase} ${errors.name ? inputErr : inputOk}`}
                        style={{ padding: 'clamp(0.5rem, 1vw, 0.75rem) clamp(0.75rem, 1.5vw, 1rem)' }}
                      />
                      {errors.name && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-fluid-sm font-semibold text-dark-900 mb-1.5">Телефон <span className="text-red-500">*</span></label>
                      <input
                        value={phoneValue}
                        onChange={handlePhoneChange}
                        onFocus={() => { if (!phoneValue) setValue('phone', '+7') }}
                        placeholder="+7 (___) ___-__-__"
                        type="tel"
                        className={`${inputBase} ${errors.phone ? inputErr : inputOk}`}
                        style={{ padding: 'clamp(0.5rem, 1vw, 0.75rem) clamp(0.75rem, 1.5vw, 1rem)' }}
                      />
                      {errors.phone && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.phone.message}</p>}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-fluid" style={{ marginBottom: 'clamp(0.75rem, 1.5vw, 1rem)' }}>
                    <div>
                      <label className="block text-fluid-sm font-semibold text-dark-900 mb-1.5">Email</label>
                      <input
                        {...register('email')}
                        placeholder="email@company.ru"
                        type="email"
                        className={`${inputBase} ${errors.email ? inputErr : inputOk}`}
                        style={{ padding: 'clamp(0.5rem, 1vw, 0.75rem) clamp(0.75rem, 1.5vw, 1rem)' }}
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="block text-fluid-sm font-semibold text-dark-900 mb-1.5">Компания</label>
                      <input
                        {...register('company')}
                        placeholder="ООО «Название»"
                        className={`${inputBase} ${inputOk}`}
                        style={{ padding: 'clamp(0.5rem, 1vw, 0.75rem) clamp(0.75rem, 1.5vw, 1rem)' }}
                      />
                    </div>
                  </div>
                  <div style={{ marginBottom: 'clamp(1rem, 2vw, 1.25rem)' }}>
                    <label className="block text-fluid-sm font-semibold text-dark-900 mb-1.5">Сообщение</label>
                    <textarea
                      {...register('message')}
                      rows={3}
                      placeholder="Какая продукция вас интересует?"
                      className={`${inputBase} ${inputOk} resize-none`}
                      style={{ padding: 'clamp(0.5rem, 1vw, 0.75rem) clamp(0.75rem, 1.5vw, 1rem)' }}
                    />
                  </div>

                  {serverError && (
                    <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />{serverError}
                    </div>
                  )}

                  <MagneticHover strength={0.06}>
                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Отправка...</> : <><Send className="w-4 h-4" /> Отправить заявку</>}
                    </Button>
                  </MagneticHover>
                  <p className="text-xs text-dark-400 text-center mt-3">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              )}
            </div>
          </Animate>

          <Animate delay={0.2}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem, 1.5vw, 0.75rem)' }}>
              {contacts.map((contact) => (
                <div key={contact.label} className="group flex items-start bg-white hover:shadow-md border border-dark-200/60 hover:border-dark-200 transition-all" style={{ gap: 'clamp(0.75rem, 1.5vw, 1rem)', padding: 'clamp(0.75rem, 2vw, 1.25rem)', borderRadius: 'clamp(0.5rem, 1.5vw, 0.75rem)' }}>
                  <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-100 transition-colors">
                    <contact.icon className="w-4 h-4 text-brand-600" />
                  </div>
                  <div>
                    <div className="text-xs text-dark-400 font-medium mb-0.5">{contact.label}</div>
                    {contact.href ? (
                      <a href={contact.href} className="text-dark-900 font-semibold text-fluid-sm hover:text-brand-600 transition-colors">{contact.value}</a>
                    ) : (
                      <span className="text-dark-900 font-semibold text-fluid-sm">{contact.value}</span>
                    )}
                  </div>
                </div>
              ))}

              <div className="relative overflow-hidden aspect-video bg-dark-200 border border-dark-200/60" style={{ borderRadius: 'clamp(0.5rem, 1.5vw, 0.75rem)' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-dark-500">
                    <MapPin className="w-8 h-8 mx-auto mb-2 text-dark-400" />
                    <p className="text-fluid-sm font-medium">Карта — подключите через CMS</p>
                  </div>
                </div>
              </div>
            </div>
          </Animate>
        </div>
      </div>
    </section>
  )
}
