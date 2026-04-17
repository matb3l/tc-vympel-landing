import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { ContactSubmissions } from './collections/ContactSubmissions'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Payload оставлен только для приёма форм и админки.
// Весь контент сайта захардкожен в src/lib/content.ts
// Картинки — в src/lib/images.ts

export default buildConfig({
  admin: {
    user: 'users',
    meta: { titleSuffix: ' — ТЦ Вымпел CMS' },
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: [
    {
      slug: 'users',
      labels: { singular: 'Пользователь', plural: 'Пользователи' },
      auth: true,
      admin: { useAsTitle: 'email' },
      fields: [],
    },
    ContactSubmissions,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'default-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
      max: 3,
      connectionTimeoutMillis: 5000,
    },
    push: process.env.NODE_ENV !== 'production',
  }),
})
