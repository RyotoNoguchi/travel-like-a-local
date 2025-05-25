import { gql } from '@apollo/client'

export const GET_ASSET_QUERY = gql`
  query GetAsset($id: String!) {
    asset(id: $id) {
      title
      url
      fileName
    }
  }
`

export const GET_ASSETS_BY_TAG_QUERY = gql`
  query GetAssetsByTag($tag: String!) {
    assetCollection(where: { contentfulMetadata: { tags: { id_contains_some: [$tag] } } }) {
      items {
        title
        url
        fileName
      }
    }
  }
`

export const GET_BLOG_POST_BY_SLUG_QUERY = gql`
  query GetBlogPostBySlug($slug: String!, $locale: String!) {
    pageBlogPostCollection(where: { slug: $slug }, locale: $locale, limit: 1) {
      items {
        relatedBlogPostsCollection(limit: 5, order: publishedDate_DESC) {
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
        sys {
          id
        }
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
        title
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

export const GET_BLOG_POSTS_BY_SLUGS_QUERY = gql`
  query GetBlogPostsBySlugs($slugs: [String!]!) {
    pageBlogPostCollection(where: { slug_in: $slugs }) {
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

export const SEARCH_BLOG_POSTS_QUERY = gql`
  query SearchBlogPosts($locale: String!, $searchTerm: String!, $conceptId: String, $limit: Int, $skip: Int) {
    pageBlogPostCollection(
      where: {
        OR: [
          { title_contains: $searchTerm }
          { introduction_contains: $searchTerm }
          { content_contains: $searchTerm }
          { shortDescription_contains: $searchTerm }
          { slug_contains: $searchTerm }
          { contentfulMetadata: { concepts: { id_contains_some: [$conceptId] } } }
        ]
      }
      locale: $locale
      order: publishedDate_DESC
      limit: $limit
      skip: $skip
    ) {
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

export const GET_UNIQUE_VALUE_PROPOSITIONS_QUERY = gql`
  query GetUniqueValuePropositions($locale: String!) {
    uniqueValuePropositionCollection(locale: $locale) {
      items {
        title
        description
        image {
          title
          description
          width
          height
          url
        }
      }
    }
  }
`
