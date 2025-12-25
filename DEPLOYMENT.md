# Deploying to Vercel

## Important Note: File Storage Limitation

⚠️ **Current Implementation Limitation:** This application currently stores photos directly to the filesystem (`public/photos/`). Vercel's serverless functions have a **read-only filesystem** (except `/tmp`), so files uploaded through the API will not persist after deployment.

You have several options to deploy successfully:

### Option 1: Deploy for Viewing Only (No Uploads)
If you just want to view existing photos:
1. Upload your photos to the repository
2. Deploy to Vercel
3. Photos will be served from the repository (read-only)

### Option 2: Use Vercel Blob Storage (Recommended for Production)
Integrate Vercel Blob Storage for persistent file storage.

### Option 3: Use External Storage Service
Use services like Cloudinary, AWS S3, or similar for photo storage.

## Quick Deployment Steps

### 1. Prepare Your Project

Make sure your code is in a Git repository (GitHub, GitLab, or Bitbucket).

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"

# Push to GitHub/GitLab/Bitbucket
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Deploy to Vercel

#### Method A: Using Vercel CLI

1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? (Select your account/team)
   - Link to existing project? **No**
   - Project name? (Enter a name or press Enter for default)
   - Directory? **./** (press Enter)
   - Override settings? **No**

5. Set environment variables:
```bash
vercel env add UPLOAD_PASSWORD
# Enter your password when prompted
```

6. Deploy to production:
```bash
vercel --prod
```

#### Method B: Using Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign up/login

2. Click **"Add New..."** → **"Project"**

3. Import your Git repository:
   - Connect your GitHub/GitLab/Bitbucket account if not already connected
   - Select your repository
   - Click **"Import"**

4. Configure your project:
   - **Framework Preset:** Next.js (should auto-detect)
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** `npm run build` (should auto-detect)
   - **Output Directory:** `.next` (should auto-detect)
   - **Install Command:** `npm install` (should auto-detect)

5. Add Environment Variables:
   - Go to **Settings** → **Environment Variables**
   - Add: `UPLOAD_PASSWORD` with your password value
   - Select environments: Production, Preview, Development
   - Click **"Save"**

6. Deploy:
   - Click **"Deploy"**
   - Wait for the build to complete

### 3. Access Your Deployed App

After deployment, Vercel will provide you with:
- **Production URL:** `https://your-project-name.vercel.app`
- You can also add a custom domain in the project settings

## For Production with File Uploads

If you need upload functionality on Vercel, you'll need to modify the code to use external storage. Here are popular options:

### Using Vercel Blob Storage

1. Install Vercel Blob:
```bash
npm install @vercel/blob
```

2. Update your upload/delete API routes to use Blob Storage instead of filesystem

### Using Cloudinary

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Install Cloudinary SDK:
```bash
npm install cloudinary
```
3. Update API routes to use Cloudinary for storage

### Using AWS S3

1. Set up AWS S3 bucket
2. Install AWS SDK:
```bash
npm install @aws-sdk/client-s3
```
3. Update API routes to use S3 for storage

## Current Limitations on Vercel

- ✅ **What works:** Viewing photos, UI, dark/light mode, navigation
- ❌ **What doesn't work:** Uploading/deleting photos (needs external storage)
- ✅ **Workaround:** Pre-upload photos to your repository and push to Git

## Recommended Setup for Production

For a production deployment with full functionality:

1. **Use Vercel for hosting** (great for Next.js)
2. **Use Vercel Blob Storage or Cloudinary** for photo storage
3. **Keep environment variables** secure in Vercel dashboard
4. **Enable custom domain** (optional but recommended)

## Need Help?

- Vercel Documentation: https://vercel.com/docs
- Vercel Support: https://vercel.com/support

