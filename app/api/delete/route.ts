import { NextRequest, NextResponse } from 'next/server'
import { unlink } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const UPLOAD_PASSWORD = process.env.UPLOAD_PASSWORD || 'family123' // Same password as upload
const IS_VERCEL = process.env.VERCEL === '1'

export async function POST(request: NextRequest) {
  // Disable deletes on Vercel
  if (IS_VERCEL) {
    return NextResponse.json(
      { error: 'Photo deletion is not available on Vercel. Please remove photos from the repository and redeploy.' },
      { status: 503 }
    )
  }

  try {
    const body = await request.json()
    const { section, filename, password } = body

    // Verify password
    if (password !== UPLOAD_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }

    if (!section || !filename) {
      return NextResponse.json(
        { error: 'Section and filename are required' },
        { status: 400 }
      )
    }

    // Construct file path
    const filePath = path.join(process.cwd(), 'public', 'photos', section, filename)

    // Security check: ensure the file path is within the photos directory
    const photosDir = path.join(process.cwd(), 'public', 'photos', section)
    const resolvedFilePath = path.resolve(filePath)
    const resolvedPhotosDir = path.resolve(photosDir)

    if (!resolvedFilePath.startsWith(resolvedPhotosDir)) {
      return NextResponse.json(
        { error: 'Invalid file path' },
        { status: 403 }
      )
    }

    // Check if file exists
    if (!existsSync(filePath)) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      )
    }

    // Delete the file
    await unlink(filePath)

    return NextResponse.json({
      message: 'Photo deleted successfully',
    })
  } catch (error: any) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete photo' },
      { status: 500 }
    )
  }
}

