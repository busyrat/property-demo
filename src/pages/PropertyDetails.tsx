import React, { useEffect } from 'react';
import { usePropertyContext } from '../contexts/PropertyContext';
import { useParams, useNavigate } from 'react-router-dom';
import { StatusBadge } from '../components/StatusBadge';

export const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { propertyDetail, loadingDetail, error, fetchPropertyDetail, clearPropertyDetail } = usePropertyContext();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (id) {
      fetchPropertyDetail(parseInt(id));
    }
    
    return () => {
      clearPropertyDetail();
    };
  }, [id]);

  if (loadingDetail) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex justify-center items-center h-64">
          <span className="ml-3 text-gray-600">Loading property details...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
        >
          Back to Listings
        </button>
      </div>
    );
  }

  if (!propertyDetail) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Notice: </strong>
          <span className="block sm:inline">Property not found</span>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
        >
          Back to Listings
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        &lt; Back to Listings
      </button>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{propertyDetail.propertyName}</h1>
              <div className="mt-2 flex items-center">
                {/* <FaMapMarkerAlt className="text-gray-400 mr-2" /> */}
                <span className="text-gray-600">
                  {propertyDetail.address.street}, {propertyDetail.address.city}, {propertyDetail.address.state} {propertyDetail.address.zipCode}
                </span>
              </div>
            </div>
            <StatusBadge status={propertyDetail.status} />
          </div>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Property Description</h2>
              <p className="text-gray-600">{propertyDetail.propertyDetails.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="flex items-center text-lg font-medium text-gray-700 mb-3">
                  Construction Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Year Built</span>
                    <span className="font-medium">{propertyDetail.propertyDetails.yearBuilt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Unit Types</span>
                    <div className="text-right">
                      {propertyDetail.propertyDetails.unitTypes.map((type, idx) => (
                        <div key={idx} className="font-medium">{type}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="flex items-center text-lg font-medium text-gray-700 mb-3">
                  Pet Policy
                </h3>
                <p className="font-medium">{propertyDetail.propertyDetails.petPolicy}</p>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="flex items-center text-lg font-medium text-gray-700 mb-3">
                  Amenities
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  {propertyDetail.propertyDetails.amenities.map((amenity, idx) => (
                    <li key={idx} className="font-medium">{amenity}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <h3 className="font-medium text-gray-700">Property Details</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Property ID</span>
                  <span className="font-medium">{propertyDetail.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Number of Units</span>
                  <span className="font-medium">{propertyDetail.numberOfUnits}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Monthly Rent</span>
                  <span className="font-medium">${propertyDetail.monthlyRent.toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <h3 className="font-medium text-gray-700">Property Manager</h3>
              </div>
              <div className="space-y-2">
                <div className="font-medium">{propertyDetail.propertyManager.name}</div>
                <div className="text-blue-600">{propertyDetail.propertyManager.contact}</div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <h3 className="font-medium text-gray-700">Property Summary</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Status</span>
                  <StatusBadge status={propertyDetail.status} />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Units Available</span>
                  <span className="font-medium">
                    {propertyDetail.status === 'Vacant' 
                      ? propertyDetail.numberOfUnits 
                      : propertyDetail.status === 'Occupied' 
                        ? 0 
                        : 'Limited'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};