import { REDIS_KEYS } from '@/constants'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

export const getPageViews = async (slug: string): Promise<number> => {
  return (await redis.get<number>([REDIS_KEYS.PAGEVIEWS, REDIS_KEYS.NAMESPACE, slug].join(':'))) ?? 0
}

export const getMultiplePageViews = async (slugs: string[]): Promise<Record<string, number>> => {
  const pipeline = redis.pipeline()

  slugs.forEach((slug) => {
    pipeline.get<number>([REDIS_KEYS.PAGEVIEWS, REDIS_KEYS.NAMESPACE, slug].join(':'))
  })

  const results = await pipeline.exec()

  return slugs.reduce(
    (acc, slug, index) => {
      acc[slug] = Number(results[index]) || 0
      return acc
    },
    {} as Record<string, number>
  )
}

export const getAllPageViews = async (): Promise<Array<{ slug: string; views: number }>> => {
  const pattern = [REDIS_KEYS.PAGEVIEWS, REDIS_KEYS.NAMESPACE, '*'].join(':')
  const keys = await redis.keys(pattern)

  if (keys.length === 0) {
    return []
  }

  const pipeline = redis.pipeline()
  keys.forEach((key) => {
    pipeline.get<number>(key)
  })

  const results = await pipeline.exec()

  return keys
    .map((key, index) => {
      const slug = key.split(':').pop() || ''
      const views = Number(results[index]) || 0
      return { slug, views }
    })
    .filter((item) => item.slug)
    .sort((a, b) => b.views - a.views)
}

export default redis
