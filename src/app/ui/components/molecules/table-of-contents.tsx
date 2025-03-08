import { BLOCKS, type Document } from '@contentful/rich-text-types'
import type { FC } from 'react'

type Heading = {
  id: string
  text: string
  level: 1 | 2 | 3 | 4 | 5 | 6
}

type Props = { content: Document }

export const TableOfContents: FC<Props> = ({ content }) => {
  const headings = extractHeadings(content)
  if (headings.length === 0) return null

  return (
    <div className="bg-slate-50 p-4 rounded-md flex flex-col gap-4">
      <h3 className="text-2xl font-bold">Contents</h3>
      <ul className="flex flex-col gap-2">
        {headings.map((heading, i) => (
          <li key={heading.id} className="flex gap-1 text-xl">
            <span className=" text-slate-500">{`0${i + 1}`}.</span>
            <span className="text-blue-300">|</span>
            <a href={`#${heading.id}`} className="text-blue-500 hover:text-blue-600">
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

const extractHeadings = (content: Document): Heading[] => {
  const headings: Heading[] = []

  // Rich Textのコンテンツをトラバースして見出しを探す
  if (content && content.content) {
    content.content.forEach((node) => {
      // 見出しノードを検出
      if (
        node.nodeType === BLOCKS.HEADING_1 ||
        node.nodeType === BLOCKS.HEADING_2 ||
        node.nodeType === BLOCKS.HEADING_3 ||
        node.nodeType === BLOCKS.HEADING_4 ||
        node.nodeType === BLOCKS.HEADING_5 ||
        node.nodeType === BLOCKS.HEADING_6
      ) {
        // 見出しのレベルを取得（HEADING_1 → 1, HEADING_2 → 2, ...）
        const level = parseInt(node.nodeType.split('_')[1]) as 1 | 2 | 3 | 4 | 5 | 6

        // 見出しのテキストを取得
        let text = ''
        if (node.content && node.content[0] && node.content[0].nodeType === 'text' && node.content[0].value) {
          text = node.content[0].value
        }

        // IDを生成（テキストをスラッグ化）
        const id = text
          .toLowerCase()
          .replace(/\s+/g, '-') // スペースをハイフンに
          .replace(/[^\w\-]+/g, '') // 英数字とハイフン以外を削除
          .replace(/\-\-+/g, '-') // 連続するハイフンを単一のハイフンに
          .replace(/^-+/, '') // 先頭のハイフンを削除
          .replace(/-+$/, '') // 末尾のハイフンを削除

        headings.push({ id, text, level })
      }
    })
  }

  return headings
}
