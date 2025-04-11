import { loadConcepts } from '@/utils/concept-helper'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const concepts = await loadConcepts()
    // TODO: Potentially filter here to only return region-related concepts if needed
    return NextResponse.json(concepts)
  } catch (error) {
    console.error('API Error loading concepts:', error)
    return NextResponse.json({ error: 'Failed to load concept data' }, { status: 500 })
  }
}
