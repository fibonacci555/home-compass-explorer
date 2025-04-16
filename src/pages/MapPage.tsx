
import MapView from '@/components/MapView';
import { properties } from '@/data/properties';
import Navbar from '@/components/Navbar';

const MapPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto p-4 flex flex-col">
        {/* Map Section */}
        <div className="flex-1 h-[calc(100vh-8rem)] rounded-lg shadow-md overflow-hidden">
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
