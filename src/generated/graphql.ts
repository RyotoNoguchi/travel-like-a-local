/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /**
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z,
   *     compliant with the 'date-time' format outlined in section 5.6 of
   *     the RFC 3339 profile of the ISO 8601 standard for representation
   *     of dates and times using the Gregorian calendar.
   */
  DateTime: { input: any; output: any }
  /** The 'Dimension' type represents dimensions as whole numeric values between `1` and `4000`. */
  Dimension: { input: any; output: any }
  /** The 'HexColor' type represents color in `rgb:ffffff` string format. */
  HexColor: { input: any; output: any }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any }
  /** The 'Quality' type represents quality as whole numeric values between `1` and `100`. */
  Quality: { input: any; output: any }
}

/** Represents a binary file in a space. An asset can be any file type. */
export type Asset = {
  __typename?: 'Asset'
  contentType?: Maybe<Scalars['String']['output']>
  contentfulMetadata: ContentfulMetadata
  description?: Maybe<Scalars['String']['output']>
  fileName?: Maybe<Scalars['String']['output']>
  height?: Maybe<Scalars['Int']['output']>
  linkedFrom?: Maybe<AssetLinkingCollections>
  size?: Maybe<Scalars['Int']['output']>
  sys: Sys
  title?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
  width?: Maybe<Scalars['Int']['output']>
}

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetContentTypeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetFileNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetHeightArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetSizeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetUrlArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
  transform?: InputMaybe<ImageTransformOptions>
}

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetWidthArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

export type AssetCollection = {
  __typename?: 'AssetCollection'
  items: Array<Maybe<Asset>>
  limit: Scalars['Int']['output']
  skip: Scalars['Int']['output']
  total: Scalars['Int']['output']
}

export type AssetFilter = {
  AND?: InputMaybe<Array<InputMaybe<AssetFilter>>>
  OR?: InputMaybe<Array<InputMaybe<AssetFilter>>>
  contentType?: InputMaybe<Scalars['String']['input']>
  contentType_contains?: InputMaybe<Scalars['String']['input']>
  contentType_exists?: InputMaybe<Scalars['Boolean']['input']>
  contentType_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  contentType_not?: InputMaybe<Scalars['String']['input']>
  contentType_not_contains?: InputMaybe<Scalars['String']['input']>
  contentType_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>
  description?: InputMaybe<Scalars['String']['input']>
  description_contains?: InputMaybe<Scalars['String']['input']>
  description_exists?: InputMaybe<Scalars['Boolean']['input']>
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  description_not?: InputMaybe<Scalars['String']['input']>
  description_not_contains?: InputMaybe<Scalars['String']['input']>
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  fileName?: InputMaybe<Scalars['String']['input']>
  fileName_contains?: InputMaybe<Scalars['String']['input']>
  fileName_exists?: InputMaybe<Scalars['Boolean']['input']>
  fileName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  fileName_not?: InputMaybe<Scalars['String']['input']>
  fileName_not_contains?: InputMaybe<Scalars['String']['input']>
  fileName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  height?: InputMaybe<Scalars['Int']['input']>
  height_exists?: InputMaybe<Scalars['Boolean']['input']>
  height_gt?: InputMaybe<Scalars['Int']['input']>
  height_gte?: InputMaybe<Scalars['Int']['input']>
  height_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  height_lt?: InputMaybe<Scalars['Int']['input']>
  height_lte?: InputMaybe<Scalars['Int']['input']>
  height_not?: InputMaybe<Scalars['Int']['input']>
  height_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  size?: InputMaybe<Scalars['Int']['input']>
  size_exists?: InputMaybe<Scalars['Boolean']['input']>
  size_gt?: InputMaybe<Scalars['Int']['input']>
  size_gte?: InputMaybe<Scalars['Int']['input']>
  size_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  size_lt?: InputMaybe<Scalars['Int']['input']>
  size_lte?: InputMaybe<Scalars['Int']['input']>
  size_not?: InputMaybe<Scalars['Int']['input']>
  size_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  sys?: InputMaybe<SysFilter>
  title?: InputMaybe<Scalars['String']['input']>
  title_contains?: InputMaybe<Scalars['String']['input']>
  title_exists?: InputMaybe<Scalars['Boolean']['input']>
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  title_not?: InputMaybe<Scalars['String']['input']>
  title_not_contains?: InputMaybe<Scalars['String']['input']>
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  url?: InputMaybe<Scalars['String']['input']>
  url_contains?: InputMaybe<Scalars['String']['input']>
  url_exists?: InputMaybe<Scalars['Boolean']['input']>
  url_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  url_not?: InputMaybe<Scalars['String']['input']>
  url_not_contains?: InputMaybe<Scalars['String']['input']>
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  width?: InputMaybe<Scalars['Int']['input']>
  width_exists?: InputMaybe<Scalars['Boolean']['input']>
  width_gt?: InputMaybe<Scalars['Int']['input']>
  width_gte?: InputMaybe<Scalars['Int']['input']>
  width_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  width_lt?: InputMaybe<Scalars['Int']['input']>
  width_lte?: InputMaybe<Scalars['Int']['input']>
  width_not?: InputMaybe<Scalars['Int']['input']>
  width_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
}

export type AssetLinkingCollections = {
  __typename?: 'AssetLinkingCollections'
  componentAuthorCollection?: Maybe<ComponentAuthorCollection>
  componentRichImageCollection?: Maybe<ComponentRichImageCollection>
  componentSeoCollection?: Maybe<ComponentSeoCollection>
  entryCollection?: Maybe<EntryCollection>
  pageBlogPostCollection?: Maybe<PageBlogPostCollection>
  testimonialCollection?: Maybe<TestimonialCollection>
  tourCollection?: Maybe<TourCollection>
  uniqueValuePropositionCollection?: Maybe<UniqueValuePropositionCollection>
}

export type AssetLinkingCollectionsComponentAuthorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
}

export type AssetLinkingCollectionsComponentRichImageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
}

export type AssetLinkingCollectionsComponentSeoCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
}

export type AssetLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
}

export type AssetLinkingCollectionsPageBlogPostCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
}

export type AssetLinkingCollectionsTestimonialCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
}

export type AssetLinkingCollectionsTourCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
}

export type AssetLinkingCollectionsUniqueValuePropositionCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
}

export enum AssetOrder {
  ContentTypeAsc = 'contentType_ASC',
  ContentTypeDesc = 'contentType_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC'
}

/** To have author-related properties [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/componentAuthor) */
export type ComponentAuthor = Entry &
  _Node & {
    __typename?: 'ComponentAuthor'
    _id: Scalars['ID']['output']
    avatar?: Maybe<Asset>
    contentfulMetadata: ContentfulMetadata
    internalName?: Maybe<Scalars['String']['output']>
    linkedFrom?: Maybe<ComponentAuthorLinkingCollections>
    name?: Maybe<Scalars['String']['output']>
    sys: Sys
  }

/** To have author-related properties [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/componentAuthor) */
export type ComponentAuthorAvatarArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
}

/** To have author-related properties [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/componentAuthor) */
export type ComponentAuthorInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** To have author-related properties [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/componentAuthor) */
export type ComponentAuthorLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

/** To have author-related properties [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/componentAuthor) */
export type ComponentAuthorNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

export type ComponentAuthorCollection = {
  __typename?: 'ComponentAuthorCollection'
  items: Array<Maybe<ComponentAuthor>>
  limit: Scalars['Int']['output']
  skip: Scalars['Int']['output']
  total: Scalars['Int']['output']
}

export type ComponentAuthorFilter = {
  AND?: InputMaybe<Array<InputMaybe<ComponentAuthorFilter>>>
  OR?: InputMaybe<Array<InputMaybe<ComponentAuthorFilter>>>
  avatar_exists?: InputMaybe<Scalars['Boolean']['input']>
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>
  internalName?: InputMaybe<Scalars['String']['input']>
  internalName_contains?: InputMaybe<Scalars['String']['input']>
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  internalName_not?: InputMaybe<Scalars['String']['input']>
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  name?: InputMaybe<Scalars['String']['input']>
  name_contains?: InputMaybe<Scalars['String']['input']>
  name_exists?: InputMaybe<Scalars['Boolean']['input']>
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  name_not?: InputMaybe<Scalars['String']['input']>
  name_not_contains?: InputMaybe<Scalars['String']['input']>
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  sys?: InputMaybe<SysFilter>
}

export type ComponentAuthorLinkingCollections = {
  __typename?: 'ComponentAuthorLinkingCollections'
  entryCollection?: Maybe<EntryCollection>
  pageBlogPostCollection?: Maybe<PageBlogPostCollection>
}

export type ComponentAuthorLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
}

export type ComponentAuthorLinkingCollectionsPageBlogPostCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  locale?: InputMaybe<Scalars['String']['input']>
  order?: InputMaybe<Array<InputMaybe<ComponentAuthorLinkingCollectionsPageBlogPostCollectionOrder>>>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
}

export enum ComponentAuthorLinkingCollectionsPageBlogPostCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  PublishedDateAsc = 'publishedDate_ASC',
  PublishedDateDesc = 'publishedDate_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum ComponentAuthorOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** To describe an image used in rich text fields [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/componentRichImage) */
export type ComponentRichImage = Entry &
  _Node & {
    __typename?: 'ComponentRichImage'
    _id: Scalars['ID']['output']
    caption?: Maybe<Scalars['String']['output']>
    contentfulMetadata: ContentfulMetadata
    fullWidth?: Maybe<Scalars['Boolean']['output']>
    image?: Maybe<Asset>
    internalName?: Maybe<Scalars['String']['output']>
    linkedFrom?: Maybe<ComponentRichImageLinkingCollections>
    sys: Sys
  }

/** To describe an image used in rich text fields [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/componentRichImage) */
export type ComponentRichImageCaptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** To describe an image used in rich text fields [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/componentRichImage) */
export type ComponentRichImageFullWidthArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** To describe an image used in rich text fields [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/componentRichImage) */
export type ComponentRichImageImageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
}

/** To describe an image used in rich text fields [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/componentRichImage) */
export type ComponentRichImageInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** To describe an image used in rich text fields [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/componentRichImage) */
export type ComponentRichImageLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentRichImageCollection = {
  __typename?: 'ComponentRichImageCollection'
  items: Array<Maybe<ComponentRichImage>>
  limit: Scalars['Int']['output']
  skip: Scalars['Int']['output']
  total: Scalars['Int']['output']
}

export type ComponentRichImageFilter = {
  AND?: InputMaybe<Array<InputMaybe<ComponentRichImageFilter>>>
  OR?: InputMaybe<Array<InputMaybe<ComponentRichImageFilter>>>
  caption?: InputMaybe<Scalars['String']['input']>
  caption_contains?: InputMaybe<Scalars['String']['input']>
  caption_exists?: InputMaybe<Scalars['Boolean']['input']>
  caption_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  caption_not?: InputMaybe<Scalars['String']['input']>
  caption_not_contains?: InputMaybe<Scalars['String']['input']>
  caption_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>
  fullWidth?: InputMaybe<Scalars['Boolean']['input']>
  fullWidth_exists?: InputMaybe<Scalars['Boolean']['input']>
  fullWidth_not?: InputMaybe<Scalars['Boolean']['input']>
  image_exists?: InputMaybe<Scalars['Boolean']['input']>
  internalName?: InputMaybe<Scalars['String']['input']>
  internalName_contains?: InputMaybe<Scalars['String']['input']>
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  internalName_not?: InputMaybe<Scalars['String']['input']>
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  sys?: InputMaybe<SysFilter>
}

