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
 * - Replace logo path at line ~90: /assets/logo-placeholder.svg
 * - Adjust scroll threshold at line ~30 (default: 20px)
 */

import React, { useState, useEffect } from 'react';

const Header = ({ onBookingClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
          className="flex items-center transition-opacity duration-300 hover:opacity-80"
          onClick={(e) => handleNavClick(e, '#home')}
        >
          <img
            src="/assets/logo-placeholder.svg"
            alt="Marvie Beauty logo"
            className="h-12 md:h-14 w-auto transition-all duration-300 brightness-0 invert"
          />
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

        {/* Desktop CTA Button */}
        <button
          onClick={onBookingClick}
          className="hidden md:block px-8 py-3 bg-accent text-primary font-semibold rounded-sm uppercase tracking-wider text-sm hover:bg-accent-dark hover:shadow-lg transition-all duration-300"
        >
          Book Appointment
        </button>

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
            <button
              onClick={() => {
                setIsMenuOpen(false);
                onBookingClick();
              }}
              className="w-full px-8 py-3 bg-accent text-primary font-semibold rounded-sm uppercase tracking-wider text-sm hover:bg-accent-dark hover:shadow-lg transition-all duration-300"
              role="menuitem"
              tabIndex={isMenuOpen ? 0 : -1}
            >
              Book Appointment
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
