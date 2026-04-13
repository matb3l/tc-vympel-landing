import type { GlobalConfig } from 'payload'

export const HeroSection: GlobalConfig = {
  slug: 'hero-section',
  label: 'Главный экран (Hero)',
  access: { read: () => true },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      defaultValue: 'Всё для мясопереработки',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Подзаголовок',
      defaultValue: 'Оболочки, специи, пищевые добавки и технологический инвентарь от надёжного поставщика с 1995 года',
    },
    {
      name: 'ctaText',
      type: 'text',
      label: 'Текст кнопки',
      defaultValue: 'Получить каталог',
    },
    {
      name: 'ctaSecondaryText',
      type: 'text',
      label: 'Текст второй кнопки',
      defaultValue: 'Связаться с нами',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Фоновое изображение',
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Статистика',
      fields: [
        { name: 'value', type: 'text', label: 'Значение' },
        { name: 'label', type: 'text', label: 'Подпись' },
      ],
    },
  ],
}
