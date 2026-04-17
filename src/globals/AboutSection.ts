import type { GlobalConfig } from 'payload'

export const AboutSection: GlobalConfig = {
  slug: 'about-section',
  label: 'Блок «О компании»',
  access: { read: () => true },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      defaultValue: 'Партнёр мясопереработчиков России',
      admin: { description: 'Последние 2 слова выделяются красным градиентом' },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание',
      defaultValue:
        'ТЦ ВЫМПЕЛ — это не просто поставщик. Мы работаем с теми, кто превращает мясо в искусство. Наши технологи знают, как сделать колбасу с идеальным откусом, сохранить сочность деликатеса, добиться стабильного цвета варёнки. От небольших крафтовых цехов до крупнейших комбинатов страны — нам доверяют 30 лет.',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Фото цеха или команды',
    },
    {
      name: 'advantages',
      type: 'array',
      label: 'Преимущества (4 карточки)',
      fields: [
        { name: 'title', type: 'text', label: 'Заголовок' },
        { name: 'description', type: 'text', label: 'Описание' },
        { name: 'icon', type: 'select', label: 'Иконка', options: [
          { label: 'Награда', value: 'award' },
          { label: 'Люди', value: 'users' },
          { label: 'Глобус', value: 'globe' },
          { label: 'Поддержка', value: 'headset' },
        ]},
      ],
    },
  ],
}