export type ComponentRichImageLinkingCollections = {
  __typename?: 'ComponentRichImageLinkingCollections'
  entryCollection?: Maybe<EntryCollection>
}

export type ComponentRichImageLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
}

export enum ComponentRichImageOrder {
  CaptionAsc = 'caption_ASC',
  CaptionDesc = 'caption_DESC',
  FullWidthAsc = 'fullWidth_ASC',
  FullWidthDesc = 'fullWidth_DESC',
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** To have SEO-related properties to the pages we render [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/componentSeo) */
export type ComponentSeo = Entry &
  _Node & {
    __typename?: 'ComponentSeo'
    _id: Scalars['ID']['output']
    canonicalUrl?: Maybe<Scalars['String']['output']>
    contentfulMetadata: ContentfulMetadata
    internalName?: Maybe<Scalars['String']['output']>
    linkedFrom?: Maybe<ComponentSeoLinkingCollections>
    nofollow?: Maybe<Scalars['Boolean']['output']>
    noindex?: Maybe<Scalars['Boolean']['output']>
    pageDescription?: Maybe<Scalars['String']['output']>
    pageTitle?: Maybe<Scalars['String']['output']>
    shareImagesCollection?: Maybe<AssetCollection>
    sys: Sys
  }

/** To have SEO-related properties to the pages we render [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/componentSeo) */
export type ComponentSeoCanonicalUrlArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** To have SEO-related properties to the pages we render [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/componentSeo) */
export type ComponentSeoInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** To have SEO-related properties to the pages we render [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/componentSeo) */
export type ComponentSeoLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

/** To have SEO-related properties to the pages we render [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/componentSeo) */
export type ComponentSeoNofollowArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** To have SEO-related properties to the pages we render [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/componentSeo) */
export type ComponentSeoNoindexArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** To have SEO-related properties to the pages we render [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/componentSeo) */
export type ComponentSeoPageDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** To have SEO-related properties to the pages we render [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/componentSeo) */
export type ComponentSeoPageTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** To have SEO-related properties to the pages we render [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/componentSeo) */
export type ComponentSeoShareImagesCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
}

export type ComponentSeoCollection = {
  __typename?: 'ComponentSeoCollection'
  items: Array<Maybe<ComponentSeo>>
  limit: Scalars['Int']['output']
  skip: Scalars['Int']['output']
  total: Scalars['Int']['output']
}

export type ComponentSeoFilter = {
  AND?: InputMaybe<Array<InputMaybe<ComponentSeoFilter>>>
  OR?: InputMaybe<Array<InputMaybe<ComponentSeoFilter>>>
  canonicalUrl?: InputMaybe<Scalars['String']['input']>
  canonicalUrl_contains?: InputMaybe<Scalars['String']['input']>
  canonicalUrl_exists?: InputMaybe<Scalars['Boolean']['input']>
  canonicalUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  canonicalUrl_not?: InputMaybe<Scalars['String']['input']>
  canonicalUrl_not_contains?: InputMaybe<Scalars['String']['input']>
  canonicalUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>
  internalName?: InputMaybe<Scalars['String']['input']>
  internalName_contains?: InputMaybe<Scalars['String']['input']>
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  internalName_not?: InputMaybe<Scalars['String']['input']>
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  nofollow?: InputMaybe<Scalars['Boolean']['input']>
  nofollow_exists?: InputMaybe<Scalars['Boolean']['input']>
  nofollow_not?: InputMaybe<Scalars['Boolean']['input']>
  noindex?: InputMaybe<Scalars['Boolean']['input']>
  noindex_exists?: InputMaybe<Scalars['Boolean']['input']>
  noindex_not?: InputMaybe<Scalars['Boolean']['input']>
  pageDescription?: InputMaybe<Scalars['String']['input']>
  pageDescription_contains?: InputMaybe<Scalars['String']['input']>
  pageDescription_exists?: InputMaybe<Scalars['Boolean']['input']>
  pageDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  pageDescription_not?: InputMaybe<Scalars['String']['input']>
  pageDescription_not_contains?: InputMaybe<Scalars['String']['input']>
  pageDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  pageTitle?: InputMaybe<Scalars['String']['input']>
  pageTitle_contains?: InputMaybe<Scalars['String']['input']>
  pageTitle_exists?: InputMaybe<Scalars['Boolean']['input']>
  pageTitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  pageTitle_not?: InputMaybe<Scalars['String']['input']>
  pageTitle_not_contains?: InputMaybe<Scalars['String']['input']>
  pageTitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  shareImagesCollection_exists?: InputMaybe<Scalars['Boolean']['input']>
  sys?: InputMaybe<SysFilter>
}

export type ComponentSeoLinkingCollections = {
  __typename?: 'ComponentSeoLinkingCollections'
  entryCollection?: Maybe<EntryCollection>
  pageBlogPostCollection?: Maybe<PageBlogPostCollection>
  pageLandingCollection?: Maybe<PageLandingCollection>
}

export type ComponentSeoLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
}

export type ComponentSeoLinkingCollectionsPageBlogPostCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  locale?: InputMaybe<Scalars['String']['input']>
  order?: InputMaybe<Array<InputMaybe<ComponentSeoLinkingCollectionsPageBlogPostCollectionOrder>>>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
}

export type ComponentSeoLinkingCollectionsPageLandingCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  locale?: InputMaybe<Scalars['String']['input']>
  order?: InputMaybe<Array<InputMaybe<ComponentSeoLinkingCollectionsPageLandingCollectionOrder>>>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
}

export enum ComponentSeoLinkingCollectionsPageBlogPostCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  PublishedDateAsc = 'publishedDate_ASC',
  PublishedDateDesc = 'publishedDate_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum ComponentSeoLinkingCollectionsPageLandingCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum ComponentSeoOrder {
  CanonicalUrlAsc = 'canonicalUrl_ASC',
  CanonicalUrlDesc = 'canonicalUrl_DESC',
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  NofollowAsc = 'nofollow_ASC',
  NofollowDesc = 'nofollow_DESC',
  NoindexAsc = 'noindex_ASC',
  NoindexDesc = 'noindex_DESC',
  PageTitleAsc = 'pageTitle_ASC',
  PageTitleDesc = 'pageTitle_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type ContentfulMetadata = {
  __typename?: 'ContentfulMetadata'
  concepts: Array<Maybe<TaxonomyConcept>>
  tags: Array<Maybe<ContentfulTag>>
}

export type ContentfulMetadataConceptsDescendantsFilter = {
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ContentfulMetadataConceptsFilter = {
  descendants?: InputMaybe<ContentfulMetadataConceptsDescendantsFilter>
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ContentfulMetadataFilter = {
  concepts?: InputMaybe<ContentfulMetadataConceptsFilter>
  concepts_exists?: InputMaybe<Scalars['Boolean']['input']>
  tags?: InputMaybe<ContentfulMetadataTagsFilter>
  tags_exists?: InputMaybe<Scalars['Boolean']['input']>
}

export type ContentfulMetadataTagsFilter = {
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

/**
 * Represents a tag entity for finding and organizing content easily.
 *       Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-tags
 */
export type ContentfulTag = {
  __typename?: 'ContentfulTag'
  id?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
}

export type Entry = {
  contentfulMetadata: ContentfulMetadata
  sys: Sys
}

export type EntryCollection = {
  __typename?: 'EntryCollection'
  items: Array<Maybe<Entry>>
  limit: Scalars['Int']['output']
  skip: Scalars['Int']['output']
  total: Scalars['Int']['output']
}

export type EntryFilter = {
  AND?: InputMaybe<Array<InputMaybe<EntryFilter>>>
  OR?: InputMaybe<Array<InputMaybe<EntryFilter>>>
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>
  sys?: InputMaybe<SysFilter>
}

export enum EntryOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum ImageFormat {
  /** AVIF image format. */
  Avif = 'AVIF',
  /** JPG image format. */
  Jpg = 'JPG',
  /**
   * Progressive JPG format stores multiple passes of an image in progressively higher detail.
   *         When a progressive image is loading, the viewer will first see a lower quality pixelated version which
   *         will gradually improve in detail, until the image is fully downloaded. This is to display an image as
   *         early as possible to make the layout look as designed.
   */
  JpgProgressive = 'JPG_PROGRESSIVE',
  /** PNG image format */
  Png = 'PNG',
  /**
   * 8-bit PNG images support up to 256 colors and weigh less than the standard 24-bit PNG equivalent.
   *         The 8-bit PNG format is mostly used for simple images, such as icons or logos.
   */
  Png8 = 'PNG8',
  /** WebP image format. */
  Webp = 'WEBP'
}

export enum ImageResizeFocus {
  /** Focus the resizing on the bottom. */
  Bottom = 'BOTTOM',
  /** Focus the resizing on the bottom left. */
  BottomLeft = 'BOTTOM_LEFT',
  /** Focus the resizing on the bottom right. */
  BottomRight = 'BOTTOM_RIGHT',
  /** Focus the resizing on the center. */
  Center = 'CENTER',
  /** Focus the resizing on the largest face. */
  Face = 'FACE',
  /** Focus the resizing on the area containing all the faces. */
  Faces = 'FACES',
  /** Focus the resizing on the left. */
  Left = 'LEFT',
  /** Focus the resizing on the right. */
  Right = 'RIGHT',
  /** Focus the resizing on the top. */
  Top = 'TOP',
  /** Focus the resizing on the top left. */
  TopLeft = 'TOP_LEFT',
  /** Focus the resizing on the top right. */
  TopRight = 'TOP_RIGHT'
}

export enum ImageResizeStrategy {
  /** Crops a part of the original image to fit into the specified dimensions. */
  Crop = 'CROP',
  /** Resizes the image to the specified dimensions, cropping the image if needed. */
  Fill = 'FILL',
  /** Resizes the image to fit into the specified dimensions. */
  Fit = 'FIT',
  /**
   * Resizes the image to the specified dimensions, padding the image if needed.
   *         Uses desired background color as padding color.
   */
  Pad = 'PAD',
  /** Resizes the image to the specified dimensions, changing the original aspect ratio if needed. */
  Scale = 'SCALE',
  /** Creates a thumbnail from the image. */
  Thumb = 'THUMB'
}

export type ImageTransformOptions = {
  /**
   * Desired background color, used with corner radius or `PAD` resize strategy.
   *         Defaults to transparent (for `PNG`, `PNG8` and `WEBP`) or white (for `JPG` and `JPG_PROGRESSIVE`).
   */
  backgroundColor?: InputMaybe<Scalars['HexColor']['input']>
  /**
   * Desired corner radius in pixels.
   *         Results in an image with rounded corners (pass `-1` for a full circle/ellipse).
   *         Defaults to `0`. Uses desired background color as padding color,
   *         unless the format is `JPG` or `JPG_PROGRESSIVE` and resize strategy is `PAD`, then defaults to white.
   */
  cornerRadius?: InputMaybe<Scalars['Int']['input']>
  /** Desired image format. Defaults to the original image format. */
  format?: InputMaybe<ImageFormat>
  /** Desired height in pixels. Defaults to the original image height. */
  height?: InputMaybe<Scalars['Dimension']['input']>
  /**
   * Desired quality of the image in percents.
   *         Used for `PNG8`, `JPG`, `JPG_PROGRESSIVE` and `WEBP` formats.
   */
  quality?: InputMaybe<Scalars['Quality']['input']>
  /** Desired resize focus area. Defaults to `CENTER`. */
  resizeFocus?: InputMaybe<ImageResizeFocus>
  /** Desired resize strategy. Defaults to `FIT`. */
  resizeStrategy?: InputMaybe<ImageResizeStrategy>
  /** Desired width in pixels. Defaults to the original image width. */
  width?: InputMaybe<Scalars['Dimension']['input']>
}

/** To create individual blog posts [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/pageBlogPost) */
export type PageBlogPost = Entry &
  _Node & {
    __typename?: 'PageBlogPost'
    _id: Scalars['ID']['output']
    author?: Maybe<ComponentAuthor>
    content?: Maybe<PageBlogPostContent>
    contentfulMetadata: ContentfulMetadata
    featuredImage?: Maybe<Asset>
    internalName?: Maybe<Scalars['String']['output']>
    introduction?: Maybe<PageBlogPostIntroduction>
    linkedFrom?: Maybe<PageBlogPostLinkingCollections>
    publishedDate?: Maybe<Scalars['DateTime']['output']>
    relatedBlogPostsCollection?: Maybe<PageBlogPostRelatedBlogPostsCollection>
    seoFields?: Maybe<ComponentSeo>
    shortDescription?: Maybe<Scalars['String']['output']>
    slug?: Maybe<Scalars['String']['output']>
    sys: Sys
    title?: Maybe<Scalars['String']['output']>
  }

/** To create individual blog posts [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/pageBlogPost) */
export type PageBlogPostAuthorArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  where?: InputMaybe<ComponentAuthorFilter>
}

/** To create individual blog posts [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/pageBlogPost) */
export type PageBlogPostContentArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** To create individual blog posts [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/pageBlogPost) */
export type PageBlogPostFeaturedImageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
}

/** To create individual blog posts [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/pageBlogPost) */
export type PageBlogPostInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** To create individual blog posts [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/pageBlogPost) */
export type PageBlogPostIntroductionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** To create individual blog posts [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/pageBlogPost) */
export type PageBlogPostLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

/** To create individual blog posts [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/pageBlogPost) */
export type PageBlogPostPublishedDateArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** To create individual blog posts [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/pageBlogPost) */
export type PageBlogPostRelatedBlogPostsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  locale?: InputMaybe<Scalars['String']['input']>
  order?: InputMaybe<Array<InputMaybe<PageBlogPostRelatedBlogPostsCollectionOrder>>>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<PageBlogPostFilter>
}

