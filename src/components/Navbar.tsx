import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className={`text-xl font-bold ${isScrolled ? 'text-indigo-900' : 'text-white'}`}>
                Beyond Technology
              </span>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button 
                onClick={() => scrollToSection('hero')} 
                className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-indigo-500 px-3 py-2 rounded-md text-sm font-medium transition-colors`}
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('comparison')} 
                className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-indigo-500 px-3 py-2 rounded-md text-sm font-medium transition-colors`}
              >
                Comparisons
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')} 
                className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-indigo-500 px-3 py-2 rounded-md text-sm font-medium transition-colors`}
              >
                Testimonials
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-indigo-500 px-3 py-2 rounded-md text-sm font-medium transition-colors`}
              >
                About
              </button>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isScrolled ? 'text-gray-800' : 'text-white'
              } hover:text-indigo-500 focus:outline-none`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-gray-800 hover:text-indigo-500 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('comparison')}
              className="text-gray-800 hover:text-indigo-500 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              Comparisons
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-gray-800 hover:text-indigo-500 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-800 hover:text-indigo-500 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              About
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;