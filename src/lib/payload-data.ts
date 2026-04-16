import type { Payload } from 'payload'

let cachedClient: Payload | null = null
let initFailed = false

async function getPayloadClient(): Promise<Payload | null> {
  if (initFailed) return null
  if (cachedClient) return cachedClient
  try {
    const { getPayload } = await import('payload')
    const { default: config } = await import('@payload-config')
    cachedClient = await getPayload({ config })
    return cachedClient
  } catch {
    initFailed = true
    return null
  }
}

function resolveImage(field: any): { url: string; alt: string } | null {
  if (!field) return null
  if (typeof field === 'object' && field.url) {
    return { url: field.url, alt: field.alt || '' }
  }
  return null
}

// ──────────────────────── HERO ────────────────────────

const HERO_MOCK = {
  title: 'Всё для мясопереработки',
  subtitle: 'Оболочки, специи, добавки, белки и инвентарь от мировых производителей. Доставка по всей России. Персональный менеджер. Гибкие цены.',
  ctaText: 'Получить каталог с ценами',
  ctaSecondaryText: '8 495 787-04-76',
  backgroundImage: null as { url: string; alt: string } | null,
  stats: [
    { value: '30+', label: 'лет на рынке' },
    { value: '500+', label: 'клиентов' },
    { value: '1000+', label: 'товаров' },
    { value: '5', label: 'стран-поставщиков' },
  ],
}

export async function getHeroData() {
  try {
    const payload = await getPayloadClient()
    if (!payload) return HERO_MOCK
    const data = await payload.findGlobal({ slug: 'hero-section' })
    if (!data?.title) return HERO_MOCK
    return {
      title: data.title || HERO_MOCK.title,
      subtitle: data.subtitle || HERO_MOCK.subtitle,
      ctaText: data.ctaText || HERO_MOCK.ctaText,
      ctaSecondaryText: data.ctaSecondaryText || HERO_MOCK.ctaSecondaryText,
      backgroundImage: resolveImage(data.backgroundImage),
      stats: data.stats?.length
        ? data.stats.map((s: any) => ({ value: s.value, label: s.label }))
        : HERO_MOCK.stats,
    }
  } catch {
    return HERO_MOCK
  }
}

// ──────────────────────── ABOUT ────────────────────────

const ABOUT_MOCK = {
  title: 'О компании',
  description: 'ТЦ ВЫМПЕЛ основан в 1995 году. Один из крупнейших поставщиков товаров для мясопереработки в России. Склад в Москве обеспечивает отгрузку в день заказа. Поставщики — ведущие производители из Польши, Германии, Испании, Индии и Беларуси.',
  image: null as { url: string; alt: string } | null,
  advantages: [
    { title: 'Проверенное качество', description: 'Сертифицированная продукция, ГОСТ и ТР ТС', icon: 'award' },
    { title: 'Персональный менеджер', description: 'Индивидуальный подход к каждому клиенту', icon: 'users' },
    { title: 'Прямые контракты', description: 'Работаем с производителями напрямую', icon: 'globe' },
    { title: 'Техподдержка', description: 'Консультации технологов по рецептурам', icon: 'headset' },
  ],
}

export async function getAboutData() {
  try {
    const payload = await getPayloadClient()
    if (!payload) return ABOUT_MOCK
    const data = await payload.findGlobal({ slug: 'about-section' })
    if (!data?.title) return ABOUT_MOCK
    return {
      title: data.title || ABOUT_MOCK.title,
      description: data.description || ABOUT_MOCK.description,
      image: resolveImage(data.image),
      advantages: data.advantages?.length
        ? data.advantages.map((a: any) => ({ title: a.title, description: a.description, icon: a.icon }))
        : ABOUT_MOCK.advantages,
    }
  } catch {
    return ABOUT_MOCK
  }
}

// ──────────────────────── PRODUCTS ────────────────────────

const PRODUCTS_MOCK = [
  { id: '1', title: 'Натуральная оболочка', description: 'Черевы свиные, говяжьи, бараньи. Синюги, пузыри. Высший сорт.', image: null as { url: string; alt: string } | null },
  { id: '2', title: 'Искусственная оболочка', description: 'Целлюлозные, полиамидные, коллагеновые, фиброузные оболочки.', image: null },
  { id: '3', title: 'Специи и смеси', description: 'Молотые, цельные специи, функциональные смеси для колбас и деликатесов.', image: null },
  { id: '4', title: 'Пищевые добавки', description: 'Фосфаты, красители, стабилизаторы, консерванты, усилители вкуса.', image: null },
  { id: '5', title: 'Белки', description: 'Соевые и животные белки для улучшения текстуры и увеличения выхода.', image: null },
  { id: '6', title: 'Инвентарь и сетки', description: 'Формовочные сетки, шпагаты, ножи, термометры и прочий инвентарь.', image: null },
]

export async function getProductsData() {
  try {
    const payload = await getPayloadClient()
    if (!payload) return PRODUCTS_MOCK
    const { docs } = await payload.find({ collection: 'products', sort: 'order', where: { isActive: { equals: true } }, limit: 20 })
    if (!docs?.length) return PRODUCTS_MOCK
    return docs.map((d: any) => ({
      id: String(d.id),
      title: d.title,
      description: d.description,
      image: resolveImage(d.image),
    }))
  } catch {
    return PRODUCTS_MOCK
  }
}

// ──────────────────────── SERVICES ────────────────────────

