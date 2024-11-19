import React from 'react';
import { 
  User, 
  Calendar, 
  CreditCard, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  MoreVertical
} from 'lucide-react';

interface ReservationListProps {
  isDarkMode: boolean;
}

const reservations = [
  {
    id: 1,
    guest: 'M. Jean Dupont',
    room: 'Suite Présidentielle',
    checkIn: '2024-03-25',
    checkOut: '2024-03-30',
    status: 'confirmed',
    payment: 'paid',
    amount: 2500
  },
  {
    id: 2,
    guest: 'Mme Marie Martin',
    room: 'Suite Deluxe',
    checkIn: '2024-03-26',
    checkOut: '2024-03-28',
    status: 'pending',
    payment: 'pending',
    amount: 1200
  }
];

const ReservationList: React.FC<ReservationListProps> = ({ isDarkMode }) => {
  return (
    <div className={`rounded-xl overflow-hidden ${
      isDarkMode ? 'bg-slate-800' : 'bg-white'
    }`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={`text-sm ${
            isDarkMode ? 'bg-slate-700' : 'bg-gray-50'
          }`}>
            <tr>
              <th className="px-6 py-4 text-left">Client</th>
              <th className="px-6 py-4 text-left">Chambre</th>
              <th className="px-6 py-4 text-left">Dates</th>
              <th className="px-6 py-4 text-left">Statut</th>
              <th className="px-6 py-4 text-left">Paiement</th>
              <th className="px-6 py-4 text-right">Montant</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reservations.map((reservation) => (
              <tr key={reservation.id} className={`${
                isDarkMode 
                  ? 'hover:bg-slate-700' 
                  : 'hover:bg-gray-50'
              } transition-colors`}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isDarkMode ? 'bg-slate-600' : 'bg-gray-100'
                    }`}>
                      <User className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{reservation.guest}</span>
                  </div>
                </td>
                <td className="px-6 py-4">{reservation.room}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{reservation.checkIn} - {reservation.checkOut}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                    reservation.status === 'confirmed'
                      ? isDarkMode
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-green-100 text-green-600'
                      : isDarkMode
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {reservation.status === 'confirmed' ? (
                      <>
                        <CheckCircle className="w-3 h-3" />
                        <span>Confirmé</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-3 h-3" />
                        <span>En attente</span>
                      </>
                    )}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                    reservation.payment === 'paid'
                      ? isDarkMode
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-green-100 text-green-600'
                      : isDarkMode
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    <CreditCard className="w-3 h-3" />
                    <span>{reservation.payment === 'paid' ? 'Payé' : 'En attente'}</span>
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="font-medium">{reservation.amount} €</span>
                </td>
                <td className="px-6 py-4">
                  <button className={`p-2 rounded-lg ${
                    isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-gray-100'
                  }`}>
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservationList;