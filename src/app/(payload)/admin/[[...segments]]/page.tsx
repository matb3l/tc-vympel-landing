import type { AdminViewProps } from 'payload'
import { DefaultTemplate } from '@payloadcms/next/templates'
import { importMap } from '../importMap'

export { generatePageMetadata as generateMetadata } from '@payloadcms/next/views'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

const Page = async ({ params, searchParams }: Args) => {
  return DefaultTemplate({
    params,
    searchParams,
    importMap,
  } as AdminViewProps)
}

export default Page
