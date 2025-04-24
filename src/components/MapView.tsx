import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { X } from 'lucide-react';
import { properties } from '@/data/properties';

// Fix Leaflet default icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const MapView = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden">
      {/* Sidebar */}
      <div
        className={`
          absolute top-0 right-0 h-full w-80 bg-white dark:bg-gray-800
          transform transition-transform duration-300 ease-in-out
          shadow-xl border-l border-gray-200 dark:border-gray-700
          z-50
          ${selectedProperty ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="p-4 overflow-y-auto h-full">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {selectedProperty?.title || 'Property Details'}
            </h2>
            <button
              onClick={() => setSelectedProperty(null)}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          {selectedProperty && (
            <div className="space-y-4">
              <img
                src={selectedProperty.image}
                alt={selectedProperty.title}
                className="w-full h-40 object-cover rounded-lg"
              />
              <p className="text-lg font-semibold text-emerald-600">
                {selectedProperty.price}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {selectedProperty.location}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Click the marker again to view more details.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Map */}
      <MapContainer
        center={[38.7223, -9.1393]}
        zoom={12}
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
          >
            <Popup>
              <div className="text-sm">
                <h3 className="font-semibold">{property.title}</h3>
                <p>{property.location}</p>
                <p className="text-emerald-600">{property.price}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;