import React, { useEffect, useRef } from 'react';

interface ComparisonItemProps {
  tunisiaImage: string;
  tunisiaCaption: string;
  japanImage: string;
  japanCaption: string;
  title: string;
  description: string;
  reverse?: boolean;
}

const ComparisonItem: React.FC<ComparisonItemProps> = ({ 
  tunisiaImage, 
  tunisiaCaption, 
  japanImage, 
  japanCaption, 
  title, 
  description,
  reverse = false
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  
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
    
    if (itemRef.current) {
      observer.observe(itemRef.current);
    }
    
    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={itemRef}
      className={`transition-all duration-700 transform translate-y-10 opacity-0 mb-32 ${
        reverse ? 'md:flex-row-reverse' : ''
      }`}
    >
      <h3 className="text-2xl md:text-3xl font-bold text-indigo-900 mb-4">{title}</h3>
      <p className="text-gray-700 mb-8 max-w-3xl">{description}</p>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="h-64 overflow-hidden">
            <img 
              src={tunisiaImage} 
              alt={`Tunisia - ${title}`}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-1">Tunisia</h4>
            <p className="text-gray-600">{tunisiaCaption}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="h-64 overflow-hidden">
            <img 
              src={japanImage} 
              alt={`Japan - ${title}`}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-1">Japan</h4>
            <p className="text-gray-600">{japanCaption}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ComparisonSection: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  
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
    <section id="comparison" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        <h2 
          ref={titleRef}
          className="text-3xl md:text-4xl font-bold text-center mb-16 transition-all duration-700 transform translate-y-10 opacity-0"
        >
          Parallel Lives, Different Worlds
        </h2>
        
        <ComparisonItem
          title="Education & Learning"
          description="Despite different educational systems and technologies, students in both countries share a passion for knowledge and growth."
          tunisiaImage="https://images.pexels.com/photos/8471829/pexels-photo-8471829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          tunisiaCaption="Learning in classrooms with limited technology, yet with dedication and creativity."
          japanImage="https://images.pexels.com/photos/5212700/pexels-photo-5212700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          japanCaption="High-tech facilities support education, but human connection remains essential."
        />
        
        <ComparisonItem
          title="Community & Connection"
          description="The ways we build community may differ, but the desire for belonging and connection is universal."
          tunisiaImage="https://images.pexels.com/photos/7210754/pexels-photo-7210754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          tunisiaCaption="Traditional gatherings and shared meals bring people together."
          japanImage="https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          japanCaption="Urban spaces are designed for connection despite technological isolation."
          reverse={true}
        />
        
        <ComparisonItem
          title="Dreams & Aspirations"
          description="Youth in both countries share the same fundamental hopes for their future, regardless of technological advantages."
          tunisiaImage="https://images.pexels.com/photos/3771836/pexels-photo-3771836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          tunisiaCaption="Creating opportunities with determination and imagination."
          japanImage="https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          japanCaption="Blending tradition with innovation to shape the future."
        />
      </div>
    </section>
  );
};

export default ComparisonSection;