/** To create individual blog posts [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/pageBlogPost) */
export type PageBlogPostSeoFieldsArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  where?: InputMaybe<ComponentSeoFilter>
}

/** To create individual blog posts [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/pageBlogPost) */
export type PageBlogPostShortDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** To create individual blog posts [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/pageBlogPost) */
export type PageBlogPostSlugArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** To create individual blog posts [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/pageBlogPost) */
export type PageBlogPostTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

export type PageBlogPostCollection = {
  __typename?: 'PageBlogPostCollection'
  items: Array<Maybe<PageBlogPost>>
  limit: Scalars['Int']['output']
  skip: Scalars['Int']['output']
  total: Scalars['Int']['output']
}

export type PageBlogPostContent = {
  __typename?: 'PageBlogPostContent'
  json: Scalars['JSON']['output']
  links: PageBlogPostContentLinks
}

export type PageBlogPostContentAssets = {
  __typename?: 'PageBlogPostContentAssets'
  block: Array<Maybe<Asset>>
  hyperlink: Array<Maybe<Asset>>
}

export type PageBlogPostContentEntries = {
  __typename?: 'PageBlogPostContentEntries'
  block: Array<Maybe<Entry>>
  hyperlink: Array<Maybe<Entry>>
  inline: Array<Maybe<Entry>>
}

export type PageBlogPostContentLinks = {
  __typename?: 'PageBlogPostContentLinks'
  assets: PageBlogPostContentAssets
  entries: PageBlogPostContentEntries
  resources: PageBlogPostContentResources
}

export type PageBlogPostContentResources = {
  __typename?: 'PageBlogPostContentResources'
  block: Array<PageBlogPostContentResourcesBlock>
  hyperlink: Array<PageBlogPostContentResourcesHyperlink>
  inline: Array<PageBlogPostContentResourcesInline>
}

export type PageBlogPostContentResourcesBlock = ResourceLink & {
  __typename?: 'PageBlogPostContentResourcesBlock'
  sys: ResourceSys
}

export type PageBlogPostContentResourcesHyperlink = ResourceLink & {
  __typename?: 'PageBlogPostContentResourcesHyperlink'
  sys: ResourceSys
}

export type PageBlogPostContentResourcesInline = ResourceLink & {
  __typename?: 'PageBlogPostContentResourcesInline'
  sys: ResourceSys
}

export type PageBlogPostFilter = {
  AND?: InputMaybe<Array<InputMaybe<PageBlogPostFilter>>>
  OR?: InputMaybe<Array<InputMaybe<PageBlogPostFilter>>>
  author?: InputMaybe<CfComponentAuthorNestedFilter>
  author_exists?: InputMaybe<Scalars['Boolean']['input']>
  content_contains?: InputMaybe<Scalars['String']['input']>
  content_exists?: InputMaybe<Scalars['Boolean']['input']>
  content_not_contains?: InputMaybe<Scalars['String']['input']>
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>
  featuredImage_exists?: InputMaybe<Scalars['Boolean']['input']>
  internalName?: InputMaybe<Scalars['String']['input']>
  internalName_contains?: InputMaybe<Scalars['String']['input']>
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  internalName_not?: InputMaybe<Scalars['String']['input']>
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  introduction_contains?: InputMaybe<Scalars['String']['input']>
  introduction_exists?: InputMaybe<Scalars['Boolean']['input']>
  introduction_not_contains?: InputMaybe<Scalars['String']['input']>
  publishedDate?: InputMaybe<Scalars['DateTime']['input']>
  publishedDate_exists?: InputMaybe<Scalars['Boolean']['input']>
  publishedDate_gt?: InputMaybe<Scalars['DateTime']['input']>
  publishedDate_gte?: InputMaybe<Scalars['DateTime']['input']>
  publishedDate_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>
  publishedDate_lt?: InputMaybe<Scalars['DateTime']['input']>
  publishedDate_lte?: InputMaybe<Scalars['DateTime']['input']>
  publishedDate_not?: InputMaybe<Scalars['DateTime']['input']>
  publishedDate_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>
  relatedBlogPosts?: InputMaybe<CfPageBlogPostNestedFilter>
  relatedBlogPostsCollection_exists?: InputMaybe<Scalars['Boolean']['input']>
  seoFields?: InputMaybe<CfComponentSeoNestedFilter>
  seoFields_exists?: InputMaybe<Scalars['Boolean']['input']>
  shortDescription?: InputMaybe<Scalars['String']['input']>
  shortDescription_contains?: InputMaybe<Scalars['String']['input']>
  shortDescription_exists?: InputMaybe<Scalars['Boolean']['input']>
  shortDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  shortDescription_not?: InputMaybe<Scalars['String']['input']>
  shortDescription_not_contains?: InputMaybe<Scalars['String']['input']>
  shortDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  slug?: InputMaybe<Scalars['String']['input']>
  slug_contains?: InputMaybe<Scalars['String']['input']>
  slug_exists?: InputMaybe<Scalars['Boolean']['input']>
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  slug_not?: InputMaybe<Scalars['String']['input']>
  slug_not_contains?: InputMaybe<Scalars['String']['input']>
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  sys?: InputMaybe<SysFilter>
  title?: InputMaybe<Scalars['String']['input']>
  title_contains?: InputMaybe<Scalars['String']['input']>
  title_exists?: InputMaybe<Scalars['Boolean']['input']>
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  title_not?: InputMaybe<Scalars['String']['input']>
  title_not_contains?: InputMaybe<Scalars['String']['input']>
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type PageBlogPostIntroduction = {
  __typename?: 'PageBlogPostIntroduction'
  json: Scalars['JSON']['output']
  links: PageBlogPostIntroductionLinks
}

export type PageBlogPostIntroductionAssets = {
  __typename?: 'PageBlogPostIntroductionAssets'
  block: Array<Maybe<Asset>>
  hyperlink: Array<Maybe<Asset>>
}

export type PageBlogPostIntroductionEntries = {
  __typename?: 'PageBlogPostIntroductionEntries'
  block: Array<Maybe<Entry>>
  hyperlink: Array<Maybe<Entry>>
  inline: Array<Maybe<Entry>>
}

export type PageBlogPostIntroductionLinks = {
  __typename?: 'PageBlogPostIntroductionLinks'
  assets: PageBlogPostIntroductionAssets
  entries: PageBlogPostIntroductionEntries
  resources: PageBlogPostIntroductionResources
}

export type PageBlogPostIntroductionResources = {
  __typename?: 'PageBlogPostIntroductionResources'
  block: Array<PageBlogPostIntroductionResourcesBlock>
  hyperlink: Array<PageBlogPostIntroductionResourcesHyperlink>
  inline: Array<PageBlogPostIntroductionResourcesInline>
}

export type PageBlogPostIntroductionResourcesBlock = ResourceLink & {
  __typename?: 'PageBlogPostIntroductionResourcesBlock'
  sys: ResourceSys
}

export type PageBlogPostIntroductionResourcesHyperlink = ResourceLink & {
  __typename?: 'PageBlogPostIntroductionResourcesHyperlink'
  sys: ResourceSys
}

export type PageBlogPostIntroductionResourcesInline = ResourceLink & {
  __typename?: 'PageBlogPostIntroductionResourcesInline'
  sys: ResourceSys
}

export type PageBlogPostLinkingCollections = {
  __typename?: 'PageBlogPostLinkingCollections'
  entryCollection?: Maybe<EntryCollection>
  pageBlogPostCollection?: Maybe<PageBlogPostCollection>
  pageLandingCollection?: Maybe<PageLandingCollection>
}

export type PageBlogPostLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
}

export type PageBlogPostLinkingCollectionsPageBlogPostCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  locale?: InputMaybe<Scalars['String']['input']>
  order?: InputMaybe<Array<InputMaybe<PageBlogPostLinkingCollectionsPageBlogPostCollectionOrder>>>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
}

export type PageBlogPostLinkingCollectionsPageLandingCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  locale?: InputMaybe<Scalars['String']['input']>
  order?: InputMaybe<Array<InputMaybe<PageBlogPostLinkingCollectionsPageLandingCollectionOrder>>>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
}

export enum PageBlogPostLinkingCollectionsPageBlogPostCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  PublishedDateAsc = 'publishedDate_ASC',
  PublishedDateDesc = 'publishedDate_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum PageBlogPostLinkingCollectionsPageLandingCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum PageBlogPostOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  PublishedDateAsc = 'publishedDate_ASC',
  PublishedDateDesc = 'publishedDate_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type PageBlogPostRelatedBlogPostsCollection = {
  __typename?: 'PageBlogPostRelatedBlogPostsCollection'
  items: Array<Maybe<PageBlogPost>>
  limit: Scalars['Int']['output']
  skip: Scalars['Int']['output']
  total: Scalars['Int']['output']
}

export enum PageBlogPostRelatedBlogPostsCollectionOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  PublishedDateAsc = 'publishedDate_ASC',
  PublishedDateDesc = 'publishedDate_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** To have an entry point for the app (e.g. Homepage) [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/pageLanding) */
