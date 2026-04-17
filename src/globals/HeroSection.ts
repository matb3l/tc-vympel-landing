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
      defaultValue: 'Ингредиенты, из которых рождается вкус',
      admin: { description: 'Последние 2 слова выделяются красным градиентом' },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Подзаголовок',
      defaultValue: 'Оболочки, специи, фосфаты, белки — всё, что нужно для колбас, деликатесов и полуфабрикатов премиум-класса. Прямые поставки от Viscofan, Kalle, Van Hees, Kerry. Отгрузка со склада в Москве в день заказа.',
    },
    {
      name: 'ctaText',
      type: 'text',
      label: 'Текст главной кнопки',
      defaultValue: 'Получить прайс-лист',
    },
    {
      name: 'ctaSecondaryText',
      type: 'text',
      label: 'Текст второй кнопки',
      defaultValue: 'Позвонить технологу',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Фоновое изображение (лучше — горизонтальное фото в тёмной гамме)',
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Статистика (4 карточки)',
      fields: [
        { name: 'value', type: 'text', label: 'Значение (напр. 30 или 500+)' },
        { name: 'label', type: 'text', label: 'Подпись' },
      ],
    },
  ],
}
