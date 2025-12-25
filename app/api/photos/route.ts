import { NextRequest, NextResponse } from 'next/server'
import { readdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const section = searchParams.get('section')

    if (!section) {
      return NextResponse.json(
        { error: 'Section parameter is required' },
        { status: 400 }
      )
    }

    const photosDir = path.join(process.cwd(), 'public', 'photos', section)

    if (!existsSync(photosDir)) {
      return NextResponse.json({ photos: [] })
    }

    const files = await readdir(photosDir)
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp']
    
    const photos = files
      .filter((file) => {
        const ext = path.extname(file).toLowerCase()
        return imageExtensions.includes(ext)
      })
      .map((filename) => ({
        id: filename,
        filename,
        section,
      }))

    return NextResponse.json({ photos })
  } catch (error: any) {
    console.error('Error fetching photos:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch photos' },
      { status: 500 }
    )
  }
}