export type PageLanding = Entry &
  _Node & {
    __typename?: 'PageLanding'
    _id: Scalars['ID']['output']
    contentfulMetadata: ContentfulMetadata
    featuredBlogPost?: Maybe<PageBlogPost>
    internalName?: Maybe<Scalars['String']['output']>
    linkedFrom?: Maybe<PageLandingLinkingCollections>
    seoFields?: Maybe<ComponentSeo>
    sys: Sys
  }

/** To have an entry point for the app (e.g. Homepage) [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/pageLanding) */
export type PageLandingFeaturedBlogPostArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  where?: InputMaybe<PageBlogPostFilter>
}

/** To have an entry point for the app (e.g. Homepage) [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/pageLanding) */
export type PageLandingInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** To have an entry point for the app (e.g. Homepage) [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/pageLanding) */
export type PageLandingLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

/** To have an entry point for the app (e.g. Homepage) [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/pageLanding) */
export type PageLandingSeoFieldsArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  where?: InputMaybe<ComponentSeoFilter>
}

export type PageLandingCollection = {
  __typename?: 'PageLandingCollection'
  items: Array<Maybe<PageLanding>>
  limit: Scalars['Int']['output']
  skip: Scalars['Int']['output']
  total: Scalars['Int']['output']
}

export type PageLandingFilter = {
  AND?: InputMaybe<Array<InputMaybe<PageLandingFilter>>>
  OR?: InputMaybe<Array<InputMaybe<PageLandingFilter>>>
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>
  featuredBlogPost?: InputMaybe<CfPageBlogPostNestedFilter>
  featuredBlogPost_exists?: InputMaybe<Scalars['Boolean']['input']>
  internalName?: InputMaybe<Scalars['String']['input']>
  internalName_contains?: InputMaybe<Scalars['String']['input']>
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  internalName_not?: InputMaybe<Scalars['String']['input']>
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  seoFields?: InputMaybe<CfComponentSeoNestedFilter>
  seoFields_exists?: InputMaybe<Scalars['Boolean']['input']>
  sys?: InputMaybe<SysFilter>
}

export type PageLandingLinkingCollections = {
  __typename?: 'PageLandingLinkingCollections'
  entryCollection?: Maybe<EntryCollection>
}

export type PageLandingLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
}

export enum PageLandingOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type Query = {
  __typename?: 'Query'
  _node?: Maybe<_Node>
  _nodes: Array<Maybe<_Node>>
  asset?: Maybe<Asset>
  assetCollection?: Maybe<AssetCollection>
  componentAuthor?: Maybe<ComponentAuthor>
  componentAuthorCollection?: Maybe<ComponentAuthorCollection>
  componentRichImage?: Maybe<ComponentRichImage>
  componentRichImageCollection?: Maybe<ComponentRichImageCollection>
  componentSeo?: Maybe<ComponentSeo>
  componentSeoCollection?: Maybe<ComponentSeoCollection>
  entryCollection?: Maybe<EntryCollection>
  pageBlogPost?: Maybe<PageBlogPost>
  pageBlogPostCollection?: Maybe<PageBlogPostCollection>
  pageLanding?: Maybe<PageLanding>
  pageLandingCollection?: Maybe<PageLandingCollection>
  testimonial?: Maybe<Testimonial>
  testimonialCollection?: Maybe<TestimonialCollection>
  tour?: Maybe<Tour>
  tourCollection?: Maybe<TourCollection>
  uniqueValueProposition?: Maybe<UniqueValueProposition>
  uniqueValuePropositionCollection?: Maybe<UniqueValuePropositionCollection>
}

export type Query_NodeArgs = {
  id: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
}

export type Query_NodesArgs = {
  ids: Array<Scalars['ID']['input']>
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
}

export type QueryAssetArgs = {
  id: Scalars['String']['input']
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
}

export type QueryAssetCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  locale?: InputMaybe<Scalars['String']['input']>
  order?: InputMaybe<Array<InputMaybe<AssetOrder>>>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<AssetFilter>
}

export type QueryComponentAuthorArgs = {
  id: Scalars['String']['input']
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
}

export type QueryComponentAuthorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  locale?: InputMaybe<Scalars['String']['input']>
  order?: InputMaybe<Array<InputMaybe<ComponentAuthorOrder>>>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<ComponentAuthorFilter>
}

export type QueryComponentRichImageArgs = {
  id: Scalars['String']['input']
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
}

export type QueryComponentRichImageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  locale?: InputMaybe<Scalars['String']['input']>
  order?: InputMaybe<Array<InputMaybe<ComponentRichImageOrder>>>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<ComponentRichImageFilter>
}

export type QueryComponentSeoArgs = {
  id: Scalars['String']['input']
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
}

export type QueryComponentSeoCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  locale?: InputMaybe<Scalars['String']['input']>
  order?: InputMaybe<Array<InputMaybe<ComponentSeoOrder>>>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<ComponentSeoFilter>
}

export type QueryEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  locale?: InputMaybe<Scalars['String']['input']>
  order?: InputMaybe<Array<InputMaybe<EntryOrder>>>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<EntryFilter>
}

export type QueryPageBlogPostArgs = {
  id: Scalars['String']['input']
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
}

export type QueryPageBlogPostCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  locale?: InputMaybe<Scalars['String']['input']>
  order?: InputMaybe<Array<InputMaybe<PageBlogPostOrder>>>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<PageBlogPostFilter>
}

export type QueryPageLandingArgs = {
  id: Scalars['String']['input']
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
}

export type QueryPageLandingCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  locale?: InputMaybe<Scalars['String']['input']>
  order?: InputMaybe<Array<InputMaybe<PageLandingOrder>>>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<PageLandingFilter>
}

export type QueryTestimonialArgs = {
  id: Scalars['String']['input']
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
}

export type QueryTestimonialCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  locale?: InputMaybe<Scalars['String']['input']>
  order?: InputMaybe<Array<InputMaybe<TestimonialOrder>>>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<TestimonialFilter>
}

export type QueryTourArgs = {
  id: Scalars['String']['input']
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
}

export type QueryTourCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  locale?: InputMaybe<Scalars['String']['input']>
  order?: InputMaybe<Array<InputMaybe<TourOrder>>>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<TourFilter>
}

export type QueryUniqueValuePropositionArgs = {
  id: Scalars['String']['input']
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
}

export type QueryUniqueValuePropositionCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  locale?: InputMaybe<Scalars['String']['input']>
  order?: InputMaybe<Array<InputMaybe<UniqueValuePropositionOrder>>>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<UniqueValuePropositionFilter>
}

export type ResourceLink = {
  sys: ResourceSys
}

export type ResourceSys = {
  __typename?: 'ResourceSys'
  linkType: Scalars['String']['output']
  urn: Scalars['String']['output']
}

export type Sys = {
  __typename?: 'Sys'
  environmentId: Scalars['String']['output']
  firstPublishedAt?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['String']['output']
  /** The locale that was requested. */
  locale?: Maybe<Scalars['String']['output']>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  publishedVersion?: Maybe<Scalars['Int']['output']>
  spaceId: Scalars['String']['output']
}

export type SysFilter = {
  firstPublishedAt?: InputMaybe<Scalars['DateTime']['input']>
  firstPublishedAt_exists?: InputMaybe<Scalars['Boolean']['input']>
  firstPublishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>
  firstPublishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>
  firstPublishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>
  firstPublishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>
  firstPublishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>
  firstPublishedAt_not?: InputMaybe<Scalars['DateTime']['input']>
  firstPublishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>
  id?: InputMaybe<Scalars['String']['input']>
  id_contains?: InputMaybe<Scalars['String']['input']>
  id_exists?: InputMaybe<Scalars['Boolean']['input']>
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  id_not?: InputMaybe<Scalars['String']['input']>
  id_not_contains?: InputMaybe<Scalars['String']['input']>
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  publishedAt_exists?: InputMaybe<Scalars['Boolean']['input']>
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>
  publishedVersion?: InputMaybe<Scalars['Float']['input']>
  publishedVersion_exists?: InputMaybe<Scalars['Boolean']['input']>
  publishedVersion_gt?: InputMaybe<Scalars['Float']['input']>
  publishedVersion_gte?: InputMaybe<Scalars['Float']['input']>
  publishedVersion_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>
  publishedVersion_lt?: InputMaybe<Scalars['Float']['input']>
  publishedVersion_lte?: InputMaybe<Scalars['Float']['input']>
  publishedVersion_not?: InputMaybe<Scalars['Float']['input']>
  publishedVersion_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>
}

/**
 * Represents a taxonomy concept entity for finding and organizing content easily.
 *         Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-concepts
 */
export type TaxonomyConcept = {
  __typename?: 'TaxonomyConcept'
  id?: Maybe<Scalars['String']['output']>
}

/** testimonial about Ryoto [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/testimonial) */
export type Testimonial = Entry &
  _Node & {
    __typename?: 'Testimonial'
    _id: Scalars['ID']['output']
    ageGroup?: Maybe<Scalars['Int']['output']>
    comment?: Maybe<Scalars['String']['output']>
    contentfulMetadata: ContentfulMetadata
    country?: Maybe<Scalars['String']['output']>
    id?: Maybe<Scalars['Int']['output']>
    image?: Maybe<Asset>
    linkedFrom?: Maybe<TestimonialLinkingCollections>
    name?: Maybe<Scalars['String']['output']>
    sex?: Maybe<Scalars['Boolean']['output']>
    sys: Sys
  }

/** testimonial about Ryoto [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/testimonial) */
export type TestimonialAgeGroupArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** testimonial about Ryoto [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/testimonial) */
export type TestimonialCommentArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** testimonial about Ryoto [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/testimonial) */
export type TestimonialCountryArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** testimonial about Ryoto [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/testimonial) */
export type TestimonialIdArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** testimonial about Ryoto [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/testimonial) */
export type TestimonialImageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
}

/** testimonial about Ryoto [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/testimonial) */
export type TestimonialLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

/** testimonial about Ryoto [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/testimonial) */
export type TestimonialNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** testimonial about Ryoto [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/testimonial) */
export type TestimonialSexArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

export type TestimonialCollection = {
  __typename?: 'TestimonialCollection'
  items: Array<Maybe<Testimonial>>
  limit: Scalars['Int']['output']
  skip: Scalars['Int']['output']
  total: Scalars['Int']['output']
}

