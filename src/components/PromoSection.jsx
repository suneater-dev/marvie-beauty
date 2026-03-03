/**
 * PromoSection.jsx
 *
 * Monthly promo section with flash-sale energy.
 * Features:
 * - Lebaran Pangling Package with BIG countdown timer
 * - SAVE % discount badges on every deal
 * - Pulsing WhatsApp CTA buttons
 * - Tabbed promo price list by category
 *
 * HOW TO UPDATE MONTHLY:
 * - Edit PROMO_CONFIG at the top of this file
 * - Update featured package details, end date, and price list
 */

import React, { useState } from 'react';

// ============================================================
// PROMO CONFIGURATION — Edit this section for monthly updates
// ============================================================

const WHATSAPP_NUMBER = '+6287729138734';

const FEATURED_PACKAGE = {
  title: 'Lebaran Pangling Package',
  subtitle: 'Tampil Pangling Saat Lebaran!',
  validDates: '2 - 31 March 2026',
  endDate: new Date('2026-03-31T23:59:59+08:00'),
  deals: [
    {
      name: 'Benang Hidung + FREE Skin Booster DNA Salmon',
      options: [
        { label: 'Korean Nose', originalPrice: 5000, promoPrice: 3500 },
        { label: 'Turkish Nose', originalPrice: 7500, promoPrice: 5000 },
      ],
      whatsappMessage: 'Hi, saya tertarik dengan promo Benang Hidung + FREE Skin Booster di Marvie Beauty. Bisa info lebih lanjut?',
    },
    {
      name: 'Promo Pangling 1',
      description: 'Threadlift 4 + Botox Masseter 50iu + Chin Filler 1ml',
      originalPrice: 9700,
      promoPrice: 8000,
      whatsappMessage: 'Hi, saya tertarik dengan Promo Pangling 1 (Threadlift + Botox + Filler) di Marvie Beauty. Bisa info lebih lanjut?',
    },
    {
      name: 'Promo Pangling 2',
      description: 'Nose Thread 15 + Threadlift 6 + Masseter Botox + Chin Filler 1ml + Skin Booster DNA Salmon',
      originalPrice: 14100,
      promoPrice: 11000,
      whatsappMessage: 'Hi, saya tertarik dengan Promo Pangling 2 (Full Package) di Marvie Beauty. Bisa info lebih lanjut?',
    },
  ],
};

// Data structured to match the 2-column Instagram poster layout
const MARCH_PROMO_COL1 = [
  {
    heading: 'BOTOX',
    items: [
      { name: 'Full Face', price: '2,500k' },
      { name: 'Masseter', price: '1,800k' },
      { name: 'Upper', price: '1,500k' },
      { name: 'Nefertiti', price: '3,000k' },
      { name: 'Traps', price: '3,000k' },
      { name: 'Tricep', price: '3,000k' },
      { name: 'Armpit', price: '3,000k' },
      { name: 'Hand', price: '3,000k' },
    ],
  },
  { heading: 'BOTOX ALERGAN', single: '5,800k' },
  { heading: 'ALL FILLER', single: '1,500k' },
  { heading: 'BUTTOCK FILLER', single: '15,000k / 150cc' },
  {
    heading: 'LASER',
    items: [
      { name: 'Eye Brow Removal', price: '300k' },
      { name: 'Tattoo Removal S', price: '500k' },
      { name: 'Tattoo Removal M', price: '800k' },
      { name: 'Tattoo Removal XL', price: '1,500k' },
      { name: 'Acne', price: '500k' },
      { name: 'Back Acne', price: '1,000k' },
    ],
  },
  { heading: 'COLLAGEN STIMULATOR', single: '2,500k' },
];

const MARCH_PROMO_COL2 = [
  {
    heading: 'THREAD TREATMENT',
    items: [
      { name: 'Nose thread', price: '500k/ thread' },
      { name: 'Threadlift Korean', price: '700k/ thread' },
      { name: 'Threadlift Korean Croquis', price: '1,000k/ thread' },
    ],
  },
  { heading: 'HAND DNA SALMON', single: '1,000k' },
  { heading: 'NAD+ INFUSION', single: '2,500k' },
  {
    heading: 'DPL',
    items: [
      { name: 'Face Rejuve', price: '500k' },
      { name: 'Armpit', price: '300k' },
      { name: 'Miss V / Brazilian', price: '300k' },
      { name: 'Hand', price: '500k' },
      { name: 'Foot', price: '500k' },
    ],
  },
  {
    heading: 'SKIN BOOSTER',
    items: [
      { name: 'Korean Moist', price: '500k' },
      { name: 'Korean Glowing', price: '800k' },
      { name: 'Korean Full Packed', price: '1,000k' },
      { name: 'Yaqoot', price: '2,500k' },
      { name: 'NCTF', price: '1,500k' },
    ],
  },
];

