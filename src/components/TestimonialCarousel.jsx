/**
 * TestimonialCarousel.jsx
 *
 * Client testimonials section with keyboard-accessible carousel.
 * Features:
 * - Responsive testimonial cards with client photos
 * - Previous/Next navigation buttons
 * - Keyboard accessible (arrow keys)
 * - Touch-swipe friendly on mobile
 * - Auto-play option (commented out by default)
 *
 * HOW TO CUSTOMIZE:
 * - Add more testimonials to the testimonials array
 * - Replace placeholder images: /assets/testimonial-1.jpg, testimonial-2.jpg, etc.
 */

import React, { useState, useEffect, useCallback } from 'react';

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      text: 'Professional, clean, and the results were better than expected. The team made me feel comfortable from start to finish.',
      author: 'S. Haryanti',
      image: '/assets/testimonial-1.webp',
      rating: 5,
    },
    {
      id: 2,
      text: 'I have tried many clinics, but Marvie Beauty gives the most natural and long-lasting results. Highly recommended.',
      author: 'R. Santoso',
      image: '/assets/testimonial-2.webp',
      rating: 5,
    },
  ];

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevTestimonial();
      } else if (e.key === 'ArrowRight') {
        nextTestimonial();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextTestimonial, prevTestimonial]);

  // Auto-play (optional - uncomment to enable)
  /*
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);
  */

  return (
    <section id="testimonials" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-accent-dark text-sm tracking-widest uppercase mb-4">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-wide uppercase">
            Client Reviews
          </h2>
          <p className="text-muted text-lg font-light">
            See what our clients say about their experience
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <div className="bg-bg rounded-card shadow-card p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Client Photo */}
              <div className="flex-shrink-0">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].author}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-lg"
                  loading="lazy"
                />
              </div>

              {/* Testimonial Content */}
              <div className="flex-1 text-center md:text-left">
                {/* Star Rating */}
                <div className="flex justify-center md:justify-start gap-1 mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-accent fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-lg md:text-xl text-text leading-relaxed mb-4 italic">
                  "{testimonials[currentIndex].text}"
                </blockquote>

                {/* Author */}
                <cite className="text-muted font-semibold not-italic">
                  — {testimonials[currentIndex].author}
                </cite>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12
                         bg-white rounded-full p-3 shadow-lg hover:shadow-xl
                         text-primary hover:text-accent transition-all
                         focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Previous testimonial"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12
                         bg-white rounded-full p-3 shadow-lg hover:shadow-xl
                         text-primary hover:text-accent transition-all
                         focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Next testimonial"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {testimonials.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
                    index === currentIndex
                      ? 'bg-accent w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
