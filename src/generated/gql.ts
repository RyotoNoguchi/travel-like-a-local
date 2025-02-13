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
  '\n  query GetAsset($id: String!) {\n    asset(id: $id) {\n      title\n      url\n    }\n  }\n': types.GetAssetDocument,
  '\n  query ListFeaturedBlog {\n    pageBlogPostCollection(where: { contentfulMetadata: { tags: { id_contains_some: "featured" } } }, limit: 10) {\n      items {\n        slug\n        featuredImage {\n          url\n          title\n        }\n      }\n    }\n  }\n':
    types.ListFeaturedBlogDocument,
  '\n  query ListLatestBlog {\n    pageBlogPostCollection(limit: 10, order: publishedDate_DESC) {\n      items {\n        title\n        seoFields {\n          pageDescription\n        }\n        slug\n        author {\n          name\n          avatar {\n            title\n            url\n            width\n            height\n          }\n        }\n        publishedDate\n        featuredImage {\n          title\n          url\n          width\n          height\n        }\n        contentfulMetadata {\n          tags {\n            name\n          }\n        }\n      }\n    }\n  }\n':
    types.ListLatestBlogDocument
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
  source: '\n  query GetAsset($id: String!) {\n    asset(id: $id) {\n      title\n      url\n    }\n  }\n'
): (typeof documents)['\n  query GetAsset($id: String!) {\n    asset(id: $id) {\n      title\n      url\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query ListFeaturedBlog {\n    pageBlogPostCollection(where: { contentfulMetadata: { tags: { id_contains_some: "featured" } } }, limit: 10) {\n      items {\n        slug\n        featuredImage {\n          url\n          title\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query ListFeaturedBlog {\n    pageBlogPostCollection(where: { contentfulMetadata: { tags: { id_contains_some: "featured" } } }, limit: 10) {\n      items {\n        slug\n        featuredImage {\n          url\n          title\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query ListLatestBlog {\n    pageBlogPostCollection(limit: 10, order: publishedDate_DESC) {\n      items {\n        title\n        seoFields {\n          pageDescription\n        }\n        slug\n        author {\n          name\n          avatar {\n            title\n            url\n            width\n            height\n          }\n        }\n        publishedDate\n        featuredImage {\n          title\n          url\n          width\n          height\n        }\n        contentfulMetadata {\n          tags {\n            name\n          }\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query ListLatestBlog {\n    pageBlogPostCollection(limit: 10, order: publishedDate_DESC) {\n      items {\n        title\n        seoFields {\n          pageDescription\n        }\n        slug\n        author {\n          name\n          avatar {\n            title\n            url\n            width\n            height\n          }\n        }\n        publishedDate\n        featuredImage {\n          title\n          url\n          width\n          height\n        }\n        contentfulMetadata {\n          tags {\n            name\n          }\n        }\n      }\n    }\n  }\n']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
