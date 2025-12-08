/**
 * ServicesGrid.jsx
 *
 * Services section displaying all treatment offerings in a responsive grid.
 * Features:
 * - 6 service cards with icons, titles, and descriptions
 * - Responsive grid (1 column mobile, 2 tablet, 3 desktop)
 * - Hover effects: lift and reveal "Learn More" text
 * - Lazy-loaded service images
 *
 * HOW TO CUSTOMIZE:
 * - Replace service images: /assets/service-1.jpg through service-6.jpg
 * - Update service content in the services array below
 */

import React from 'react';

const ServicesGrid = () => {
  const services = [
    {
      id: 1,
      title: 'Facial Treatments',
      description:
        'Deep-cleansing, hydrating, and rejuvenating facials designed to restore skin clarity and glow. Tailored to each skin type for visible, lasting results.',
      image: '/assets/service-1.webp',
    },
    {
      id: 2,
      title: 'Acne & Skin Repair',
      description:
        'Targeted treatments to reduce breakouts, minimize scarring, and improve overall skin texture. Ideal for sensitive and acne-prone skin.',
      image: '/assets/service-2.webp',
    },
    {
      id: 3,
      title: 'Anti-Aging Solutions',
      description:
        'Non-invasive procedures focused on tightening, lifting, and revitalizing the skin. Helps reduce fine lines, wrinkles, and signs of aging.',
      image: '/assets/service-3.webp',
    },
    {
      id: 4,
      title: 'Injectables (Non-Surgical Enhancements)',
      description:
        'Professional injectable treatments that enhance facial features while maintaining a natural appearance. Safe, subtle, and performed by qualified experts.',
      image: '/assets/service-4.webp',
    },
    {
      id: 5,
      title: 'Laser Hair Removal',
      description:
        'Smooth, long-lasting hair reduction using advanced laser technology suitable for various skin types.',
      image: '/assets/service-5.webp',
    },
    {
      id: 6,
      title: 'Body Contouring',
      description:
        'Non-surgical sculpting solutions that reduce stubborn fat and improve body shape with minimal downtime.',
      image: '/assets/service-6.webp',
    },
  ];

  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-accent-dark text-sm tracking-widest uppercase mb-4">Treatments</p>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-wide uppercase">
            Our Services
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto font-light">
            All descriptions below are examples and can be customized.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <article
              key={service.id}
              className="card group cursor-pointer overflow-hidden"
            >
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden bg-gray-200">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500
                           group-hover:scale-110"
                />
              </div>

              {/* Service Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-primary mb-3 group-hover:text-accent transition-colors uppercase tracking-wide">
                  {service.title}
                </h3>
                <p className="text-muted leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Learn More hint - revealed on hover */}
                <div
                  className="text-accent font-semibold flex items-center gap-2
                             opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  Learn More
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
