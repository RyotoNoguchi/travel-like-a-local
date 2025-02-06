import { gql } from '@apollo/client'

export const GET_ASSET_QUERY = gql`
  query GetAsset($id: String!) {
    asset(id: $id) {
      title
      url
    }
  }
`

export const LIST_FEATURED_BLOG_QUERY = gql`
  query ListFeaturedBlog {
    pageBlogPostCollection(where: { contentfulMetadata: { tags: { id_contains_some: "featured" } } }, limit: 10) {
      items {
        slug
        featuredImage {
          url
          title
        }
      }
    }
  }
`