export type TestimonialFilter = {
  AND?: InputMaybe<Array<InputMaybe<TestimonialFilter>>>
  OR?: InputMaybe<Array<InputMaybe<TestimonialFilter>>>
  ageGroup?: InputMaybe<Scalars['Int']['input']>
  ageGroup_exists?: InputMaybe<Scalars['Boolean']['input']>
  ageGroup_gt?: InputMaybe<Scalars['Int']['input']>
  ageGroup_gte?: InputMaybe<Scalars['Int']['input']>
  ageGroup_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  ageGroup_lt?: InputMaybe<Scalars['Int']['input']>
  ageGroup_lte?: InputMaybe<Scalars['Int']['input']>
  ageGroup_not?: InputMaybe<Scalars['Int']['input']>
  ageGroup_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  comment?: InputMaybe<Scalars['String']['input']>
  comment_contains?: InputMaybe<Scalars['String']['input']>
  comment_exists?: InputMaybe<Scalars['Boolean']['input']>
  comment_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  comment_not?: InputMaybe<Scalars['String']['input']>
  comment_not_contains?: InputMaybe<Scalars['String']['input']>
  comment_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>
  country?: InputMaybe<Scalars['String']['input']>
  country_contains?: InputMaybe<Scalars['String']['input']>
  country_exists?: InputMaybe<Scalars['Boolean']['input']>
  country_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  country_not?: InputMaybe<Scalars['String']['input']>
  country_not_contains?: InputMaybe<Scalars['String']['input']>
  country_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  id?: InputMaybe<Scalars['Int']['input']>
  id_exists?: InputMaybe<Scalars['Boolean']['input']>
  id_gt?: InputMaybe<Scalars['Int']['input']>
  id_gte?: InputMaybe<Scalars['Int']['input']>
  id_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  id_lt?: InputMaybe<Scalars['Int']['input']>
  id_lte?: InputMaybe<Scalars['Int']['input']>
  id_not?: InputMaybe<Scalars['Int']['input']>
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  image_exists?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  name_contains?: InputMaybe<Scalars['String']['input']>
  name_exists?: InputMaybe<Scalars['Boolean']['input']>
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  name_not?: InputMaybe<Scalars['String']['input']>
  name_not_contains?: InputMaybe<Scalars['String']['input']>
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  sex?: InputMaybe<Scalars['Boolean']['input']>
  sex_exists?: InputMaybe<Scalars['Boolean']['input']>
  sex_not?: InputMaybe<Scalars['Boolean']['input']>
  sys?: InputMaybe<SysFilter>
}

export type TestimonialLinkingCollections = {
  __typename?: 'TestimonialLinkingCollections'
  entryCollection?: Maybe<EntryCollection>
}

export type TestimonialLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
}

export enum TestimonialOrder {
  AgeGroupAsc = 'ageGroup_ASC',
  AgeGroupDesc = 'ageGroup_DESC',
  CountryAsc = 'country_ASC',
  CountryDesc = 'country_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SexAsc = 'sex_ASC',
  SexDesc = 'sex_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** A tour provided by Travel Like a Local Japan [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/tour) */
export type Tour = Entry &
  _Node & {
    __typename?: 'Tour'
    _id: Scalars['ID']['output']
    approximateDuration?: Maybe<Scalars['Float']['output']>
    contentfulMetadata: ContentfulMetadata
    description?: Maybe<Scalars['String']['output']>
    exclusions?: Maybe<Array<Maybe<Scalars['String']['output']>>>
    featuredImage?: Maybe<Asset>
    fullDescription?: Maybe<TourFullDescription>
    galleryImagesCollection?: Maybe<AssetCollection>
    inclusions?: Maybe<Array<Maybe<Scalars['String']['output']>>>
    instructor?: Maybe<Scalars['String']['output']>
    isFeatured?: Maybe<Scalars['Boolean']['output']>
    keyHighlights?: Maybe<Array<Maybe<Scalars['String']['output']>>>
    linkedFrom?: Maybe<TourLinkingCollections>
    location?: Maybe<Scalars['String']['output']>
    maxParticipants?: Maybe<Scalars['Int']['output']>
    minParticipants?: Maybe<Scalars['Int']['output']>
    price?: Maybe<Scalars['Int']['output']>
    shortDescription?: Maybe<Scalars['String']['output']>
    slug?: Maybe<Scalars['String']['output']>
    sys: Sys
    title?: Maybe<Scalars['String']['output']>
  }

/** A tour provided by Travel Like a Local Japan [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/tour) */
export type TourApproximateDurationArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** A tour provided by Travel Like a Local Japan [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/tour) */
export type TourDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** A tour provided by Travel Like a Local Japan [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/tour) */
export type TourExclusionsArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** A tour provided by Travel Like a Local Japan [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/tour) */
export type TourFeaturedImageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
}

/** A tour provided by Travel Like a Local Japan [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/tour) */
export type TourFullDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** A tour provided by Travel Like a Local Japan [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/tour) */
export type TourGalleryImagesCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
}

/** A tour provided by Travel Like a Local Japan [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/tour) */
export type TourInclusionsArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** A tour provided by Travel Like a Local Japan [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/tour) */
export type TourInstructorArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** A tour provided by Travel Like a Local Japan [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/tour) */
export type TourIsFeaturedArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** A tour provided by Travel Like a Local Japan [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/tour) */
export type TourKeyHighlightsArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** A tour provided by Travel Like a Local Japan [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/tour) */
export type TourLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

/** A tour provided by Travel Like a Local Japan [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/tour) */
export type TourLocationArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** A tour provided by Travel Like a Local Japan [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/tour) */
export type TourMaxParticipantsArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** A tour provided by Travel Like a Local Japan [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/tour) */
export type TourMinParticipantsArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** A tour provided by Travel Like a Local Japan [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/tour) */
export type TourPriceArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** A tour provided by Travel Like a Local Japan [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/tour) */
export type TourShortDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** A tour provided by Travel Like a Local Japan [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/tour) */
export type TourSlugArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** A tour provided by Travel Like a Local Japan [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/tour) */
export type TourTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

export type TourCollection = {
  __typename?: 'TourCollection'
  items: Array<Maybe<Tour>>
  limit: Scalars['Int']['output']
  skip: Scalars['Int']['output']
  total: Scalars['Int']['output']
}

export type TourFilter = {
  AND?: InputMaybe<Array<InputMaybe<TourFilter>>>
  OR?: InputMaybe<Array<InputMaybe<TourFilter>>>
  approximateDuration?: InputMaybe<Scalars['Float']['input']>
  approximateDuration_exists?: InputMaybe<Scalars['Boolean']['input']>
  approximateDuration_gt?: InputMaybe<Scalars['Float']['input']>
  approximateDuration_gte?: InputMaybe<Scalars['Float']['input']>
  approximateDuration_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>
  approximateDuration_lt?: InputMaybe<Scalars['Float']['input']>
  approximateDuration_lte?: InputMaybe<Scalars['Float']['input']>
  approximateDuration_not?: InputMaybe<Scalars['Float']['input']>
  approximateDuration_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>
  description?: InputMaybe<Scalars['String']['input']>
  description_contains?: InputMaybe<Scalars['String']['input']>
  description_exists?: InputMaybe<Scalars['Boolean']['input']>
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  description_not?: InputMaybe<Scalars['String']['input']>
  description_not_contains?: InputMaybe<Scalars['String']['input']>
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  exclusions_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  exclusions_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  exclusions_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  exclusions_exists?: InputMaybe<Scalars['Boolean']['input']>
  featuredImage_exists?: InputMaybe<Scalars['Boolean']['input']>
  fullDescription_contains?: InputMaybe<Scalars['String']['input']>
  fullDescription_exists?: InputMaybe<Scalars['Boolean']['input']>
  fullDescription_not_contains?: InputMaybe<Scalars['String']['input']>
  galleryImagesCollection_exists?: InputMaybe<Scalars['Boolean']['input']>
  inclusions_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  inclusions_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  inclusions_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  inclusions_exists?: InputMaybe<Scalars['Boolean']['input']>
  instructor?: InputMaybe<Scalars['String']['input']>
  instructor_contains?: InputMaybe<Scalars['String']['input']>
  instructor_exists?: InputMaybe<Scalars['Boolean']['input']>
  instructor_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  instructor_not?: InputMaybe<Scalars['String']['input']>
  instructor_not_contains?: InputMaybe<Scalars['String']['input']>
  instructor_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>
  isFeatured_exists?: InputMaybe<Scalars['Boolean']['input']>
  isFeatured_not?: InputMaybe<Scalars['Boolean']['input']>
  keyHighlights_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  keyHighlights_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  keyHighlights_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  keyHighlights_exists?: InputMaybe<Scalars['Boolean']['input']>
  location?: InputMaybe<Scalars['String']['input']>
  location_contains?: InputMaybe<Scalars['String']['input']>
  location_exists?: InputMaybe<Scalars['Boolean']['input']>
  location_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  location_not?: InputMaybe<Scalars['String']['input']>
  location_not_contains?: InputMaybe<Scalars['String']['input']>
  location_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  maxParticipants?: InputMaybe<Scalars['Int']['input']>
  maxParticipants_exists?: InputMaybe<Scalars['Boolean']['input']>
  maxParticipants_gt?: InputMaybe<Scalars['Int']['input']>
  maxParticipants_gte?: InputMaybe<Scalars['Int']['input']>
  maxParticipants_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  maxParticipants_lt?: InputMaybe<Scalars['Int']['input']>
  maxParticipants_lte?: InputMaybe<Scalars['Int']['input']>
  maxParticipants_not?: InputMaybe<Scalars['Int']['input']>
  maxParticipants_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  minParticipants?: InputMaybe<Scalars['Int']['input']>
  minParticipants_exists?: InputMaybe<Scalars['Boolean']['input']>
  minParticipants_gt?: InputMaybe<Scalars['Int']['input']>
  minParticipants_gte?: InputMaybe<Scalars['Int']['input']>
  minParticipants_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  minParticipants_lt?: InputMaybe<Scalars['Int']['input']>
  minParticipants_lte?: InputMaybe<Scalars['Int']['input']>
  minParticipants_not?: InputMaybe<Scalars['Int']['input']>
  minParticipants_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  price?: InputMaybe<Scalars['Int']['input']>
  price_exists?: InputMaybe<Scalars['Boolean']['input']>
  price_gt?: InputMaybe<Scalars['Int']['input']>
  price_gte?: InputMaybe<Scalars['Int']['input']>
  price_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  price_lt?: InputMaybe<Scalars['Int']['input']>
  price_lte?: InputMaybe<Scalars['Int']['input']>
  price_not?: InputMaybe<Scalars['Int']['input']>
  price_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  shortDescription?: InputMaybe<Scalars['String']['input']>
  shortDescription_contains?: InputMaybe<Scalars['String']['input']>
  shortDescription_exists?: InputMaybe<Scalars['Boolean']['input']>
  shortDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  shortDescription_not?: InputMaybe<Scalars['String']['input']>
  shortDescription_not_contains?: InputMaybe<Scalars['String']['input']>
  shortDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  slug?: InputMaybe<Scalars['String']['input']>
  slug_contains?: InputMaybe<Scalars['String']['input']>
  slug_exists?: InputMaybe<Scalars['Boolean']['input']>
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  slug_not?: InputMaybe<Scalars['String']['input']>
  slug_not_contains?: InputMaybe<Scalars['String']['input']>
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  sys?: InputMaybe<SysFilter>
  title?: InputMaybe<Scalars['String']['input']>
  title_contains?: InputMaybe<Scalars['String']['input']>
  title_exists?: InputMaybe<Scalars['Boolean']['input']>
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  title_not?: InputMaybe<Scalars['String']['input']>
  title_not_contains?: InputMaybe<Scalars['String']['input']>
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type TourFullDescription = {
  __typename?: 'TourFullDescription'
  json: Scalars['JSON']['output']
  links: TourFullDescriptionLinks
}

export type TourFullDescriptionAssets = {
  __typename?: 'TourFullDescriptionAssets'
  block: Array<Maybe<Asset>>
  hyperlink: Array<Maybe<Asset>>
}

export type TourFullDescriptionEntries = {
  __typename?: 'TourFullDescriptionEntries'
  block: Array<Maybe<Entry>>
  hyperlink: Array<Maybe<Entry>>
  inline: Array<Maybe<Entry>>
}

export type TourFullDescriptionLinks = {
  __typename?: 'TourFullDescriptionLinks'
  assets: TourFullDescriptionAssets
  entries: TourFullDescriptionEntries
  resources: TourFullDescriptionResources
}

export type TourFullDescriptionResources = {
  __typename?: 'TourFullDescriptionResources'
  block: Array<TourFullDescriptionResourcesBlock>
  hyperlink: Array<TourFullDescriptionResourcesHyperlink>
  inline: Array<TourFullDescriptionResourcesInline>
}

export type TourFullDescriptionResourcesBlock = ResourceLink & {
  __typename?: 'TourFullDescriptionResourcesBlock'
  sys: ResourceSys
}

export type TourFullDescriptionResourcesHyperlink = ResourceLink & {
  __typename?: 'TourFullDescriptionResourcesHyperlink'
  sys: ResourceSys
}

export type TourFullDescriptionResourcesInline = ResourceLink & {
  __typename?: 'TourFullDescriptionResourcesInline'
  sys: ResourceSys
}

export type TourLinkingCollections = {
  __typename?: 'TourLinkingCollections'
  entryCollection?: Maybe<EntryCollection>
}

export type TourLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
}

