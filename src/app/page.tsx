import { Link } from 'react-router-dom'; // Changed from next/link

export default function Home() {
  return (
    <div className="min-h-screen font-serif">
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        {/* Elegant Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/70 via-secondary/50 to-secondary/30 z-10"></div>
        {/* Soccer Field Background */}
        <div className="absolute inset-0 bg-secondary">
          {/* Subtle Decorative Elements */}
          <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full border border-white/20 opacity-30"></div>
          <div className="absolute bottom-1/4 left-1/4 w-24 h-24 rounded-full border border-white/30 opacity-30"></div>
        </div>
        <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-6xl font-serif font-light mb-4 tracking-wide">Harbor Soccer Club</h1>
            <p className="text-xl md:text-2xl mb-8 font-light italic">Developing youth through the beautiful game since 1982</p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/registration" 
                className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-normal rounded-none transition-colors border-b-2 border-white/20"
              >
                Register Now
              </Link>
              <Link 
                to="/about" 
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-normal rounded-none transition-colors border border-white/30"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Elegant Decorative Elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full border border-primary/5 opacity-50"></div>
        <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full border border-primary/5 opacity-50"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-center mb-3">Our Programs</h2>
          <div className="w-24 h-0.5 bg-primary/40 mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Recreational Program */}
            <div className="bg-gray-50 rounded-none overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border-t border-primary/40">
              <div className="h-56 relative bg-primary/90 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    <path d="M13 5.07v14l6-7zM7 5.07l-6 7 6 7z"/>
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif mb-2 text-secondary">Recreational Soccer</h3>
                <p className="text-gray-600 mb-4 font-light">Fun, inclusive soccer for all skill levels. Focus on player development and enjoyment of the game.</p>
                <Link 
                  to="/programs/recreational" 
                  className="text-primary hover:underline font-normal flex items-center"
                >
                  <span>Learn More</span>
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Premier Program */}
            <div className="bg-gray-50 rounded-none overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border-t border-primary/40">
              <div className="h-56 relative bg-secondary overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v5.7c0 4.83-3.4 9.36-7 10.18-3.6-.82-7-5.35-7-10.18v-5.7l7-3.12z"/>
                    <path d="M10.5 13.59l6.3-6.3-1.4-1.42-4.9 4.9-2.1-2.1L7 10.09l3.5 3.5z"/>
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif mb-2 text-secondary">Premier Soccer</h3>
                <p className="text-gray-600 mb-4 font-light">Competitive soccer for dedicated players. Professional coaching and advanced skill development.</p>
                <Link 
                  to="/programs/premier" 
                  className="text-primary hover:underline font-normal flex items-center"
                >
                  <span>Learn More</span>
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Camps & Clinics */}
            <div className="bg-gray-50 rounded-none overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border-t border-primary/40">
              <div className="h-56 relative bg-primary/90 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
                    <path d="M7 17h10v-2H7v2zm0-4h10v-2H7v2zm0-4h10V7H7v2z"/>
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif mb-2 text-secondary">Camps & Clinics</h3>
                <p className="text-gray-600 mb-4 font-light">Seasonal camps and specialized training clinics for players looking to enhance specific skills.</p>
                <Link 
                  to="/programs/camps" 
                  className="text-primary hover:underline font-normal flex items-center"
                >
                  <span>Learn More</span>
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News & Announcements */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Elegant ball pattern */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full border border-primary/5"></div>
          <div className="absolute bottom-20 right-20 w-36 h-36 rounded-full border border-primary/5"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-center mb-3">Latest News</h2>
          <div className="w-24 h-0.5 bg-primary/40 mx-auto mb-4"></div>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto font-light italic">Stay up to date with the latest happenings at Harbor Soccer Club</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* News Item 1 */}
            <div className="bg-white rounded-none overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border-t border-primary/40">
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2 font-light">May 1, 2025</p>
                <h3 className="text-xl font-serif mb-2 text-secondary">Fall Registration Now Open</h3>
                <p className="text-gray-600 mb-4 font-light">Registration for our Fall 2025 season is now open for all age groups. Register early to secure your spot!</p>
                <Link to="/news/fall-registration" className="text-primary hover:underline font-normal flex items-center">
                  <span>Read More</span>
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* News Item 2 */}
            <div className="bg-white rounded-none overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border-t border-primary/40">
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2 font-light">April 25, 2025</p>
                <h3 className="text-xl font-serif mb-2 text-secondary">Summer Camp Schedule Released</h3>
                <p className="text-gray-600 mb-4 font-light">Our summer camp schedule is now available! Multiple sessions available for all age groups.</p>
                <Link to="/news/summer-camps" className="text-primary hover:underline font-normal flex items-center">
                  <span>Read More</span>
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* News Item 3 */}
            <div className="bg-white rounded-none overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border-t border-primary/40">
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2 font-light">April 15, 2025</p>
                <h3 className="text-xl font-serif mb-2 text-secondary">Harbor United Wins State Cup</h3>
                <p className="text-gray-600 mb-4 font-light">Congratulations to our Harbor United U16 team for winning the State Cup championship!</p>
                <Link to="/news/state-cup-champions" className="text-primary hover:underline font-normal flex items-center">
                  <span>Read More</span>
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/news" 
              className="px-6 py-3 bg-primary/90 hover:bg-primary text-white font-normal rounded-none transition-colors inline-block border-b border-white/20"
            >
              View All News
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-secondary text-white relative overflow-hidden">
        {/* Elegant field lines */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white/5 transform -translate-y-1/2"></div>
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/5 transform -translate-x-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full border border-white/5 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif font-light mb-6">Join Harbor Soccer Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto font-light italic">Be part of our community and experience the joy of soccer in a supportive environment</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/registration" 
              className="px-6 py-3 bg-primary/90 hover:bg-primary text-white font-normal rounded-none transition-colors border-b border-white/20"
            >
              Register Now
            </Link>
            <Link 
              to="/contact" 
              className="px-6 py-3 border border-white hover:bg-white/5 text-white font-normal rounded-none transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-gray-50 border-b border-primary/40 transition-transform duration-300">
              <p className="text-4xl font-serif text-primary font-light">40+</p>
              <p className="text-gray-600 mt-2 font-light">Years of Experience</p>
            </div>
            <div className="p-6 bg-gray-50 border-b border-primary/40 transition-transform duration-300">
              <p className="text-4xl font-serif text-primary font-light">1,500+</p>
              <p className="text-gray-600 mt-2 font-light">Youth Players</p>
            </div>
            <div className="p-6 bg-gray-50 border-b border-primary/40 transition-transform duration-300">
              <p className="text-4xl font-serif text-primary font-light">100+</p>
              <p className="text-gray-600 mt-2 font-light">Volunteer Coaches</p>
            </div>
            <div className="p-6 bg-gray-50 border-b border-primary/40 transition-transform duration-300">
              <p className="text-4xl font-serif text-primary font-light">20+</p>
              <p className="text-gray-600 mt-2 font-light">Soccer Fields</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}