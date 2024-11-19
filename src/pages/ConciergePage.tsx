import React from 'react';
import { Building, Plus, Filter, Calendar, Clock, User, MapPin } from 'lucide-react';
import DataCard from '../components/DataCard';

interface ConciergePageProps {
  isDarkMode: boolean;
}

const ConciergePage: React.FC<ConciergePageProps> = ({ isDarkMode }) => {
  const requests = [
    {
      id: 1,
      client: 'M. Dupont',
      room: '101',
      type: 'Restaurant',
      request: 'Réservation La Villa Corse pour 4 personnes',
      date: '2024-03-21',
      time: '20:00',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 2,
      client: 'Mme Martin',
      room: '205',
      type: 'Transport',
      request: 'Taxi pour l\'aéroport',
      date: '2024-03-22',
      time: '09:00',
      status: 'confirmed',
      priority: 'medium'
    }
  ];

  return (
    <div className="h-screen overflow-y-auto p-4 lg:p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className={`text-xl lg:text-2xl font-bold ${
            isDarkMode ? 'text-gray-100' : 'text-luxury-brown'
          }`}>
            Conciergerie
          </h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Gestion des demandes clients
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
            <span>Nouvelle demande</span>
          </button>
        </div>
      </div>

      <DataCard
        title="Demandes en cours"
        icon={Building}
        isDarkMode={isDarkMode}
      >
        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className={`p-4 rounded-lg ${
                isDarkMode 
                  ? 'bg-slate-800 hover:bg-slate-700' 
                  : 'bg-gray-50 hover:bg-gray-100'
              } transition-colors`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{request.client}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      request.status === 'confirmed'
                        ? isDarkMode
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-green-100 text-green-600'
                        : isDarkMode
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {request.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      request.priority === 'high'
                        ? isDarkMode
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-red-100 text-red-600'
                        : isDarkMode
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {request.priority === 'high' ? 'Urgent' : 'Normal'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>Chambre {request.room}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{request.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{request.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Building className="w-4 h-4" />
                      <span>{request.type}</span>
                    </div>
                  </div>

                  <p className={`mt-2 text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {request.request}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DataCard>
    </div>
  );
};

export default ConciergePage;