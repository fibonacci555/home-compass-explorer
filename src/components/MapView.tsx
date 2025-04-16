
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { X, Home, Building, MapPin } from 'lucide-react';
import { properties } from '../data/properties';
import { Button } from './ui/button';
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

// Custom marker icons
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: "custom-icon",
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.3)">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
           </div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

const luxuryIcon = createCustomIcon('#3b82f6'); // blue
const apartmentIcon = createCustomIcon('#10b981'); // emerald
const houseIcon = createCustomIcon('#f59e0b'); // amber

function getIconForProperty(price: string) {
  const numPrice = parseInt(price.replace(/[^0-9]/g, ''));
  if (numPrice > 3000000) return luxuryIcon;
  if (numPrice > 1500000) return apartmentIcon;
  return houseIcon;
}

// Create a separate PropertyMarker component to improve structure
const PropertyMarker = ({ property, onSelect }: { property: any, onSelect: (property: any) => void }) => {
  return (
    <Marker
      position={[property.latitude, property.longitude]}
      icon={getIconForProperty(property.price)}
      eventHandlers={{
        click: () => onSelect(property),
      }}
    >
      <Popup>
        <div className="p-1">
          <p className="font-semibold">{property.title}</p>
          <p className="text-sm text-gray-600">{property.price}</p>
        </div>
      </Popup>
    </Marker>
  );
}

function MapView() {
  const [selectedProperty, setSelectedProperty] = useState<any>(null);

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
              <div className="flex items-center mb-4">
                <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1" />
                <p className="text-gray-700 dark:text-gray-300">{selectedProperty.location}</p>
              </div>
              
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
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {selectedProperty.description}
              </p>
              
              <div className="flex gap-3">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                  Contact Agent
                </Button>
                <Button variant="outline" className="flex-1">
                  Schedule Tour
                </Button>
              </div>
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
          <PropertyMarker 
            key={property.id}
            property={property} 
            onSelect={setSelectedProperty} 
          />
        ))}
      </MapContainer>
      
      {/* Legend */}
      <div className="absolute bottom-5 left-5 bg-white dark:bg-gray-900 p-3 rounded-lg shadow-lg z-10 border border-gray-200 dark:border-gray-700">
        <p className="font-semibold mb-2 text-sm">Property Types</p>
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-xs">Luxury ($3M+)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-emerald-500 mr-2"></div>
            <span className="text-xs">Mid-Range ($1.5-3M)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-amber-500 mr-2"></div>
            <span className="text-xs">Standard (Under $1.5M)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapView;
