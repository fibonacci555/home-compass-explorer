
import React from 'react';
import Navbar from '@/components/Navbar';
import MapView from '@/components/MapView';

const MapPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex-1">
        <MapView />
      </div>
    </div>
  );
};

export default MapPage;
