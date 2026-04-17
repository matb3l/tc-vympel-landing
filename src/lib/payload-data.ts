import type { Payload } from 'payload'

// ─────────────────────────────────────────────────────────────────────────────
// Загрузка текстовых данных из Payload CMS. Картинки живут отдельно в
// src/lib/images.ts (не через CMS).
// ─────────────────────────────────────────────────────────────────────────────

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

// ──────────────────────── HERO ────────────────────────

const HERO_MOCK = {
  badge: 'Надёжный поставщик с 1995 года',
  title: 'Ингредиенты, из которых рождается вкус',
  subtitle: 'Оболочки, специи, фосфаты, белки — всё, что нужно для колбас, деликатесов и полуфабрикатов премиум-класса. Прямые поставки от Viscofan, Kalle, Van Hees, Kerry. Отгрузка со склада в Москве в день заказа.',
  ctaText: 'Получить прайс-лист',
  ctaSecondaryText: 'Позвонить технологу',
  stats: [
    { value: '30', label: 'лет на рынке' },
    { value: '500+', label: 'мясоперерабатывающих цехов' },
    { value: '1500+', label: 'артикулов на складе' },
    { value: '70+', label: 'регионов доставки' },
  ],
}

export async function getHeroData() {
  try {
    const payload = await getPayloadClient()
    if (!payload) return HERO_MOCK
    const data = await payload.findGlobal({ slug: 'hero-section' }) as any
    if (!data?.title) return HERO_MOCK
    return {
      badge: HERO_MOCK.badge,
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
  title: 'Партнёр мясопереработчиков России',
  description: 'ТЦ ВЫМПЕЛ — это не просто поставщик. Мы работаем с теми, кто превращает мясо в искусство. Наши технологи знают, как сделать колбасу с идеальным откусом, сохранить сочность деликатеса, добиться стабильного цвета варёнки. От небольших крафтовых цехов до крупнейших комбинатов страны — нам доверяют 30 лет.',
  advantages: [
    { title: 'ГОСТ и ТР ТС', description: 'Вся продукция сертифицирована и соответствует требованиям ЕАЭС', icon: 'award' },
    { title: 'Персональный технолог', description: 'Разработаем рецептуру под ваш продукт — бесплатно', icon: 'users' },
    { title: 'Прямые контракты', description: 'Цены напрямую от Viscofan, Kalle, Van Hees, Kerry, ICL', icon: 'globe' },
    { title: 'Отгрузка день в день', description: 'Склад 3000 м² — позиции всегда в наличии', icon: 'headset' },
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
  { id: '1', title: 'Натуральная оболочка', description: 'Черевы свиные 38–46 мм, говяжьи круга и синюги, бараньи — премиум отбор из Польши и Беларуси. Идеальная проницаемость, равномерная толщина, работает на любом шприце.' },
  { id: '2', title: 'Искусственная оболочка', description: 'Целлюлоза, коллаген, фиброуз, полиамид — Kalle, Viscofan, ATLAS. Варёные, полукопчёные, сырокопчёные — под любую рецептуру и диаметр.' },
  { id: '3', title: 'Специи и смеси', description: 'Монопряности и функциональные смеси Wiberg, Moguntia, Van Hees. Ручной помол, свежие партии — тот самый аромат, который узнают ваши покупатели.' },
  { id: '4', title: 'Пищевые добавки', description: 'Фосфаты ICL, красители Kerry, нитритная соль, стабилизаторы, консерванты. То, что превращает мясное сырьё в стабильный продукт с предсказуемым вкусом.' },
  { id: '5', title: 'Белки', description: 'Соевые изоляты, коллагеновые и плазменные белки. Выход +10–15%, лучший откус, сочность, которую клиенты чувствуют с первого кусочка.' },
  { id: '6', title: 'Инвентарь и сетки', description: 'Формовочные сетки, шпагат, ножи, термометры, клипсаторы. Всё, что нужно цеху, — одним заказом с доставкой за 24 часа.' },
]

export async function getProductsData() {
  try {
    const payload = await getPayloadClient()
    if (!payload) return PRODUCTS_MOCK
    const { docs } = await payload.find({ collection: 'products', sort: 'order', where: { isActive: { equals: true } }, limit: 20 })
    if (!docs?.length) return PRODUCTS_MOCK
    return docs.map((d: any) => ({ id: String(d.id), title: d.title, description: d.description }))
  } catch {
    return PRODUCTS_MOCK
  }
}

// ──────────────────────── SERVICES ────────────────────────

const SERVICES_MOCK = [
  { id: '1', title: 'Маркировка оболочки', description: 'Нанесём ваш логотип, состав, сроки годности на любую оболочку за 3 дня.' },
  { id: '2', title: 'Гофрирование', description: 'Современные немецкие линии. Идеальная калибровка для высокоскоростных шприцев.' },
  { id: '3', title: 'Флексопечать', description: 'Этикетка и плёнка с полной полиграфией. От эскиза до готовой партии — 7 дней.' },
  { id: '4', title: 'Технологическое сопровождение', description: 'Технолог с 20-летним стажем подберёт рецептуру, оптимизирует себестоимость, исправит дефекты.' },
  { id: '5', title: 'Документация и ТУ', description: 'Декларация соответствия, ТУ, протоколы испытаний — поможем оформить под ключ.' },
  { id: '6', title: 'Спецзаказ', description: 'Редкий диаметр, нестандартная смесь специй, индивидуальная фасовка — найдём или закажем напрямую.' },
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
    if (!payload) return PARTNERS_MOCK.map((name, i) => ({ id: String(i), name }))
    const { docs } = await payload.find({ collection: 'partners', sort: 'order', limit: 50 })
    if (!docs?.length) return PARTNERS_MOCK.map((name, i) => ({ id: String(i), name }))
    return docs.map((d: any) => ({ id: String(d.id), name: d.name }))
  } catch {
    return PARTNERS_MOCK.map((name, i) => ({ id: String(i), name }))
  }
}

// ──────────────────────── GEOGRAPHY ────────────────────────

const GEOGRAPHY_MOCK = {
  title: 'Работаем по всей России',
  subtitle: 'Собственный склад 3000 м² в Москве. Отгрузка в день заказа. Транспортные компании доставят в любой регион за 1–5 дней.',
  stats: [
    { value: 70, suffix: '+', label: 'регионов доставки', icon: 'map-pin', primary: true },
    { value: 3000, suffix: ' м²', label: 'площадь склада', icon: 'building', primary: false },
    { value: 24, suffix: ' ч', label: 'отгрузка после заказа', icon: 'truck', primary: false },
    { value: 12, suffix: '', label: 'стран-производителей', icon: 'globe', primary: false },
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
  title: 'Снизим себестоимость на 15–20%',
  subtitle: 'Проведём аудит ваших закупок и покажем, где можно сэкономить без потери качества. Бесплатно, под NDA.',
  ctaText: 'Запросить аудит закупок',
  benefits: [
    'Бесплатный аудит текущих закупок',
    'Прайс с персональными скидками',
    'Консультация технолога — 1 час',
    'Пробная партия без предоплаты',
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
