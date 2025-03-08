import { REDIS_KEYS } from '@/constants'
import { Redis } from '@upstash/redis'
import { type NextRequest, NextResponse } from 'next/server'

const redis = Redis.fromEnv()

export const runtime = 'edge'

export const POST = async (req: NextRequest) => {
  const body = await req.json()
  const slug = body.slug as string | undefined
  if (!slug) return new NextResponse('Slug not found', { status: 400 })
  const localIp = '127.0.0.1'
  const ip = (req.headers.get('x-forwarded-for') ?? localIp).split(',')[0]

  // Hash the IP and turn it into a hex string
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip))
  const hash = Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')

  const isNew = await redis.set([REDIS_KEYS.DEDUPLICATE, hash, slug].join(':'), true, {
    nx: true,
    ex: 24 * 60 * 60
  })
  if (!isNew) {
    return new NextResponse(null, { status: 202 })
  }
  await redis.incr([REDIS_KEYS.PAGEVIEWS, REDIS_KEYS.NAMESPACE, slug].join(':'))
  return new NextResponse(null, { status: 202 })
}
