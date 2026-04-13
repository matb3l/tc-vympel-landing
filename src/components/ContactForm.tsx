'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { Send, CheckCircle, Phone, Mail, MapPin, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Animate } from '@/components/motion'
import { motion, AnimatePresence } from 'framer-motion'

const contactSchema = z.object({
  name: z.string().min(2, 'Введите имя'),
  phone: z.string().min(6, 'Введите номер телефона'),
  email: z.string().email('Некорректный email').or(z.literal('')).optional(),
  company: z.string().optional(),
  message: z.string().optional(),
})

type ContactFormData = z.infer<typeof contactSchema>

const CONTACTS = [
  { icon: Phone, label: '8 495 787-04-76', sublabel: 'Пн–Пт: 9:00 — 18:00', href: 'tel:+74957870476', color: 'bg-brand-600' },
  { icon: Mail, label: 'tcvympel@mail.ru', sublabel: 'Ответим в течение дня', href: 'mailto:tcvympel@mail.ru', color: 'bg-dark-800' },
  { icon: MapPin, label: 'г. Москва', sublabel: 'Высоковольтный проезд, д. 13А', href: null, color: 'bg-dark-600' },
]

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setStatus('success')
        reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section-padding bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-50/50 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-dark-50 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3" />

      <div className="container-narrow relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left */}
          <div>
            <Animate variant="fadeUp">
              <Badge className="mb-6">Контакты</Badge>
            </Animate>
            <Animate variant="fadeUp" delay={0.1}>
              <h2 className="text-4xl sm:text-5xl font-black text-dark-900 leading-[1.1] mb-6">
                Готовы обсудить{' '}
                <span className="text-gradient">ваш заказ?</span>
              </h2>
            </Animate>
            <Animate variant="fadeUp" delay={0.2}>
              <p className="text-lg text-dark-400 leading-relaxed mb-10">
                Оставьте заявку — менеджер свяжется с вами в течение 30 минут в рабочее время.
                Подберём оптимальное решение под ваши задачи и бюджет.
              </p>
            </Animate>

            <Animate variant="fadeUp" delay={0.3}>
              <div className="space-y-4">
                {CONTACTS.map((item) => {
                  const Wrapper = item.href ? 'a' : 'div'
                  return (
                    <Wrapper
                      key={item.label}
                      {...(item.href ? { href: item.href } : {})}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-dark-50/80 hover:bg-brand-50/50 transition-all duration-500 group"
                    >
                      <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-500`}>
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-dark-900">{item.label}</p>
                        <p className="text-sm text-dark-400">{item.sublabel}</p>
                      </div>
                    </Wrapper>
                  )
                })}
              </div>
            </Animate>
          </div>

          {/* Right — Form */}
          <Animate variant="slideRight" delay={0.2}>
            <div className="bg-dark-50/80 rounded-[2rem] p-8 lg:p-10 border border-dark-100/50">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-16"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
                      <CheckCircle className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-dark-900 mb-2">Заявка отправлена!</h3>
                    <p className="text-dark-400 mb-8">Менеджер свяжется с вами в ближайшее время</p>
                    <Button variant="secondary" onClick={() => setStatus('idle')}>
                      Отправить ещё одну заявку
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-dark-900">Оставить заявку</h3>
                        <p className="text-dark-400 text-sm">Получите каталог с ценами</p>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Input placeholder="Ваше имя *" {...register('name')} />
                        {errors.name && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <Input placeholder="Телефон *" type="tel" {...register('phone')} />
                        {errors.phone && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.phone.message}</p>}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input placeholder="Email" type="email" {...register('email')} />
                      <Input placeholder="Компания" {...register('company')} />
                    </div>

                    <Textarea
                      placeholder="Какая продукция вас интересует?"
                      rows={4}
                      {...register('message')}
                    />

                    <Button type="submit" disabled={status === 'loading'} size="lg" className="w-full">
                      {status === 'loading' ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Отправить заявку
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </Button>

                    {status === 'error' && (
                      <p className="text-red-500 text-sm text-center">
                        Ошибка отправки. Позвоните нам: 8 495 787-04-76
                      </p>
                    )}

                    <p className="text-[11px] text-dark-300 text-center leading-relaxed">
                      Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Animate>
        </div>
      </div>
    </section>
  )
}
