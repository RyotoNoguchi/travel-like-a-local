'use client'

import { type FC, useEffect } from 'react'

type Props = {
  slug: string
}

// TODO
// 1. Add blog post page e.g. /src/app/[locale]/articles/[category]/[slug]/page.tsx
// 2. Add ReportView component to each blog post page
// 3. Add view count to each blog post page
// 4. Add popularity sort logic to PopularArticle Section
//   1. Fetch all blog slug from contentful
//   2. Fetch view count from redis
//   3. Sort by view count and slice top 10
//   4. Fetch blog post data from contentful
//   5. Display top 10 popular blog posts

export const ReportView: FC<Props> = ({ slug }) => {
  useEffect(() => {
    fetch('/api/view-count', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ slug })
    })
  }, [slug])
  return null
}
