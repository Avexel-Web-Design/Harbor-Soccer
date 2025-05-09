const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary text-gray-300">
      <div className="relative overflow-hidden">
        <div className="absolute opacity-5 inset-0 bg-soccer-pattern"></div>
        <div className="container mx-auto px-4 py-16 relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Club Info */}
            <div>
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 bg-primary/90 flex items-center justify-center mr-3">
                  <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="currentColor"/>
                    <path d="M13 5.07V14H16L12 19L8 14H11V5.07C11.32 5.03 11.66 5 12 5C12.34 5 12.68 5.03 13 5.07Z" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-serif font-normal tracking-wide text-white">Harbor Soccer</h3>
              </div>
              <p className="mb-6 font-light italic text-gray-400">Developing youth through the beautiful game since 1982</p>
              <div className="flex space-x-5">
                <a href="https://facebook.com/harborsoccerclub" aria-label="Facebook" className="text-gray-400 hover:text-primary transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                  </svg>
                </a>
                <a href="https://x.com/harborsoccer" aria-label="X (Twitter)" className="text-gray-400 hover:text-primary transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="https://instagram.com/harborsoccerclub" aria-label="Instagram" className="text-gray-400 hover:text-primary transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85 0-3.2.01-3.58.07-4.85.15-3.23 1.67-4.77 4.92-4.92 1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12c0 3.26.01 3.67.07 4.95.2 4.36 2.62 6.78 6.98 6.98 1.28.06 1.7.07 4.95.07 3.26 0 3.67-.01 4.95-.07 4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.7.07-4.95 0-3.26-.01-3.67-.07-4.95-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm7.84-10.4a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-serif font-normal text-white mb-6 pb-2 relative after:absolute after:w-16 after:h-px after:bg-primary/40 after:bottom-0 after:left-0">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="/programs/recreational" className="hover:text-primary font-light transition-colors">Recreational Soccer</a></li>
                <li><a href="/programs/premier" className="hover:text-primary font-light transition-colors">Premier Soccer</a></li>
                <li><a href="/programs/camps" className="hover:text-primary font-light transition-colors">Camps & Clinics</a></li>
                <li><a href="/teams" className="hover:text-primary font-light transition-colors">Teams</a></li>
                <li><a href="/schedule" className="hover:text-primary font-light transition-colors">Schedule</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-xl font-serif font-normal text-white mb-6 pb-2 relative after:absolute after:w-16 after:h-px after:bg-primary/40 after:bottom-0 after:left-0">Resources</h3>
              <ul className="space-y-3">
                <li><a href="/about" className="hover:text-primary font-light transition-colors">About Us</a></li>
                <li><a href="/news" className="hover:text-primary font-light transition-colors">News & Events</a></li>
                <li><a href="/registration" className="hover:text-primary font-light transition-colors">Registration</a></li>
                <li><a href="/contact" className="hover:text-primary font-light transition-colors">Contact</a></li>
                <li><a href="/privacy-policy" className="hover:text-primary font-light transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xl font-serif font-normal text-white mb-6 pb-2 relative after:absolute after:w-16 after:h-px after:bg-primary/40 after:bottom-0 after:left-0">Contact Us</h3>
              <address className="not-italic font-light">
                <p className="mb-3 flex items-start">
                  <svg className="w-4 h-4 mr-2 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>PO Box 1123<br />Gig Harbor, WA 98335</span>
                </p>
                <p className="mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+12535551234" className="hover:text-primary transition-colors">(253) 555-1234</a>
                </p>
                <p className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:info@harborsoccer.com" className="hover:text-primary transition-colors">info@harborsoccer.com</a>
                </p>
              </address>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="font-light text-gray-400">&copy; {currentYear} Harbor Soccer Club. All rights reserved.</p>
              <div className="mt-4 md:mt-0 font-light text-sm">
                <a href="/privacy-policy" className="hover:text-primary transition-colors mr-6">Privacy Policy</a>
                <a href="/terms" className="hover:text-primary transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full border border-primary/10 opacity-20"></div>
          <div className="absolute top-20 -left-10 w-20 h-20 rounded-full border border-primary/10 opacity-10"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;