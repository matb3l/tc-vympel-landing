import type { GlobalConfig } from 'payload'

export const CTASection: GlobalConfig = {
  slug: 'cta-section',
  label: 'Блок «Призыв к действию»',
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', label: 'Заголовок', defaultValue: 'Снизим себестоимость на 15–20%' },
    { name: 'subtitle', type: 'textarea', label: 'Подзаголовок', defaultValue: 'Проведём аудит ваших закупок и покажем, где можно сэкономить без потери качества. Бесплатно, под NDA.' },
    { name: 'ctaText', type: 'text', label: 'Текст кнопки', defaultValue: 'Запросить аудит закупок' },
    {
      name: 'benefits',
      type: 'array',
      label: 'Преимущества',
      fields: [
        { name: 'text', type: 'text', label: 'Текст', required: true },
      ],
    },
  ],
}
