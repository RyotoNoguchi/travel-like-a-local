import { gql } from '@apollo/client'

export const GET_ASSET_QUERY = gql`
  query GetAsset($id: String!) {
    asset(id: $id) {
      title
      url
    }
  }
`

export const GET_BLOG_POST_BY_SLUG_QUERY = gql`
  query GetBlogPostBySlug($slug: String!, $locale: String!) {
    pageBlogPostCollection(where: { slug: $slug }, locale: $locale) {
      items {
        seoFields {
          pageTitle
          pageDescription
        }
        introduction {
          __typename
          json
        }
        content {
          __typename
          json
          links {
            entries {
              block {
                sys {
                  id
                }
                __typename
                ... on ComponentRichImage {
                  image {
                    title
                    url
                    width
                    height
                    description
                  }
                }
              }
            }
            assets {
              block {
                sys {
                  id
                }
                url
                title
                width
                height
                description
              }
            }
          }
        }
        slug
        title
        author {
          name
          avatar {
            title
            url
            width
            height
          }
        }
        publishedDate
        featuredImage {
          title
          url
          width
          height
        }
        contentfulMetadata {
          tags {
            name
          }
          concepts {
            id
          }
        }
      }
    }
  }
`

export const GET_FEATURED_BLOG_POSTS_QUERY = gql`
  query GetFeaturedBlogPosts($locale: String!) {
    pageBlogPostCollection(where: { contentfulMetadata: { tags: { id_contains_some: "featured" } } }, locale: $locale, limit: 10) {
      items {
        slug
        featuredImage {
          url
          title
        }
        contentfulMetadata {
          tags {
            name
          }
          concepts {
            id
          }
        }
      }
    }
  }
`

export const GET_BLOG_POSTS_QUERY = gql`
  query GetBlogPosts($locale: String!, $where: PageBlogPostFilter, $limit: Int, $skip: Int) {
    pageBlogPostCollection(where: $where, locale: $locale, order: publishedDate_DESC, limit: $limit, skip: $skip) {
      total
      items {
        sys {
          id
        }
        title
        slug
        publishedDate
        featuredImage {
          title
          url
          width
          height
        }
        seoFields {
          pageDescription
        }
        author {
          name
          avatar {
            title
            url
            width
            height
          }
        }
        contentfulMetadata {
          tags {
            name
          }
          concepts {
            id
          }
        }
      }
    }
  }
`

export const GET_ALL_BLOG_POSTS_QUERY = gql`
  query GetAllBlogPosts($locale: String!) {
    pageBlogPostCollection(locale: $locale) {
      items {
        slug
        title
        contentfulMetadata {
          concepts {
            id
          }
        }
      }
    }
  }
`
