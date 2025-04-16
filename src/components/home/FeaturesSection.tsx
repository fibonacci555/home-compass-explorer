
import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Home, DollarSign, Clock, Zap, Users, Shield } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => (
  <motion.div
    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
  >
    <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-5 text-blue-600 dark:text-blue-400">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </motion.div>
);

export default function FeaturesSection({ featuresRef, featuresInView }: { featuresRef: React.RefObject<HTMLDivElement>, featuresInView: boolean }) {
  const features = [
    {
      icon: <Search className="h-6 w-6" />,
      title: "Smart Property Search",
      description: "Our AI-powered search understands your preferences and shows properties that match your unique needs.",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Interactive Map View",
      description: "Explore neighborhoods and properties visually with our interactive map to find the perfect location.",
    },
    {
      icon: <Home className="h-6 w-6" />,
      title: "Virtual Tours",
      description: "Take virtual 3D tours of properties from the comfort of your home before scheduling an in-person visit.",
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Price Insights",
      description: "Get detailed price history and comparisons to make informed decisions about property value.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Real-time Updates",
      description: "Receive instant notifications about new properties that match your saved search criteria.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Fast Communication",
      description: "Connect directly with property agents through our platform for quick responses to your questions.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Agent Matching",
      description: "We'll match you with the perfect agent based on your needs, property type, and location preferences.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure Transactions",
      description: "Our platform ensures your personal information and transactions are secure and protected.",
    },
  ];

  return (
    <motion.section
      ref={featuresRef}
      className="py-20 bg-gray-50 dark:bg-gray-900"
      initial={{ opacity: 0 }}
      animate={featuresInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            How We Make Property Hunting Easy
          </motion.h2>
          <motion.p
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover the tools and features that make finding your dream property simple and enjoyable
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={0.1 * (index + 1)}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
