import React from 'react';
import { usePropertyContext } from '../contexts/PropertyContext';
import { useNavigate } from 'react-router-dom';
import { PropertyCard } from '../components/PropertyCard';

export const PropertyListings: React.FC = () => {
  const { propertyList, loadingList, error } = usePropertyContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredProperties = propertyList.filter(property =>
    property.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.propertyManager.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePropertyClick = (id: number) => {
    navigate(`/property/${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Property Listings</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          </div>
          <input
            type="text"
            placeholder="Search properties, cities, or managers..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loadingList ? (
        <div className="flex justify-center items-center h-64">
          <span className="ml-3 text-gray-600">Loading properties...</span>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                onClick={() => handlePropertyClick(property.id)}
              />
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-xl font-medium text-gray-700 mb-2">No properties found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};