export enum TourOrder {
  ApproximateDurationAsc = 'approximateDuration_ASC',
  ApproximateDurationDesc = 'approximateDuration_DESC',
  InstructorAsc = 'instructor_ASC',
  InstructorDesc = 'instructor_DESC',
  IsFeaturedAsc = 'isFeatured_ASC',
  IsFeaturedDesc = 'isFeatured_DESC',
  LocationAsc = 'location_ASC',
  LocationDesc = 'location_DESC',
  MaxParticipantsAsc = 'maxParticipants_ASC',
  MaxParticipantsDesc = 'maxParticipants_DESC',
  MinParticipantsAsc = 'minParticipants_ASC',
  MinParticipantsDesc = 'minParticipants_DESC',
  PriceAsc = 'price_ASC',
  PriceDesc = 'price_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** Unique Value Proposition for displaying on Hero component [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/uniqueValueProposition) */
export type UniqueValueProposition = Entry &
  _Node & {
    __typename?: 'UniqueValueProposition'
    _id: Scalars['ID']['output']
    contentfulMetadata: ContentfulMetadata
    description?: Maybe<Scalars['String']['output']>
    image?: Maybe<Asset>
    linkedFrom?: Maybe<UniqueValuePropositionLinkingCollections>
    sys: Sys
    title?: Maybe<Scalars['String']['output']>
  }

/** Unique Value Proposition for displaying on Hero component [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/uniqueValueProposition) */
export type UniqueValuePropositionDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

/** Unique Value Proposition for displaying on Hero component [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/uniqueValueProposition) */
export type UniqueValuePropositionImageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
}

/** Unique Value Proposition for displaying on Hero component [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/uniqueValueProposition) */
export type UniqueValuePropositionLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

/** Unique Value Proposition for displaying on Hero component [See type definition](https://app.contentful.com/spaces/rymv5s221jmx/content_types/uniqueValueProposition) */
export type UniqueValuePropositionTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>
}

export type UniqueValuePropositionCollection = {
  __typename?: 'UniqueValuePropositionCollection'
  items: Array<Maybe<UniqueValueProposition>>
  limit: Scalars['Int']['output']
  skip: Scalars['Int']['output']
  total: Scalars['Int']['output']
}

export type UniqueValuePropositionFilter = {
  AND?: InputMaybe<Array<InputMaybe<UniqueValuePropositionFilter>>>
  OR?: InputMaybe<Array<InputMaybe<UniqueValuePropositionFilter>>>
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>
  description?: InputMaybe<Scalars['String']['input']>
  description_contains?: InputMaybe<Scalars['String']['input']>
  description_exists?: InputMaybe<Scalars['Boolean']['input']>
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  description_not?: InputMaybe<Scalars['String']['input']>
  description_not_contains?: InputMaybe<Scalars['String']['input']>
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  image_exists?: InputMaybe<Scalars['Boolean']['input']>
  sys?: InputMaybe<SysFilter>
  title?: InputMaybe<Scalars['String']['input']>
  title_contains?: InputMaybe<Scalars['String']['input']>
  title_exists?: InputMaybe<Scalars['Boolean']['input']>
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  title_not?: InputMaybe<Scalars['String']['input']>
  title_not_contains?: InputMaybe<Scalars['String']['input']>
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type UniqueValuePropositionLinkingCollections = {
  __typename?: 'UniqueValuePropositionLinkingCollections'
  entryCollection?: Maybe<EntryCollection>
}

export type UniqueValuePropositionLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  locale?: InputMaybe<Scalars['String']['input']>
  preview?: InputMaybe<Scalars['Boolean']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
}

export enum UniqueValuePropositionOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type _Node = {
  _id: Scalars['ID']['output']
}

export type CfComponentAuthorNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfComponentAuthorNestedFilter>>>
  OR?: InputMaybe<Array<InputMaybe<CfComponentAuthorNestedFilter>>>
  avatar_exists?: InputMaybe<Scalars['Boolean']['input']>
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>
  internalName?: InputMaybe<Scalars['String']['input']>
  internalName_contains?: InputMaybe<Scalars['String']['input']>
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  internalName_not?: InputMaybe<Scalars['String']['input']>
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  name?: InputMaybe<Scalars['String']['input']>
  name_contains?: InputMaybe<Scalars['String']['input']>
  name_exists?: InputMaybe<Scalars['Boolean']['input']>
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  name_not?: InputMaybe<Scalars['String']['input']>
  name_not_contains?: InputMaybe<Scalars['String']['input']>
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  sys?: InputMaybe<SysFilter>
}

export type CfComponentSeoNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfComponentSeoNestedFilter>>>
  OR?: InputMaybe<Array<InputMaybe<CfComponentSeoNestedFilter>>>
  canonicalUrl?: InputMaybe<Scalars['String']['input']>
  canonicalUrl_contains?: InputMaybe<Scalars['String']['input']>
  canonicalUrl_exists?: InputMaybe<Scalars['Boolean']['input']>
  canonicalUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  canonicalUrl_not?: InputMaybe<Scalars['String']['input']>
  canonicalUrl_not_contains?: InputMaybe<Scalars['String']['input']>
  canonicalUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>
  internalName?: InputMaybe<Scalars['String']['input']>
  internalName_contains?: InputMaybe<Scalars['String']['input']>
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  internalName_not?: InputMaybe<Scalars['String']['input']>
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  nofollow?: InputMaybe<Scalars['Boolean']['input']>
  nofollow_exists?: InputMaybe<Scalars['Boolean']['input']>
  nofollow_not?: InputMaybe<Scalars['Boolean']['input']>
  noindex?: InputMaybe<Scalars['Boolean']['input']>
  noindex_exists?: InputMaybe<Scalars['Boolean']['input']>
  noindex_not?: InputMaybe<Scalars['Boolean']['input']>
  pageDescription?: InputMaybe<Scalars['String']['input']>
  pageDescription_contains?: InputMaybe<Scalars['String']['input']>
  pageDescription_exists?: InputMaybe<Scalars['Boolean']['input']>
  pageDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  pageDescription_not?: InputMaybe<Scalars['String']['input']>
  pageDescription_not_contains?: InputMaybe<Scalars['String']['input']>
  pageDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  pageTitle?: InputMaybe<Scalars['String']['input']>
  pageTitle_contains?: InputMaybe<Scalars['String']['input']>
  pageTitle_exists?: InputMaybe<Scalars['Boolean']['input']>
  pageTitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  pageTitle_not?: InputMaybe<Scalars['String']['input']>
  pageTitle_not_contains?: InputMaybe<Scalars['String']['input']>
  pageTitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  shareImagesCollection_exists?: InputMaybe<Scalars['Boolean']['input']>
  sys?: InputMaybe<SysFilter>
}

export type CfPageBlogPostNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfPageBlogPostNestedFilter>>>
  OR?: InputMaybe<Array<InputMaybe<CfPageBlogPostNestedFilter>>>
  author_exists?: InputMaybe<Scalars['Boolean']['input']>
  content_contains?: InputMaybe<Scalars['String']['input']>
  content_exists?: InputMaybe<Scalars['Boolean']['input']>
  content_not_contains?: InputMaybe<Scalars['String']['input']>
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>
  featuredImage_exists?: InputMaybe<Scalars['Boolean']['input']>
  internalName?: InputMaybe<Scalars['String']['input']>
  internalName_contains?: InputMaybe<Scalars['String']['input']>
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  internalName_not?: InputMaybe<Scalars['String']['input']>
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  introduction_contains?: InputMaybe<Scalars['String']['input']>
  introduction_exists?: InputMaybe<Scalars['Boolean']['input']>
  introduction_not_contains?: InputMaybe<Scalars['String']['input']>
  publishedDate?: InputMaybe<Scalars['DateTime']['input']>
  publishedDate_exists?: InputMaybe<Scalars['Boolean']['input']>
  publishedDate_gt?: InputMaybe<Scalars['DateTime']['input']>
  publishedDate_gte?: InputMaybe<Scalars['DateTime']['input']>
  publishedDate_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>
  publishedDate_lt?: InputMaybe<Scalars['DateTime']['input']>
  publishedDate_lte?: InputMaybe<Scalars['DateTime']['input']>
  publishedDate_not?: InputMaybe<Scalars['DateTime']['input']>
  publishedDate_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>
  relatedBlogPostsCollection_exists?: InputMaybe<Scalars['Boolean']['input']>
  seoFields_exists?: InputMaybe<Scalars['Boolean']['input']>
  shortDescription?: InputMaybe<Scalars['String']['input']>
  shortDescription_contains?: InputMaybe<Scalars['String']['input']>
  shortDescription_exists?: InputMaybe<Scalars['Boolean']['input']>
  shortDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  shortDescription_not?: InputMaybe<Scalars['String']['input']>
  shortDescription_not_contains?: InputMaybe<Scalars['String']['input']>
  shortDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  slug?: InputMaybe<Scalars['String']['input']>
  slug_contains?: InputMaybe<Scalars['String']['input']>
  slug_exists?: InputMaybe<Scalars['Boolean']['input']>
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  slug_not?: InputMaybe<Scalars['String']['input']>
  slug_not_contains?: InputMaybe<Scalars['String']['input']>
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  sys?: InputMaybe<SysFilter>
  title?: InputMaybe<Scalars['String']['input']>
  title_contains?: InputMaybe<Scalars['String']['input']>
  title_exists?: InputMaybe<Scalars['Boolean']['input']>
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  title_not?: InputMaybe<Scalars['String']['input']>
  title_not_contains?: InputMaybe<Scalars['String']['input']>
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type GetAssetQueryVariables = Exact<{
  id: Scalars['String']['input']
}>

export type GetAssetQuery = {
  __typename?: 'Query'
  asset?: { __typename?: 'Asset'; title?: string | null; url?: string | null; fileName?: string | null } | null
}

export type GetAssetsByTagQueryVariables = Exact<{
  tag: Scalars['String']['input']
}>

export type GetAssetsByTagQuery = {
  __typename?: 'Query'
  assetCollection?: {
    __typename?: 'AssetCollection'
    items: Array<{ __typename?: 'Asset'; title?: string | null; url?: string | null; fileName?: string | null } | null>
  } | null
}

