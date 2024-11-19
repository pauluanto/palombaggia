import React from 'react';
import { 
  User, 
  Calendar, 
  Check, 
  Clock, 
  Edit, 
  Trash2,
  Wifi,
  Tv,
  Coffee,
  Waves
} from 'lucide-react';

interface Room {
  id: number;
  number: string;
  type: string;
  status: string;
  guest?: string;
  checkIn?: string;
  checkOut?: string;
  cleaning: string;
  price: number;
  amenities: string[];
}

interface RoomCardProps {
  room: Room;
  isDarkMode: boolean;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, isDarkMode }) => {
  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi':
        return <Wifi className="w-4 h-4" />;
      case 'tv':
        return <Tv className="w-4 h-4" />;
      case 'minibar':
        return <Coffee className="w-4 h-4" />;
      case 'vue-mer':
        return <Waves className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className={`rounded-xl p-4 ${
      isDarkMode ? 'bg-slate-800' : 'bg-white'
    } transition-all duration-200 hover:shadow-lg`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold">Chambre {room.number}</h3>
          <p className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {room.type}
          </p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs ${
          room.status === 'occupied'
            ? isDarkMode
              ? 'bg-red-500/20 text-red-400'
              : 'bg-red-100 text-red-600'
            : isDarkMode
              ? 'bg-green-500/20 text-green-400'
              : 'bg-green-100 text-green-600'
        }`}>
          {room.status === 'occupied' ? 'Occupée' : 'Disponible'}
        </span>
      </div>

      {room.status === 'occupied' && (
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4 text-gray-400" />
            <span>{room.guest}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{room.checkIn} - {room.checkOut}</span>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 mb-4">
        {room.amenities.map((amenity, index) => {
          const icon = getAmenityIcon(amenity);
          return icon && (
            <div key={index} className={`p-1 rounded-lg ${
              isDarkMode ? 'bg-slate-700' : 'bg-gray-100'
            }`}>
              {icon}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {room.cleaning === 'done' ? (
            <Check className="w-5 h-5 text-green-500" />
          ) : (
            <Clock className="w-5 h-5 text-yellow-500" />
          )}
          <span className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {room.cleaning === 'done' ? 'Nettoyée' : 'En attente'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className={`p-2 rounded-lg ${
            isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'
          }`}>
            <Edit className="w-4 h-4 text-blue-500" />
          </button>
          <button className={`p-2 rounded-lg ${
            isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'
          }`}>
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;