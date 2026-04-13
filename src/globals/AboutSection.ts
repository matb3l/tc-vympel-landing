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
      defaultValue: 'О компании',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание',
      defaultValue:
        'Компания ТЦ ВЫМПЕЛ была основана в 1995 году и на сегодняшний день готова предложить нашим клиентам широкий ассортимент товаров для мясопереработки. С каждым годом у нас увеличивается количество партнёров — нашими поставщиками становятся ведущие компании-производители, расположенные по всему миру.',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Фото',
    },
    {
      name: 'advantages',
      type: 'array',
      label: 'Преимущества',
      fields: [
        { name: 'title', type: 'text', label: 'Заголовок' },
        { name: 'description', type: 'text', label: 'Описание' },
        { name: 'icon', type: 'text', label: 'Иконка (Lucide)' },
      ],
    },
  ],
}
