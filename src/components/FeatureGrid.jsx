/**
 * FeatureGrid.jsx
 *
 * Feature grid section inspired by Rejuvie Clinic
 * Features:
 * - 4-panel asymmetric grid layout
 * - Promo of the month (large left panel)
 * - Additional services/partnerships
 * - Meet the team/doctors
 * - Facilities showcase
 *
 * HOW TO CUSTOMIZE:
 * - Replace images: /assets/promo-person.jpg, /assets/doctor-beforeafter.jpg, /assets/facility.jpg
 * - Update promo content and links
 */

import React from 'react';

const FeatureGrid = () => {
  return (
    <section className="py-0 bg-gray-100">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 max-w-7xl mx-auto">
          {/* Large Left Panel - Promo of the Month */}
          <div className="relative h-96 md:h-[600px] overflow-hidden group cursor-pointer">
            <img
              src="/assets/promo-person.webp"
              alt="Happy client"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
              <p className="text-xs tracking-widest uppercase mb-2 text-accent">Don't Miss It</p>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-wide uppercase">
                Promo of<br />the Month
              </h3>
              <button className="mt-4 px-6 py-2 border-2 border-white text-white uppercase text-xs tracking-wider
                               hover:bg-white hover:text-primary transition-all duration-300">
                Check Promo Now
              </button>
            </div>
          </div>

          {/* Right Column - 3 Smaller Panels */}
          <div className="grid grid-rows-3 gap-0">
            {/* Panel 1 - Other Services */}
            <div className="relative h-48 md:h-[200px] bg-primary overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-bg-dark
                            group-hover:from-bg-dark group-hover:to-primary transition-all duration-500" />
              <div className="relative h-full flex flex-col items-center justify-center text-center text-white p-6">
                <p className="text-xs tracking-widest uppercase mb-2 text-accent">Other Services</p>
                <h3 className="text-2xl md:text-3xl font-bold mb-3 tracking-wide uppercase">
                  Beauty<br />Packages
                </h3>
                <button className="text-accent text-xs uppercase tracking-wider underline underline-offset-4
                                 hover:text-white transition-colors">
                  View Packages
                </button>
              </div>
            </div>

            {/* Panel 2 - Meet Our Team with Before/After */}
            <div className="relative h-48 md:h-[200px] overflow-hidden group cursor-pointer">
              <img
                src="/assets/doctor-beforeafter.webp"
                alt="Treatment progression - before and after"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                <p className="text-xs tracking-widest uppercase mb-1 text-accent">Our Doctors</p>
                <h3 className="text-xl md:text-2xl font-bold mb-2 tracking-wide uppercase">
                  Meet Our<br />Experts
                </h3>
                <button className="text-accent text-xs uppercase tracking-wider underline underline-offset-4
                                 hover:text-white transition-colors">
                  Find Out
                </button>
              </div>
            </div>

            {/* Panel 3 - Facilities */}
            <div className="relative h-48 md:h-[200px] overflow-hidden group cursor-pointer">
              <img
                src="/assets/facility.webp"
                alt="Our modern clinic facilities"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 right-0 p-6 text-white text-right w-full">
                <p className="text-xs tracking-widest uppercase mb-1 text-accent">Comfort</p>
                <h3 className="text-xl md:text-2xl font-bold mb-2 tracking-wide uppercase">
                  Our<br />Facilities
                </h3>
                <button className="text-accent text-xs uppercase tracking-wider underline underline-offset-4
                                 hover:text-white transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