export type GetBlogPostBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input']
  locale: Scalars['String']['input']
}>

export type GetBlogPostBySlugQuery = {
  __typename?: 'Query'
  pageBlogPostCollection?: {
    __typename?: 'PageBlogPostCollection'
    items: Array<{
      __typename?: 'PageBlogPost'
      slug?: string | null
      title?: string | null
      publishedDate?: any | null
      relatedBlogPostsCollection?: {
        __typename?: 'PageBlogPostRelatedBlogPostsCollection'
        items: Array<{
          __typename?: 'PageBlogPost'
          title?: string | null
          slug?: string | null
          publishedDate?: any | null
          sys: { __typename?: 'Sys'; id: string }
          featuredImage?: { __typename?: 'Asset'; title?: string | null; url?: string | null; width?: number | null; height?: number | null } | null
          seoFields?: { __typename?: 'ComponentSeo'; pageDescription?: string | null } | null
          author?: {
            __typename?: 'ComponentAuthor'
            name?: string | null
            avatar?: { __typename?: 'Asset'; title?: string | null; url?: string | null; width?: number | null; height?: number | null } | null
          } | null
          contentfulMetadata: {
            __typename?: 'ContentfulMetadata'
            tags: Array<{ __typename?: 'ContentfulTag'; name?: string | null } | null>
            concepts: Array<{ __typename?: 'TaxonomyConcept'; id?: string | null } | null>
          }
        } | null>
      } | null
      sys: { __typename?: 'Sys'; id: string }
      seoFields?: { __typename?: 'ComponentSeo'; pageTitle?: string | null; pageDescription?: string | null } | null
      introduction?: { __typename: 'PageBlogPostIntroduction'; json: any } | null
      content?: {
        __typename: 'PageBlogPostContent'
        json: any
        links: {
          __typename?: 'PageBlogPostContentLinks'
          entries: {
            __typename?: 'PageBlogPostContentEntries'
            block: Array<
              | { __typename: 'ComponentAuthor'; sys: { __typename?: 'Sys'; id: string } }
              | {
                  __typename: 'ComponentRichImage'
                  image?: {
                    __typename?: 'Asset'
                    title?: string | null
                    url?: string | null
                    width?: number | null
                    height?: number | null
                    description?: string | null
                  } | null
                  sys: { __typename?: 'Sys'; id: string }
                }
              | { __typename: 'ComponentSeo'; sys: { __typename?: 'Sys'; id: string } }
              | { __typename: 'PageBlogPost'; sys: { __typename?: 'Sys'; id: string } }
              | { __typename: 'PageLanding'; sys: { __typename?: 'Sys'; id: string } }
              | { __typename: 'Testimonial'; sys: { __typename?: 'Sys'; id: string } }
              | { __typename: 'Tour'; sys: { __typename?: 'Sys'; id: string } }
              | { __typename: 'UniqueValueProposition'; sys: { __typename?: 'Sys'; id: string } }
              | null
            >
          }
          assets: {
            __typename?: 'PageBlogPostContentAssets'
            block: Array<{
              __typename?: 'Asset'
              url?: string | null
              title?: string | null
              width?: number | null
              height?: number | null
              description?: string | null
              sys: { __typename?: 'Sys'; id: string }
            } | null>
          }
        }
      } | null
      author?: {
        __typename?: 'ComponentAuthor'
        name?: string | null
        avatar?: { __typename?: 'Asset'; title?: string | null; url?: string | null; width?: number | null; height?: number | null } | null
      } | null
      featuredImage?: { __typename?: 'Asset'; title?: string | null; url?: string | null; width?: number | null; height?: number | null } | null
      contentfulMetadata: {
        __typename?: 'ContentfulMetadata'
        tags: Array<{ __typename?: 'ContentfulTag'; name?: string | null } | null>
        concepts: Array<{ __typename?: 'TaxonomyConcept'; id?: string | null } | null>
      }
    } | null>
  } | null
}

export type GetFeaturedBlogPostsQueryVariables = Exact<{
  locale: Scalars['String']['input']
}>

export type GetFeaturedBlogPostsQuery = {
  __typename?: 'Query'
  pageBlogPostCollection?: {
    __typename?: 'PageBlogPostCollection'
    items: Array<{
      __typename?: 'PageBlogPost'
      title?: string | null
      slug?: string | null
      featuredImage?: { __typename?: 'Asset'; url?: string | null; title?: string | null } | null
      contentfulMetadata: {
        __typename?: 'ContentfulMetadata'
        tags: Array<{ __typename?: 'ContentfulTag'; name?: string | null } | null>
        concepts: Array<{ __typename?: 'TaxonomyConcept'; id?: string | null } | null>
      }
    } | null>
  } | null
}

export type GetBlogPostsQueryVariables = Exact<{
  locale: Scalars['String']['input']
  where?: InputMaybe<PageBlogPostFilter>
  limit?: InputMaybe<Scalars['Int']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
}>

export type GetBlogPostsQuery = {
  __typename?: 'Query'
  pageBlogPostCollection?: {
    __typename?: 'PageBlogPostCollection'
    total: number
    items: Array<{
      __typename?: 'PageBlogPost'
      title?: string | null
      slug?: string | null
      publishedDate?: any | null
      sys: { __typename?: 'Sys'; id: string }
      featuredImage?: { __typename?: 'Asset'; title?: string | null; url?: string | null; width?: number | null; height?: number | null } | null
      seoFields?: { __typename?: 'ComponentSeo'; pageDescription?: string | null } | null
      author?: {
        __typename?: 'ComponentAuthor'
        name?: string | null
        avatar?: { __typename?: 'Asset'; title?: string | null; url?: string | null; width?: number | null; height?: number | null } | null
      } | null
      contentfulMetadata: {
        __typename?: 'ContentfulMetadata'
        tags: Array<{ __typename?: 'ContentfulTag'; name?: string | null } | null>
        concepts: Array<{ __typename?: 'TaxonomyConcept'; id?: string | null } | null>
      }
    } | null>
  } | null
}

export type GetBlogPostsBySlugsQueryVariables = Exact<{
  slugs: Array<Scalars['String']['input']> | Scalars['String']['input']
}>

export type GetBlogPostsBySlugsQuery = {
  __typename?: 'Query'
  pageBlogPostCollection?: {
    __typename?: 'PageBlogPostCollection'
    total: number
    items: Array<{
      __typename?: 'PageBlogPost'
      title?: string | null
      slug?: string | null
      publishedDate?: any | null
      sys: { __typename?: 'Sys'; id: string }
      featuredImage?: { __typename?: 'Asset'; title?: string | null; url?: string | null; width?: number | null; height?: number | null } | null
      seoFields?: { __typename?: 'ComponentSeo'; pageDescription?: string | null } | null
      author?: {
        __typename?: 'ComponentAuthor'
        name?: string | null
        avatar?: { __typename?: 'Asset'; title?: string | null; url?: string | null; width?: number | null; height?: number | null } | null
      } | null
      contentfulMetadata: {
        __typename?: 'ContentfulMetadata'
        tags: Array<{ __typename?: 'ContentfulTag'; name?: string | null } | null>
        concepts: Array<{ __typename?: 'TaxonomyConcept'; id?: string | null } | null>
      }
    } | null>
  } | null
}

export type GetAllBlogPostsQueryVariables = Exact<{
  locale: Scalars['String']['input']
}>

export type GetAllBlogPostsQuery = {
  __typename?: 'Query'
  pageBlogPostCollection?: {
    __typename?: 'PageBlogPostCollection'
    items: Array<{
      __typename?: 'PageBlogPost'
      slug?: string | null
      title?: string | null
      contentfulMetadata: { __typename?: 'ContentfulMetadata'; concepts: Array<{ __typename?: 'TaxonomyConcept'; id?: string | null } | null> }
    } | null>
  } | null
}

export type SearchBlogPostsQueryVariables = Exact<{
  locale: Scalars['String']['input']
  searchTerm: Scalars['String']['input']
  conceptId?: InputMaybe<Scalars['String']['input']>
  limit?: InputMaybe<Scalars['Int']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
}>

export type SearchBlogPostsQuery = {
  __typename?: 'Query'
  pageBlogPostCollection?: {
    __typename?: 'PageBlogPostCollection'
    total: number
    items: Array<{
      __typename?: 'PageBlogPost'
      title?: string | null
      slug?: string | null
      publishedDate?: any | null
      sys: { __typename?: 'Sys'; id: string }
      featuredImage?: { __typename?: 'Asset'; title?: string | null; url?: string | null; width?: number | null; height?: number | null } | null
      seoFields?: { __typename?: 'ComponentSeo'; pageDescription?: string | null } | null
      author?: {
        __typename?: 'ComponentAuthor'
        name?: string | null
        avatar?: { __typename?: 'Asset'; title?: string | null; url?: string | null; width?: number | null; height?: number | null } | null
      } | null
      contentfulMetadata: {
        __typename?: 'ContentfulMetadata'
        tags: Array<{ __typename?: 'ContentfulTag'; name?: string | null } | null>
        concepts: Array<{ __typename?: 'TaxonomyConcept'; id?: string | null } | null>
      }
    } | null>
  } | null
}

export type GetUniqueValuePropositionsQueryVariables = Exact<{
  locale: Scalars['String']['input']
}>

export type GetUniqueValuePropositionsQuery = {
  __typename?: 'Query'
  uniqueValuePropositionCollection?: {
    __typename?: 'UniqueValuePropositionCollection'
    items: Array<{
      __typename?: 'UniqueValueProposition'
      title?: string | null
      description?: string | null
      image?: {
        __typename?: 'Asset'
        title?: string | null
        description?: string | null
        width?: number | null
        height?: number | null
        url?: string | null
      } | null
    } | null>
  } | null
}

export type GetToursQueryVariables = Exact<{
  locale: Scalars['String']['input']
}>

export type GetToursQuery = {
  __typename?: 'Query'
  tourCollection?: {
    __typename?: 'TourCollection'
    items: Array<{
      __typename?: 'Tour'
      title?: string | null
      slug?: string | null
      description?: string | null
      approximateDuration?: number | null
      price?: number | null
      featuredImage?: { __typename?: 'Asset'; title?: string | null; url?: string | null; width?: number | null; height?: number | null } | null
    } | null>
  } | null
}

export type GetTourQueryVariables = Exact<{
  slug: Scalars['String']['input']
  locale: Scalars['String']['input']
}>

export type GetTourQuery = {
  __typename?: 'Query'
  tourCollection?: {
    __typename?: 'TourCollection'
    items: Array<{
      __typename?: 'Tour'
      title?: string | null
      slug?: string | null
      description?: string | null
      approximateDuration?: number | null
      price?: number | null
      shortDescription?: string | null
      minParticipants?: number | null
      maxParticipants?: number | null
      location?: string | null
      instructor?: string | null
      keyHighlights?: Array<string | null> | null
      inclusions?: Array<string | null> | null
      exclusions?: Array<string | null> | null
      isFeatured?: boolean | null
      featuredImage?: { __typename?: 'Asset'; title?: string | null; url?: string | null; width?: number | null; height?: number | null } | null
      fullDescription?: { __typename: 'TourFullDescription'; json: any } | null
      galleryImagesCollection?: {
        __typename?: 'AssetCollection'
        items: Array<{ __typename?: 'Asset'; url?: string | null; width?: number | null; height?: number | null } | null>
      } | null
    } | null>
  } | null
}

