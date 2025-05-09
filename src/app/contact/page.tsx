'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // This would be replaced with an actual form submission in a production environment
    // For example, using an API route: await fetch('/api/contact', {method: 'POST', body: JSON.stringify(formData)})
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen font-serif">
      {/* Header */}
      <section className="relative bg-secondary py-24">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full border border-white/20"></div>
          <div className="absolute bottom-1/4 left-1/4 w-24 h-24 rounded-full border border-white/30"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-serif font-light text-white mb-4 tracking-wide">Contact Us</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto font-light italic">
            Have questions or need information? We&apos;re here to help!
          </p>
        </div>
      </section>

      {/* Contact Information and Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-serif font-normal mb-8 relative inline-block after:absolute after:w-1/2 after:h-px after:bg-primary/40 after:-bottom-2 after:left-0">Get in Touch</h2>
              <p className="text-gray-600 mb-10 font-light">
                We&apos;re always happy to hear from players, parents, coaches, and community members. 
                Please reach out with any questions about our programs, registration, fields, or volunteering opportunities.
              </p>

              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-gray-50 p-3 mr-5">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg mb-2">Phone</h3>
                    <p className="text-gray-600 font-light">(253) 555-1234</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gray-50 p-3 mr-5">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg mb-2">Email</h3>
                    <p className="text-gray-600 font-light">info@harborsoccer.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gray-50 p-3 mr-5">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg mb-2">Mailing Address</h3>
                    <p className="text-gray-600 font-light">PO Box 1123<br />Gig Harbor, WA 98335</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="font-serif text-lg mb-5">Office Hours</h3>
                <div className="bg-gray-50 p-6 border-l-2 border-primary/20">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <h4 className="font-serif">Monday - Friday</h4>
                      <p className="text-gray-600 font-light">9:00 AM - 5:00 PM</p>
                    </div>
                    <div>
                      <h4 className="font-serif">Saturday</h4>
                      <p className="text-gray-600 font-light">10:00 AM - 2:00 PM</p>
                    </div>
                    <div className="col-span-2">
                      <h4 className="font-serif">Sunday</h4>
                      <p className="text-gray-600 font-light">Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 shadow-sm border-t border-primary/20">
              <h2 className="text-2xl font-serif font-normal mb-8 relative inline-block after:absolute after:w-1/2 after:h-px after:bg-primary/40 after:-bottom-2 after:left-0">Send Us a Message</h2>
              
              {isSubmitted ? (
                <div className="bg-green-50 border-l-2 border-primary/30 text-green-800 p-6 text-center">
                  <svg className="h-12 w-12 text-primary mx-auto mb-4 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-serif mb-3">Thank You!</h3>
                  <p className="mb-5 font-light">Your message has been sent successfully. We&apos;ll get back to you soon.</p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-primary/90 hover:bg-primary text-white font-normal py-2 px-5 border-b border-white/20 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 mb-2 font-light">Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-200 focus:outline-none focus:border-primary/50 bg-gray-50/50 font-light"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-700 mb-2 font-light">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-200 focus:outline-none focus:border-primary/50 bg-gray-50/50 font-light"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-gray-700 mb-2 font-light">Phone (Optional)</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-200 focus:outline-none focus:border-primary/50 bg-gray-50/50 font-light"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-gray-700 mb-2 font-light">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-200 focus:outline-none focus:border-primary/50 bg-gray-50/50 font-light"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Registration Question">Registration Question</option>
                      <option value="Coaching Information">Coaching Information</option>
                      <option value="Volunteer Opportunities">Volunteer Opportunities</option>
                      <option value="Sponsorship">Sponsorship</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-700 mb-2 font-light">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-200 focus:outline-none focus:border-primary/50 bg-gray-50/50 font-light min-h-[150px]"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary/90 hover:bg-primary text-white font-normal py-3 px-6 transition-colors border-b border-white/20 flex items-center justify-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="soccer-ball-spin mr-3"></div>
                        <span className="font-light">Sending...</span>
                      </>
                    ) : (
                      <span className="font-normal">Send Message</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-normal mb-3 tracking-wide">Find Our Fields</h2>
          <div className="w-24 h-0.5 bg-primary/40 mx-auto mb-12"></div>
          
          <div className="bg-gray-200 w-full h-[400px] flex items-center justify-center">
            <div className="text-center">
              <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-gray-500 font-light italic">Map would be embedded here in a production environment</p>
            </div>
          </div>
          
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-sm p-6 border-t border-primary/20">
              <h3 className="text-xl font-serif mb-3 text-secondary">Gig Harbor High School</h3>
              <p className="text-gray-600 font-light">5101 Rosedale St NW<br />Gig Harbor, WA 98335</p>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-primary hover:underline hover-underline">
                Get Directions →
              </a>
            </div>
            
            <div className="bg-white shadow-sm p-6 border-t border-primary/20">
              <h3 className="text-xl font-serif mb-3 text-secondary">Peninsula High School</h3>
              <p className="text-gray-600 font-light">14105 Purdy Dr NW<br />Gig Harbor, WA 98332</p>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-primary hover:underline hover-underline">
                Get Directions →
              </a>
            </div>
            
            <div className="bg-white shadow-sm p-6 border-t border-primary/20">
              <h3 className="text-xl font-serif mb-3 text-secondary">Sehmel Homestead Park</h3>
              <p className="text-gray-600 font-light">10123 78th Ave NW<br />Gig Harbor, WA 98332</p>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-primary hover:underline hover-underline">
                Get Directions →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute opacity-5 -top-20 -right-20 w-60 h-60 rounded-full border border-primary"></div>
        <div className="absolute opacity-5 -bottom-10 -left-10 w-40 h-40 rounded-full border border-primary"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-normal mb-3 tracking-wide">Frequently Asked Questions</h2>
            <div className="w-24 h-0.5 bg-primary/40 mx-auto mb-5"></div>
            <p className="text-gray-600 max-w-2xl mx-auto font-light italic">
              Find quick answers to common questions, or contact us if you need more information.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 p-6 border-l-2 border-primary/20">
              <h3 className="text-xl font-serif mb-3 text-secondary">When does registration open for the next season?</h3>
              <p className="text-gray-600 font-light">Registration for the Fall season typically opens in May, and Spring registration opens in January. Check our registration page or news section for exact dates.</p>
            </div>
            
            <div className="bg-gray-50 p-6 border-l-2 border-primary/20">
              <h3 className="text-xl font-serif mb-3 text-secondary">How do I become a volunteer coach?</h3>
              <p className="text-gray-600 font-light">We&apos;re always looking for volunteer coaches! Contact our coaching director or fill out our volunteer form to get started. All coaches must complete a background check and required training.</p>
            </div>
            
            <div className="bg-gray-50 p-6 border-l-2 border-primary/20">
              <h3 className="text-xl font-serif mb-3 text-secondary">What&apos;s the difference between recreational and premier programs?</h3>
              <p className="text-gray-600 font-light">Recreational soccer focuses on fun, participation, and basic skills for all levels. Premier is more competitive, with professional coaching and a higher commitment level. Visit our programs pages for more details.</p>
            </div>
            
            <div className="text-center mt-12">
              <Link href="/faq" className="text-primary hover-underline font-normal">
                View All FAQs →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}