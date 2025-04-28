import React, { useEffect, useState } from 'react';

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url("https://images.pexels.com/photos/1670187/pexels-photo-1670187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
        <div 
          className={`transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Beyond Technology: <span className="block mt-2 text-indigo-300">A Shared Humanity</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed">
            Across oceans and cultures, the dreams and aspirations of youth unite us all.
            Discover the universal thread of humanity connecting Tunisia and Japan.
          </p>
          
          <button 
            onClick={() => {
              document.getElementById('comparison')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-indigo-600 text-white font-medium rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-300"
          >
            Explore Our Stories
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 text-center">
        <div className="animate-bounce mx-auto w-8 h-12">
          <svg 
            className="w-full h-full text-white opacity-70" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            ></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;