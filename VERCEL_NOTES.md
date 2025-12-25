# Vercel Deployment Notes

## Current Status

✅ **Working on Vercel:**
- Photo viewing (if photos are in repository)
- Navigation and UI
- Dark/Light mode
- All frontend features

❌ **Not Working on Vercel:**
- Photo uploads via web interface
- Photo deletion via web interface

## Why Upload/Delete Don't Work

Vercel uses **serverless functions** with a **read-only filesystem**. The filesystem in serverless functions:
- Cannot write files (except to `/tmp`, which is temporary)
- Cannot create directories
- Files written would be lost anyway since each function execution is stateless

## Solutions

### Option 1: Add Photos via Git (Current Solution)

To add photos:
1. Add photos to `public/photos/[section-name]/` locally
2. Commit and push to GitHub:
   ```bash
   git add public/photos/
   git commit -m "Add photos"
   git push
   ```
3. Vercel will automatically redeploy with new photos

To delete photos:
1. Remove photos from `public/photos/[section-name]/` locally
2. Commit and push:
   ```bash
   git rm public/photos/[section-name]/photo.jpg
   git commit -m "Remove photo"
   git push
   ```
3. Vercel will automatically redeploy

### Option 2: Use Vercel Blob Storage (Recommended for Production)

For dynamic uploads, upgrade to use Vercel Blob Storage:
- Photos stored in Vercel Blob (not filesystem)
- Upload/delete will work
- Requires code changes (see DEPLOYMENT_VERCEL_BLOB.md)

### Option 3: Use External Storage Service

Use Cloudinary, AWS S3, or similar:
- Photos stored externally
- Upload/delete via API
- Requires code changes

## Photo Display Issue

If photos aren't showing:
1. Verify photos are committed to the repository
2. Check that photos are in `public/photos/[section-name]/` directory
3. Ensure file extensions are supported (.jpg, .jpeg, .png, .gif, .webp, .bmp)
4. Check Vercel deployment logs for errors
5. Try rebuilding the deployment

## Testing Locally

For full functionality (uploads/deletes), run locally:
```bash
npm run dev
```

Uploads and deletes will work on local development.

