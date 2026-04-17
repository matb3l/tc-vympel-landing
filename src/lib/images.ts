// ─────────────────────────────────────────────────────────────────────────────
// Изображения сайта. Грузятся через next/image → Vercel Image Optimization
// (AVIF/WebP, ресайз под вьюпорт, edge-кеш). Размеры в URL — это "исходник",
// который Vercel скачает один раз и закеширует; потом раздаёт из edge.
// Чтобы сменить картинку — замени URL на свою или положи файл в /public/images/
// и пропиши "/images/hero.jpg".
// ─────────────────────────────────────────────────────────────────────────────

export const SITE_IMAGES = {
  hero: {
    url: 'https://images.unsplash.com/photo-1606677661991-446cea8ee182?w=1920&q=80&auto=format&fit=crop',
    alt: 'Сырое мясо на производстве',
  },
  about: {
    url: 'https://images.unsplash.com/photo-1625643269470-5d3e7b69fa34?w=1280&q=80&auto=format&fit=crop',
    alt: 'Мясной цех / прилавок',
  },
  cta: {
    url: 'https://images.unsplash.com/photo-1597417321971-45e034f7a993?w=1920&q=75&auto=format&fit=crop',
    alt: '',
  },
  products: {
    'natural':    { url: 'https://images.unsplash.com/photo-1601790189147-a6213f4feb9b?w=800&q=80&auto=format&fit=crop', alt: 'Натуральная колбасная оболочка' },
    'artificial': { url: 'https://images.unsplash.com/photo-1624772398061-bbfa87ec6b5a?w=800&q=80&auto=format&fit=crop', alt: 'Искусственная оболочка' },
    'spices':     { url: 'https://images.unsplash.com/photo-1601379759871-f7cc12d04be4?w=800&q=80&auto=format&fit=crop', alt: 'Специи для мясопереработки' },
    'additives':  { url: 'https://images.unsplash.com/photo-1553025934-296397db4010?w=800&q=80&auto=format&fit=crop', alt: 'Пищевые добавки' },
    'proteins':   { url: 'https://images.unsplash.com/photo-1598401863352-3de5501f4890?w=800&q=80&auto=format&fit=crop', alt: 'Пищевые белки' },
    'inventory':  { url: 'https://images.unsplash.com/photo-1632154023554-c2975e9be348?w=800&q=80&auto=format&fit=crop', alt: 'Производственный инвентарь' },
  },
} as const

const PRODUCT_IMAGE_KEYS: (keyof typeof SITE_IMAGES.products)[] = [
  'natural', 'artificial', 'spices', 'additives', 'proteins', 'inventory',
]

export function getProductImage(index: number) {
  const key = PRODUCT_IMAGE_KEYS[index % PRODUCT_IMAGE_KEYS.length]
  return SITE_IMAGES.products[key]
}
