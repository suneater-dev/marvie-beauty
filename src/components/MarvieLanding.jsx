/**
 * MarvieLanding.jsx
 *
 * Main landing page component for Marvie Beauty.
 * Combines all sections with scroll animations and modal booking form.
 *
 * CUSTOMIZATION GUIDE:
 * ====================
 * 1. Logo & Images:
 *    - Logo: /assets/logo-placeholder.svg
 *    - Hero: /assets/hero-placeholder.jpg
 *    - Services: /assets/service-1.jpg through service-6.jpg
 *    - Testimonials: /assets/testimonial-1.jpg, testimonial-2.jpg
 *    - Gallery: /assets/gallery-1.jpg through gallery-4.jpg
 *
 * 2. WhatsApp Number:
 *    - Update in Hero.jsx (line ~28)
 *    - Update in FloatingWhatsApp.jsx (line ~18)
 *    - Update in ContactForm.jsx (line ~28)
 *    Format: +628xxxxxxxxxx (international format, no spaces)
 *
 * 3. Contact Details:
 *    - Update in ContactForm.jsx (lines ~159-174)
 *
 * 4. API Endpoint:
 *    - Update in ContactForm.jsx (line ~95): /api/contact
 *
 * 5. Social Media Links:
 *    - Update in Footer.jsx (lines ~35-38)
 *
 * SEO / META TAGS:
 * ================
 * Add to your public/index.html or use react-helmet:
 * - Title: Marvie Beauty — Enhancing Natural Beauty
 * - Meta description: Marvie Beauty is a modern aesthetic clinic offering professional,
 *   safe, and natural-looking skincare and beauty treatments. Book an appointment today.
 * - Open Graph image: /assets/hero-placeholder.jpg
 *
 * JSON-LD STRUCTURED DATA:
 * ========================
 * Add this script to public/index.html or use react-helmet:
 *
 * <script type="application/ld+json">
 * {
 *   "@context": "https://schema.org",
 *   "@type": "LocalBusiness",
 *   "name": "Marvie Beauty",
 *   "image": "/assets/hero-placeholder.jpg",
 *   "description": "Modern aesthetic clinic offering professional skincare and beauty treatments",
 *   "address": {
 *     "@type": "PostalAddress",
 *     "streetAddress": "Jl. Example",
 *     "addressLocality": "Jakarta",
 *     "addressCountry": "ID"
 *   },
 *   "telephone": "+628xxxxxxxxxx",
 *   "email": "contact@marviebeauty.com",
 *   "openingHours": "Mo-Su 10:00-20:00",
 *   "priceRange": "$$"
 * }
 * </script>
 *
 * DEPLOYMENT:
 * ===========
 * Vercel:
 * 1. Push code to GitHub
 * 2. Connect repository to Vercel
 * 3. Build command: npm run build
 * 4. Output directory: build
 * 5. Add environment variables if needed
 *
 * Netlify:
 * 1. Push code to GitHub
 * 2. Connect repository to Netlify
 * 3. Build command: npm run build
 * 4. Publish directory: build
 * 5. Add _redirects file for SPA routing: /* /index.html 200
 *
 * TESTING LOCALLY:
 * ================
 * To test the contact form locally, you can:
 * 1. Create a mock endpoint using json-server
 * 2. Use a serverless function (Netlify/Vercel functions)
 * 3. Temporarily mock the fetch in ContactForm.jsx
 *
 * FONT CUSTOMIZATION:
 * ===================
 * To use custom fonts (e.g., Poppins, Montserrat):
 * 1. Add to public/index.html:
 *    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
 * 2. Update tailwind.config.js:
 *    theme: {
 *      extend: {
 *        fontFamily: {
 *          sans: ['Poppins', 'sans-serif'],
 *        },
 *      },
 *    }
 */

import React, { useState, useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';
import { About, WhyChooseUs, Gallery } from './AdditionalSections';
import ServicesGrid from './ServicesGrid';
import FeatureGrid from './FeatureGrid';
import Certifications from './Certifications';
import TestimonialCarousel from './TestimonialCarousel';
import ContactForm from './ContactForm';
import Footer from './Footer';
import Modal from './Modal';
import FloatingWhatsApp from './FloatingWhatsApp';

// Custom hook for scroll animations using IntersectionObserver
const useScrollAnimation = () => {
  const [ref, setRef] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(ref);

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [ref]);

  return [setRef, isVisible];
};

// Animated section wrapper component
const AnimatedSection = ({ children, className = '' }) => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
};

const MarvieLanding = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleBookingClick = () => {
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header onBookingClick={handleBookingClick} />

      {/* Main Content */}
      <main>
        {/* Hero - no animation needed, it's above the fold */}
        <Hero onBookingClick={handleBookingClick} />

        {/* About */}
        <AnimatedSection>
          <About />
        </AnimatedSection>

        {/* Services */}
        <AnimatedSection>
          <ServicesGrid />
        </AnimatedSection>

        {/* Feature Grid - Promo/Facilities/Team */}
        <AnimatedSection>
          <FeatureGrid />
        </AnimatedSection>

        {/* Why Choose Us */}
        <AnimatedSection>
          <WhyChooseUs />
        </AnimatedSection>

        {/* Certifications */}
        <AnimatedSection>
          <Certifications />
        </AnimatedSection>

        {/* Testimonials */}
        <AnimatedSection>
          <TestimonialCarousel />
        </AnimatedSection>

        {/* Gallery */}
        <AnimatedSection>
          <Gallery />
        </AnimatedSection>

        {/* Contact Form */}
        <AnimatedSection>
          <ContactForm />
        </AnimatedSection>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Booking Modal */}
      <Modal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBookingModal}
        title="Book an Appointment"
      >
        <ContactForm />
      </Modal>
    </div>
  );
};

export default MarvieLanding;
