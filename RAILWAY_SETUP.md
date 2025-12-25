# Railway Deployment Guide

## Step-by-Step Setup

### 1. Sign Up for Railway

1. Go to https://railway.app
2. Click "Start a New Project" or "Login"
3. Sign up with your GitHub account (recommended for easy deployment)

### 2. Deploy Your Project

1. Once logged in, click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Authorize Railway to access your GitHub if prompted
4. Select your repository: `MAHI6046/Family-Photos`
5. Railway will automatically detect it's a Next.js project

### 3. Configure Environment Variables

1. In your Railway project dashboard, go to **"Variables"** tab
2. Click **"New Variable"**
3. Add the following:
   - **Name:** `UPLOAD_PASSWORD`
   - **Value:** Your desired password (e.g., `family123` or something more secure)
   - Click **"Add"**

### 4. Deploy

Railway will automatically:
- Install dependencies
- Build your Next.js app
- Start the server
- Generate a public URL

### 5. Get Your App URL

1. Go to the **"Settings"** tab in your Railway project
2. Under **"Domains"**, you'll see your app URL (e.g., `your-app-name.up.railway.app`)
3. You can also add a custom domain if you want

## What Works on Railway

✅ **Photo Uploads** - Full functionality (Railway has persistent storage)
✅ **Photo Deletes** - Full functionality
✅ **Photo Viewing** - Full functionality
✅ **Dark/Light Mode** - Full functionality
✅ **All Features** - Everything works!

## Pricing

- **Free Tier:** $5 credit per month
- For a family photo gallery with moderate use, this is usually enough
- If you exceed $5, Railway charges pay-as-you-go (very affordable for small apps)

## Automatic Deployments

Railway automatically deploys when you:
- Push to your main branch on GitHub
- Just like Vercel!

## Troubleshooting

### If uploads don't work:
1. Check that `UPLOAD_PASSWORD` environment variable is set correctly
2. Check Railway logs for errors
3. Make sure the deployment completed successfully

### To view logs:
1. Go to your Railway project
2. Click on the deployment
3. View logs in real-time

## Next Steps

Once deployed, your app will have:
- Full upload functionality
- Full delete functionality  
- All photos stored persistently
- Automatic deployments from GitHub

Enjoy your fully functional Family Photos Gallery! 🎉

