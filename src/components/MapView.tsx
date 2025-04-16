
import { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Property } from '@/types/property';

// Fix Leaflet default icon paths
// Handle the _getIconUrl issue
const DefaultIcon = L.Icon.Default;
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

// Set the icon options
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

interface MapViewProps {
  properties: Property[];
}

const MapView = ({ properties }: MapViewProps) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Memoize markers to prevent unnecessary re-renders
  const markers = useMemo(
    () =>
      properties.map((property) => (
        <Marker
          key={property.id}
          position={[property.latitude || 0, property.longitude || 0]}
          eventHandlers={{
            click: () => setSelectedProperty(property),
          }}
        >
          <Popup>
            <div className="text-sm">
              <h3 className="font-semibold">{property.title}</h3>
              <p>{property.location}</p>
              <p className="text-emerald-600">{property.price}</p>
              <Link
                to={`/properties/${property.id}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
            </div>
          </Popup>
        </Marker>
      )),
    [properties]
  );

  return (
    <div className="relative h-full w-full">
      {/* Sidebar */}
      <div
        className={`
          absolute top-0 right-0 h-full w-80 bg-white dark:bg-gray-800
          transform transition-transform duration-300 ease-in-out
          shadow-xl border-l border-gray-200 dark:border-gray-700
          z-50
          ${selectedProperty ? 'translate-x-0' : 'translate-x-full'}
        `}
        role="dialog"
        aria-labelledby="property-details-title"
      >
        <div className="p-4 overflow-y-auto h-full">
          <div className="flex justify-between items-start mb-4">
            <h2
              id="property-details-title"
              className="text-xl font-bold text-gray-900 dark:text-white"
            >
              {selectedProperty?.title || 'Property Details'}
            </h2>
            <button
              onClick={() => setSelectedProperty(null)}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              aria-label="Close sidebar"
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
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
              <p className="text-lg font-semibold text-emerald-600">
                {selectedProperty.price}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {selectedProperty.location}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {selectedProperty.description?.slice(0, 100)}...
              </p>
              <Link
                to={`/properties/${selectedProperty.id}`}
                className="inline-block px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                View Full Details
              </Link>
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
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>{markers}</MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default MapView;
