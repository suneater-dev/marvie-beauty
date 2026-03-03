/**
 * PricelistPage.jsx
 *
 * Full-page dark poster-style pricelist for all treatments.
 * Accessible via /pricelist route.
 */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// ============================================================
// PRICELIST DATA — Update when prices change
// ============================================================

const PRICELIST_COL1 = [
  {
    heading: 'FACIAL TREATMENT',
    items: [
      { name: 'Radian Glow Cleansing', price: '125K' },
      { name: 'Hollywood Peel', price: '185K' },
      { name: 'Anti Aging', price: '200K' },
      { name: 'DNA Salmon', price: '250K' },
      { name: 'Acne Series', price: '280K' },
      { name: 'Hydra Full', price: '300K' },
    ],
  },
  {
    heading: 'PRP TREATMENT',
    items: [
      { name: 'Injeksi', price: '550K' },
      { name: 'Dermapen', price: '550K' },
      { name: 'Hair', price: '850K' },
      { name: 'Eye', price: '550K' },
      { name: 'Stretchmark', price: '1,200K' },
      { name: 'Hand', price: '550K' },
    ],
  },
  {
    heading: 'FACE TREATMENT',
    items: [
      { name: 'Skin Tag Small', price: '50K' },
      { name: 'Skin Tag Medium', price: '80K' },
      { name: 'Skin Tag Large', price: '100K' },
      { name: 'Inject Acne', price: '35K/Spot' },
      { name: 'Inject Keloid S', price: '500K' },
      { name: 'Inject Keloid M', price: '500K' },
      { name: 'Inject Keloid L', price: '800K' },
      { name: 'Blackspot Healing', price: '1,000K' },
      { name: 'Subsisi Scar Small', price: '500K' },
    ],
  },
  {
    heading: 'DPL TREATMENT',
    items: [
      { name: 'Bikini Line Woman', price: '399K' },
      { name: 'Upper Legs', price: '499K' },
      { name: 'Buttock Brazilian VI', price: '499K' },
      { name: 'Arms Area', price: '399K' },
      { name: 'Lower Legs', price: '399K' },
      { name: 'Full Legs', price: '699K' },
    ],
  },
  {
    heading: 'INFUSION TREATMENT',
    items: [
      { name: 'Chromosome', price: '24,999K' },
      { name: 'Porcelain', price: '849K' },
      { name: 'Snow White', price: '499K' },
      { name: 'Super Whitening', price: '499K' },
      { name: 'Vitamin C', price: '399K' },
      { name: 'Bali Belly', price: '999K' },
      { name: 'Hangover Cure', price: '999K' },
    ],
  },
];

const PRICELIST_COL2 = [
  {
    heading: 'THREADLIFT TREATMENT',
    items: [
      { name: 'Reguler', price: '499K/Thread' },
      { name: 'Nose', price: '499K/Thread' },
      { name: 'Face', price: '499K/Thread' },
      { name: 'Foxy Eye', price: '499K/Thread' },
      { name: 'Double Chin', price: '499K/Thread' },
      { name: 'Under Eye', price: '499K/Thread' },
      { name: 'Premium Nose', price: '799K/Thread' },
      { name: 'Premium Face', price: '699K/Thread' },
      { name: 'Premium Foxy Eye', price: '799K/Thread' },
      { name: 'Premium Double Chin', price: '249K/Thread' },
    ],
  },
  {
    heading: 'KOREAN FILLER TREATMENT',
    items: [
      { name: 'Chin', price: '2,999K' },
      { name: 'Lips', price: '2,999K' },
      { name: 'Smile Line', price: '2,999K' },
      { name: 'Under Eye', price: '2,999K' },
    ],
  },
  {
    heading: 'EUROPE FILLER TREATMENT',
    items: [
      { name: 'Chin', price: '4,999K' },
      { name: 'Lips', price: '4,999K' },
      { name: 'Smile Line', price: '4,999K' },
      { name: 'Under Eye', price: '4,999K' },
    ],
  },
  {
    heading: 'SKIN BOOSTER DNA SALMON',
    items: [
      { name: 'Korean Glow Booster I', price: '499K' },
      { name: 'Korean Glow Booster II', price: '799K' },
      { name: 'Korean Glow Booster III', price: '899K' },
      { name: 'Skin PDRN DNA Salmon', price: '1,199K' },
      { name: 'Skin Exosome DNA Salmon', price: '1,499K' },
      { name: 'Skin Exosome + PDRN', price: '1,999K' },
    ],
  },
  {
    heading: 'EUROPE SKIN TREATMENT',
    items: [
      { name: 'Hyahilo', price: '3,299K' },
      { name: 'Jalupro', price: '4,999K' },
      { name: 'Neuclofil', price: '4,999K' },
      { name: 'Profilo', price: '5,999K' },
      { name: 'Eye Booster Jalupro', price: '2,999K' },
    ],
  },
  {
    heading: 'BOTOX TREATMENT',
    items: [
      { name: 'Upper Face', price: '1,999K' },
      { name: 'Jawline', price: '1,999K' },
      { name: 'Full Face', price: '2,999K' },
      { name: 'Nose', price: '1,499K' },
      { name: 'Shoulder', price: '4,999K' },
      { name: 'Armpit', price: '2,999K' },
      { name: 'Hand', price: '2,999K' },
    ],
  },
];

const PricelistColumn = ({ sections }) => (
  <div className="space-y-8">
    {sections.map((section, i) => (
      <div key={i}>
        <div className="flex items-center gap-4 mb-3">
          <h3 className="text-white font-bold text-sm md:text-base uppercase tracking-wider whitespace-nowrap">
            {section.heading}
          </h3>
          <div className="flex-1 h-px bg-[#D9C7B0]/30" />
        </div>
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

const PricelistPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f2027] to-[#151d27]">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-[#0f2027]/90 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3 transition-opacity duration-300 hover:opacity-80"
          >
            <img
              src="/marvie-logo.png"
              alt="Marvie Beauty logo"
              className="h-10 md:h-12 w-auto"
            />
            <span className="text-white text-lg md:text-xl font-light tracking-wider">
              MARVIE BEAUTY
            </span>
          </Link>
          <Link
            to="/"
            className="text-[#D9C7B0] hover:text-white text-sm font-medium tracking-wide transition-colors duration-300 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
      </header>

      {/* Page Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Page Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-widest uppercase">
            TREATMENT
          </h1>
          <p className="text-[#D9C7B0] text-2xl md:text-3xl mt-2 italic" style={{ fontFamily: 'Georgia, serif' }}>
            pricelist
          </p>
        </div>

        {/* Two-column treatment grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <PricelistColumn sections={PRICELIST_COL1} />
          <PricelistColumn sections={PRICELIST_COL2} />
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <p className="text-white/20 text-xs tracking-widest mb-6">www.marvieclinic.com</p>
          <a
            href={`https://wa.me/+6287729138734?text=${encodeURIComponent('Hi, saya ingin tanya tentang treatment di Marvie Beauty. Bisa info lebih lanjut?')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-green-500 text-white font-bold
                       rounded-full uppercase tracking-wider text-sm transition-all duration-300
                       hover:bg-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:scale-105"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Ask About Treatments
          </a>
        </div>
      </main>
    </div>
  );
};

export default PricelistPage;
