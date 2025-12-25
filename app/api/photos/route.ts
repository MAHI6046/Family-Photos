import { NextRequest, NextResponse } from 'next/server'
import { readdir } from 'fs/promises'
import { existsSync, readFileSync } from 'fs'
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

    // Try static list first (works better on Vercel)
    try {
      const staticListPath = path.join(process.cwd(), 'public', 'photos-list.json')
      if (existsSync(staticListPath)) {
        const staticList = JSON.parse(readFileSync(staticListPath, 'utf-8'))
        if (staticList[section] && Array.isArray(staticList[section])) {
          const photos = staticList[section].map((filename: string) => ({
            id: filename,
            filename,
            section,
          }))
          if (photos.length > 0) {
            return NextResponse.json({ photos })
          }
        }
      }
    } catch (staticError) {
      // Fall through to filesystem method
      console.log('Static list not available, trying filesystem')
    }

    // Fallback to filesystem method (for local development)
    const photosDir = path.join(process.cwd(), 'public', 'photos', section)
    if (!existsSync(photosDir)) {
      return NextResponse.json({ photos: [] })
    }

    try {
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
    } catch (readError: any) {
      console.error(`Error reading directory:`, readError)
      return NextResponse.json({ photos: [] })
    }
  } catch (error: any) {
    console.error('Error fetching photos:', error)
    return NextResponse.json({ photos: [] })
  }
}
