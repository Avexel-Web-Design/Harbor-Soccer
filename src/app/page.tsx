import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen font-serif">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        {/* Elegant Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/70 via-secondary/50 to-secondary/30 z-10"></div>
        {/* Soccer Field Background */}
        <div className="absolute inset-0 bg-secondary">
          {/* Subtle Decorative Elements */}
          <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full border border-white/20 opacity-30"></div>
          <div className="absolute bottom-1/4 left-1/4 w-24 h-24 rounded-full border border-white/30 opacity-30"></div>
        </div>
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl md:text-6xl font-serif font-light mb-4 tracking-wide">Welcome to Harbor Soccer, Inc.</h1>
          <p className="text-lg md:text-xl mb-8 font-light max-w-2xl">
            The mission of Harbor Soccer, Inc. is to promote the game of soccer and enhance each child’s skill development. 
            Harbor Soccer, Inc. will promote fair play in a fun, safe and recreational environment while encouraging the 
            development of camaraderie, encouragement of teamwork, and nurturing the skills of each individual player.
          </p>
          <p className="text-md md:text-lg mb-8 font-light max-w-2xl italic">
            Harbor Soccer, Inc. (HSI) is the governing board, which serves to organize and oversee soccer teams in the Harbor Springs area.
          </p>
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
      </section>

      {/* Members Of Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-light text-secondary mb-3">We Are Members Of:</h2>
          <div className="w-20 h-0.5 bg-primary/40 mx-auto mb-8"></div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center">
            <a href="https://www.nmsa.net/" target="_blank" rel="noopener noreferrer" className="text-lg text-primary hover:underline">
              Northern Michigan Soccer Alliance (NMSA)
            </a>
            <a href="https://www.michiganyouthsoccer.org/" target="_blank" rel="noopener noreferrer" className="text-lg text-primary hover:underline">
              Michigan State Youth Soccer Association (MSYSA)
            </a>
          </div>
        </div>
      </section>

      {/* Meet the Board Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-center mb-3 text-secondary">Meet the Board</h2>
          <div className="w-24 h-0.5 bg-primary/40 mx-auto mb-12"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-gray-50 border-t border-primary/40">
              <h3 className="text-xl font-serif text-primary mb-1">Ashley Price</h3>
              <p className="text-gray-600 font-light">President</p>
            </div>
            <div className="p-6 bg-gray-50 border-t border-primary/40">
              <h3 className="text-xl font-serif text-primary mb-1">Kyle Kughn</h3>
              <p className="text-gray-600 font-light">Facilities</p>
            </div>
            <div className="p-6 bg-gray-50 border-t border-primary/40">
              <h3 className="text-xl font-serif text-primary mb-1">Robert Latimer</h3>
              <p className="text-gray-600 font-light">Treasurer</p>
            </div>
            <div className="p-6 bg-gray-50 border-t border-primary/40">
              <h3 className="text-xl font-serif text-primary mb-1">Ashley Brainerd</h3>
              <p className="text-gray-600 font-light">Registrar</p>
            </div>
            <div className="p-6 bg-gray-50 border-t border-primary/40">
              <h3 className="text-xl font-serif text-primary mb-1">Madelaine McShannock</h3>
              <p className="text-gray-600 font-light">Rec Soccer Coordinator</p>
            </div>
          </div>
          <p className="text-center text-gray-700 mt-8 font-light italic text-lg">
            *We are looking for a new Vice President and Secretary*
          </p>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-center mb-3 text-secondary">Contact Us</h2>
          <div className="w-24 h-0.5 bg-primary/40 mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-xl font-serif text-primary mb-2">Mail</h3>
              <p className="text-gray-600 font-light">Harbor Soccer, Inc.</p>
              <p className="text-gray-600 font-light">PO Box 223</p>
              <p className="text-gray-600 font-light">Harbor Springs, MI 49740</p>
            </div>
            <div>
              <h3 className="text-xl font-serif text-primary mb-2">Email</h3>
              <p className="text-gray-600 font-light">New Email Coming Soon</p>
            </div>
            <div>
              <h3 className="text-xl font-serif text-primary mb-2">Location</h3>
              <p className="text-gray-600 font-light">2943 Quick Road,</p>
              <p className="text-gray-600 font-light">Harbor Springs, MI 49740</p>
              <p className="text-gray-600 font-light italic">(At the Intersection of Quick Road and Hoyt Road)</p>
            </div>
          </div>
           <div className="text-center mt-8">
              <h3 className="text-xl font-serif text-primary mb-2">Facebook</h3>
              <p className="text-gray-600 font-light">New Account Coming Soon</p>
            </div>
        </div>
      </section>
    </div>
  );
}