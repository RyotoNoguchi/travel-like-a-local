import type { BlogPostWithHref } from '@/types/blog-post'
import Link from 'next/link'

type Props = {
  blogPosts: BlogPostWithHref[]
}

export const RegionArticleList: React.FC<Props> = ({ blogPosts }) => {
  if (!blogPosts || blogPosts.length === 0) {
    return <p className="text-gray-500">Select a region on the map to see related blogPosts.</p>
  }

  return (
    <ul className="space-y-4">
      {blogPosts.map((blogPost) => (
        <li key={blogPost.sys.id} className="border p-4 rounded hover:shadow-md transition-shadow">
          {/* TODO: Use actual article data and link */}
          <Link href={blogPost.href} className="text-lg font-semibold text-blue-600 hover:underline">
            {blogPost.title || 'Article Title Placeholder'}
          </Link>
        </li>
      ))}
    </ul>
  )
}
