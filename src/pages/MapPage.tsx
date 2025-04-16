
import React, { Suspense, lazy } from 'react';
import Navbar from '@/components/Navbar';
import { Skeleton } from '@/components/ui/skeleton';

// Import MapView dynamically with lazy to avoid leaflet issues
const MapView = lazy(() => import('@/components/MapView'));

const MapPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex-1">
        <Suspense fallback={
          <div className="w-full h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="text-center">
              <Skeleton className="h-[500px] w-full rounded-lg" />
              <p className="mt-4 text-gray-500 dark:text-gray-400">Loading map...</p>
            </div>
          </div>
        }>
          <MapView />
        </Suspense>
      </div>
    </div>
  );
};

export default MapPage;
