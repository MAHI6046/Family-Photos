import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

const UPLOAD_PASSWORD = process.env.UPLOAD_PASSWORD || 'family123'

// Railway persistent storage
const BASE_UPLOAD_DIR = process.env.RAILWAY_ENVIRONMENT
  ? '/data/photos'
  : path.join(process.cwd(), 'public', 'photos')

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const password = formData.get('password')
    const section = formData.get('section')
    const files = formData.getAll('photos') as File[]

    if (!password || password !== UPLOAD_PASSWORD) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    if (!section || files.length === 0) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 })
    }

    const sectionDir = path.join(BASE_UPLOAD_DIR, section)

    if (!existsSync(sectionDir)) {
      await mkdir(sectionDir, { recursive: true })
    }

    const uploadedFiles: string[] = []

    for (const file of files) {
      if (!file || file.size === 0) continue

      const buffer = Buffer.from(await file.arrayBuffer())
      const ext = path.extname(file.name)
      const filename = `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}${ext}`

      await writeFile(path.join(sectionDir, filename), buffer)
      uploadedFiles.push(filename)
    }

    return NextResponse.json({
      success: true,
      files: uploadedFiles,
    })
  } catch (err: any) {
    console.error('UPLOAD ERROR:', err)
    return NextResponse.json(
      { error: 'Upload failed on server' },
      { status: 500 }
    )
  }
}
