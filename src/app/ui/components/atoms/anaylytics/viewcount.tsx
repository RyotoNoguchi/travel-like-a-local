'use client'

import { type FC, useEffect } from 'react'

type Props = {
  slug: string
}

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
