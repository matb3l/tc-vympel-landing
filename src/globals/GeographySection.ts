import type { GlobalConfig } from 'payload'

export const GeographySection: GlobalConfig = {
  slug: 'geography-section',
  label: 'Блок «География»',
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', label: 'Заголовок', defaultValue: 'Работаем по всей России' },
    { name: 'subtitle', type: 'text', label: 'Подзаголовок', defaultValue: 'Собственные склады. Отгрузка в день заказа. Доставка в любой регион.' },
    {
      name: 'stats',
      type: 'array',
      label: 'Статистика',
      fields: [
        { name: 'value', type: 'number', label: 'Число', required: true },
        { name: 'suffix', type: 'text', label: 'Суффикс (например +)' },
        { name: 'label', type: 'text', label: 'Подпись', required: true },
        { name: 'icon', type: 'select', label: 'Иконка', options: [
          { label: 'Геоточка', value: 'map-pin' },
          { label: 'Здание', value: 'building' },
          { label: 'Грузовик', value: 'truck' },
          { label: 'Глобус', value: 'globe' },
        ]},
        { name: 'primary', type: 'checkbox', label: 'Выделенная карточка', defaultValue: false },
      ],
    },
  ],
}
