# Assets Directory

This directory contains all the static assets for your portfolio.

## Structure

```
assets/
├── images/
│   ├── profile.jpg          # Your professional headshot
│   ├── logo.png             # Your personal logo (optional)
│   └── og-image.jpg         # Open Graph image for social media
├── videos/
│   ├── aura-demo.mp4        # Demo video for Aura Agentic App
│   ├── project-2-demo.mp4   # Demo video for your second project
│   └── project-3-demo.mp4   # Demo video for your third project
├── icons/
│   ├── kotlin.svg           # Kotlin logo
│   ├── compose.svg          # Jetpack Compose logo
│   ├── android-studio.svg   # Android Studio logo
│   ├── firebase.svg         # Firebase logo
│   └── ...                  # Other technology icons
└── resume.pdf               # Your resume (placed in root of assets)
```

## Image Guidelines

### Profile Photo
- **Size**: 400x400px minimum
- **Format**: JPG or PNG
- **Quality**: High resolution, professional
- **Background**: Clean, preferably neutral

### Project Demo Videos
- **Duration**: 5-15 seconds (short loops work best)
- **Format**: MP4 (H.264 encoding)
- **Size**: Under 2MB each for optimal loading
- **Aspect Ratio**: 16:9 or phone aspect ratio (9:16)
- **Quality**: 1080p recommended

### Technology Icons
- **Format**: SVG (preferred) or PNG
- **Size**: 64x64px minimum
- **Style**: Consistent with official brand guidelines
- **Background**: Transparent

## Where to Get Icons

### Free Icon Sources
- [Simple Icons](https://simpleicons.org/) - Brand icons in SVG format
- [Devicons](https://devicon.dev/) - Programming language and development tool icons
- [Heroicons](https://heroicons.com/) - General purpose icons

### How to Add Icons
1. Download the SVG files
2. Place them in the `public/assets/icons/` directory
3. Update the `TECH_STACK` array in `src/lib/constants.ts` with the correct paths

## Video Creation Tips

### Recording App Demos
1. Use screen recording software (OBS, QuickTime, etc.)
2. Record in phone dimensions for authenticity
3. Keep recordings short and focused on key features
4. Ensure good lighting and clear visibility

### Optimization
- Use tools like [FFmpeg](https://ffmpeg.org/) to compress videos
- Consider using [Lottie animations](https://lottiefiles.com/) for smaller file sizes
- Test loading times on different devices

## Resume
- **Format**: PDF only
- **Filename**: `resume.pdf`
- **Size**: Under 1MB
- **Content**: Up-to-date with your latest experience
- **Design**: Clean, professional layout

## Open Graph Image
- **Size**: 1200x630px
- **Format**: JPG or PNG
- **Content**: Your name, title, and perhaps a preview of your portfolio
- **Text**: Large, readable font
- **Quality**: High resolution for social media sharing

---

**Note**: Replace all placeholder assets with your actual content before deploying your portfolio!
