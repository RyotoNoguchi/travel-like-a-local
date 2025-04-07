import { BlogPostCard } from '@/app/ui/components/molecules/blog-post-card'
import type { BlogPostWithHref } from '@/types/blog-post'
import { useTranslations } from 'next-intl'

type Props = {
  blogPosts: BlogPostWithHref[]
}

export const PrefectureArticleList: React.FC<Props> = ({ blogPosts }) => {
  const t = useTranslations('PrefecturesMapPage')

  if (!blogPosts || blogPosts.length === 0) {
    return <p className="text-gray-500">{t('selectPrefecturePrompt')}</p>
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {blogPosts.map((blogPost) => (
        <BlogPostCard key={blogPost.sys.id} blogPost={blogPost} />
      ))}
    </div>
  )
}
