'use client';

import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-accent shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-14 w-14 mr-3">
              <div className="absolute inset-0 bg-primary/90 rounded-none flex items-center justify-center text-white">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="currentColor"/>
                  <path d="M13 5.07V14H16L12 19L8 14H11V5.07C11.32 5.03 11.66 5 12 5C12.34 5 12.68 5.03 13 5.07Z" fill="currentColor"/>
                </svg>
              </div>
            </div>
            <div>
              <span className="text-2xl font-serif text-secondary tracking-wide">Harbor Soccer</span>
              <span className="block text-xs text-primary font-light italic">Established 1982</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <NavLink href="/" label="Home" />
            <NavDropdown 
              label="Programs" 
              items={[
                { label: 'Recreational', href: '/programs/recreational' },
                { label: 'Premier', href: '/programs/premier' },
                { label: 'Camps & Clinics', href: '/programs/camps' }
              ]} 
            />
            <NavLink href="/teams" label="Teams" />
            <NavLink href="/schedule" label="Schedule" />
            <NavLink href="/news" label="News" />
            <NavLink href="/about" label="About" />
            <NavLink href="/contact" label="Contact" />
          </div>

          {/* Registration Button */}
          <Link
            href="/registration"
            className="hidden md:block px-5 py-2 bg-primary/90 hover:bg-primary text-white font-normal transition-colors border-b border-white/20"
          >
            Register
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-secondary hover:text-primary"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-gray-100">
            <MobileNavLink href="/" label="Home" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink href="/programs/recreational" label="Recreational Soccer" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink href="/programs/premier" label="Premier Soccer" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink href="/programs/camps" label="Camps & Clinics" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink href="/teams" label="Teams" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink href="/schedule" label="Schedule" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink href="/news" label="News" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink href="/about" label="About" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink href="/contact" label="Contact" onClick={() => setIsMenuOpen(false)} />
            
            <div className="pt-4">
              <Link
                href="/registration"
                className="block w-full px-4 py-2 bg-primary/90 hover:bg-primary text-white font-normal text-center transition-colors border-b border-white/20"
                onClick={() => setIsMenuOpen(false)}
              >
                Register Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Desktop Nav Link Component
const NavLink = ({ href, label }: { href: string; label: string }) => (
  <Link href={href} className="text-secondary hover:text-primary font-serif font-normal hover-underline">
    {label}
  </Link>
);

// Mobile Nav Link Component
const MobileNavLink = ({ href, label, onClick }: { href: string; label: string; onClick: () => void }) => (
  <Link
    href={href}
    className="block py-2 px-4 text-secondary font-serif hover:bg-gray-50 hover:text-primary"
    onClick={onClick}
  >
    {label}
  </Link>
);

// Dropdown Component
const NavDropdown = ({ label, items }: { label: string; items: { label: string; href: string }[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative" onMouseLeave={() => setIsOpen(false)}>
      <button
        className="text-secondary hover:text-primary font-serif font-normal flex items-center hover-underline"
        onMouseEnter={() => setIsOpen(true)}
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white shadow-md py-2 z-10 border-t border-primary/20">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="block px-4 py-2 text-secondary font-serif hover:bg-gray-50 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;