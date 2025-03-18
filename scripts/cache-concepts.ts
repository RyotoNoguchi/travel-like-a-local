/* eslint-disable no-console */
import type { Concept } from '@/types/concept'
import contentful from 'contentful-management'
import type { TaxonomyConceptLink } from 'contentful-management/dist/typings/entities/concept'
import dotenv from 'dotenv'
import fs from 'fs/promises'
import path from 'path'

// 環境変数を読み込む
dotenv.config({ path: '.env' })

type ConceptData = {
  id: string
  label: string
  upperLevelConceptIds: string[]
}

async function cacheConcepts(): Promise<void> {
  try {
    console.log('Fetching concepts from Contentful...')

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

    // タクソノミーコンセプトを取得する
    const rawConcepts = await client.rawRequest({
      method: 'GET',
      url: `/organizations/${organizationId}/taxonomy/concepts`
    })

    const concepts: ConceptData[] = rawConcepts.items.map((concept: Concept) => ({
      id: concept.sys.id,
      label: concept.prefLabel['en-US'],
      upperLevelConceptIds: concept.broader?.map((upperLevelConcept: TaxonomyConceptLink) => upperLevelConcept.sys.id) || []
    }))

    // 保存先ディレクトリを作成
    const dataDir = path.join(process.cwd(), 'public', 'data')
    await fs.mkdir(dataDir, { recursive: true })

    // JSONファイルとして保存
    const filePath = path.join(dataDir, 'concepts.json')
    await fs.writeFile(filePath, JSON.stringify(concepts, null, 2), 'utf-8')

    console.log(`Concepts cached successfully at ${filePath}`)
  } catch (error) {
    console.error('Error caching concepts:', error)
    process.exit(1)
  }
}

cacheConcepts()
