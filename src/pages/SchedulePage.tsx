import React, { useState } from 'react';
import { 
  Calendar,
  Clock,
  Filter,
  Plus,
  Search,
  User,
  MapPin,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import DataCard from '../components/DataCard';

interface SchedulePageProps {
  isDarkMode: boolean;
}

interface Shift {
  id: string;
  employeeName: string;
  role: string;
  startTime: string;
  endTime: string;
  location: string;
  status: 'scheduled' | 'in-progress' | 'completed';
}

const shifts: Shift[] = [
  {
    id: '1',
    employeeName: 'Marie Dubois',
    role: 'Femme de chambre',
    startTime: '08:00',
    endTime: '16:00',
    location: 'Étage 1',
    status: 'in-progress'
  },
  {
    id: '2',
    employeeName: 'Jean Martin',
    role: 'Chef de cuisine',
    startTime: '10:00',
    endTime: '18:00',
    location: 'Restaurant',
    status: 'scheduled'
  },
  {
    id: '3',
    employeeName: 'Sophie Bernard',
    role: 'Réceptionniste',
    startTime: '07:00',
    endTime: '15:00',
    location: 'Accueil',
    status: 'completed'
  }
];

const SchedulePage: React.FC<SchedulePageProps> = ({ isDarkMode }) => {
  const [view, setView] = useState<'day' | 'week'>('day');
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="h-screen overflow-y-auto p-4 lg:p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className={`text-xl lg:text-2xl font-bold ${
            isDarkMode ? 'text-gray-100' : 'text-luxury-brown'
          }`}>
            Emploi du temps
          </h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Planning du personnel
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher..."
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
          <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white ${
            isDarkMode 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-secondary hover:bg-secondary-light'
          }`}>
            <Plus className="w-5 h-5" />
            <span>Nouveau shift</span>
          </button>
        </div>
      </div>

      {/* Vue et date */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <button
            onClick={() => setView('day')}
            className={`px-4 py-2 rounded-lg ${
              view === 'day'
                ? isDarkMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-secondary text-white'
                : isDarkMode
                ? 'bg-slate-800 text-gray-300'
                : 'bg-white text-gray-600'
            }`}
          >
            Jour
          </button>
          <button
            onClick={() => setView('week')}
            className={`px-4 py-2 rounded-lg ${
              view === 'week'
                ? isDarkMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-secondary text-white'
                : isDarkMode
                ? 'bg-slate-800 text-gray-300'
                : 'bg-white text-gray-600'
            }`}
          >
            Semaine
          </button>
        </div>
        <input
          type="date"
          value={selectedDate.toISOString().split('T')[0]}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          className={`px-4 py-2 rounded-lg ${
            isDarkMode
              ? 'bg-slate-800 text-gray-100'
              : 'bg-white text-gray-900'
          } border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary`}
        />
      </div>

      {/* Planning */}
      <DataCard
        title="Planning du jour"
        icon={Calendar}
        isDarkMode={isDarkMode}
      >
        <div className="space-y-4">
          {shifts.map((shift) => (
            <div
              key={shift.id}
              className={`p-4 rounded-lg ${
                isDarkMode 
                  ? 'bg-slate-800 hover:bg-slate-700' 
                  : 'bg-gray-50 hover:bg-gray-100'
              } transition-colors`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-slate-700' : 'bg-white'
                  }`}>
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">{shift.employeeName}</h4>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {shift.role}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{shift.startTime} - {shift.endTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{shift.location}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    shift.status === 'completed'
                      ? isDarkMode
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-green-100 text-green-600'
                      : shift.status === 'in-progress'
                      ? isDarkMode
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-blue-100 text-blue-600'
                      : isDarkMode
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {shift.status === 'completed' ? 'Terminé' :
                     shift.status === 'in-progress' ? 'En cours' : 'Planifié'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DataCard>
    </div>
  );
};

export default SchedulePage;