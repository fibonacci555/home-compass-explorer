
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { X } from 'lucide-react';
import { properties } from '../data/properties';
import L from 'leaflet';

// Fix the missing icon issue in Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapView() {
  const [selectedProperty, setSelectedProperty] = useState(null);

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden">
      {/* Slide-in sidebar */}
      <div
        className={`
          absolute top-0 right-0 h-full w-96 bg-white dark:bg-gray-900
          transform transition-transform duration-300 ease-in-out
          shadow-2xl border-l border-gray-200 dark:border-gray-700
          z-50
          ${selectedProperty ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="p-6 overflow-y-auto h-full">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {selectedProperty?.title || ''}
            </h2>
            <button
              onClick={() => setSelectedProperty(null)}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Property info */}
          {selectedProperty && (
            <>
              <div className="rounded-lg overflow-hidden mb-6">
                <img
                  src={selectedProperty.image}
                  alt={selectedProperty.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                {selectedProperty.price}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{selectedProperty.location}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Bedrooms</p>
                  <p className="font-semibold">{selectedProperty.bedrooms}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Bathrooms</p>
                  <p className="font-semibold">{selectedProperty.bathrooms}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Square Feet</p>
                  <p className="font-semibold">{selectedProperty.sqft}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Year Built</p>
                  <p className="font-semibold">{selectedProperty.yearBuilt}</p>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {selectedProperty.description}
              </p>
            </>
          )}
        </div>
      </div>

      {/* MAP */}
      <MapContainer
        center={[39.8283, -98.5795]} // Center of the US
        zoom={4}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {properties.map((property) => (
          <Marker
            key={property.id}
            position={[property.latitude, property.longitude]}
            eventHandlers={{
              click: () => setSelectedProperty(property),
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;
