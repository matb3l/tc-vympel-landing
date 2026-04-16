import { getPayload } from 'payload'
import config from '@payload-config'

async function getPayloadClient() {
  return getPayload({ config })
}

// ──────────────────────── HERO ────────────────────────

const HERO_MOCK = {
  title: 'Всё для мясопереработки',
  subtitle: 'Оболочки, специи, добавки, белки и инвентарь от мировых производителей. Доставка по всей России. Персональный менеджер. Гибкие цены.',
  ctaText: 'Получить каталог с ценами',
  ctaSecondaryText: '8 495 787-04-76',
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
    const data = await payload.findGlobal({ slug: 'hero-section' })
    if (!data?.title) return HERO_MOCK
    return {
      title: data.title || HERO_MOCK.title,
      subtitle: data.subtitle || HERO_MOCK.subtitle,
      ctaText: data.ctaText || HERO_MOCK.ctaText,
      ctaSecondaryText: data.ctaSecondaryText || HERO_MOCK.ctaSecondaryText,
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
    const data = await payload.findGlobal({ slug: 'about-section' })
    if (!data?.title) return ABOUT_MOCK
    return {
      title: data.title || ABOUT_MOCK.title,
      description: data.description || ABOUT_MOCK.description,
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
  { id: '1', title: 'Натуральная оболочка', description: 'Черевы свиные, говяжьи, бараньи. Синюги, пузыри. Высший сорт.' },
  { id: '2', title: 'Искусственная оболочка', description: 'Целлюлозные, полиамидные, коллагеновые, фиброузные оболочки.' },
  { id: '3', title: 'Специи и смеси', description: 'Молотые, цельные специи, функциональные смеси для колбас и деликатесов.' },
  { id: '4', title: 'Пищевые добавки', description: 'Фосфаты, красители, стабилизаторы, консерванты, усилители вкуса.' },
  { id: '5', title: 'Белки', description: 'Соевые и животные белки для улучшения текстуры и увеличения выхода.' },
  { id: '6', title: 'Инвентарь и сетки', description: 'Формовочные сетки, шпагаты, ножи, термометры и прочий инвентарь.' },
]

export async function getProductsData() {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({ collection: 'products', sort: 'order', where: { isActive: { equals: true } }, limit: 20 })
    if (!docs?.length) return PRODUCTS_MOCK
    return docs.map((d: any) => ({ id: String(d.id), title: d.title, description: d.description, image: d.image }))
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
    const { docs } = await payload.find({ collection: 'partners', sort: 'order', limit: 50 })
    if (!docs?.length) return PARTNERS_MOCK.map((name, i) => ({ id: String(i), name }))
    return docs.map((d: any) => ({ id: String(d.id), name: d.name, logo: d.logo }))
  } catch {
    return PARTNERS_MOCK.map((name, i) => ({ id: String(i), name }))
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
