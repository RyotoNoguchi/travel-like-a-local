/* eslint-disable no-console */
import type { ConceptScheme } from '@/types/concept-scheme'
import contentful from 'contentful-management'
import type { TaxonomyConceptLink } from 'contentful-management/dist/typings/entities/concept'
import dotenv from 'dotenv'
import fs from 'fs/promises'
import path from 'path'

// 環境変数を読み込む
dotenv.config({ path: '.env' })

type ConceptSchemeData = {
  id: string
  label: string
  topConceptIds: string[]
  conceptIds: string[]
}

async function cacheConceptSchemes(): Promise<void> {
  try {
    console.log('Fetching concept schemes from Contentful...')

    // 環境変数からトークンを取得
    const accessToken = process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN
    console.log('accessToken', accessToken)
    if (!accessToken) {
      throw new Error('CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN is not set')
    }

    const organizationId = process.env.CONTENTFUL_ORGANIZATION_ID
    console.log('organizationId', organizationId)
    if (!organizationId) {
      throw new Error('CONTENTFUL_ORGANIZATION_ID is not set')
    }

    // Contentful Management APIクライアントを初期化
    const client = contentful.createClient({
      accessToken: accessToken
    })

    // タクソノミーコンセプトスキームを取得する
    const rawConceptSchemes = await client.rawRequest({
      method: 'GET',
      url: `/organizations/${organizationId}/taxonomy/concept-schemes`
    })

    const conceptSchemes: ConceptSchemeData[] = rawConceptSchemes.items.map((conceptScheme: ConceptScheme) => ({
      id: conceptScheme.sys.id,
      label: conceptScheme.prefLabel['en-US'],
      topConceptIds: conceptScheme.topConcepts.map((topConcept: TaxonomyConceptLink) => topConcept.sys.id),
      conceptIds: conceptScheme.concepts.map((concept: TaxonomyConceptLink) => concept.sys.id)
    }))

    // 保存先ディレクトリを作成
    const dataDir = path.join(process.cwd(), 'public', 'data')
    await fs.mkdir(dataDir, { recursive: true })

    // JSONファイルとして保存
    const filePath = path.join(dataDir, 'concept-schemes.json')
    await fs.writeFile(filePath, JSON.stringify(conceptSchemes, null, 2), 'utf-8')

    console.log(`Concept schemes cached successfully at ${filePath}`)
  } catch (error) {
    console.error('Error caching concept schemes:', error)
    process.exit(1)
  }
}

cacheConceptSchemes()
