import { Link } from 'react-router-dom'; // Changed from next/link

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="relative bg-blue-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Harbor Soccer Club</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">A community-focused soccer organization dedicated to developing youth players since 1982</p>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse lg:flex-row gap-8 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Harbor Soccer Club was established in 1982 by a group of passionate soccer parents and coaches who wanted to create a positive environment for youth soccer in the Gig Harbor community. What started as a small recreational program with just a few teams has grown into one of the premier soccer organizations in the South Puget Sound region.
              </p>
              <p className="text-gray-700 mb-4">
                Over the past four decades, Harbor Soccer Club has evolved to serve players of all ages and abilities, from recreational players enjoying the game for fun to premier players competing at the highest levels of youth soccer. Throughout this growth, we&apos;ve maintained our commitment to developing not just better soccer players, but better people.
              </p>
              <p className="text-gray-700">
                Today, Harbor Soccer Club proudly serves over 1,500 youth players annually across recreational and premier programs, providing opportunities for all children to experience the joy and benefits of the beautiful game.
              </p>
            </div>
            <div className="lg:w-1/2 flex justify-center mb-8 lg:mb-0">
              <div className="relative w-full max-w-md aspect-square rounded-lg overflow-hidden shadow-lg bg-gray-300">
                <div className="absolute inset-0 bg-blue-800 flex items-center justify-center">
                  <svg className="w-32 h-32 text-white/30" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm3 7H9v-2h6v2z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Mission & Vision</h2>
            <p className="text-gray-700 text-lg">
              We strive to create an environment where players of all abilities can develop their skills, build character, and develop a lifelong love for soccer.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <div className="bg-blue-600 p-3 rounded-full mr-4">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Our Mission</h3>
              </div>
              <p className="text-gray-700">
                Harbor Soccer Club is committed to providing a positive soccer experience for all players. We focus on developing technical skills, tactical awareness, physical fitness, and good sportsmanship in a safe and supportive environment.
              </p>
              <ul className="mt-6 space-y-2">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Develop players&apos; soccer skills at all levels</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Build character and foster sportsmanship</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Create a positive and inclusive community</span>
                </li>
              </ul>
            </div>
            
            {/* Vision */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <div className="bg-blue-600 p-3 rounded-full mr-4">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Our Vision</h3>
              </div>
              <p className="text-gray-700">
                We aspire to be the premier soccer organization in the South Puget Sound, recognized for excellence in player development, quality coaching, and strong community engagement. We envision a club where:
              </p>
              <ul className="mt-6 space-y-2">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Every child has the opportunity to play and enjoy soccer</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Players develop to their full potential, on and off the field</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Families feel welcome, informed, and valued</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Board & Staff */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Leadership</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Board Member 1 */}
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden relative">
                <div className="absolute inset-0 bg-blue-700 flex items-center justify-center">
                  <svg className="h-12 w-12 text-white/50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1">Sarah Johnson</h3>
              <p className="text-blue-600 font-medium mb-3">President</p>
              <p className="text-gray-600">Leading Harbor Soccer Club since 2020 with over 15 years of soccer coaching and administration experience.</p>
            </div>
            
            {/* Board Member 2 */}
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden relative">
                <div className="absolute inset-0 bg-blue-700 flex items-center justify-center">
                  <svg className="h-12 w-12 text-white/50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1">Michael Rodriguez</h3>
              <p className="text-blue-600 font-medium mb-3">Vice President</p>
              <p className="text-gray-600">Former collegiate player with a passion for youth development and community engagement.</p>
            </div>
            
            {/* Board Member 3 */}
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden relative">
                <div className="absolute inset-0 bg-blue-700 flex items-center justify-center">
                  <svg className="h-12 w-12 text-white/50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1">Jennifer Yang</h3>
              <p className="text-blue-600 font-medium mb-3">Treasurer</p>
              <p className="text-gray-600">Financial expert with a background in nonprofit management and a parent of two Harbor Soccer players.</p>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <Link
              to="/about/staff"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Meet Our Team →
            </Link>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Be part of Harbor Soccer Club&apos;s rich history and bright future. Register today for our upcoming season!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/registration"
              className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-md hover:bg-gray-100 transition-colors"
            >
              Register Now
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 border border-white text-white font-semibold rounded-md hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}