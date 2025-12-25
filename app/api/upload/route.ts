// IMPORTANT: This line prevents Next.js from trying to pre-render this API route
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

// Read password from environment variable
const UPLOAD_PASSWORD = process.env.UPLOAD_PASSWORD || 'family123'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const password = formData.get('password') as string | null
    const section = formData.get('section') as string | null

    // Validate password
    if (!password || password !== UPLOAD_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }

    // Validate section
    if (!section) {
      return NextResponse.json(
        { error: 'Section is required' },
        { status: 400 }
      )
    }

    // Directory where photos will be stored
    const uploadDir = path.join(
      process.cwd(),
      'public',
      'photos',
      section
    )

    // Create directory if it does not exist
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    const files = formData.getAll('photos') as File[]
    const uploadedFiles: string[] = []

    for (const file of files) {
      if (!file || file.size === 0) continue

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Generate unique filename
      const timestamp = Date.now()
      const randomStr = Math.random().toString(36).substring(2, 8)
      const ext = path.extname(file.name)
      const filename = `${timestamp}-${randomStr}${ext}`

      const filePath = path.join(uploadDir, filename)
      await writeFile(filePath, buffer)

      uploadedFiles.push(filename)
    }

    return NextResponse.json({
      message: 'Photos uploaded successfully',
      files: uploadedFiles,
    })
  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to upload photos' },
      { status: 500 }
    )
  }
}
