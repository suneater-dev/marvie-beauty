/**
 * Certifications.jsx
 *
 * Certifications and awards section - similar to Rejuvie's badges
 * Features:
 * - Displays certification logos/badges
 * - Trust indicators
 * - Professional credentials
 */

import React from 'react';

const Certifications = () => {
  const certifications = [
    {
      id: 1,
      title: 'Certified Aesthetic Practitioners',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'FDA Approved Equipment',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Licensed Medical Professionals',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      id: 4,
      title: 'ISO Certified Clinic',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="section-padding bg-primary text-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <p className="text-accent text-sm tracking-widest uppercase mb-4">Trust & Excellence</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-wide uppercase">
            Certifications & Standards
          </h2>
          <p className="text-gray-300 text-lg font-light max-w-2xl mx-auto">
            We maintain the highest standards of safety and professionalism
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="flex flex-col items-center text-center p-6 rounded-lg border border-accent/20
                       hover:border-accent/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="text-accent mb-4">
                {cert.icon}
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wide">
                {cert.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Additional trust badges */}
        <div className="mt-16 text-center">
          <p className="text-accent text-xs tracking-widest uppercase mb-4">Trusted By Over</p>
          <p className="text-5xl md:text-6xl font-bold text-accent">1,000+</p>
          <p className="text-gray-300 mt-2 font-light">Satisfied Clients</p>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
