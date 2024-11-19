import React from 'react';
import { Calendar, Plus, Filter, Users, Clock, MapPin, Euro } from 'lucide-react';
import DataCard from '../components/DataCard';

interface ActivitiesPageProps {
  isDarkMode: boolean;
}

const ActivitiesPage: React.FC<ActivitiesPageProps> = ({ isDarkMode }) => {
  const activities = [
    {
      id: 1,
      name: 'Excursion en bateau',
      date: '2024-03-21',
      time: '09:00',
      duration: '4h',
      location: 'Port de Porto-Vecchio',
      participants: 8,
      maxParticipants: 12,
      price: 120,
      status: 'confirmed',
      guide: 'Jean M.'
    },
    {
      id: 2,
      name: 'Dégustation de vins',
      date: '2024-03-21',
      time: '17:00',
      duration: '2h',
      location: 'Cave de l\'hôtel',
      participants: 6,
      maxParticipants: 10,
      price: 45,
      status: 'pending',
      guide: 'Marie L.'
    }
  ];

  return (
    <div className="h-screen overflow-y-auto p-4 lg:p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className={`text-xl lg:text-2xl font-bold ${
            isDarkMode ? 'text-gray-100' : 'text-luxury-brown'
          }`}>
            Activités
          </h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Gestion des activités et excursions
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
            <span>Nouvelle activité</span>
          </button>
        </div>
      </div>

      <DataCard
        title="Activités du jour"
        icon={Calendar}
        isDarkMode={isDarkMode}
      >
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className={`p-4 rounded-lg ${
                isDarkMode 
                  ? 'bg-slate-800 hover:bg-slate-700' 
                  : 'bg-gray-50 hover:bg-gray-100'
              } transition-colors`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{activity.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      activity.status === 'confirmed'
                        ? isDarkMode
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-green-100 text-green-600'
                        : isDarkMode
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {activity.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{activity.time} ({activity.duration})</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4" />
                      <span>{activity.participants}/{activity.maxParticipants} participants</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{activity.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Euro className="w-4 h-4" />
                      <span>{activity.price}€ par personne</span>
                    </div>
                  </div>

                  <p className={`mt-2 text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Guide: {activity.guide}
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

export default ActivitiesPage;