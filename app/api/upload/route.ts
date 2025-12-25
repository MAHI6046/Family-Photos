import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET(
  request: NextRequest,
  { params }: { params: { section: string; filename: string } }
) {
  const { section, filename } = params

  const filePath = path.join(
    process.cwd(),
    "public",
    "photos",
    section,
    filename
  )

  if (!fs.existsSync(filePath)) {
    return new NextResponse("Not found", { status: 404 })
  }

  const file = fs.readFileSync(filePath)
  const ext = path.extname(filename)

  const contentType =
    ext === ".jpg" || ext === ".jpeg"
      ? "image/jpeg"
      : ext === ".png"
      ? "image/png"
      : "application/octet-stream"

  return new NextResponse(file, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000",
    },
  })
}


