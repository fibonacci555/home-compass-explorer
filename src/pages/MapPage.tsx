
import React, { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';

// Import MapView dynamically with no SSR to avoid leaflet issues
const MapView = dynamic(() => import('@/components/MapView'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <Skeleton className="h-[500px] w-full rounded-lg" />
        <p className="mt-4 text-gray-500 dark:text-gray-400">Loading map...</p>
      </div>
    </div>
  )
});

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
