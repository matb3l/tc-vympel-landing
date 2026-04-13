# ТЦ Вымпел — Лендинг

Современный лендинг для компании ТЦ Вымпел (поставщик товаров для мясопереработки).

## Стек

- **Next.js 15** — App Router, Server Components, standalone output
- **Payload CMS 3** — headless CMS с админ-панелью на `/admin`
- **PostgreSQL 16** — база данных
- **Tailwind CSS 3** + **shadcn/ui** — стилизация
- **Framer Motion** — анимации
- **React Hook Form + Zod** — формы и валидация
- **Docker + Nginx** — деплой

## Быстрый старт (разработка)

```bash
# 1. Установить зависимости
npm install

# 2. Поднять PostgreSQL (через Docker)
docker compose up db -d

# 3. Скопировать .env.example → .env (уже создан)

# 4. Запустить dev-сервер
npm run dev
```

Сайт: http://localhost:3000
Админка: http://localhost:3000/admin (при первом входе создайте пользователя)

## Деплой на сервер

```bash
# 1. Клонировать репо на сервер
git clone <repo-url> tc-vympel-landing
cd tc-vympel-landing

# 2. Настроить переменные
cp .env.example .env
# Отредактировать .env:
#   PAYLOAD_SECRET=<случайная_строка_32+_символов>
#   NEXT_PUBLIC_SITE_URL=https://your-domain.ru

# 3. Запустить всё через Docker Compose
docker compose up -d --build

# 4. Готово! Сайт доступен на порту 80
```

## SSL (HTTPS)

1. Получите сертификат (Let's Encrypt):
```bash
certbot certonly --standalone -d tcvympel.ru -d www.tcvympel.ru
```

2. Скопируйте в `nginx/ssl/`:
```bash
cp /etc/letsencrypt/live/tcvympel.ru/fullchain.pem nginx/ssl/
cp /etc/letsencrypt/live/tcvympel.ru/privkey.pem nginx/ssl/
```

3. Раскомментируйте HTTPS-блок в `nginx/nginx.conf`

4. Перезапустите:
```bash
docker compose restart nginx
```

## Структура проекта

```
src/
├── app/
│   ├── (frontend)/        # Лендинг (публичная часть)
│   │   ├── layout.tsx     # Шаблон с Header/Footer
│   │   └── page.tsx       # Главная страница
│   ├── (payload)/         # Админ-панель Payload CMS
│   │   └── admin/
│   └── api/               # REST API (Payload)
├── collections/           # Коллекции CMS
│   ├── Media.ts           # Медиа-файлы
│   ├── Products.ts        # Продукция
│   ├── Partners.ts        # Партнёры
│   ├── Services.ts        # Услуги
│   └── ContactSubmissions.ts  # Заявки с формы
├── globals/               # Глобальные блоки CMS
│   ├── SiteSettings.ts    # Настройки сайта
│   ├── HeroSection.ts     # Главный экран
│   └── AboutSection.ts    # Блок «О компании»
├── components/            # React-компоненты
│   ├── ui/                # shadcn/ui примитивы
│   ├── motion/            # Framer Motion обёртки
│   └── ...                # Секции лендинга
├── lib/                   # Утилиты, запросы
└── payload.config.ts      # Конфиг Payload CMS
```

## Управление контентом

Через админку `/admin` можно редактировать:

| Раздел | Что можно менять |
|---|---|
| Настройки сайта | Название, телефоны, email, адреса, логотип |
| Главный экран | Заголовок, подзаголовок, кнопки, фон, статистика |
| О компании | Текст, фото, преимущества |
| Продукция | Карточки товаров: название, описание, фото, порядок |
| Партнёры | Логотипы, страны, описания |
| Услуги | Названия, описания, иконки |
| Заявки | Все отправленные формы с сайта |