// ============================================================
// HELPERS
// ============================================================

const formatPrice = (num) => num.toLocaleString('id-ID').replace(/\./g, ',');
const calcDiscount = (original, promo) => Math.round(((original - promo) / original) * 100);

// ============================================================
// SUB-COMPONENTS
// ============================================================

const DiscountBadge = ({ percent, className = '' }) => (
  <span className={`inline-block bg-red-500 text-white text-xs font-bold px-2.5 py-1
                    rounded-full uppercase tracking-wide shadow-md ${className}`}>
    SAVE {percent}%
  </span>
);

const WhatsAppButton = ({ message, label, className = '', pulse = false }) => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-7 py-3.5 bg-green-500 text-white font-bold
                 rounded-full uppercase tracking-wider text-sm transition-all duration-300
                 hover:bg-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:scale-105
                 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2
                 ${pulse ? 'animate-[pulse_2s_ease-in-out_infinite]' : ''} ${className}`}
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
      {label}
    </a>
  );
};

// ============================================================
// FEATURED PACKAGE (Part A) — Ramadan Theme
// ============================================================

// Crescent moon + star SVG decoration
const CrescentMoon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 120 140" fill="none">
    {/* Moon */}
    <path d="M60 10C35 10 15 35 15 65s20 55 45 55c-20-10-33-32-33-55S40 20 60 10z"
          fill="currentColor" opacity="0.9" />
    {/* Star */}
    <polygon points="85,20 88,30 98,30 90,36 93,46 85,40 77,46 80,36 72,30 82,30"
             fill="currentColor" opacity="0.8" />
    {/* Small hanging ornament */}
    <line x1="55" y1="0" x2="55" y2="15" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <circle cx="55" cy="18" r="3" fill="currentColor" opacity="0.4" />
    <line x1="75" y1="0" x2="75" y2="22" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <circle cx="75" cy="25" r="2" fill="currentColor" opacity="0.3" />
  </svg>
);

// Islamic geometric corner decoration
const GeometricCorner = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none">
    <path d="M0 0h100v5H5v95H0V0z" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    <path d="M0 0h80v5H10v75H5V5H0z" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
    <rect x="10" y="10" width="8" height="8" transform="rotate(45 14 14)" fill="currentColor" opacity="0.15" />
  </svg>
);

const FeaturedPackage = () => {
  return (
    <div className="relative overflow-hidden py-20 md:py-28"
         style={{ background: 'linear-gradient(135deg, #0a1628 0%, #132a3e 40%, #0f2027 70%, #0a1628 100%)' }}>

      {/* Ramadan decorative elements */}
      <CrescentMoon className="absolute top-6 left-8 md:left-16 w-20 h-24 md:w-28 md:h-32 text-accent/40" />
      <GeometricCorner className="absolute bottom-0 right-0 w-24 h-24 md:w-32 md:h-32 text-accent" />
      <GeometricCorner className="absolute bottom-0 left-0 w-24 h-24 md:w-32 md:h-32 text-accent scale-x-[-1]" />

      {/* Warm ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/3 rounded-full blur-3xl" />

      <div className="container-custom relative">
        {/* Title — Ramadan style */}
        <div className="text-center mb-14">
          <p className="text-accent/70 text-xs md:text-sm tracking-[0.3em] uppercase mb-4">
            Promo valid 2 - 31 March 2026
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl text-accent mb-3"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 400, fontStyle: 'italic' }}>
            Lebaran Pangling
          </h2>
          <p className="text-white text-2xl md:text-3xl font-bold uppercase tracking-[0.2em]">
            Package
          </p>
        </div>

        {/* Promo details — poster menu style, bigger */}
        <div className="max-w-3xl mx-auto space-y-8 mb-14">
          {FEATURED_PACKAGE.deals.map((deal, index) => {
            const discount = deal.options
              ? Math.max(...deal.options.map(o => calcDiscount(o.originalPrice, o.promoPrice)))
              : calcDiscount(deal.originalPrice, deal.promoPrice);

            return (
              <div key={index}>
                {/* Deal heading with gold line */}
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-accent font-bold text-base md:text-lg uppercase tracking-wider whitespace-nowrap">
                    {deal.name}
                  </h3>
                  <div className="flex-1 h-px bg-accent/25" />
                  <DiscountBadge percent={discount} />
                </div>

                {deal.options ? (
                  <div className="space-y-3 pl-1">
                    {deal.options.map((opt, i) => (
                      <div key={i} className="flex items-baseline justify-between gap-4">
                        <span className="text-white/60 text-base md:text-lg">{opt.label}</span>
                        <div className="flex items-baseline gap-3 flex-shrink-0">
                          <span className="text-white/25 line-through text-sm">
                            {formatPrice(opt.originalPrice)}K
                          </span>
                          <span className="text-white font-bold text-xl md:text-2xl">
                            {formatPrice(opt.promoPrice)}K
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="pl-1">
                    <p className="text-white/50 text-base md:text-lg mb-3 leading-relaxed">
                      {deal.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="text-white/25 line-through text-base">
                        {formatPrice(deal.originalPrice)}K
                      </span>
                      <span className="text-accent text-lg md:text-xl font-medium italic"
                            style={{ fontFamily: 'Georgia, serif' }}>
                        Now Only
                      </span>
                      <span className="text-white font-bold text-3xl md:text-4xl">
                        IDR {formatPrice(deal.promoPrice)}K
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <WhatsAppButton
            message="Hi, saya tertarik dengan Lebaran Pangling Package di Marvie Beauty. Bisa info lebih lanjut?"
            label="Book This Package"
          />
        </div>
      </div>
    </div>
  );
};

// ============================================================
// MARCH PROMO MENU (Part B) — Poster-style like Instagram
// ============================================================

const MenuColumn = ({ sections }) => (
  <div className="space-y-6">
    {sections.map((section, i) => (
      <div key={i}>
        {/* Category heading with gold line */}
        <div className="flex items-center gap-4 mb-3">
          <h3 className="text-white font-bold text-sm md:text-base uppercase tracking-wider whitespace-nowrap">
            {section.heading}
          </h3>
          <div className="flex-1 h-px bg-accent/30" />
          {section.single && (
            <span className="text-white/80 font-semibold text-sm md:text-base whitespace-nowrap">
              {section.single}
            </span>
          )}
        </div>

        {/* Treatment items */}
        {section.items && (
          <div className="space-y-1.5 pl-1">
            {section.items.map((item, j) => (
              <div key={j} className="flex items-baseline justify-between gap-3">
                <span className="text-white/60 text-sm">{item.name}</span>
                <span className="text-white/80 font-semibold text-sm whitespace-nowrap">{item.price}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
);

const PromoMenu = () => {
  return (
    <div className="relative bg-gradient-to-b from-[#0f2027] to-[#151d27] py-16 md:py-24 overflow-hidden">
      {/* Subtle leaf/texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
           style={{ backgroundImage: 'url(/assets/service-1.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }} />

      <div className="container-custom relative">
        {/* Header — matching the poster style */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-widest uppercase">
            MARCH PROMO
          </h2>
          <p className="text-accent text-2xl md:text-3xl mt-1 italic" style={{ fontFamily: 'Georgia, serif' }}>
            pricelist
          </p>
        </div>

        {/* Two-column menu — mirrors the 2-page poster */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 max-w-4xl mx-auto">
          <MenuColumn sections={MARCH_PROMO_COL1} />
          <MenuColumn sections={MARCH_PROMO_COL2} />
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-white/20 text-xs tracking-widest mb-8">www.marvieclinic.com</p>
          <WhatsAppButton
            message="Hi, saya tertarik dengan promo March 2026 di Marvie Beauty. Bisa info lebih lanjut?"
            label="Ask About March Promos"
          />
        </div>
      </div>
    </div>
  );
};

// ============================================================
// MAIN EXPORT
// ============================================================

const PromoSection = () => {
  return (
    <section id="promo">
      <FeaturedPackage />
      <PromoMenu />
    </section>
  );
};

export default PromoSection;