const SERVICES_MOCK = [
  { id: '1', title: 'Маркировка оболочки', description: 'Нанесение логотипов, надписей и маркировки на оболочки любых типов.' },
  { id: '2', title: 'Гофрирование', description: 'Гофрирование натуральных и искусственных оболочек на современном оборудовании.' },
  { id: '3', title: 'Флексопечать', description: 'Печать этикеток и упаковки. Высокое качество, быстрые сроки.' },
  { id: '4', title: 'Технологическая поддержка', description: 'Консультации по подбору ингредиентов и разработке рецептур.' },
  { id: '5', title: 'Документирование', description: 'Помощь с технической документацией и спецификациями на продукцию.' },
  { id: '6', title: 'Подбор инвентаря', description: 'Подбор и поставка профессионального оборудования для цехов.' },
]

export async function getServicesData() {
  try {
    const payload = await getPayloadClient()
    if (!payload) return SERVICES_MOCK
    const { docs } = await payload.find({ collection: 'services', sort: 'order', limit: 20 })
    if (!docs?.length) return SERVICES_MOCK
    return docs.map((d: any) => ({ id: String(d.id), title: d.title, description: d.description }))
  } catch {
    return SERVICES_MOCK
  }
}

// ──────────────────────── PARTNERS ────────────────────────

const PARTNERS_MOCK = [
  'Viscofan', 'Kalle', 'Shenguan', 'World Casing',
  'Van Hees', 'Wiberg', 'Moguntia', 'Solina',
  'Kerry', 'ICL', 'Griffith Foods', 'Devro',
]

export async function getPartnersData() {
  try {
    const payload = await getPayloadClient()
    if (!payload) return PARTNERS_MOCK.map((name, i) => ({ id: String(i), name, logo: null as { url: string; alt: string } | null }))
    const { docs } = await payload.find({ collection: 'partners', sort: 'order', limit: 50 })
    if (!docs?.length) return PARTNERS_MOCK.map((name, i) => ({ id: String(i), name, logo: null }))
    return docs.map((d: any) => ({ id: String(d.id), name: d.name, logo: resolveImage(d.logo) }))
  } catch {
    return PARTNERS_MOCK.map((name, i) => ({ id: String(i), name, logo: null }))
  }
}

// ──────────────────────── GEOGRAPHY ────────────────────────

const GEOGRAPHY_MOCK = {
  title: 'Работаем по всей России',
  subtitle: 'Собственные склады. Отгрузка в день заказа. Доставка в любой регион.',
  stats: [
    { value: 70, suffix: '+', label: 'регионов доставки', icon: 'map-pin', primary: true },
    { value: 2, suffix: '', label: 'склада в Москве', icon: 'building', primary: false },
    { value: 3, suffix: '', label: 'дня — средний срок', icon: 'truck', primary: false },
    { value: 5, suffix: '+', label: 'стран-поставщиков', icon: 'globe', primary: false },
  ],
}

export async function getGeographyData() {
  try {
    const payload = await getPayloadClient()
    if (!payload) return GEOGRAPHY_MOCK
    const data = await payload.findGlobal({ slug: 'geography-section' }) as any
    if (!data?.title) return GEOGRAPHY_MOCK
    return {
      title: data.title || GEOGRAPHY_MOCK.title,
      subtitle: data.subtitle || GEOGRAPHY_MOCK.subtitle,
      stats: data.stats?.length
        ? data.stats.map((s: any) => ({
            value: s.value ?? 0,
            suffix: s.suffix || '',
            label: s.label || '',
            icon: s.icon || 'map-pin',
            primary: Boolean(s.primary),
          }))
        : GEOGRAPHY_MOCK.stats,
    }
  } catch {
    return GEOGRAPHY_MOCK
  }
}

// ──────────────────────── CTA ────────────────────────

const CTA_MOCK = {
  title: 'Готовы оптимизировать закупки?',
  subtitle: 'Более 500 предприятий уже экономят с нами до 20% на ингредиентах. Присоединяйтесь.',
  ctaText: 'Получить предложение',
  benefits: [
    'Бесплатная консультация технолога',
    'Каталог с актуальными ценами',
    'Персональная скидка на первый заказ',
    'Отгрузка со склада в день заказа',
  ],
}

export async function getCTAData() {
  try {
    const payload = await getPayloadClient()
    if (!payload) return CTA_MOCK
    const data = await payload.findGlobal({ slug: 'cta-section' }) as any
    if (!data?.title) return CTA_MOCK
    return {
      title: data.title || CTA_MOCK.title,
      subtitle: data.subtitle || CTA_MOCK.subtitle,
      ctaText: data.ctaText || CTA_MOCK.ctaText,
      benefits: data.benefits?.length
        ? data.benefits.map((b: any) => b.text || '')
        : CTA_MOCK.benefits,
    }
  } catch {
    return CTA_MOCK
  }
}

// ──────────────────────── SITE SETTINGS ────────────────────────

const SETTINGS_MOCK = {
  companyName: 'ТЦ ВЫМПЕЛ',
  phone: '8 (495) 787-04-76',
  email: 'info@tcvympel.ru',
  address: 'г. Москва, ул. Докукина, д.16, стр.2',
}

export async function getSiteSettings() {
  try {
    const payload = await getPayloadClient()
    if (!payload) return SETTINGS_MOCK
    const data = await payload.findGlobal({ slug: 'site-settings' })
    return {
      companyName: data?.companyName || SETTINGS_MOCK.companyName,
      phone: data?.phone || SETTINGS_MOCK.phone,
      email: data?.email || SETTINGS_MOCK.email,
      address: data?.address || SETTINGS_MOCK.address,
    }
  } catch {
    return SETTINGS_MOCK
  }
}
