import React, { useState } from 'react';
import { 
  Hotel, 
  Users, 
  Calendar, 
  Plus, 
  Filter, 
  Check, 
  X, 
  Clock, 
  Sparkles,
  Search,
  Settings,
  Edit,
  Trash2
} from 'lucide-react';
import RoomCard from '../components/rooms/RoomCard';
import RoomForm from '../components/rooms/RoomForm';
import RoomFilters from '../components/rooms/RoomFilters';
import DataCard from '../components/DataCard';

interface RoomsPageProps {
  isDarkMode: boolean;
}

const RoomsPage: React.FC<RoomsPageProps> = ({ isDarkMode }) => {
  const [showNewRoom, setShowNewRoom] = useState(false);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selectedFloor, setSelectedFloor] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const stats = [
    {
      title: 'Chambres occupées',
      value: '18/25',
      subtitle: "Taux d'occupation: 72%",
      icon: Hotel,
      color: 'green'
    },
    {
      title: 'Clients présents',
      value: '42',
      subtitle: '+12 aujourd\'hui',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Check-ins aujourd\'hui',
      value: '8',
      subtitle: '5 déjà effectués',
      icon: Calendar,
      color: 'yellow'
    },
    {
      title: 'Chambres à nettoyer',
      value: '6',
      subtitle: '2 prioritaires',
      icon: Sparkles,
      color: 'purple'
    }
  ];

  const rooms = [
    {
      id: 1,
      number: '101',
      type: 'Suite Présidentielle',
      floor: '1',
      status: 'occupied',
      guest: 'M. Smith',
      checkIn: '2024-03-18',
      checkOut: '2024-03-23',
      cleaning: 'done',
      price: 850,
      amenities: ['vue-mer', 'balcon', 'jacuzzi']
    },
    {
      id: 2,
      number: '102',
      type: 'Suite Deluxe',
      floor: '1',
      status: 'available',
      cleaning: 'done',
      price: 550,
      amenities: ['vue-mer', 'balcon']
    },
    // ... autres chambres
  ];

  return (
    <div className="h-screen overflow-y-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className={`text-2xl font-bold ${
            isDarkMode ? 'text-gray-100' : 'text-luxury-brown'
          }`}>
            Gestion des Chambres
          </h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Vue d'ensemble et gestion des chambres
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher une chambre..."
              className={`pl-10 pr-4 py-2 rounded-lg ${
                isDarkMode 
                  ? 'bg-slate-800 text-gray-100' 
                  : 'bg-white text-gray-900'
              } border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary`}
            />
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            isDarkMode 
              ? 'bg-slate-800 hover:bg-slate-700' 
              : 'border border-gray-200 hover:bg-gray-50'
          }`}>
            <Filter className="w-5 h-5" />
            <span>Filtres</span>
          </button>
          <button 
            onClick={() => setShowNewRoom(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white ${
              isDarkMode 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-secondary hover:bg-secondary-light'
            }`}
          >
            <Plus className="w-5 h-5" />
            <span>Nouvelle chambre</span>
          </button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <DataCard
            key={index}
            title={stat.title}
            isDarkMode={isDarkMode}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-lg ${
                stat.color === 'green' ? 'bg-green-100 text-green-600' :
                stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                stat.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                'bg-purple-100 text-purple-600'
              }`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {stat.subtitle}
                </p>
              </div>
            </div>
          </DataCard>
        ))}
      </div>

      {/* Filtres */}
      <RoomFilters
        isDarkMode={isDarkMode}
        selectedFloor={selectedFloor}
        selectedStatus={selectedStatus}
        onFloorChange={setSelectedFloor}
        onStatusChange={setSelectedStatus}
      />

      {/* Liste des chambres */}
      <div className="grid grid-cols-4 gap-6 mt-6">
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>

      {/* Modal Nouvelle chambre */}
      {showNewRoom && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className={`w-full max-w-2xl mx-4 p-6 rounded-xl ${
            isDarkMode ? 'bg-slate-800' : 'bg-white'
          }`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Nouvelle chambre</h2>
              <button 
                onClick={() => setShowNewRoom(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <RoomForm isDarkMode={isDarkMode} onClose={() => setShowNewRoom(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomsPage;