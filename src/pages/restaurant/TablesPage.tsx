import React from 'react';
import { ChefHat, Plus, Filter, Users, Clock, CheckCircle2 } from 'lucide-react';
import DataCard from '../../components/DataCard';

interface RestaurantTablesPageProps {
  isDarkMode: boolean;
}

const RestaurantTablesPage: React.FC<RestaurantTablesPageProps> = ({ isDarkMode }) => {
  const tables = [
    {
      id: 1,
      number: '1',
      capacity: 4,
      status: 'occupied',
      guests: 3,
      server: 'Marie D.',
      timeSeated: '19:30',
      orders: 'En cours'
    },
    {
      id: 2,
      number: '2',
      capacity: 6,
      status: 'reserved',
      reservation: '20:00',
      name: 'M. Dupont'
    },
    {
      id: 3,
      number: '3',
      capacity: 2,
      status: 'available'
    }
  ];

  return (
    <div className="h-screen overflow-y-auto p-4 lg:p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className={`text-xl lg:text-2xl font-bold ${
            isDarkMode ? 'text-gray-100' : 'text-luxury-brown'
          }`}>
            Tables Restaurant
          </h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Gestion des tables et du service
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            isDarkMode 
              ? 'bg-slate-800 hover:bg-slate-700' 
              : 'border border-gray-200 hover:bg-gray-50'
          }`}>
            <Filter className="w-5 h-5" />
            <span>Filtres</span>
          </button>
          <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white ${
            isDarkMode 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-secondary hover:bg-secondary-light'
          }`}>
            <Plus className="w-5 h-5" />
            <span>Nouvelle table</span>
          </button>
        </div>
      </div>

      <DataCard
        title="Tables"
        icon={ChefHat}
        isDarkMode={isDarkMode}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tables.map((table) => (
            <div
              key={table.id}
              className={`p-4 rounded-lg ${
                isDarkMode 
                  ? 'bg-slate-800 hover:bg-slate-700' 
                  : 'bg-gray-50 hover:bg-gray-100'
              } transition-colors`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium">Table {table.number}</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4" />
                    <span>{table.capacity} personnes</span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  table.status === 'occupied'
                    ? isDarkMode
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-red-100 text-red-600'
                    : table.status === 'reserved'
                    ? isDarkMode
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-yellow-100 text-yellow-600'
                    : isDarkMode
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-green-100 text-green-600'
                }`}>
                  {table.status === 'occupied' ? 'Occupée' :
                   table.status === 'reserved' ? 'Réservée' : 'Disponible'}
                </span>
              </div>

              {table.status === 'occupied' && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4" />
                    <span>{table.guests} convives</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Depuis {table.timeSeated}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <ChefHat className="w-4 h-4" />
                    <span>{table.orders}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Service: {table.server}</span>
                  </div>
                </div>
              )}

              {table.status === 'reserved' && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Réservée pour {table.reservation}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4" />
                    <span>{table.name}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </DataCard>
    </div>
  );
};

export default RestaurantTablesPage;