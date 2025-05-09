import Link from 'next/link';

export const metadata = {
  title: "Registration | Harbor Soccer Club",
  description: "Register for Harbor Soccer Club's recreational and premier programs. Information about registration dates, fees, and requirements.",
};

export default function RegistrationPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative bg-blue-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Registration</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Join Harbor Soccer Club for the upcoming season
          </p>
        </div>
      </section>

      {/* Current Registration Status */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Fall 2025 Registration is Now Open!
                </h2>
                <p className="mt-1 text-gray-700">
                  Registration for our Fall 2025 season is now open for all age groups from U5 through U19.
                  Early bird discounts available until June 15, 2025.
                </p>
                <div className="mt-3">
                  <a 
                    href="#register-now" 
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md inline-flex items-center"
                  >
                    Register Now
                    <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Information */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Registration Information</h2>
            
            <div className="space-y-8">
              {/* Programs */}
              <div>
                <h3 className="text-2xl font-bold mb-4">Our Programs</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="text-xl font-bold mb-2">Recreational Soccer</h4>
                    <p className="text-gray-600 mb-4">
                      For players of all skill levels focusing on fun, participation, and basic skills development.
                    </p>
                    <ul className="mb-4 space-y-2">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-600 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Ages 5-19 (U6 to U19)</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-600 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Fall & Spring seasons</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-600 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Volunteer coaches</span>
                      </li>
                    </ul>
                    <Link 
                      href="/programs/recreational" 
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Program Details →
                    </Link>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="text-xl font-bold mb-2">Premier Soccer</h4>
                    <p className="text-gray-600 mb-4">
                      For committed players seeking a more competitive environment with professional coaching.
                    </p>
                    <ul className="mb-4 space-y-2">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-600 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Ages 10-19 (U11 to U19)</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-600 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Year-round program</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-600 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Licensed professional coaches</span>
                      </li>
                    </ul>
                    <Link 
                      href="/programs/premier" 
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Program Details →
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Registration Dates */}
              <div>
                <h3 className="text-2xl font-bold mb-4">Registration Dates</h3>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-bold mb-2">Fall 2025 Season</h4>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <p className="font-semibold text-gray-700">Early Bird Registration:</p>
                          <p className="text-gray-600">May 1 - June 15, 2025</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700">Regular Registration:</p>
                          <p className="text-gray-600">June 16 - July 31, 2025</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700">Late Registration:</p>
                          <p className="text-gray-600">August 1 - August 15, 2025</p>
                          <p className="text-sm text-gray-500">(Late fee applies)</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700">Season Dates:</p>
                          <p className="text-gray-600">September 7 - November 16, 2025</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-bold mb-2">Spring 2026 Season</h4>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <p className="font-semibold text-gray-700">Early Bird Registration:</p>
                          <p className="text-gray-600">January 2 - January 31, 2026</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700">Regular Registration:</p>
                          <p className="text-gray-600">February 1 - February 28, 2026</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700">Season Dates:</p>
                          <p className="text-gray-600">March 28 - June 6, 2026</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Registration Fees */}
              <div>
                <h3 className="text-2xl font-bold mb-4">Registration Fees</h3>
                <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-3 border">Program</th>
                        <th className="px-4 py-3 border">Age Group</th>
                        <th className="px-4 py-3 border">Early Bird</th>
                        <th className="px-4 py-3 border">Regular</th>
                        <th className="px-4 py-3 border">Late</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-4 py-3 font-medium" rowSpan={3}>Recreational</td>
                        <td className="border px-4 py-3">U6-U8</td>
                        <td className="border px-4 py-3">$125</td>
                        <td className="border px-4 py-3">$145</td>
                        <td className="border px-4 py-3">$165</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-3">U9-U12</td>
                        <td className="border px-4 py-3">$145</td>
                        <td className="border px-4 py-3">$165</td>
                        <td className="border px-4 py-3">$185</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-3">U13-U19</td>
                        <td className="border px-4 py-3">$165</td>
                        <td className="border px-4 py-3">$185</td>
                        <td className="border px-4 py-3">$205</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-3 font-medium" rowSpan={2}>Premier</td>
                        <td className="border px-4 py-3">U11-U14</td>
                        <td className="border px-4 py-3" colSpan={3}>$1,200 per year</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-3">U15-U19</td>
                        <td className="border px-4 py-3" colSpan={3}>$1,400 per year</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="mt-4 text-sm text-gray-500">
                    * Premier fees can be paid in installments. Financial assistance is available for qualifying families.
                  </p>
                </div>
              </div>
              
              {/* What You Need to Register */}
              <div>
                <h3 className="text-2xl font-bold mb-4">What You Need to Register</h3>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-600 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700">Player information (name, date of birth, contact details)</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-600 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700">Emergency contact information</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-600 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700">Medical information (allergies, conditions, medications)</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-600 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700">Copy of birth certificate (for new players only)</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-600 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700">Payment method (credit card, check, or financial assistance application)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Register Now Section */}
      <section id="register-now" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Register?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join Harbor Soccer Club and be part of our growing community of young athletes!
          </p>
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-4">Registration Portal</h3>
              <p className="text-gray-600 mb-4">
                Click below to access our secure online registration system.
              </p>
            </div>
            <a
              href="https://registration.harborsoccer.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors"
            >
              Go to Registration Portal
            </a>
          </div>
        </div>
      </section>

      {/* Financial Aid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Financial Assistance</h2>
            <p className="text-gray-700 mb-8">
              Harbor Soccer Club is committed to ensuring that all children have the opportunity to play soccer, regardless of financial circumstances. We offer financial assistance to qualifying families based on need.
            </p>
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-xl font-bold mb-3">How to Apply for Financial Aid</h3>
              <ol className="list-decimal ml-5 space-y-2">
                <li className="text-gray-700">
                  Complete the Financial Aid Application (available on our registration portal)
                </li>
                <li className="text-gray-700">
                  Submit the application along with required documentation
                </li>
                <li className="text-gray-700">
                  Applications will be reviewed by our committee within 2 weeks
                </li>
              </ol>
              <div className="mt-6">
                <Link 
                  href="/registration/financial-aid" 
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Learn More About Financial Aid →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Find answers to common registration questions below. If you need additional help, please contact us.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">What if I miss the registration deadline?</h3>
                <p className="text-gray-600">
                  Late registrations are accepted based on team availability and incur an additional fee. Contact the registrar as soon as possible to check availability.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Can I request a specific team or coach?</h3>
                <p className="text-gray-600">
                  For recreational soccer, you may request to play with one friend or a specific coach, but requests cannot be guaranteed. Premier team placement is based on tryouts and coach selection.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">What is your refund policy?</h3>
                <p className="text-gray-600">
                  Refunds are available before the season starts, minus a $25 processing fee. After the season begins, refunds are prorated based on the number of games played and may include additional deductions for uniforms and equipment.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Do you offer payment plans?</h3>
                <p className="text-gray-600">
                  Yes, payment plans are available for both recreational and premier programs. Options are available during the registration process.
                </p>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <Link 
                href="/contact" 
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors inline-block"
              >
                Still Have Questions? Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}