# Asset Specifications Guide

This document outlines all required assets and their specifications for the Marvie Beauty landing page.

## Directory Structure

Create the following directory structure in your `public/` folder:

```
public/
└── assets/
    ├── logo-placeholder.svg
    ├── hero-placeholder.jpg
    ├── service-1.jpg
    ├── service-2.jpg
    ├── service-3.jpg
    ├── service-4.jpg
    ├── service-5.jpg
    ├── service-6.jpg
    ├── testimonial-1.jpg
    ├── testimonial-2.jpg
    ├── gallery-1.jpg
    ├── gallery-2.jpg
    ├── gallery-3.jpg
    └── gallery-4.jpg
```

## Asset Specifications

### Logo
- **Filename:** `logo-placeholder.svg`
- **Format:** SVG (preferred) or PNG
- **Recommended Size:** Max 300×300px
- **Usage:** Header navigation
- **Notes:** Ensure good contrast on white background

### Hero Background
- **Filename:** `hero-placeholder.jpg`
- **Format:** JPG or WebP
- **Recommended Size:** 1920×1080px (Full HD)
- **Aspect Ratio:** 16:9
- **File Size:** < 500KB (optimized)
- **Usage:** Full-screen hero section background
- **Notes:**
  - Should be soft-focus or have areas for text overlay
  - Darker gradient will be applied automatically
  - Consider facial expressions and mood (calm, professional)

### Service Images (1-6)
- **Filenames:** `service-1.jpg` through `service-6.jpg`
- **Format:** JPG or WebP
- **Recommended Size:** 1200×800px
- **Aspect Ratio:** 3:2
- **File Size:** < 200KB each
- **Usage:** Service cards with 2:1 aspect ratio crop
- **Suggested Content:**
  1. Facial treatment close-up
  2. Acne treatment or skin analysis
  3. Anti-aging procedure or results
  4. Injectable procedure (professional setting)
  5. Laser equipment or hair removal procedure
  6. Body contouring equipment or treatment

### Testimonial Photos
- **Filenames:** `testimonial-1.jpg`, `testimonial-2.jpg`
- **Format:** JPG or WebP
- **Recommended Size:** 400×400px
- **Aspect Ratio:** 1:1 (square)
- **File Size:** < 100KB each
- **Usage:** Circular cropped profile photos
- **Notes:**
  - Professional headshots
  - Good lighting
  - Neutral background preferred
  - Smiling, friendly expression

### Gallery Images (1-4)
- **Filenames:** `gallery-1.jpg` through `gallery-4.jpg`
- **Format:** JPG or WebP
- **Recommended Size:** 800×800px
- **Aspect Ratio:** 1:1 (square)
- **File Size:** < 200KB each
- **Usage:** Before/After results grid
- **Notes:**
  - Consider creating split before/after images
  - Add text overlays "Before" / "After" if needed
  - Maintain consistent lighting across all images
  - Get proper consent for client photos

## Image Optimization Tips

### For Best Performance:

1. **Use WebP format** when possible (smaller file sizes)
2. **Compress images** using tools like:
   - TinyPNG (https://tinypng.com)
   - Squoosh (https://squoosh.app)
   - ImageOptim (Mac)
   - RIOT (Windows)

3. **Consider responsive images:**
   - Create 2x and 3x versions for high-DPI screens
   - Use srcset in img tags (can be added later)

4. **Lazy loading:**
   - All images except logo and hero use `loading="lazy"` by default
   - No additional configuration needed

## Creating Placeholder Assets

If you don't have final assets yet, you can use:

### Free Stock Photo Resources:
- Unsplash (https://unsplash.com) - search "aesthetic clinic", "skincare"
- Pexels (https://pexels.com)
- Pixabay (https://pixabay.com)

### Placeholder Services:
- Placeholder.com - `https://via.placeholder.com/1200x800/FAF9F7/475161?text=Service+1`
- Lorem Picsum - `https://picsum.photos/1200/800`

### Logo Creation:
- Canva (https://canva.com) - free logo maker
- Figma (https://figma.com) - design tool

## Alt Text Guidelines

All images require descriptive alt text for accessibility. Here are examples:

```javascript
// Good alt text examples:
<img src="..." alt="Client receiving facial treatment at Marvie Beauty clinic" />
<img src="..." alt="Before and after results of acne treatment" />
<img src="..." alt="Dr. Sarah performing non-surgical face lift procedure" />

// Bad alt text examples:
<img src="..." alt="Image" />
<img src="..." alt="Photo1" />
<img src="..." alt="" /> // Only for decorative images
```

## Quick Setup Script

For testing purposes, you can create placeholder images using this structure:

```bash
# Create directory
mkdir -p public/assets

# Use placeholder service (example)
# Replace with your actual images in production
```

## Checklist

Before going live, ensure:

- [ ] All 14 image files are present
- [ ] Images are optimized (< target file sizes)
- [ ] Logo has transparent background (if SVG/PNG)
- [ ] Hero image has suitable composition for text overlay
- [ ] Service images are high quality and relevant
- [ ] Testimonial photos have consent for use
- [ ] Gallery images show clear results
- [ ] All alt text is descriptive and accurate
- [ ] Images are properly licensed (own photos or licensed stock)

## Color Palette Reference

Use these colors for consistency across assets:

```
Primary (Dark Blue/Gray): #475161
Accent (Soft Beige/Gold): #D9C7B0
Background (Off-White): #FAF9F7
Text: #333333
Muted Text: #858D93
```

## Need Help?

If you need assistance with image editing or don't have access to professional photos:
1. Consider hiring a photographer for authentic clinic photos
2. Use high-quality stock photos as temporary placeholders
3. Ensure all images align with the premium, professional brand identity
