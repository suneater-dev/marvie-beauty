/**
 * Header.jsx
 *
 * Transparent-to-white navigation header with scroll detection.
 * Features:
 * - Fully transparent when at page top (overlays hero)
 * - Smooth transition to white background with shadow on scroll
 * - Text/logo color switches automatically
 * - Mobile hamburger menu with slide-down panel
 * - Smooth scroll navigation
 * - Full keyboard accessibility
 *
 * HOW TO CUSTOMIZE:
 * - Logo updated to /marvie-logo.png (line ~95)
 * - Adjust scroll threshold at line ~30 (default: 20px)
 */

import React, { useState, useEffect } from 'react';

const Header = ({ onBookingClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // WhatsApp Business configuration
  const WHATSAPP_NUMBER = '+6287729138734';
  const WHATSAPP_MESSAGE = 'Hi, I would like to book an appointment at Marvie Beauty.';
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  // Handle scroll to detect when header should become solid
  // Threshold: 20px - adjust this value to change when header transitions
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'shadow-md'
          : ''
      }`}
      role="banner"
    >
      {/* Background - only shows when scrolled */}
      <div
        className={`absolute inset-0 bg-bg-dark transition-opacity duration-300 ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <nav
        className="relative container-custom py-4 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-3 transition-opacity duration-300 hover:opacity-80"
          onClick={(e) => handleNavClick(e, '#home')}
        >
          <img
            src="/marvie-logo.png"
            alt="Marvie Beauty logo"
            className="h-12 md:h-14 w-auto transition-all duration-300"
          />
          <span className="text-white text-xl md:text-2xl font-light tracking-wider">
            MARVIE BEAUTY
          </span>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`font-medium transition-colors duration-300 ${
                  isScrolled
                    ? 'text-white hover:text-accent'
                    : 'text-white hover:text-accent'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA Button & Social Icons */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-accent text-primary font-semibold rounded-sm uppercase tracking-wider text-sm hover:bg-accent-dark hover:shadow-lg transition-all duration-300"
          >
            Book Appointment
          </a>

          {/* Social Media Icons */}
          <a
            href="https://www.instagram.com/marviebeauty_by_dr.winayani"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-accent transition-colors duration-300"
            aria-label="Instagram"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a
            href="https://www.tiktok.com/@marviebeautyclinic"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-accent transition-colors duration-300"
            aria-label="TikTok"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
            </svg>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-white focus:outline-none focus:ring-2 focus:ring-white rounded transition-colors duration-300"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <svg
            className="w-6 h-6 transition-transform duration-300"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden bg-gray-800 border-t border-gray-700 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        role="menu"
        aria-hidden={!isMenuOpen}
      >
        <ul className="container-custom py-4 space-y-4">
          {navItems.map((item) => (
            <li key={item.href} role="none">
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="block py-2 text-white hover:text-accent transition-colors duration-300 font-medium focus-visible:outline-2 focus-visible:outline-accent rounded"
                role="menuitem"
                tabIndex={isMenuOpen ? 0 : -1}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li role="none">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full px-8 py-3 bg-accent text-primary font-semibold rounded-sm uppercase tracking-wider text-sm hover:bg-accent-dark hover:shadow-lg transition-all duration-300 text-center"
              role="menuitem"
              tabIndex={isMenuOpen ? 0 : -1}
            >
              Book Appointment
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
