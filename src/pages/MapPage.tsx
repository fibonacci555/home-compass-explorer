
import MapView from '@/components/MapView';
import { properties } from '@/data/properties';
import Navbar from '@/components/Navbar';
import { useIsMobile } from '@/hooks/use-mobile';

const MapPage = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex-1 container mx-auto p-4 flex flex-col">
        {/* Map Section with responsive height */}
        <div className={`flex-1 ${isMobile ? 'h-[500px]' : 'h-[600px] md:h-[700px]'} rounded-lg shadow-md overflow-hidden`}>
          {properties.length === 0 ? (
            <div className="h-full flex items-center justify-center bg-white dark:bg-gray-800">
              <p className="text-gray-500">No properties available.</p>
            </div>
          ) : (
            <MapView properties={properties} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MapPage;
