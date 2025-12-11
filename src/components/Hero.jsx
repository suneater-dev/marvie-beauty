/**
 * Hero.jsx
 *
 * Hero section with auto-sliding carousel and zoom animation.
 * Features:
 * - 3 hero slides with auto-play
 * - Slow zoom-in animation on each slide
 * - Minimal overlay for text readability
 * - Navigation dots
 * - Smooth transitions
 *
 * HOW TO CUSTOMIZE:
 * - Replace hero slides: /assets/hero-slide-1.webp, hero-slide-2.webp, hero-slide-3.webp
 * - Update WhatsApp number at line ~35: +628xxxxxxxxxx (format: +628xxxxxxxxxx)
 */

import React, { useState, useEffect } from 'react';

const Hero = ({ onBookingClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero slides
  const slides = [
    {
      id: 1,
      image: '/assets/hero-slide-1.webp',
      alt: 'Marvie Beauty - Natural beauty enhancement',
    },
    {
      id: 2,
      image: '/assets/hero-slide-2.webp',
      alt: 'Marvie Beauty - Professional aesthetic treatments',
    },
    {
      id: 3,
      image: '/assets/hero-slide-3.webp',
      alt: 'Marvie Beauty - Modern skincare solutions',
    },
  ];

  // WhatsApp Business configuration
  const WHATSAPP_NUMBER = '+6287729138734';
  const WHATSAPP_MESSAGE = 'Hi, I would like to book an appointment at Marvie Beauty.';
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  // Auto-play slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleScrollToServices = () => {
    const servicesSection = document.querySelector('#services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Slides Container */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Image with zoom animation */}
            <div
              className={`w-full h-full ${
                index === currentSlide ? 'animate-zoom-in' : ''
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Subtle overlay for text readability - much lighter */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/10 to-black/20" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white px-4 py-20">
        {/* Small tagline */}
        <p className="text-accent text-sm md:text-base tracking-widest uppercase mb-4 font-light drop-shadow-lg">
          Premium Aesthetic Care
        </p>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up tracking-wide drop-shadow-2xl" style={{ fontFamily: 'Zagora, sans-serif' }}>
          MARVIE BEAUTY
        </h1>

        {/* Subheadline */}
        <p
          className="text-lg md:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed
                     font-light drop-shadow-lg"
          style={{ animationDelay: '0.2s' }}
        >
          Enhancing natural beauty through safe, trusted, and modern aesthetic treatments.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          style={{ animationDelay: '0.4s' }}
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary bg-white/10 backdrop-blur-sm border-white text-white
                     hover:bg-white hover:text-primary text-lg px-8 py-4 w-full sm:w-auto
                     inline-block text-center shadow-2xl"
          >
            Book Appointment
          </a>
          <button
            onClick={handleScrollToContact}
            className="btn-secondary bg-white/10 backdrop-blur-sm border-white text-white
                     hover:bg-white hover:text-primary text-lg px-8 py-4 w-full sm:w-auto
                     shadow-2xl"
          >
            Contact Us
          </button>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3 mb-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? 'w-8 h-3 bg-accent'
                  : 'w-3 h-3 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll Hint */}
        <button
          onClick={handleScrollToServices}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2
                     text-white/80 hover:text-white transition-all duration-300
                     animate-bounce focus:outline-none focus:ring-2 focus:ring-white rounded-full p-2"
          aria-label="Scroll to services section"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>

      {/* Zoom-in animation CSS */}
      <style jsx>{`
        @keyframes zoom-in {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.1);
          }
        }

        .animate-zoom-in {
          animation: zoom-in 5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Hero;
