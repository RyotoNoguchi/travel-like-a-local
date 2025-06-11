import { ResponsiveImage } from '@/app/ui/components/atoms/responsive-image'
import type { GetBlogPostBySlugQuery } from '@/generated/graphql'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, MARKS, type Block, type Inline } from '@contentful/rich-text-types'
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
    renderMark: {
      [MARKS.BOLD]: (text: React.ReactNode) => <strong className="font-bold">{text}</strong>,
      [MARKS.ITALIC]: (text: React.ReactNode) => <em className="italic">{text}</em>
    },
    renderNode: {
      [BLOCKS.HEADING_1]: (node: Block | Inline, children: React.ReactNode) => {
        if (node.content[0].nodeType !== 'text') return null
        const text = node.content[0].value
        const id = generateId(text)
        return (
          <h1 id={id} className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {children}
          </h1>
        )
      },
      [BLOCKS.HEADING_2]: (node: Block | Inline, children: React.ReactNode) => {
        if (node.content[0].nodeType !== 'text') return null
        const text = node.content[0].value
        const id = generateId(text)
        return (
          <h2 id={id} className="text-xl sm:text-2xl md:text-3xl font-bold mt-6">
            {children}
          </h2>
        )
      },
      [BLOCKS.HEADING_3]: (node: Block | Inline, children: React.ReactNode) => {
        if (node.content[0].nodeType !== 'text') return null
        const text = node.content[0].value
        const id = generateId(text)
        return (
          <h3 id={id} className="text-xl font-bold mt-2">
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
        return (
          <p className="text-lg leading-tight whitespace-pre-wrap space-x-1">
            {node.content.map((content, index) => {
              if (content.nodeType === 'text') {
                const shouldBeBold = content.marks?.some((mark) => mark.type === 'bold')
                const shouldBeItalic = content.marks?.some((mark) => mark.type === 'italic')
                return (
                  <span key={index} className={`${shouldBeBold ? 'font-bold' : ''} ${shouldBeItalic ? 'italic' : ''}`}>
                    {content.value}
                  </span>
                )
              } else if (content.nodeType === 'hyperlink') {
                const shouldBeBold = content.content.some((item) => item.nodeType === 'text' && item.marks?.some((mark) => mark.type === 'bold'))
                const shouldBeItalic = content.content.some((item) => item.nodeType === 'text' && item.marks?.some((mark) => mark.type === 'italic'))
                const { uri } = content.data
                return (
                  <a
                    key={index}
                    href={uri}
                    className={`text-blue-600 hover:text-blue-800 ${shouldBeBold ? 'font-bold' : ''} ${shouldBeItalic ? 'italic' : ''}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {content.content.map((item) => (item.nodeType === 'text' ? item.value : '')).join('')}
                  </a>
                )
              }
              return null
            })}
          </p>
        )
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node: Block | Inline) => {
        const entryId = node.data.target.sys.id
        const entry = entryMap.get(entryId)

        if (!entry) return null

        if (entry.__typename === 'ComponentRichImage' && entry.image) {
          return (
            <ResponsiveImage
              src={entry.image.url}
              alt={entry.image.description || entry.image.title}
              width={entry.image.width}
              height={entry.image.height}
              className="w-full h-auto"
            />
          )
        }

        return null
      },
      [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => {
        const assetId = node.data.target.sys.id
        const asset = assetMap.get(assetId)

        if (!asset) return null

        if (asset.url) {
          return <ResponsiveImage src={asset.url} alt={asset.description || asset.title} fill className="object-cover" />
        }

        return null
      },
      [BLOCKS.OL_LIST]: (node: Block | Inline, children: React.ReactNode) => {
        return <ol className="list-decimal pl-8 space-y-1 marker:text-gray">{children}</ol>
      },
      [BLOCKS.UL_LIST]: (node: Block | Inline, children: React.ReactNode) => {
        return <ul className="list-disc pl-8 space-y-1 marker:text-gray">{children}</ul>
      },
      [BLOCKS.LIST_ITEM]: (node: Block | Inline, children: React.ReactNode) => {
        return <li className="text-base">{children}</li>
      }
    }
  }

  return <div className="prose flex flex-col gap-2">{documentToReactComponents(content.json, options)}</div>
}