export type GetTestimonialsQueryVariables = Exact<{
  locale: Scalars['String']['input']
}>

export type GetTestimonialsQuery = {
  __typename?: 'Query'
  testimonialCollection?: {
    __typename?: 'TestimonialCollection'
    items: Array<{
      __typename?: 'Testimonial'
      id?: number | null
      name?: string | null
      sex?: boolean | null
      country?: string | null
      ageGroup?: number | null
      comment?: string | null
      image?: { __typename?: 'Asset'; title?: string | null; url?: string | null; width?: number | null; height?: number | null } | null
    } | null>
  } | null
}

export const GetAssetDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAsset' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'asset' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'id' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fileName' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetAssetQuery, GetAssetQueryVariables>
export const GetAssetsByTagDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAssetsByTag' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'tag' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assetCollection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'contentfulMetadata' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'tags' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'id_contains_some' },
                                  value: { kind: 'ListValue', values: [{ kind: 'Variable', name: { kind: 'Name', value: 'tag' } }] }
                                }
                              ]
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'fileName' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetAssetsByTagQuery, GetAssetsByTagQueryVariables>
export const GetBlogPostBySlugDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetBlogPostBySlug' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'locale' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'pageBlogPostCollection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [{ kind: 'ObjectField', name: { kind: 'Name', value: 'slug' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } } }]
                }
              },
              { kind: 'Argument', name: { kind: 'Name', value: 'locale' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'locale' } } },
              { kind: 'Argument', name: { kind: 'Name', value: 'limit' }, value: { kind: 'IntValue', value: '1' } }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'relatedBlogPostsCollection' },
                        arguments: [
                          { kind: 'Argument', name: { kind: 'Name', value: 'limit' }, value: { kind: 'IntValue', value: '5' } },
                          { kind: 'Argument', name: { kind: 'Name', value: 'order' }, value: { kind: 'EnumValue', value: 'publishedDate_DESC' } }
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'items' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'sys' },
                                    selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }] }
                                  },
                                  { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'publishedDate' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'featuredImage' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'height' } }
                                      ]
                                    }
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'seoFields' },
                                    selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'pageDescription' } }] }
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'author' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'avatar' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                                              { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                                              { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                                              { kind: 'Field', name: { kind: 'Name', value: 'height' } }
                                            ]
                                          }
                                        }
                                      ]
                                    }
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'contentfulMetadata' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'tags' },
                                          selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }] }
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'concepts' },
                                          selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }] }
                                        }
                                      ]
                                    }
                                  }
                                ]
                              }
                            }
                          ]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sys' },
                        selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }] }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'seoFields' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'pageTitle' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'pageDescription' } }
                          ]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'introduction' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'json' } }
                          ]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'content' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'json' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'links' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'entries' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'block' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'sys' },
                                                selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }] }
                                              },
                                              { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                                              {
                                                kind: 'InlineFragment',
                                                typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ComponentRichImage' } },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'image' },
                                                      selectionSet: {
                                                        kind: 'SelectionSet',
                                                        selections: [
                                                          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                                                          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                                                          { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                                                          { kind: 'Field', name: { kind: 'Name', value: 'height' } },
                                                          { kind: 'Field', name: { kind: 'Name', value: 'description' } }
                                                        ]
                                                      }
                                                    }
                                                  ]
                                                }
                                              }
                                            ]
                                          }
                                        }
                                      ]
                                    }
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'assets' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'block' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'sys' },
                                                selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }] }
                                              },
                                              { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                                              { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                                              { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                                              { kind: 'Field', name: { kind: 'Name', value: 'height' } },
                                              { kind: 'Field', name: { kind: 'Name', value: 'description' } }
                                            ]
                                          }
                                        }
                                      ]
                                    }
                                  }
                                ]
                              }
                            }
                          ]
                        }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'author' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'avatar' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'height' } }
                                ]
                              }
                            }
                          ]
                        }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'publishedDate' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'featuredImage' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'height' } }
                          ]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'contentfulMetadata' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'tags' },
                              selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }] }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'concepts' },
                              selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }] }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetBlogPostBySlugQuery, GetBlogPostBySlugQueryVariables>
export const GetFeaturedBlogPostsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetFeaturedBlogPosts' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'locale' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'pageBlogPostCollection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'contentfulMetadata' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'tags' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'id_contains_some' },
                                  value: { kind: 'StringValue', value: 'featured', block: false }
                                }
                              ]
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              { kind: 'Argument', name: { kind: 'Name', value: 'locale' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'locale' } } },
              { kind: 'Argument', name: { kind: 'Name', value: 'limit' }, value: { kind: 'IntValue', value: '10' } }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'featuredImage' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'title' } }
                          ]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'contentfulMetadata' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'tags' },
                              selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }] }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'concepts' },
                              selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }] }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetFeaturedBlogPostsQuery, GetFeaturedBlogPostsQueryVariables>
export const GetBlogPostsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetBlogPosts' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'locale' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'where' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'PageBlogPostFilter' } }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'pageBlogPostCollection' },
            arguments: [
              { kind: 'Argument', name: { kind: 'Name', value: 'where' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'where' } } },
              { kind: 'Argument', name: { kind: 'Name', value: 'locale' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'locale' } } },
              { kind: 'Argument', name: { kind: 'Name', value: 'order' }, value: { kind: 'EnumValue', value: 'publishedDate_DESC' } },
              { kind: 'Argument', name: { kind: 'Name', value: 'limit' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } } },
              { kind: 'Argument', name: { kind: 'Name', value: 'skip' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } } }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sys' },
                        selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }] }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'publishedDate' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'featuredImage' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'height' } }
                          ]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'seoFields' },
                        selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'pageDescription' } }] }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'author' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'avatar' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'height' } }
                                ]
                              }
                            }
                          ]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'contentfulMetadata' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'tags' },
                              selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }] }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'concepts' },
                              selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }] }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetBlogPostsQuery, GetBlogPostsQueryVariables>
export const GetBlogPostsBySlugsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetBlogPostsBySlugs' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'slugs' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'ListType', type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'pageBlogPostCollection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    { kind: 'ObjectField', name: { kind: 'Name', value: 'slug_in' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'slugs' } } }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sys' },
                        selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }] }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'publishedDate' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'featuredImage' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'height' } }
                          ]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'seoFields' },
                        selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'pageDescription' } }] }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'author' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'avatar' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'height' } }
                                ]
                              }
                            }
                          ]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'contentfulMetadata' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'tags' },
                              selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }] }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'concepts' },
                              selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }] }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetBlogPostsBySlugsQuery, GetBlogPostsBySlugsQueryVariables>
export const GetAllBlogPostsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAllBlogPosts' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'locale' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'pageBlogPostCollection' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'locale' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'locale' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'contentfulMetadata' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'concepts' },
                              selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }] }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetAllBlogPostsQuery, GetAllBlogPostsQueryVariables>
export const SearchBlogPostsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SearchBlogPosts' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'locale' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'searchTerm' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'conceptId' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'pageBlogPostCollection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'OR' },
                      value: {
                        kind: 'ListValue',
                        values: [
                          {
                            kind: 'ObjectValue',
                            fields: [
                              {
                                kind: 'ObjectField',
                                name: { kind: 'Name', value: 'title_contains' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'searchTerm' } }
                              }
                            ]
                          },
                          {
                            kind: 'ObjectValue',
                            fields: [
                              {
                                kind: 'ObjectField',
                                name: { kind: 'Name', value: 'introduction_contains' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'searchTerm' } }
                              }
                            ]
                          },
                          {
                            kind: 'ObjectValue',
                            fields: [
                              {
                                kind: 'ObjectField',
                                name: { kind: 'Name', value: 'content_contains' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'searchTerm' } }
                              }
                            ]
                          },
                          {
                            kind: 'ObjectValue',
                            fields: [
                              {
                                kind: 'ObjectField',
                                name: { kind: 'Name', value: 'shortDescription_contains' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'searchTerm' } }
                              }
                            ]
                          },
                          {
                            kind: 'ObjectValue',
                            fields: [
                              {
                                kind: 'ObjectField',
                                name: { kind: 'Name', value: 'slug_contains' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'searchTerm' } }
                              }
                            ]
                          },
                          {
                            kind: 'ObjectValue',
                            fields: [
                              {
                                kind: 'ObjectField',
                                name: { kind: 'Name', value: 'contentfulMetadata' },
                                value: {
                                  kind: 'ObjectValue',
                                  fields: [
                                    {
                                      kind: 'ObjectField',
                                      name: { kind: 'Name', value: 'concepts' },
                                      value: {
                                        kind: 'ObjectValue',
                                        fields: [
                                          {
                                            kind: 'ObjectField',
                                            name: { kind: 'Name', value: 'id_contains_some' },
                                            value: { kind: 'ListValue', values: [{ kind: 'Variable', name: { kind: 'Name', value: 'conceptId' } }] }
                                          }
                                        ]
                                      }
                                    }
                                  ]
                                }
                              }
                            ]
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              { kind: 'Argument', name: { kind: 'Name', value: 'locale' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'locale' } } },
              { kind: 'Argument', name: { kind: 'Name', value: 'order' }, value: { kind: 'EnumValue', value: 'publishedDate_DESC' } },
              { kind: 'Argument', name: { kind: 'Name', value: 'limit' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } } },
              { kind: 'Argument', name: { kind: 'Name', value: 'skip' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } } }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sys' },
                        selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }] }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'publishedDate' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'featuredImage' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'height' } }
                          ]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'seoFields' },
                        selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'pageDescription' } }] }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'author' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'avatar' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'height' } }
                                ]
                              }
                            }
                          ]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'contentfulMetadata' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'tags' },
                              selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }] }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'concepts' },
                              selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }] }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SearchBlogPostsQuery, SearchBlogPostsQueryVariables>
export const GetUniqueValuePropositionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetUniqueValuePropositions' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'locale' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'uniqueValuePropositionCollection' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'locale' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'locale' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'image' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'height' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'url' } }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetUniqueValuePropositionsQuery, GetUniqueValuePropositionsQueryVariables>
export const GetToursDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetTours' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'locale' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'tourCollection' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'locale' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'locale' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'approximateDuration' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'featuredImage' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'height' } }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetToursQuery, GetToursQueryVariables>
export const GetTourDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetTour' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'locale' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'tourCollection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [{ kind: 'ObjectField', name: { kind: 'Name', value: 'slug' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } } }]
                }
              },
              { kind: 'Argument', name: { kind: 'Name', value: 'locale' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'locale' } } },
              { kind: 'Argument', name: { kind: 'Name', value: 'limit' }, value: { kind: 'IntValue', value: '1' } }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'featuredImage' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'height' } }
                          ]
                        }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'approximateDuration' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'shortDescription' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'fullDescription' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'json' } },
                            { kind: 'Field', name: { kind: 'Name', value: '__typename' } }
                          ]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'galleryImagesCollection' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'items' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'height' } }
                                ]
                              }
                            }
                          ]
                        }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'minParticipants' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'maxParticipants' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'location' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'instructor' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'keyHighlights' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'inclusions' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'exclusions' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'isFeatured' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetTourQuery, GetTourQueryVariables>
export const GetTestimonialsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetTestimonials' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'locale' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'testimonialCollection' },
            arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'locale' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'locale' } } }],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'sex' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'ageGroup' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'comment' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'image' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'height' } }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetTestimonialsQuery, GetTestimonialsQueryVariables>
