# Upgrading to Vercel Blob Storage (Optional)

If you want to enable file uploads on Vercel, you'll need to use Vercel Blob Storage instead of the filesystem.

## Installation

```bash
npm install @vercel/blob
```

## Update package.json

The dependency should be added automatically, but verify it's there.

## Environment Variables

Add to Vercel dashboard:
- `BLOB_READ_WRITE_TOKEN` - Get this from Vercel dashboard → Storage → Blob

## Code Changes Required

You would need to update:
1. `app/api/upload/route.ts` - Upload to Blob instead of filesystem
2. `app/api/delete/route.ts` - Delete from Blob instead of filesystem
3. `app/api/photos/route.ts` - List photos from Blob instead of filesystem
4. Photo serving - Serve from Blob URLs instead of public folder

This requires significant code changes. If you need this, let me know and I can help implement it.

