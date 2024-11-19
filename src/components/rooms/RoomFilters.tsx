import React from 'react';
import { Filter } from 'lucide-react';

interface RoomFiltersProps {
  isDarkMode: boolean;
  selectedFloor: string;
  selectedStatus: string;
  onFloorChange: (floor: string) => void;
  onStatusChange: (status: string) => void;
}

const RoomFilters: React.FC<RoomFiltersProps> = ({
  isDarkMode,
  selectedFloor,
  selectedStatus,
  onFloorChange,
  onStatusChange
}) => {
  const floors = ['all', '1', '2', '3', '4'];
  const statuses = [
    { id: 'all', label: 'Tous' },
    { id: 'available', label: 'Disponible' },
    { id: 'occupied', label: 'Occupée' },
    { id: 'cleaning', label: 'Nettoyage' },
    { id: 'maintenance', label: 'Maintenance' }
  ];

  return (
    <div className={`p-4 rounded-xl ${
      isDarkMode ? 'bg-slate-800' : 'bg-white'
    }`}>
      <div className="flex items-center gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Étage
          </label>
          <div className="flex gap-2">
            {floors.map(floor => (
              <button
                key={floor}
                onClick={() => onFloorChange(floor)}
                className={`px-4 py-2 rounded-lg ${
                  selectedFloor === floor
                    ? isDarkMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-secondary text-white'
                    : isDarkMode
                      ? 'bg-slate-700 text-gray-300'
                      : 'bg-gray-50 text-gray-600'
                }`}
              >
                {floor === 'all' ? 'Tous' : `Étage ${floor}`}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Statut
          </label>
          <div className="flex gap-2">
            {statuses.map(status => (
              <button
                key={status.id}
                onClick={() => onStatusChange(status.id)}
                className={`px-4 py-2 rounded-lg ${
                  selectedStatus === status.id
                    ? isDarkMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-secondary text-white'
                    : isDarkMode
                      ? 'bg-slate-700 text-gray-300'
                      : 'bg-gray-50 text-gray-600'
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomFilters;