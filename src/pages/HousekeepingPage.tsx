import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Clock, Plus, Filter } from 'lucide-react';
import DataCard from '../components/DataCard';
import FormModal from '../components/forms/FormModal';
import HousekeepingForm from '../components/housekeeping/HousekeepingForm';

interface HousekeepingPageProps {
  isDarkMode: boolean;
}

const HousekeepingPage: React.FC<HousekeepingPageProps> = ({ isDarkMode }) => {
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);

  const rooms = [
    {
      id: 1,
      number: '101',
      type: 'Suite Présidentielle',
      status: 'to-clean',
      priority: 'high',
      assignedTo: 'Marie D.',
      notes: 'Changement complet de la literie'
    },
    {
      id: 2,
      number: '102',
      type: 'Suite Deluxe',
      status: 'in-progress',
      priority: 'medium',
      assignedTo: 'Sophie B.',
      notes: 'Vérification minibar'
    },
    {
      id: 3,
      number: '103',
      type: 'Chambre Vue Mer',
      status: 'completed',
      priority: 'low',
      assignedTo: 'Thomas R.',
      notes: 'RAS'
    }
  ];

  const handleSubmit = (data: any) => {
    console.log('Nouvelle tâche:', data);
    setShowNewTaskForm(false);
  };

  return (
    <div className="h-screen overflow-y-auto p-4 lg:p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className={`text-xl lg:text-2xl font-bold ${
            isDarkMode ? 'text-gray-100' : 'text-luxury-brown'
          }`}>
            Housekeeping
          </h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Gestion du nettoyage des chambres
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
          <button 
            onClick={() => setShowNewTaskForm(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white ${
              isDarkMode 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-secondary hover:bg-secondary-light'
            }`}
          >
            <Plus className="w-5 h-5" />
            <span>Nouvelle tâche</span>
          </button>
        </div>
      </div>

      <DataCard
        title="Chambres à nettoyer"
        icon={Sparkles}
        isDarkMode={isDarkMode}
      >
        <div className="space-y-4">
          {rooms.map((room) => (
            <div
              key={room.id}
              className={`p-4 rounded-lg ${
                isDarkMode 
                  ? 'bg-slate-800 hover:bg-slate-700' 
                  : 'bg-gray-50 hover:bg-gray-100'
              } transition-colors`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">Chambre {room.number}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      room.priority === 'high'
                        ? isDarkMode
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-red-100 text-red-600'
                        : room.priority === 'medium'
                        ? isDarkMode
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-yellow-100 text-yellow-600'
                        : isDarkMode
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-green-100 text-green-600'
                    }`}>
                      {room.priority}
                    </span>
                  </div>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {room.type}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
                    room.status === 'completed'
                      ? isDarkMode
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-green-100 text-green-600'
                      : room.status === 'in-progress'
                      ? isDarkMode
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-blue-100 text-blue-600'
                      : isDarkMode
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {room.status === 'completed' ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : room.status === 'in-progress' ? (
                      <Clock className="w-4 h-4" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    <span className="text-sm">
                      {room.status === 'completed' ? 'Terminé' :
                       room.status === 'in-progress' ? 'En cours' : 'À faire'}
                    </span>
                  </div>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {room.assignedTo}
                  </div>
                </div>
              </div>
              {room.notes && (
                <p className={`mt-2 text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Notes: {room.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      </DataCard>

      {showNewTaskForm && (
        <FormModal
          title="Nouvelle tâche de nettoyage"
          onClose={() => setShowNewTaskForm(false)}
          isDarkMode={isDarkMode}
        >
          <HousekeepingForm
            onSubmit={handleSubmit}
            onClose={() => setShowNewTaskForm(false)}
            isDarkMode={isDarkMode}
          />
        </FormModal>
      )}
    </div>
  );
};

export default HousekeepingPage;