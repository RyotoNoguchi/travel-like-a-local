import { BlogPostCard } from '@/app/ui/components/molecules/blog-post-card'
import type { BlogPostWithHref } from '@/types/blog-post'
import { type Category } from '@/types/category'
import { extractCategoryNameBySlug } from '@/utils/category-helper'
import type { FC } from 'react'

type Props = {
  categorizedBlogPosts: Record<string, BlogPostWithHref[]>
  categories: Category[]
}

export const BlogPostCards: FC<Props> = ({ categorizedBlogPosts, categories }) => (
  <>
    {Object.entries(categorizedBlogPosts).map(([categoryName, blogPosts]) => {
      if (blogPosts.length === 0) return null
      return (
        <div className="flex flex-col gap-2" key={extractCategoryNameBySlug(categories, categoryName).id}>
          <h2 className="text-2xl font-bold">{extractCategoryNameBySlug(categories, categoryName).categoryName}</h2>
          <ul className="flex overflow-x-auto space-x-4 pb-4 snap-x w-full">
            {blogPosts.map((blogPost) => {
              if (!blogPost) return null
              return (
                <li className="flex-shrink-0 w-full max-w-72 snap-start" key={blogPost?.sys.id}>
                  <BlogPostCard key={blogPost?.sys.id} blogPost={blogPost} />
                </li>
              )
            })}
          </ul>
        </div>
      )
    })}
  </>
)
