import type { BlogPostWithHref } from '@/types/blog-post'
import Link from 'next/link'
import React from 'react'

// TODO: Define props type (articles)
interface RegionArticleListProps {
  articles: BlogPostWithHref[] // Use the actual type
}

export const RegionArticleList: React.FC<RegionArticleListProps> = ({
  articles // Destructure the articles prop
}) => {
  // Remove placeholder: const articles = [] as any[]

  if (!articles || articles.length === 0) {
    // Check the prop directly
    return <p className="text-gray-500">Select a region on the map to see related articles.</p>
  }

  return (
    <ul className="space-y-4">
      {articles.map(
        (
          article: BlogPostWithHref // Add explicit type here
        ) => (
          <li key={article.sys.id} className="border p-4 rounded hover:shadow-md transition-shadow">
            {/* TODO: Use actual article data and link */}
            <Link href={`/articles/${article.slug}`} className="text-lg font-semibold text-blue-600 hover:underline">
              {article.title || 'Article Title Placeholder'}
            </Link>
            {/* Optionally add more details like date or description */}
            {/* <p className="text-sm text-gray-600">{article.seoFields?.pageDescription}</p> */}
          </li>
        )
      )}
    </ul>
  )
}
