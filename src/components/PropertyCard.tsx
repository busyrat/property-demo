import React from 'react';
import type { PropertyListItem } from '../models/Property';

interface PropertyCardProps {
  property: PropertyListItem;
  onClick: () => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Occupied':
      return 'bg-green-100 text-green-800';
    case 'Vacant':
      return 'bg-blue-100 text-blue-800';
    case 'Under Maintenance':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white relative"
    > 
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-800">{property.propertyName}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
          {property.status}
        </span>
      </div>
      
      <div className="mt-2">
        <p className="text-gray-600 text-sm">
          {property.address.street}, {property.address.city}, {property.address.state} {property.address.zipCode}
        </p>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div>
          <p className="text-gray-500 text-sm">Units</p>
          <p className="font-medium">{property.numberOfUnits}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Monthly Rent</p>
          <p className="font-medium">${property.monthlyRent.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-gray-500 text-sm">Property Manager</p>
        <p className="font-medium text-sm">{property.propertyManager.name}</p>
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-100">
        <button 
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          onClick={onClick}
        >
          View Details →
        </button>
      </div>
    </div>
  );
};