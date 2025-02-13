import { createApolloClient } from '@/apolloClient'
import type { Query } from '@/generated/graphql'
import { LIST_FEATURED_BLOG_QUERY } from '@/graphql/query'
import type { FC } from 'react'
import { Carousel } from './presenter'

type Props = {
  width: number
  height: number
}

export const CarouselContainer: FC<Props> = async ({ width, height }) => {
  const client = createApolloClient()
  const { data } = await client.query<Query>({
    query: LIST_FEATURED_BLOG_QUERY
  })

  const blogs = data.pageBlogPostCollection?.items.map((item) => ({
    slug: item?.slug ?? '',
    featuredImage: {
      url: item?.featuredImage?.url ? `${item?.featuredImage?.url}?w=${width}&h=${height}&fit=fill` : '',
      title: item?.featuredImage?.title ?? ''
    }
  }))

  if (!blogs) return null

  return <Carousel blogs={blogs} />
}
