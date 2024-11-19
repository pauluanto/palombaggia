import React from 'react';
import { Calendar, Plus, Filter, Users, Clock, Phone, Mail } from 'lucide-react';
import DataCard from '../../components/DataCard';

interface RestaurantReservationsPageProps {
  isDarkMode: boolean;
}

const RestaurantReservationsPage: React.FC<RestaurantReservationsPageProps> = ({ isDarkMode }) => {
  const reservations = [
    {
      id: 1,
      name: 'M. Dupont',
      guests: 4,
      date: '2024-03-21',
      time: '20:00',
      phone: '+33 6 12 34 56 78',
      email: 'dupont@email.com',
      status: 'confirmed',
      notes: 'Table près de la fenêtre'
    },
    {
      id: 2,
      name: 'Mme Martin',
      guests: 6,
      date: '2024-03-21',
      time: '20:30',
      phone: '+33 6 98 76 54 32',
      email: 'martin@email.com',
      status: 'pending',
      notes: 'Anniversaire'
    }
  ];

  return (
    <div className="h-screen overflow-y-auto p-4 lg:p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className={`text-xl lg:text-2xl font-bold ${
            isDarkMode ? 'text-gray-100' : 'text-luxury-brown'
          }`}>
            Réservations Restaurant
          </h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Gestion des réservations restaurant
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
            <span>Nouvelle réservation</span>
          </button>
        </div>
      </div>

      <DataCard
        title="Réservations du jour"
        icon={Calendar}
        isDarkMode={isDarkMode}
      >
        <div className="space-y-4">
          {reservations.map((reservation) => (
            <div
              key={reservation.id}
              className={`p-4 rounded-lg ${
                isDarkMode 
                  ? 'bg-slate-800 hover:bg-slate-700' 
                  : 'bg-gray-50 hover:bg-gray-100'
              } transition-colors`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{reservation.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      reservation.status === 'confirmed'
                        ? isDarkMode
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-green-100 text-green-600'
                        : isDarkMode
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {reservation.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{reservation.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4" />
                      <span>{reservation.guests} personnes</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4" />
                      <span>{reservation.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4" />
                      <span>{reservation.email}</span>
                    </div>
                  </div>

                  {reservation.notes && (
                    <p className={`mt-2 text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Notes: {reservation.notes}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </DataCard>
    </div>
  );
};

export default RestaurantReservationsPage;