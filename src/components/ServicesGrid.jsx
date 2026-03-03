/**
 * ServicesGrid.jsx
 *
 * Services section displaying all treatment offerings in a responsive grid.
 * Features:
 * - 6 service cards with overlay titles and descriptions
 * - Responsive grid (1 column mobile, 2 tablet, 3 desktop)
 * - Hover effects: image zoom, gradient overlay reveal
 * - Lazy-loaded service images
 * - CTA links to /pricelist page
 *
 * HOW TO CUSTOMIZE:
 * - Replace service images: /assets/service-1.webp through service-6.webp
 * - Update service content in the services array below
 */

import React from 'react';
import { Link } from 'react-router-dom';

const ServicesGrid = () => {
  const services = [
    {
      id: 1,
      title: 'Facial Treatments',
      description:
        'Medically guided facial treatments designed to improve skin health, function, and appearance. Customized protocols combining targeted techniques with medical-grade formulations.',
      image: '/assets/service-1.webp',
    },
    {
      id: 2,
      title: 'Acne Skin Treatment',
      description:
        'Clear, calm, and confident. Our medically guided acne treatments target breakouts at the source, reduce flare-ups, and restore healthy, smooth skin.',
      image: '/assets/service-2.webp',
    },
    {
      id: 3,
      title: 'Anti-Aging Solutions',
      description:
        'Advanced treatments including Botox, Dermal Fillers, Threadlift, and Skin Boosters. Restore youthful contours and smooth wrinkles with natural-looking results.',
      image: '/assets/service-3.webp',
    },
    {
      id: 4,
      title: 'Face Contouring',
      description:
        'Sculpt. Define. Enhance. Using Botox, Dermal Fillers, and Thread Treatments to refine facial features and create natural, elegant contours.',
      image: '/assets/service-4.webp',
    },
    {
      id: 5,
      title: 'Laser Solutions',
      description:
        'Utilizing Pico Laser and DPL Laser to address pigmentation, acne scars, uneven skin tone, and hair removal with precision and safety.',
      image: '/assets/service-5.webp',
    },
    {
      id: 6,
      title: 'Body Contouring',
      description:
        'Redefine your silhouette with medically guided treatments. Target stubborn areas, enhance curves, and sculpt a harmonious, natural-looking body shape.',
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
            Professional aesthetic treatments tailored to your unique needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <article
              key={service.id}
              className="group relative rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300"
            >
              {/* Image with overlay */}
              <div className="relative h-72 sm:h-80 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700
                           group-hover:scale-110"
                />
                {/* Gradient overlay — always visible at bottom, expands on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent
                              group-hover:from-black/90 group-hover:via-black/50 transition-all duration-500" />

                {/* Content positioned over image */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-bold uppercase tracking-wide mb-2">
                    {service.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed line-clamp-3
                              max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100
                              transition-all duration-500 overflow-hidden">
                    {service.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA to Pricelist */}
        <div className="text-center mt-14">
          <Link
            to="/pricelist"
            className="inline-block px-10 py-4 bg-primary text-white font-semibold rounded-sm uppercase tracking-wider text-sm hover:bg-accent hover:text-primary transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View Full Treatment Pricelist
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
