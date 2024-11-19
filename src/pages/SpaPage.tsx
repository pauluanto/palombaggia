import React from 'react';
import { Waves, Plus, Filter, Calendar, Clock, User, Phone } from 'lucide-react';
import DataCard from '../components/DataCard';

interface SpaPageProps {
  isDarkMode: boolean;
}

const SpaPage: React.FC<SpaPageProps> = ({ isDarkMode }) => {
  const appointments = [
    {
      id: 1,
      client: 'Mme Dubois',
      treatment: 'Massage Relaxant',
      duration: '60 min',
      time: '14:00',
      therapist: 'Sophie B.',
      room: 'Cabine 1',
      status: 'confirmed',
      phone: '+33 6 12 34 56 78'
    },
    {
      id: 2,
      client: 'M. Martin',
      treatment: 'Soin du Visage',
      duration: '90 min',
      time: '15:30',
      therapist: 'Marie L.',
      room: 'Cabine 2',
      status: 'pending',
      phone: '+33 6 98 76 54 32'
    }
  ];

  return (
    <div className="h-screen overflow-y-auto p-4 lg:p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className={`text-xl lg:text-2xl font-bold ${
            isDarkMode ? 'text-gray-100' : 'text-luxury-brown'
          }`}>
            Spa & Bien-être
          </h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Gestion des rendez-vous spa
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
            <span>Nouveau rendez-vous</span>
          </button>
        </div>
      </div>

      <DataCard
        title="Rendez-vous du jour"
        icon={Waves}
        isDarkMode={isDarkMode}
      >
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className={`p-4 rounded-lg ${
                isDarkMode 
                  ? 'bg-slate-800 hover:bg-slate-700' 
                  : 'bg-gray-50 hover:bg-gray-100'
              } transition-colors`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{appointment.client}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      appointment.status === 'confirmed'
                        ? isDarkMode
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-green-100 text-green-600'
                        : isDarkMode
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {appointment.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{appointment.time} ({appointment.duration})</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4" />
                      <span>{appointment.therapist}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{appointment.room}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4" />
                      <span>{appointment.phone}</span>
                    </div>
                  </div>

                  <p className={`mt-2 text-sm font-medium ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    {appointment.treatment}
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

export default SpaPage;