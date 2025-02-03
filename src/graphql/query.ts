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
    pageBlogPostCollection(limit: 10, where: { featuredImage_exists: true }) {
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
