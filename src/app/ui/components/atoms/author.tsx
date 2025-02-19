import type { ComponentAuthor, Maybe } from '@/generated/graphql'
import { Link } from '@/i18n/routing'
import Image from 'next/image'
import type { FC } from 'react'

type Props = {
  author: Maybe<ComponentAuthor>
}

export const Author: FC<Props> = ({ author }) => {
  if (!author) return null
  return (
    <Link href={`/author/${author?.name}`} className="flex gap-1 hover-text-primary">
      <Image src={author?.avatar?.url ?? ''} alt={author?.avatar?.title ?? ''} width={24} height={24} />
      <p>{author?.name}</p>
    </Link>
  )
}
