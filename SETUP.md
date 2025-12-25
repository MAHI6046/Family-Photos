# Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Password**
   
   Create a `.env.local` file in the root directory with your upload password:
   ```
   UPLOAD_PASSWORD=your_secure_password_here
   ```
   
   **Important:** Replace `your_secure_password_here` with a strong password of your choice.
   
   If you don't create this file, the default password is `family123` (not recommended for production).

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open Browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Using the Application

### Viewing Photos
- Click on different family member tabs to view their photos
- Click on any photo to view it in full size (lightbox view)
- Click outside the photo or the X button to close the lightbox

### Uploading Photos
1. Select the family member tab you want to add photos to
2. Click the "Add Photos" button
3. Enter your password
4. Select one or more photos from your computer
5. Click "Upload"

### Theme Toggle
- Click the theme toggle button (top right) to switch between dark and light mode
- Your preference is automatically saved

## Production Deployment

For production:
1. Set a strong password in `.env.local`
2. Build the application: `npm run build`
3. Start the production server: `npm start`

## Photo Storage

Photos are stored in the `public/photos/` directory, organized by family member sections:
- `public/photos/Mom & Dad/`
- `public/photos/Mahender & Sahithi/`
- `public/photos/Advithi/`
- `public/photos/Shreyas/`
- `public/photos/Maneesh & Tejasri/`

**Note:** Make sure to backup your photos regularly!

