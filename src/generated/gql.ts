/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import * as types from './graphql'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
  '\n  query GetAsset($id: String!) {\n    asset(id: $id) {\n      title\n      url\n      fileName\n    }\n  }\n': types.GetAssetDocument,
  '\n  query GetAssetsByTag($tag: String!) {\n    assetCollection(where: { contentfulMetadata: { tags: { id_contains_some: [$tag] } } }) {\n      items {\n        title\n        url\n        fileName\n      }\n    }\n  }\n':
    types.GetAssetsByTagDocument,
  '\n  query GetBlogPostBySlug($slug: String!, $locale: String!) {\n    pageBlogPostCollection(where: { slug: $slug }, locale: $locale) {\n      items {\n        seoFields {\n          pageTitle\n          pageDescription\n        }\n        introduction {\n          __typename\n          json\n        }\n        content {\n          __typename\n          json\n          links {\n            entries {\n              block {\n                sys {\n                  id\n                }\n                __typename\n                ... on ComponentRichImage {\n                  image {\n                    title\n                    url\n                    width\n                    height\n                    description\n                  }\n                }\n              }\n            }\n            assets {\n              block {\n                sys {\n                  id\n                }\n                url\n                title\n                width\n                height\n                description\n              }\n            }\n          }\n        }\n        slug\n        title\n        author {\n          name\n          avatar {\n            title\n            url\n            width\n            height\n          }\n        }\n        publishedDate\n        featuredImage {\n          title\n          url\n          width\n          height\n        }\n        contentfulMetadata {\n          tags {\n            name\n          }\n          concepts {\n            id\n          }\n        }\n      }\n    }\n  }\n':
    types.GetBlogPostBySlugDocument,
  '\n  query GetFeaturedBlogPosts($locale: String!) {\n    pageBlogPostCollection(where: { contentfulMetadata: { tags: { id_contains_some: "featured" } } }, locale: $locale, limit: 10) {\n      items {\n        title\n        slug\n        featuredImage {\n          url\n          title\n        }\n        contentfulMetadata {\n          tags {\n            name\n          }\n          concepts {\n            id\n          }\n        }\n      }\n    }\n  }\n':
    types.GetFeaturedBlogPostsDocument,
  '\n  query GetBlogPosts($locale: String!, $where: PageBlogPostFilter, $limit: Int, $skip: Int) {\n    pageBlogPostCollection(where: $where, locale: $locale, order: publishedDate_DESC, limit: $limit, skip: $skip) {\n      total\n      items {\n        sys {\n          id\n        }\n        title\n        slug\n        publishedDate\n        featuredImage {\n          title\n          url\n          width\n          height\n        }\n        seoFields {\n          pageDescription\n        }\n        author {\n          name\n          avatar {\n            title\n            url\n            width\n            height\n          }\n        }\n        contentfulMetadata {\n          tags {\n            name\n          }\n          concepts {\n            id\n          }\n        }\n      }\n    }\n  }\n':
    types.GetBlogPostsDocument,
  '\n  query GetBlogPostsBySlugs($slugs: [String!]!) {\n    pageBlogPostCollection(where: { slug_in: $slugs }) {\n      total\n      items {\n        sys {\n          id\n        }\n        title\n        slug\n        publishedDate\n        featuredImage {\n          title\n          url\n          width\n          height\n        }\n        seoFields {\n          pageDescription\n        }\n        author {\n          name\n          avatar {\n            title\n            url\n            width\n            height\n          }\n        }\n        contentfulMetadata {\n          tags {\n            name\n          }\n          concepts {\n            id\n          }\n        }\n      }\n    }\n  }\n':
    types.GetBlogPostsBySlugsDocument,
  '\n  query GetAllBlogPosts($locale: String!) {\n    pageBlogPostCollection(locale: $locale) {\n      items {\n        slug\n        title\n        contentfulMetadata {\n          concepts {\n            id\n          }\n        }\n      }\n    }\n  }\n':
    types.GetAllBlogPostsDocument,
  '\n  query SearchBlogPosts($locale: String!, $searchTerm: String!, $conceptId: String, $limit: Int, $skip: Int) {\n    pageBlogPostCollection(\n      where: {\n        OR: [\n          { title_contains: $searchTerm }\n          { introduction_contains: $searchTerm }\n          { content_contains: $searchTerm }\n          { shortDescription_contains: $searchTerm }\n          { slug_contains: $searchTerm }\n          { contentfulMetadata: { concepts: { id_contains_some: [$conceptId] } } }\n        ]\n      }\n      locale: $locale\n      order: publishedDate_DESC\n      limit: $limit\n      skip: $skip\n    ) {\n      total\n      items {\n        sys {\n          id\n        }\n        title\n        slug\n        publishedDate\n        featuredImage {\n          title\n          url\n          width\n          height\n        }\n        seoFields {\n          pageDescription\n        }\n        author {\n          name\n          avatar {\n            title\n            url\n            width\n            height\n          }\n        }\n        contentfulMetadata {\n          tags {\n            name\n          }\n          concepts {\n            id\n          }\n        }\n      }\n    }\n  }\n':
    types.SearchBlogPostsDocument
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetAsset($id: String!) {\n    asset(id: $id) {\n      title\n      url\n      fileName\n    }\n  }\n'
): (typeof documents)['\n  query GetAsset($id: String!) {\n    asset(id: $id) {\n      title\n      url\n      fileName\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetAssetsByTag($tag: String!) {\n    assetCollection(where: { contentfulMetadata: { tags: { id_contains_some: [$tag] } } }) {\n      items {\n        title\n        url\n        fileName\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetAssetsByTag($tag: String!) {\n    assetCollection(where: { contentfulMetadata: { tags: { id_contains_some: [$tag] } } }) {\n      items {\n        title\n        url\n        fileName\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetBlogPostBySlug($slug: String!, $locale: String!) {\n    pageBlogPostCollection(where: { slug: $slug }, locale: $locale) {\n      items {\n        seoFields {\n          pageTitle\n          pageDescription\n        }\n        introduction {\n          __typename\n          json\n        }\n        content {\n          __typename\n          json\n          links {\n            entries {\n              block {\n                sys {\n                  id\n                }\n                __typename\n                ... on ComponentRichImage {\n                  image {\n                    title\n                    url\n                    width\n                    height\n                    description\n                  }\n                }\n              }\n            }\n            assets {\n              block {\n                sys {\n                  id\n                }\n                url\n                title\n                width\n                height\n                description\n              }\n            }\n          }\n        }\n        slug\n        title\n        author {\n          name\n          avatar {\n            title\n            url\n            width\n            height\n          }\n        }\n        publishedDate\n        featuredImage {\n          title\n          url\n          width\n          height\n        }\n        contentfulMetadata {\n          tags {\n            name\n          }\n          concepts {\n            id\n          }\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetBlogPostBySlug($slug: String!, $locale: String!) {\n    pageBlogPostCollection(where: { slug: $slug }, locale: $locale) {\n      items {\n        seoFields {\n          pageTitle\n          pageDescription\n        }\n        introduction {\n          __typename\n          json\n        }\n        content {\n          __typename\n          json\n          links {\n            entries {\n              block {\n                sys {\n                  id\n                }\n                __typename\n                ... on ComponentRichImage {\n                  image {\n                    title\n                    url\n                    width\n                    height\n                    description\n                  }\n                }\n              }\n            }\n            assets {\n              block {\n                sys {\n                  id\n                }\n                url\n                title\n                width\n                height\n                description\n              }\n            }\n          }\n        }\n        slug\n        title\n        author {\n          name\n          avatar {\n            title\n            url\n            width\n            height\n          }\n        }\n        publishedDate\n        featuredImage {\n          title\n          url\n          width\n          height\n        }\n        contentfulMetadata {\n          tags {\n            name\n          }\n          concepts {\n            id\n          }\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetFeaturedBlogPosts($locale: String!) {\n    pageBlogPostCollection(where: { contentfulMetadata: { tags: { id_contains_some: "featured" } } }, locale: $locale, limit: 10) {\n      items {\n        title\n        slug\n        featuredImage {\n          url\n          title\n        }\n        contentfulMetadata {\n          tags {\n            name\n          }\n          concepts {\n            id\n          }\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetFeaturedBlogPosts($locale: String!) {\n    pageBlogPostCollection(where: { contentfulMetadata: { tags: { id_contains_some: "featured" } } }, locale: $locale, limit: 10) {\n      items {\n        title\n        slug\n        featuredImage {\n          url\n          title\n        }\n        contentfulMetadata {\n          tags {\n            name\n          }\n          concepts {\n            id\n          }\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetBlogPosts($locale: String!, $where: PageBlogPostFilter, $limit: Int, $skip: Int) {\n    pageBlogPostCollection(where: $where, locale: $locale, order: publishedDate_DESC, limit: $limit, skip: $skip) {\n      total\n      items {\n        sys {\n          id\n        }\n        title\n        slug\n        publishedDate\n        featuredImage {\n          title\n          url\n          width\n          height\n        }\n        seoFields {\n          pageDescription\n        }\n        author {\n          name\n          avatar {\n            title\n            url\n            width\n            height\n          }\n        }\n        contentfulMetadata {\n          tags {\n            name\n          }\n          concepts {\n            id\n          }\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetBlogPosts($locale: String!, $where: PageBlogPostFilter, $limit: Int, $skip: Int) {\n    pageBlogPostCollection(where: $where, locale: $locale, order: publishedDate_DESC, limit: $limit, skip: $skip) {\n      total\n      items {\n        sys {\n          id\n        }\n        title\n        slug\n        publishedDate\n        featuredImage {\n          title\n          url\n          width\n          height\n        }\n        seoFields {\n          pageDescription\n        }\n        author {\n          name\n          avatar {\n            title\n            url\n            width\n            height\n          }\n        }\n        contentfulMetadata {\n          tags {\n            name\n          }\n          concepts {\n            id\n          }\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetBlogPostsBySlugs($slugs: [String!]!) {\n    pageBlogPostCollection(where: { slug_in: $slugs }) {\n      total\n      items {\n        sys {\n          id\n        }\n        title\n        slug\n        publishedDate\n        featuredImage {\n          title\n          url\n          width\n          height\n        }\n        seoFields {\n          pageDescription\n        }\n        author {\n          name\n          avatar {\n            title\n            url\n            width\n            height\n          }\n        }\n        contentfulMetadata {\n          tags {\n            name\n          }\n          concepts {\n            id\n          }\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetBlogPostsBySlugs($slugs: [String!]!) {\n    pageBlogPostCollection(where: { slug_in: $slugs }) {\n      total\n      items {\n        sys {\n          id\n        }\n        title\n        slug\n        publishedDate\n        featuredImage {\n          title\n          url\n          width\n          height\n        }\n        seoFields {\n          pageDescription\n        }\n        author {\n          name\n          avatar {\n            title\n            url\n            width\n            height\n          }\n        }\n        contentfulMetadata {\n          tags {\n            name\n          }\n          concepts {\n            id\n          }\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetAllBlogPosts($locale: String!) {\n    pageBlogPostCollection(locale: $locale) {\n      items {\n        slug\n        title\n        contentfulMetadata {\n          concepts {\n            id\n          }\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetAllBlogPosts($locale: String!) {\n    pageBlogPostCollection(locale: $locale) {\n      items {\n        slug\n        title\n        contentfulMetadata {\n          concepts {\n            id\n          }\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query SearchBlogPosts($locale: String!, $searchTerm: String!, $conceptId: String, $limit: Int, $skip: Int) {\n    pageBlogPostCollection(\n      where: {\n        OR: [\n          { title_contains: $searchTerm }\n          { introduction_contains: $searchTerm }\n          { content_contains: $searchTerm }\n          { shortDescription_contains: $searchTerm }\n          { slug_contains: $searchTerm }\n          { contentfulMetadata: { concepts: { id_contains_some: [$conceptId] } } }\n        ]\n      }\n      locale: $locale\n      order: publishedDate_DESC\n      limit: $limit\n      skip: $skip\n    ) {\n      total\n      items {\n        sys {\n          id\n        }\n        title\n        slug\n        publishedDate\n        featuredImage {\n          title\n          url\n          width\n          height\n        }\n        seoFields {\n          pageDescription\n        }\n        author {\n          name\n          avatar {\n            title\n            url\n            width\n            height\n          }\n        }\n        contentfulMetadata {\n          tags {\n            name\n          }\n          concepts {\n            id\n          }\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query SearchBlogPosts($locale: String!, $searchTerm: String!, $conceptId: String, $limit: Int, $skip: Int) {\n    pageBlogPostCollection(\n      where: {\n        OR: [\n          { title_contains: $searchTerm }\n          { introduction_contains: $searchTerm }\n          { content_contains: $searchTerm }\n          { shortDescription_contains: $searchTerm }\n          { slug_contains: $searchTerm }\n          { contentfulMetadata: { concepts: { id_contains_some: [$conceptId] } } }\n        ]\n      }\n      locale: $locale\n      order: publishedDate_DESC\n      limit: $limit\n      skip: $skip\n    ) {\n      total\n      items {\n        sys {\n          id\n        }\n        title\n        slug\n        publishedDate\n        featuredImage {\n          title\n          url\n          width\n          height\n        }\n        seoFields {\n          pageDescription\n        }\n        author {\n          name\n          avatar {\n            title\n            url\n            width\n            height\n          }\n        }\n        contentfulMetadata {\n          tags {\n            name\n          }\n          concepts {\n            id\n          }\n        }\n      }\n    }\n  }\n']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
