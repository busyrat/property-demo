import React from 'react';
import type { PropertyStatus } from '../models/Property';

interface StatusBadgeProps {
  status: PropertyStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusColors = {
    'Occupied': 'bg-green-100 text-green-800',
    'Vacant': 'bg-blue-100 text-blue-800',
    'Under Maintenance': 'bg-yellow-100 text-yellow-800'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
      {status}
    </span>
  );
};