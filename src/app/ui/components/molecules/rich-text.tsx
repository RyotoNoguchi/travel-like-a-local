import type { PageBlogPostContent } from '@/generated/graphql'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { type Block, BLOCKS, type Inline } from '@contentful/rich-text-types'
import Image from 'next/image'
import type { FC } from 'react'

type Props = {
  content: PageBlogPostContent
}

export const RichText: FC<Props> = ({ content }) => {
  const entryMap = new Map()
  const assetMap = new Map()

  if (content.links?.entries?.block) {
    content.links.entries.block.forEach((entry) => {
      if (entry?.__typename === 'ComponentRichImage' && entry.image) {
        entryMap.set(entry.sys?.id, entry)
      }
    })
  }

  if (content.links?.assets?.block) {
    content.links.assets.block.forEach((asset) => {
      assetMap.set(asset?.sys.id, asset)
    })
  }

  const options = {
    renderNode: {
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
