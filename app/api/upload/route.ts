import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

const UPLOAD_PASSWORD = process.env.UPLOAD_PASSWORD || 'family123'

// 🚨 DO NOT rely on env detection — always use /data on Railway
const BASE_UPLOAD_DIR =
  process.env.NODE_ENV === 'production'
    ? '/data/photos'
    : path.join(process.cwd(), 'public', 'photos')

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const password = formData.get('password')
    const section = formData.get('section')
    const files = formData.getAll('photos')

    if (typeof password !== 'string' || password !== UPLOAD_PASSWORD) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    if (typeof section !== 'string' || !section) {
      return NextResponse.json({ error: 'Invalid section' }, { status: 400 })
    }

    // ✅ Ensure /data/photos exists
    if (!existsSync(BASE_UPLOAD_DIR)) {
      await mkdir(BASE_UPLOAD_DIR, { recursive: true })
    }

    // ✅ Ensure section directory exists
    const sectionDir = path.join(BASE_UPLOAD_DIR, section)
    if (!existsSync(sectionDir)) {
      await mkdir(sectionDir, { recursive: true })
    }

    for (const entry of files) {
      if (!(entry instanceof File)) continue
      if (entry.size === 0) continue

      const buffer = Buffer.from(await entry.arrayBuffer())
      const ext = path.extname(entry.name) || '.jpg'
      const filename = `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}${ext}`

      await writeFile(path.join(sectionDir, filename), buffer)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('UPLOAD ERROR:', err)
    return NextResponse.json(
      { error: 'Upload failed on server' },
      { status: 500 }
    )
  }
}
