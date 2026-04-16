import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import sharp from 'sharp'

import { Media } from './collections/Media'
import { Products } from './collections/Products'
import { Partners } from './collections/Partners'
import { Services } from './collections/Services'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { SiteSettings } from './globals/SiteSettings'
import { HeroSection } from './globals/HeroSection'
import { AboutSection } from './globals/AboutSection'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: ' — ТЦ Вымпел CMS',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    {
      slug: 'users',
      labels: { singular: 'Пользователь', plural: 'Пользователи' },
      auth: true,
      admin: { useAsTitle: 'email' },
      fields: [],
    },
    Media,
    Products,
    Partners,
    Services,
    ContactSubmissions,
  ],
  globals: [SiteSettings, HeroSection, AboutSection],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'default-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    push: true,
  }),
  sharp,
  plugins: [
    seoPlugin({
      collections: [],
      globals: ['site-settings'],
      uploadsCollection: 'media',
      generateTitle: () => 'ТЦ Вымпел — Всё для мясопереработки с 1995 года',
      generateDescription: () =>
        'Оболочки, специи, пищевые добавки, белки и технологический инвентарь для мясоперерабатывающих предприятий. Прямые поставки от ведущих мировых производителей.',
    }),
  ],
})
