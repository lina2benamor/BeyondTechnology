import React, { useEffect, useRef, useState } from 'react';

interface Testimonial {
  id: number;
  name: string;
  country: string;
  age: number;
  quote: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Amina",
    country: "Tunisia",
    age: 19,
    quote: "Technology is just a tool. What matters is how we use it to connect with others and create meaning in our lives.",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 2,
    name: "Hiroshi",
    country: "Japan",
    age: 20,
    quote: "Despite all our advanced technology, I still find the most joy in simple moments with friends and family.",
    image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 3,
    name: "Youssef",
    country: "Tunisia",
    age: 21,
    quote: "What I dream about isn't so different from what young people dream about anywhere else. We all want to create a better future.",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 4,
    name: "Sakura",
    country: "Japan",
    age: 18,
    quote: "Technology changes quickly, but human emotions and connections remain the same across generations and cultures.",
    image: "https://images.pexels.com/photos/1898555/pexels-photo-1898555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];

const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('translate-y-10', 'opacity-0');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section 
      id="testimonials" 
      className="py-20 bg-indigo-900 text-white"
      style={{
        backgroundImage: 'linear-gradient(rgba(49, 46, 129, 0.9), rgba(49, 46, 129, 0.9)), url("https://images.pexels.com/photos/1500463/pexels-photo-1500463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div 
        ref={sectionRef}
        className="container mx-auto px-6 md:px-12 transition-all duration-700 transform translate-y-10 opacity-0"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Voices Across Continents
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative h-[480px] md:h-[360px]">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`absolute w-full transition-all duration-700 transform ${
                  index === activeIndex 
                    ? 'opacity-100 translate-x-0' 
                    : index < activeIndex 
                      ? 'opacity-0 -translate-x-full' 
                      : 'opacity-0 translate-x-full'
                }`}
              >
                <div className="flex flex-col md:flex-row bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl">
                  <div className="md:w-1/3 h-64 md:h-auto">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-8 flex flex-col justify-center">
                    <p className="text-lg md:text-xl italic mb-6">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-semibold text-xl">{testimonial.name}, {testimonial.age}</p>
                      <p className="text-indigo-200">{testimonial.country}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'bg-white scale-125' : 'bg-white/40'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;