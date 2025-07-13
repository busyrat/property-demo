import React, { createContext, useContext, useState, useEffect } from 'react';
import type { PropertyListItem, PropertyDetail } from '../models/Property';
import { PropertyRepository } from '../repositories/PropertyRepository';

interface PropertyContextType {
  propertyList: PropertyListItem[];
  propertyDetail: PropertyDetail | null;
  loadingList: boolean;
  loadingDetail: boolean;
  error: string | null;
  fetchPropertyDetail: (id: number) => Promise<void>;
  clearPropertyDetail: () => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [propertyList, setPropertyList] = useState<PropertyListItem[]>([]);
  const [propertyDetail, setPropertyDetail] = useState<PropertyDetail | null>(null);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 获取列表数据
  useEffect(() => {
    const fetchPropertyList = async () => {
      setLoadingList(true);
      try {
        const data = await PropertyRepository.getPropertyList();
        setPropertyList(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch property list');
        console.error(err);
      } finally {
        setLoadingList(false);
      }
    };

    fetchPropertyList();
  }, []);

  // 获取详情数据
  const fetchPropertyDetail = async (id: number) => {
    if (propertyDetail && propertyDetail.id === id) return;
    
    setLoadingDetail(true);
    try {
      const detail = await PropertyRepository.getPropertyDetail(id);
      if (detail) {
        setPropertyDetail(detail);
        setError(null);
      } else {
        setError('Property details not found');
      }
    } catch (err) {
      setError('Failed to fetch property details');
      console.error(err);
    } finally {
      setLoadingDetail(false);
    }
  };

  const clearPropertyDetail = () => {
    setPropertyDetail(null);
  };

  return (
    <PropertyContext.Provider 
      value={{ 
        propertyList,
        propertyDetail,
        loadingList,
        loadingDetail,
        error,
        fetchPropertyDetail,
        clearPropertyDetail
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePropertyContext = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('usePropertyContext must be used within a PropertyProvider');
  }
  return context;
};