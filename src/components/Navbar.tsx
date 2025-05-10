'use client';

import { useState } from 'react';

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
          <a href="/" className="flex items-center">
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
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <NavLink href="/" label="Home" />
            <NavLink href="/programs/rec" label="Rec Soccer" />
            <NavLink href="/programs/travel" label="Travel Soccer" />
            <NavLink href="/schedules" label="Schedules" />
            <NavLink href="/referee" label="Referee" />
            <NavLink href="/registration" label="Registration" />
          </div>

          {/* Registration Button */}
          <a
            href="/registration"
            className="hidden md:block px-5 py-2 bg-primary/90 hover:bg-primary text-white font-normal transition-colors border-b border-white/20"
          >
            Register
          </a>

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
            <MobileNavLink href="/programs/rec" label="Rec Soccer" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink href="/programs/travel" label="Travel Soccer" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink href="/schedules" label="Schedules" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink href="/referee" label="Referee" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink href="/registration" label="Registration" onClick={() => setIsMenuOpen(false)} />
            
            <div className="pt-4">
              <a
                href="/registration"
                className="block w-full px-4 py-2 bg-primary/90 hover:bg-primary text-white font-normal text-center transition-colors border-b border-white/20"
                onClick={() => setIsMenuOpen(false)}
              >
                Register Now
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Desktop Nav Link Component
const NavLink = ({ href, label }: { href: string; label: string }) => (
  <a href={href} className="text-secondary hover:text-primary font-serif font-normal relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all after:duration-300">
    {label}
  </a>
);

// Mobile Nav Link Component
const MobileNavLink = ({ href, label, onClick }: { href: string; label: string; onClick: () => void }) => (
  <a
    href={href}
    className="block py-2 px-4 text-secondary font-serif hover:bg-gray-50 hover:text-primary"
    onClick={onClick}
  >
    {label}
  </a>
);

export default Navbar;