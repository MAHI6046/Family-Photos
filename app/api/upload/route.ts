import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

// IMPORTANT: prevent Next.js from trying to pre-render this API
export const dynamic = 'force-dynamic'

// Password for upload
const UPLOAD_PASSWORD = process.env.UPLOAD_PASSWORD || 'family123'

// Base upload directory
// Railway uses persistent volume at /data
const BASE_UPLOAD_DIR = process.env.RAILWAY_ENVIRONMENT
  ? '/data/photos'
  : path.join(process.cwd(), 'public', 'photos')

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const passwordValue = formData.get('password')
    const sectionValue = formData.get('section')
    const files = formData.getAll('photos')

    // Validate password
    if (typeof passwordValue !== 'string' || passwordValue !== UPLOAD_PASSWORD) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    // Validate section
    if (typeof sectionValue !== 'string' || !sectionValue.trim()) {
      return NextResponse.json({ error: 'Invalid section' }, { status: 400 })
    }

    const section = sectionValue.trim()

    // ✅ Ensure BASE directory exists (/data/photos)
    if (!existsSync(BASE_UPLOAD_DIR)) {
      await mkdir(BASE_UPLOAD_DIR, { recursive: true })
    }

    // ✅ Ensure SECTION directory exists (/data/photos/Shreyas etc)
    const sectionDir = path.join(BASE_UPLOAD_DIR, section)
    if (!existsSync(sectionDir)) {
      await mkdir(sectionDir, { recursive: true })
    }

    const uploadedFiles: string[] = []

    for (const entry of files) {
      if (!(entry instanceof File)) continue
      if (entry.size === 0) continue

      const buffer = Buffer.from(await entry.arrayBuffer())
      const ext = path.extname(entry.name) || '.jpg'

      const filename = `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}${ext}`

      const filePath = path.join(sectionDir, filename)
      await writeFile(filePath, buffer)

      uploadedFiles.push(filename)
    }

    return NextResponse.json({
      success: true,
      files: uploadedFiles,
    })
  } catch (error) {
    console.error('UPLOAD ERROR:', error)
    return NextResponse.json(
      { error: 'Upload failed on server' },
      { status: 500 }
    )
  }
}
