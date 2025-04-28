import React, { useEffect, useRef } from 'react';
import { Heart, Users, Award } from 'lucide-react';

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const ValueCard: React.FC<ValueCardProps> = ({ icon, title, description, delay }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('opacity-100');
              entry.target.classList.remove('translate-y-8', 'opacity-0');
            }, delay);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);
  
  return (
    <div 
      ref={cardRef}
      className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform translate-y-8 opacity-0 hover:-translate-y-1"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-6 text-indigo-700">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const AboutSection: React.FC = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  
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
    
    if (titleRef.current) {
      observer.observe(titleRef.current);
    }
    
    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);
  
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div 
          ref={titleRef}
          className="max-w-3xl mx-auto text-center mb-16 transition-all duration-700 transform translate-y-10 opacity-0"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Beyond Technology: What Truly Connects Us
          </h2>
          <p className="text-xl text-gray-600">
            True progress isn't measured by technological advancement alone, but by the depth of our shared humanity and connection.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <ValueCard 
            icon={<Heart size={32} />} 
            title="Shared Emotions" 
            description="Across different cultures and technological landscapes, we all experience the same core human emotions: joy, hope, love, and ambition."
            delay={0}
          />
          
          <ValueCard 
            icon={<Users size={32} />} 
            title="Universal Connections" 
            description="The desire to form meaningful connections with others is fundamental to the human experience, regardless of the tools we use."
            delay={200}
          />
          
          <ValueCard 
            icon={<Award size={32} />} 
            title="Common Aspirations" 
            description="Young people everywhere share dreams of making an impact, finding purpose, and creating a better future for themselves and others."
            delay={400}
          />
        </div>
        
        <div className="mt-20 max-w-4xl mx-auto bg-indigo-50 rounded-2xl p-8 md:p-12 shadow-md">
          <h3 className="text-2xl font-bold text-indigo-900 mb-6 text-center">Our Message</h3>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            This project was created to highlight that while technological advancement varies greatly between Tunisia and Japan, the fundamental human experiences of young people remain remarkably similar. Through our videos and stories, we aim to show that true connection transcends technological gaps.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            By recognizing our shared humanity, we can build bridges across cultural and technological divides, fostering understanding and cooperation in an increasingly complex world.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;