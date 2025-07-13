export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface PropertyManager {
  name: string;
  contact: string;
}

// 状态枚举类型
export type PropertyStatus = 'Occupied' | 'Vacant' | 'Under Maintenance';

export interface PropertyListItem {
  id: number;
  propertyName: string;
  address: Address;
  numberOfUnits: number;
  propertyManager: PropertyManager;
  monthlyRent: number;
  status: PropertyStatus;
}

export interface PropertyDetail extends PropertyListItem {
  propertyDetails: {
    yearBuilt: number;
    unitTypes: string[];
    amenities: string[];
    petPolicy: string;
    description: string;
  };
}