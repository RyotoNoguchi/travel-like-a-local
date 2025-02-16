import { Tag } from '@/app/ui/components/atoms/tag'
import type { ContentfulTag, Maybe } from '@/generated/graphql'
import type { FC } from 'react'

type Props = {
  tags: Maybe<ContentfulTag>[]
}

export const TagList: FC<Props> = ({ tags }) => (
  <ul className="flex flex-wrap gap-2">
    {tags.map(
      (tag) =>
        tag?.name && (
          <li className="bg-light-gray rounded-sm px-2" key={tag.name}>
            <Tag href={`/tag/${tag.name}`} title={tag.name} />
          </li>
        )
    )}
  </ul>
)
