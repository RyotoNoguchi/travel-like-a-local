import { Author } from '@/app/ui/components/atoms/author' // Import Author
import { DateComponent } from '@/app/ui/components/atoms/date' // Import DateComponent
import type { BlogPostWithHref } from '@/types/blog-post'
import Image from 'next/image' // Import Next Image
import Link from 'next/link'

type Props = {
  blogPosts: BlogPostWithHref[]
}

export const RegionArticleList: React.FC<Props> = ({ blogPosts }) => {
  if (!blogPosts || blogPosts.length === 0) {
    return <p className="text-gray-500">Select a prefecture on the map to see related articles.</p>
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {blogPosts.map((blogPost) => (
        <div key={blogPost.sys.id} className="h-fit bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out">
          {typeof blogPost.featuredImage?.url === 'string' && (
            <Link href={blogPost.href} className="block relative w-full h-36">
              <Image
                src={blogPost.featuredImage.url}
                alt={blogPost.featuredImage.title || blogPost.title || 'Article image'}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
            </Link>
          )}
          <div className="p-2 pb-3 flex flex-col justify-between flex-grow gap-2">
            <Link href={blogPost.href}>
              <h3 className="text-lg font-semibold text-gray-800 hover:text-primary transition-colors line-clamp-2">
                {blogPost.title || 'Article Title Placeholder'}
              </h3>
            </Link>
            <div className="flex items-center justify-between text-xs text-gray-500">
              {blogPost.author !== null && blogPost.author !== undefined && <Author author={blogPost.author} />}
              {blogPost.publishedDate !== null && blogPost.publishedDate !== undefined && <DateComponent date={blogPost.publishedDate as string} />}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
