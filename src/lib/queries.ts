import { getPayloadClient } from './payload'

export async function getHeroData() {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'hero-section' })
}

export async function getAboutData() {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'about-section' })
}

export async function getSiteSettings() {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'site-settings' })
}

export async function getProducts() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'products',
    where: { isActive: { equals: true } },
    sort: 'order',
    limit: 50,
  })
  return result.docs
}

export async function getPartners() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'partners',
    sort: 'order',
    limit: 50,
  })
  return result.docs
}

export async function getServices() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'services',
    sort: 'order',
    limit: 50,
  })
  return result.docs
}
