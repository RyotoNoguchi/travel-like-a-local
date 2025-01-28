import type { CodegenConfig } from '@graphql-codegen/cli'

const SCHEMA_URL = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [SCHEMA_URL]: {
        headers: {
          Authorization: `Bearer ${process.env.CONTENTFUL_CPA_ACCESS_TOKEN}`
        }
      }
    }
  ],
  documents: 'src/**/*.{ts,tsx}',
  generates: {
    'src/generated/': {
      preset: 'client',
      plugins: []
    },
    './graphql.schema.json': {
      plugins: ['introspection']
    }
  }
}

export default config
