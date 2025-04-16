
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Bed, Bath, Square, MapPin, Calendar, DollarSign, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import { properties } from '@/data/properties';

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    setLoading(true);
    
    // Find the property by ID
    const foundProperty = properties.find(p => p.id === parseInt(id));
    
    // Simulate a delay to show loading state
    const timer = setTimeout(() => {
      if (foundProperty) {
        setProperty(foundProperty);
        setLoading(false);
      } else {
        toast.error("Property not found");
        setLoading(false);
      }
    }, 600);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-5xl mx-auto">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
              <div className="h-[400px] bg-gray-200 rounded-xl mb-8"></div>
              <div className="flex gap-6">
                <div className="w-2/3">
                  <div className="h-8 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-full mb-6"></div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-20 bg-gray-200 rounded"></div>
                    <div className="h-20 bg-gray-200 rounded"></div>
                    <div className="h-20 bg-gray-200 rounded"></div>
                  </div>
                </div>
                <div className="w-1/3">
                  <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-12 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
          <p className="mb-8">The property you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/properties">Back to Properties</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/properties" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Properties
            </Link>
          </motion.div>
          
          {/* Main Image */}
          <motion.div 
            className="relative mb-8 rounded-xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <img 
              src={property.image} 
              alt={property.title} 
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full font-semibold">
              {property.price}
            </div>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Property Details */}
            <motion.div 
              className="flex-grow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                {property.location}
              </div>
              
              {/* Property Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center justify-center">
                  <Bed className="h-6 w-6 text-blue-600 mb-2" />
                  <span className="text-sm text-gray-500">Bedrooms</span>
                  <span className="text-xl font-bold">{property.bedrooms}</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center justify-center">
                  <Bath className="h-6 w-6 text-blue-600 mb-2" />
                  <span className="text-sm text-gray-500">Bathrooms</span>
                  <span className="text-xl font-bold">{property.bathrooms}</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center justify-center">
                  <Square className="h-6 w-6 text-blue-600 mb-2" />
                  <span className="text-sm text-gray-500">Square Feet</span>
                  <span className="text-xl font-bold">{property.sqft}</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center justify-center">
                  <Calendar className="h-6 w-6 text-blue-600 mb-2" />
                  <span className="text-sm text-gray-500">Year Built</span>
                  <span className="text-xl font-bold">{property.yearBuilt}</span>
                </div>
              </div>
              
              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">About This Property</h2>
                <p className="text-gray-700 leading-relaxed">
                  {property.description}
                </p>
              </div>
              
              {/* Features */}
              {property.features && property.features.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4">Features</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Location */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Location</h2>
                <div className="rounded-lg overflow-hidden h-[300px] bg-gray-100 flex items-center justify-center">
                  <p className="text-gray-500">Map will be displayed here</p>
                </div>
              </div>
            </motion.div>
            
            {/* Right Column - Contact & Info */}
            <motion.div 
              className="w-full lg:w-80"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="bg-white rounded-lg shadow-md p-6 mb-6 sticky top-20">
                <h3 className="text-lg font-bold mb-4">Contact Information</h3>
                <p className="text-gray-700 mb-1">
                  <strong>Listed:</strong> {formatDate(property.listedDate)}
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Reference:</strong> #REF{property.id.toString().padStart(5, '0')}
                </p>
                <Separator className="my-4" />
                <div className="space-y-3">
                  <Button className="w-full">
                    Schedule Viewing
                  </Button>
                  <Button variant="outline" className="w-full">
                    Contact Agent
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full"
                    onClick={() => toast.success("Property saved to favorites!")}
                  >
                    Save to Favorites
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
