# Family Photos Gallery

A beautiful and professional web application for hosting family photos organized by family members.

## Features

- 📸 Organized photo galleries for each family member/group
- 🌓 Dark and Light mode toggle
- 🔐 Password-protected photo uploads
- 🎨 Professional and dignified design with elegant background
- 📱 Responsive design for all devices
- 🖼️ Lightbox view for full-size photo viewing

## Family Sections

- Mom & Dad
- Mahender & Sahithi
- Advithi
- Shreyas
- Maneesh & Tejasri

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env.local` file in the root directory:
```
UPLOAD_PASSWORD=your_secure_password_here
```

3. Create the photos directory structure:
```bash
mkdir -p public/photos
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Browse photos by selecting different family member tabs
2. Click on any photo to view it in full size
3. Click "Add Photos" button to upload new photos (password required)
4. Toggle between dark and light mode using the theme toggle button

## Security

- Upload functionality is password-protected
- Change the default password in `.env.local` for production use
- Never commit `.env.local` to version control

## Technologies

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- File System API

## License

Private - Family use only

