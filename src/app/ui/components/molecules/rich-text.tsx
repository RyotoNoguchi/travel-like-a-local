import type { GetBlogPostBySlugQuery } from '@/generated/graphql'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { type Block, BLOCKS, type Inline } from '@contentful/rich-text-types'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { FC } from 'react'

type Props = {
  content:
    | NonNullable<NonNullable<GetBlogPostBySlugQuery['pageBlogPostCollection']>['items'][0]>['content']
    | NonNullable<NonNullable<GetBlogPostBySlugQuery['pageBlogPostCollection']>['items'][0]>['introduction']
}

export const RichText: FC<Props> = ({ content }) => {
  if (!content) notFound()

  // 見出しのテキストからIDを生成する関数
  const generateId = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
  }

  const entryMap = new Map()
  const assetMap = new Map()

  if (content.__typename === 'PageBlogPostContent' && content.links) {
    if (content.links.entries?.block) {
      content.links.entries.block.forEach((entry) => {
        if (entry?.__typename === 'ComponentRichImage' && entry.image) {
          entryMap.set(entry.sys?.id, entry)
        }
      })
    }

    if (content.links.assets?.block) {
      content.links.assets.block.forEach((asset) => {
        assetMap.set(asset?.sys.id, asset)
      })
    }
  }

  const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node: Block | Inline, children: React.ReactNode) => {
        if (node.content[0].nodeType !== 'text') return null
        const text = node.content[0].value
        const id = generateId(text)
        return (
          <h1 id={id} className="text-3xl font-bold">
            {children}
          </h1>
        )
      },
      [BLOCKS.HEADING_2]: (node: Block | Inline, children: React.ReactNode) => {
        if (node.content[0].nodeType !== 'text') return null
        const text = node.content[0].value
        const id = generateId(text)
        return (
          <h2 id={id} className="text-2xl font-bold">
            {children}
          </h2>
        )
      },
      [BLOCKS.HEADING_3]: (node: Block | Inline, children: React.ReactNode) => {
        if (node.content[0].nodeType !== 'text') return null
        const text = node.content[0].value
        const id = generateId(text)
        return (
          <h3 id={id} className="text-xl font-bold">
            {children}
          </h3>
        )
      },
      // 見出しレベル4のレンダリング
      [BLOCKS.HEADING_4]: (node: Block | Inline, children: React.ReactNode) => {
        if (node.content[0].nodeType !== 'text') return null
        const text = node.content[0].value
        const id = generateId(text)
        return (
          <h4 id={id} className="text-lg font-bold">
            {children}
          </h4>
        )
      },
      [BLOCKS.HEADING_5]: (node: Block | Inline, children: React.ReactNode) => {
        if (node.content[0].nodeType !== 'text') return null
        const text = node.content[0].value
        const id = generateId(text)
        return (
          <h5 id={id} className="text-base font-bold">
            {children}
          </h5>
        )
      },
      [BLOCKS.HEADING_6]: (node: Block | Inline, children: React.ReactNode) => {
        if (node.content[0].nodeType !== 'text') return null
        const text = node.content[0].value
        const id = generateId(text)
        return (
          <h6 id={id} className="text-sm font-bold">
            {children}
          </h6>
        )
      },
      [BLOCKS.PARAGRAPH]: (node: Block | Inline) => {
        return <p className="text-lg leading-tight">{node.content.map((content) => (content.nodeType === 'text' ? content.value : null)).join('')}</p>
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node: Block | Inline) => {
        const entryId = node.data.target.sys.id
        const entry = entryMap.get(entryId)

        if (!entry) return null

        if (entry.__typename === 'ComponentRichImage' && entry.image) {
          return (
            <figure className="my-5">
              <Image
                src={entry.image.url}
                alt={entry.image.description || entry.image.title}
                width={entry.image.width}
                height={entry.image.height}
                className="w-full h-auto"
              />
              {entry.image.description ? <figcaption className="text-sm text-gray-600 mt-2">{entry.image.description}</figcaption> : null}
            </figure>
          )
        }

        return null
      },

      [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => {
        const assetId = node.data.target.sys.id
        const asset = assetMap.get(assetId)

        if (!asset) return null

        if (asset.url) {
          return (
            <figure className="my-5">
              <Image src={asset.url} alt={asset.description || asset.title} width={asset.width} height={asset.height} className="w-full h-auto" />
              {asset.description ? <figcaption className="text-sm text-gray-600 mt-2">{asset.description}</figcaption> : null}
            </figure>
          )
        }

        return null
      }
    }
  }

  return <div className="prose">{documentToReactComponents(content.json, options)}</div>
}
