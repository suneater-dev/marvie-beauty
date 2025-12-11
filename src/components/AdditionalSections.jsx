/**
 * AdditionalSections.jsx
 *
 * Additional content sections for the landing page:
 * - About section
 * - Why Choose Us section
 * - Gallery/Results section
 *
 * HOW TO CUSTOMIZE:
 * - Replace gallery images: /assets/gallery-1.jpg through gallery-4.jpg
 */

import React from 'react';

// About Section
export const About = () => {
  return (
    <section id="about" className="section-padding bg-bg-dark text-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-accent text-sm tracking-widest uppercase mb-4">Our Story</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-wide uppercase">
            About Marvie Beauty
          </h2>
          <div className="text-lg text-gray-300 leading-relaxed space-y-4 font-light">
            <p>
              Marvie Beauty Clinic is a modern aesthetic space specializing in skin treatments, face contouring, and body contouring. Our approach is safe, personalized, and results-focused, designed to elevate your natural beauty with refined precision.
            </p>
            <p>
              With over 2,000 clients cared for, we continue to uphold high standards of quality, comfort, and advanced aesthetic technology.
            </p>
            <p>
              Located in Jakarta and Bali, Marvie Beauty Clinic offers seamless access to premium treatments and a serene, elevated experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Why Choose Us Section
export const WhyChooseUs = () => {
  const reasons = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Certified and experienced aesthetic practitioners',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Modern equipment and clinically tested products',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      title: 'Customized treatment plans for every client',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      title: 'Safe, clean, and comfortable environment',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: 'Consistent results with a natural finish',
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <p className="text-accent-dark text-sm tracking-widest uppercase mb-4">Our Promise</p>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-wide uppercase">
            Why Choose Marvie Beauty
          </h2>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Top row - 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {reasons.slice(0, 3).map((reason, index) => (
              <div
                key={index}
                className="card p-6 flex items-start gap-4 text-left"
              >
                <div className="flex-shrink-0 text-accent">
                  {reason.icon}
                </div>
                <p className="text-primary font-medium leading-relaxed">
                  {reason.title}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom row - 2 cards centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {reasons.slice(3, 5).map((reason, index) => (
              <div
                key={index + 3}
                className="card p-6 flex items-start gap-4 text-left"
              >
                <div className="flex-shrink-0 text-accent">
                  {reason.icon}
                </div>
                <p className="text-primary font-medium leading-relaxed">
                  {reason.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Gallery/Results Section
export const Gallery = () => {
  const galleryItems = [
    { id: 1, src: '/assets/gallery-1.webp', alt: 'Treatment result 1' },
    { id: 2, src: '/assets/gallery-2.webp', alt: 'Treatment result 2' },
    { id: 3, src: '/assets/gallery-3.webp', alt: 'Treatment result 3' },
    { id: 4, src: '/assets/gallery-4.webp', alt: 'Treatment result 4' },
  ];

  return (
    <section className="section-padding bg-bg">
      <div className="container-custom">
        <div className="text-center mb-12">
          <p className="text-accent-dark text-sm tracking-widest uppercase mb-4">Real Results</p>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-wide uppercase">
            Our Results
          </h2>
          <p className="text-muted text-lg font-light">
            See the natural, beautiful results our clients achieve
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="relative aspect-square overflow-hidden rounded-card shadow-card
                       hover:shadow-card-hover transition-shadow group cursor-pointer"
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500
                         group-hover:scale-110"
              />
              {/* Optional: Add overlay labels for Before/After when real images are available */}
              {/*
              <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold text-primary">
                Before/After
              </div>
              */}
            </div>
          ))}
        </div>

        <p className="text-center text-muted mt-8 text-sm">
          Note: Add overlay labels "Before" / "After" when real images are available
        </p>
      </div>
    </section>
  );
};
