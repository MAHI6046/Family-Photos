export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    const section = request.nextUrl.searchParams.get('section')

    if (!section) {
      return NextResponse.json(
        { error: 'Section is required' },
        { status: 400 }
      )
    }

    const photosDir = path.join(
      process.cwd(),
      'public',
      'photos',
      section
    )

    if (!fs.existsSync(photosDir)) {
      return NextResponse.json({ files: [] })
    }

    const files = fs
      .readdirSync(photosDir)
      .filter((file) =>
        /\.(jpg|jpeg|png|webp)$/i.test(file)
      )

    return NextResponse.json({ files })
  } catch (error: any) {
    console.error('Photos API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch photos' },
      { status: 500 }
    )
  }
}
