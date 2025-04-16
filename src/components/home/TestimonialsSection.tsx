
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  image: string;
  stars: number;
  index: number;
}

const Testimonial = ({ name, role, content, image, stars, index }: TestimonialProps) => (
  <motion.div
    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1 * index }}
    viewport={{ once: true }}
  >
    <div className="flex gap-4 items-center mb-4">
      <img 
        src={image} 
        alt={name} 
        className="w-14 h-14 rounded-full object-cover border-2 border-blue-100 dark:border-blue-900" 
      />
      <div>
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h4>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{role}</p>
      </div>
    </div>
    
    <div className="flex mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star 
          key={i} 
          className={`h-4 w-4 ${i < stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
        />
      ))}
    </div>
    
    <p className="text-gray-700 dark:text-gray-300 italic">{content}</p>
  </motion.div>
);

export default function TestimonialsSection({ testimonialsRef, testimonialsInView }: { testimonialsRef: React.RefObject<HTMLDivElement>, testimonialsInView: boolean }) {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "First-time Homebuyer",
      content: "Estate made finding my first home so simple. The interactive search helped me narrow down exactly what I wanted, and I found my dream property in just two weeks!",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3",
      stars: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Property Investor",
      content: "As someone who regularly looks for investment properties, Estate's map view and price insights save me hours of research time. Highly recommended for serious investors.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3",
      stars: 5
    },
    {
      name: "Jennifer Lee",
      role: "Real Estate Agent",
      content: "My clients love the virtual tours and quick response features. Estate has transformed how I showcase properties and connect with potential buyers.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2961&auto=format&fit=crop&ixlib=rb-4.0.3",
      stars: 4
    },
    {
      name: "David Thompson",
      role: "Relocated for Work",
      content: "When I had to relocate for work, Estate helped me find and secure a property remotely. The virtual tours and agent matching were game-changers.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3",
      stars: 5
    }
  ];

  return (
    <motion.section
      ref={testimonialsRef}
      className="py-20 bg-white dark:bg-gray-800"
      initial={{ opacity: 0 }}
      animate={testimonialsInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            What Our Users Say
          </motion.h2>
          <motion.p
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join thousands of satisfied users who found their perfect property using our platform
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              content={testimonial.content}
              image={testimonial.image}
              stars={testimonial.stars}
              index={index}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
