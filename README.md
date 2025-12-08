# Marvie Beauty - Landing Page

A production-ready, mobile-responsive, one-page landing website for Marvie Beauty aesthetic clinic. Built with **React + Tailwind CSS**.

## Features

- Premium, minimal, calming design aesthetic
- Fully responsive (mobile-first approach)
- Interactive components:
  - Smooth scroll navigation
  - Animate-on-scroll sections
  - Modal booking form with focus trap
  - Mobile hamburger menu
  - Testimonial carousel
  - Floating WhatsApp button
- Accessibility-compliant (WCAG AA)
- Form validation with success/error feedback
- SEO-optimized structure

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build for Production

```bash
npm run build
```

Creates optimized production build in the `build/` folder.

## Required Customizations

Before deploying, you must update the following:

### 1. Replace Placeholder Images

Create an `public/assets/` directory and add these images:

- `logo-placeholder.svg` - Your clinic logo (max 300x300px)
- `hero-placeholder.jpg` - Hero background image (1600x900px recommended)
- `service-1.jpg` through `service-6.jpg` - Service images (1200x800px)
- `testimonial-1.jpg`, `testimonial-2.jpg` - Client photos (400x400px)
- `gallery-1.jpg` through `gallery-4.jpg` - Before/after results

**Where to update:**
- Logo: `src/components/Header.jsx` (line 64)
- Hero: `src/components/Hero.jsx` (line 48)
- Services: `src/components/ServicesGrid.jsx` (images array)
- Testimonials: `src/components/TestimonialCarousel.jsx` (testimonials array)
- Gallery: `src/components/AdditionalSections.jsx` (Gallery component)

### 2. Update WhatsApp Number

Replace `+628xxxxxxxxxx` with your actual WhatsApp number (international format, no spaces).

**Files to update:**
- `src/components/Hero.jsx` (line 28)
- `src/components/FloatingWhatsApp.jsx` (line 18)
- `src/components/ContactForm.jsx` (line 28)

### 3. Update Contact Information

**File:** `src/components/ContactForm.jsx` (lines 159-174)

Update:
- Phone number
- Email address
- Physical address
- Business hours

### 4. Configure Contact Form API

**File:** `src/components/ContactForm.jsx` (line 95)

Replace `/api/contact` with your actual endpoint.

#### Option A: Serverless Function (Recommended)

**For Vercel:**

Create `api/contact.js`:

```javascript
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email, service, message } = req.body;

  // Add your logic here (send email, save to database, etc.)
  // Example: use nodemailer, SendGrid, or save to Airtable/Google Sheets

  res.status(200).json({ success: true });
}
```

**For Netlify:**

Create `netlify/functions/contact.js` with similar logic.

#### Option B: External API

Point to your existing backend API endpoint.

### 5. Update Social Media Links

**File:** `src/components/Footer.jsx` (lines 35-38)

Replace `#` with your actual social media URLs.

### 6. Add SEO Meta Tags

**File:** `public/index.html`

Update the `<head>` section:

```html
<title>Marvie Beauty — Enhancing Natural Beauty</title>
<meta name="description" content="Marvie Beauty is a modern aesthetic clinic offering professional, safe, and natural-looking skincare and beauty treatments. Book an appointment today.">

<!-- Open Graph -->
<meta property="og:title" content="Marvie Beauty — Enhancing Natural Beauty">
<meta property="og:description" content="Modern aesthetic clinic offering professional skincare and beauty treatments">
<meta property="og:image" content="%PUBLIC_URL%/assets/hero-placeholder.jpg">
<meta property="og:url" content="https://yourdomain.com">

<!-- JSON-LD -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Marvie Beauty",
  "image": "/assets/hero-placeholder.jpg",
  "description": "Modern aesthetic clinic offering professional skincare and beauty treatments",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jl. Example",
    "addressLocality": "Jakarta",
    "addressCountry": "ID"
  },
  "telephone": "+628xxxxxxxxxx",
  "email": "contact@marviebeauty.com",
  "openingHours": "Mo-Su 10:00-20:00",
  "priceRange": "$$"
}
</script>
```

## Project Structure

```
src/
├── components/
│   ├── MarvieLanding.jsx       # Main landing page component
│   ├── Header.jsx              # Navigation header
│   ├── Hero.jsx                # Hero section
│   ├── AdditionalSections.jsx  # About, Why Choose Us, Gallery
│   ├── ServicesGrid.jsx        # Services section
│   ├── TestimonialCarousel.jsx # Testimonials carousel
│   ├── ContactForm.jsx         # Contact form and info
│   ├── Footer.jsx              # Footer with CTA
│   ├── Modal.jsx               # Accessible modal component
│   └── FloatingWhatsApp.jsx    # Floating WhatsApp button
├── App.js                      # App entry point
└── index.css                   # Global styles + Tailwind
```

## Customizing Design

### Colors

Update colors in `tailwind.config.js`:

```javascript
colors: {
  primary: '#475161',    // Dark blue/gray
  accent: '#D9C7B0',     // Soft beige/gold
  bg: '#FAF9F7',         // Off-white background
  text: '#333333',       // Main text color
  muted: '#858D93',      // Muted text color
}
```

### Fonts

Add to `public/index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
```

Update `tailwind.config.js`:

```javascript
theme: {
  extend: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
  },
}
```

## Deployment

### Vercel

1. Push code to GitHub
2. Import repository at [vercel.com](https://vercel.com)
3. Build settings:
   - Build command: `npm run build`
   - Output directory: `build`
4. Deploy

### Netlify

1. Push code to GitHub
2. Import repository at [netlify.com](https://netlify.com)
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
4. Create `public/_redirects`:
   ```
   /* /index.html 200
   ```
5. Deploy

## Testing

### Contact Form Testing

For local development without a backend:

1. **Mock API (Quick Test):**

In `ContactForm.jsx`, temporarily replace the fetch with:

```javascript
// Simulate API call
await new Promise(resolve => setTimeout(resolve, 1000));
console.log('Form data:', formData);
setSubmitStatus('success');
```

2. **json-server (More Realistic):**

```bash
npm install -g json-server
echo '{"contacts": []}' > db.json
json-server --watch db.json --port 3001
```

Update endpoint to `http://localhost:3001/contacts`

## Accessibility Features

- Semantic HTML5 elements
- Logical heading hierarchy
- Keyboard navigation support
- Focus trap in modal
- ARIA labels and roles
- Color contrast meets WCAG AA
- Screen reader friendly

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance Optimizations

- Lazy loading for images
- Smooth scroll behavior with CSS
- Lightweight IntersectionObserver for animations
- Minimal dependencies
- Production build with code splitting

## Support

For issues or questions:
1. Check the customization comments in component files
2. Review this README
3. Check browser console for errors

## License

All rights reserved © 2025 Marvie Beauty

---

Built with React + Tailwind CSS
