import { createClient } from 'contentful-management'

export const cmaClient = createClient(
  {
    accessToken: process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN ?? '',
    space: process.env.CONTENTFUL_SPACE_ID ?? ''
  },
  {
    type: 'plain',
    defaults: {
      spaceId: process.env.CONTENTFUL_SPACE_ID ?? '',
      environmentId: 'master',
      organizationId: process.env.CONTENTFUL_ORGANIZATION_ID ?? ''
    }
  }
)
