import React, { useState } from 'react';
import { 
  Calendar,
  Filter,
  Plus,
  Search,
  User,
  CreditCard,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import DataCard from '../components/DataCard';
import ReservationCalendar from '../components/ReservationCalendar';
import ReservationForm from '../components/reservations/ReservationForm';
import ReservationList from '../components/reservations/ReservationList';

interface ReservationsPageProps {
  isDarkMode: boolean;
}

const ReservationsPage: React.FC<ReservationsPageProps> = ({ isDarkMode }) => {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [showNewReservation, setShowNewReservation] = useState(false);

  const stats = [
    {
      label: "Taux d'occupation",
      value: "85%",
      trend: "+5%",
      status: "success"
    },
    {
      label: "Réservations du jour",
      value: "12",
      trend: "+3",
      status: "success"
    },
    {
      label: "Arrivées prévues",
      value: "8",
      trend: "0",
      status: "neutral"
    },
    {
      label: "Départs prévus",
      value: "5",
      trend: "-1",
      status: "warning"
    }
  ];

  return (
    <div className="h-screen overflow-y-auto p-4 lg:p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className={`text-xl lg:text-2xl font-bold ${
            isDarkMode ? 'text-gray-100' : 'text-luxury-brown'
          }`}>
            Réservations
          </h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Gérez toutes vos réservations
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
          <button 
            onClick={() => setShowNewReservation(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white ${
              isDarkMode 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-secondary hover:bg-secondary-light'
            }`}
          >
            <Plus className="w-5 h-5" />
            <span>Nouvelle réservation</span>
          </button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
        {stats.map((stat, index) => (
          <DataCard
            key={index}
            title={stat.label}
            isDarkMode={isDarkMode}
          >
            <div className="mt-2">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className={`text-sm ${
                stat.status === 'success'
                  ? 'text-green-500'
                  : stat.status === 'warning'
                  ? 'text-yellow-500'
                  : 'text-gray-500'
              }`}>
                {stat.trend}
              </div>
            </div>
          </DataCard>
        ))}
      </div>

      {/* Vue principale */}
      <div className="mb-6">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setView('list')}
            className={`px-4 py-2 rounded-lg ${
              view === 'list'
                ? isDarkMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-secondary text-white'
                : isDarkMode
                ? 'bg-slate-800 text-gray-300'
                : 'bg-white text-gray-600'
            }`}
          >
            Liste
          </button>
          <button
            onClick={() => setView('calendar')}
            className={`px-4 py-2 rounded-lg ${
              view === 'calendar'
                ? isDarkMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-secondary text-white'
                : isDarkMode
                ? 'bg-slate-800 text-gray-300'
                : 'bg-white text-gray-600'
            }`}
          >
            Calendrier
          </button>
        </div>

        {view === 'list' ? (
          <ReservationList isDarkMode={isDarkMode} />
        ) : (
          <ReservationCalendar isDarkMode={isDarkMode} />
        )}
      </div>

      {/* Modal Nouvelle réservation */}
      {showNewReservation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className={`w-full max-w-2xl mx-4 p-6 rounded-xl ${
            isDarkMode ? 'bg-slate-800' : 'bg-white'
          }`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Nouvelle réservation</h2>
              <button 
                onClick={() => setShowNewReservation(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <ReservationForm isDarkMode={isDarkMode} onClose={() => setShowNewReservation(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationsPage;