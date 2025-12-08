# Customization Checklist

Complete these steps before deploying your Marvie Beauty landing page.

## ✅ Required Steps

### 1. Update WhatsApp Number (3 locations)

Replace `+628xxxxxxxxxx` with your actual WhatsApp number:

- [ ] `src/components/Hero.jsx` - Line 28
- [ ] `src/components/FloatingWhatsApp.jsx` - Line 18
- [ ] `src/components/ContactForm.jsx` - Line 28

**Format:** International format with country code, no spaces
**Example:** `+628123456789`

---

### 2. Replace Placeholder Images

Create `public/assets/` folder and add these images:

- [ ] `logo-placeholder.svg` - Your clinic logo
- [ ] `hero-placeholder.jpg` - Hero background (1920×1080px)
- [ ] `service-1.jpg` through `service-6.jpg` - Service images
- [ ] `testimonial-1.jpg` and `testimonial-2.jpg` - Client photos
- [ ] `gallery-1.jpg` through `gallery-4.jpg` - Results gallery

See `ASSETS-GUIDE.md` for detailed specifications.

---

### 3. Update Contact Information

**File:** `src/components/ContactForm.jsx`

Update these details (around lines 159-174):

- [ ] Phone number: `08xx-xxxx-xxxx`
- [ ] Email: `contact@marviebeauty.com`
- [ ] Address: `Jl. Example, Jakarta`
- [ ] Hours: `Mon–Sun, 10:00–20:00`

---

### 4. Configure Contact Form API

**File:** `src/components/ContactForm.jsx` - Line 95

- [ ] Replace `/api/contact` with your API endpoint

**Options:**
- Use Vercel/Netlify serverless function (see README)
- Use existing backend API
- Use a service like Formspree or EmailJS

---

### 5. Update Social Media Links

**File:** `src/components/Footer.jsx` - Lines 35-38

Replace `#` with your actual URLs:

- [ ] Instagram URL
- [ ] Facebook URL
- [ ] TikTok URL

---

### 6. Update SEO Meta Tags

**File:** `public/index.html`

Update these placeholders:

- [ ] Domain URL: `https://yourdomain.com/`
- [ ] JSON-LD phone number
- [ ] JSON-LD email
- [ ] JSON-LD address

---

## 🎨 Optional Customizations

### 7. Custom Fonts

- [ ] Choose fonts (e.g., Poppins, Montserrat)
- [ ] Add Google Fonts link to `public/index.html`
- [ ] Update `tailwind.config.js` fontFamily

---

### 8. Adjust Colors

**File:** `tailwind.config.js`

Modify the color palette if needed:

- [ ] Primary color
- [ ] Accent color
- [ ] Background color

---

### 9. Add More Content

Consider adding:

- [ ] More testimonials (edit `src/components/TestimonialCarousel.jsx`)
- [ ] Additional services (edit `src/components/ServicesGrid.jsx`)
- [ ] FAQ section
- [ ] Blog/News section
- [ ] Team/Staff section

---

### 10. Analytics & Tracking

Add to `public/index.html`:

- [ ] Google Analytics
- [ ] Facebook Pixel
- [ ] Google Tag Manager

---

## 🚀 Pre-Launch Checklist

### Testing

- [ ] Test on mobile devices
- [ ] Test on tablet
- [ ] Test on desktop
- [ ] Test all navigation links
- [ ] Test contact form submission
- [ ] Test WhatsApp links
- [ ] Test modal (open/close/keyboard navigation)
- [ ] Test mobile menu

### Performance

- [ ] Run Lighthouse audit
- [ ] Optimize images
- [ ] Test page load speed
- [ ] Check for console errors

### SEO

- [ ] Verify meta tags
- [ ] Test Open Graph preview (Facebook Debugger)
- [ ] Submit sitemap to Google
- [ ] Verify structured data (Google Rich Results Test)

### Accessibility

- [ ] Test keyboard navigation
- [ ] Test with screen reader
- [ ] Verify color contrast
- [ ] Check all images have alt text

### Legal

- [ ] Add Privacy Policy page
- [ ] Add Terms of Service
- [ ] Verify testimonial consent
- [ ] Verify image rights/licenses

---

## 📋 Deployment Steps

1. [ ] Run `npm install`
2. [ ] Run `npm start` to test locally
3. [ ] Run `npm run build` to create production build
4. [ ] Deploy to Vercel/Netlify
5. [ ] Configure custom domain
6. [ ] Set up SSL certificate (usually automatic)
7. [ ] Test live site thoroughly

---

## 🔧 Post-Launch

- [ ] Set up contact form notifications
- [ ] Monitor form submissions
- [ ] Set up Google Search Console
- [ ] Monitor analytics
- [ ] Gather feedback
- [ ] Plan for content updates

---

## Need Help?

Refer to these files for detailed instructions:

- **README.md** - General setup and deployment
- **ASSETS-GUIDE.md** - Image specifications
- Component files - Look for "HOW TO CUSTOMIZE" comments at the top of each file

---

**Estimated Time to Complete:** 2-3 hours (depending on asset preparation)

Good luck with your launch! 🎉
