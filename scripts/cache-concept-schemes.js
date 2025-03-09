/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs').promises
const path = require('path')
const contentful = require('contentful-management')
require('dotenv').config({ path: '.env' }) // 環境変数を読み込む

async function cacheConceptSchemes() {
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

    const client = contentful.createClient({
      accessToken: accessToken
    })

    const rawConceptSchemes = await client.rawRequest({
      method: 'GET',
      url: `/organizations/${organizationId}/taxonomy/concept-schemes`
    })

    const conceptSchemes = rawConceptSchemes.items.map((conceptScheme) => ({
      id: conceptScheme.sys.id,
      label: conceptScheme.prefLabel['en-US'],
      topConceptIds: conceptScheme.topConcepts.map((topConcept) => topConcept.sys.id),
      conceptIds: conceptScheme.concepts.map((concept) => concept.sys.id)
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
