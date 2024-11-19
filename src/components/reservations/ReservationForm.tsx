import React, { useState } from 'react';
import { Calendar, User, CreditCard, Phone, Mail, MapPin } from 'lucide-react';

interface ReservationFormProps {
  isDarkMode: boolean;
  onClose: () => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ isDarkMode, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    roomType: '',
    checkIn: '',
    checkOut: '',
    adults: 1,
    children: 0,
    paymentMethod: '',
    specialRequests: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Traitement de la réservation
    console.log('Réservation soumise:', formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Prénom</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className={`w-full px-4 py-2 rounded-lg ${
              isDarkMode
                ? 'bg-slate-700 text-gray-100'
                : 'bg-gray-50 text-gray-900'
            } border-0 focus:ring-2 focus:ring-secondary`}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Nom</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className={`w-full px-4 py-2 rounded-lg ${
              isDarkMode
                ? 'bg-slate-700 text-gray-100'
                : 'bg-gray-50 text-gray-900'
            } border-0 focus:ring-2 focus:ring-secondary`}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full px-4 py-2 rounded-lg ${
              isDarkMode
                ? 'bg-slate-700 text-gray-100'
                : 'bg-gray-50 text-gray-900'
            } border-0 focus:ring-2 focus:ring-secondary`}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Téléphone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={`w-full px-4 py-2 rounded-lg ${
              isDarkMode
                ? 'bg-slate-700 text-gray-100'
                : 'bg-gray-50 text-gray-900'
            } border-0 focus:ring-2 focus:ring-secondary`}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Type de chambre</label>
          <select
            value={formData.roomType}
            onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
            className={`w-full px-4 py-2 rounded-lg ${
              isDarkMode
                ? 'bg-slate-700 text-gray-100'
                : 'bg-gray-50 text-gray-900'
            } border-0 focus:ring-2 focus:ring-secondary`}
            required
          >
            <option value="">Sélectionnez une chambre</option>
            <option value="suite-presidentielle">Suite Présidentielle</option>
            <option value="suite-deluxe">Suite Deluxe</option>
            <option value="chambre-vue-mer">Chambre Vue Mer</option>
            <option value="chambre-standard">Chambre Standard</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Mode de paiement</label>
          <select
            value={formData.paymentMethod}
            onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
            className={`w-full px-4 py-2 rounded-lg ${
              isDarkMode
                ? 'bg-slate-700 text-gray-100'
                : 'bg-gray-50 text-gray-900'
            } border-0 focus:ring-2 focus:ring-secondary`}
            required
          >
            <option value="">Sélectionnez un mode de paiement</option>
            <option value="carte">Carte bancaire</option>
            <option value="virement">Virement bancaire</option>
            <option value="especes">Espèces</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Date d'arrivée</label>
          <input
            type="date"
            value={formData.checkIn}
            onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
            className={`w-full px-4 py-2 rounded-lg ${
              isDarkMode
                ? 'bg-slate-700 text-gray-100'
                : 'bg-gray-50 text-gray-900'
            } border-0 focus:ring-2 focus:ring-secondary`}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Date de départ</label>
          <input
            type="date"
            value={formData.checkOut}
            onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
            className={`w-full px-4 py-2 rounded-lg ${
              isDarkMode
                ? 'bg-slate-700 text-gray-100'
                : 'bg-gray-50 text-gray-900'
            } border-0 focus:ring-2 focus:ring-secondary`}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Adultes</label>
          <input
            type="number"
            min="1"
            value={formData.adults}
            onChange={(e) => setFormData({ ...formData, adults: parseInt(e.target.value) })}
            className={`w-full px-4 py-2 rounded-lg ${
              isDarkMode
                ? 'bg-slate-700 text-gray-100'
                : 'bg-gray-50 text-gray-900'
            } border-0 focus:ring-2 focus:ring-secondary`}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Enfants</label>
          <input
            type="number"
            min="0"
            value={formData.children}
            onChange={(e) => setFormData({ ...formData, children: parseInt(e.target.value) })}
            className={`w-full px-4 py-2 rounded-lg ${
              isDarkMode
                ? 'bg-slate-700 text-gray-100'
                : 'bg-gray-50 text-gray-900'
            } border-0 focus:ring-2 focus:ring-secondary`}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Demandes spéciales</label>
        <textarea
          value={formData.specialRequests}
          onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
          className={`w-full px-4 py-2 rounded-lg ${
            isDarkMode
              ? 'bg-slate-700 text-gray-100'
              : 'bg-gray-50 text-gray-900'
          } border-0 focus:ring-2 focus:ring-secondary`}
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose}
          className={`px-4 py-2 rounded-lg ${
            isDarkMode
              ? 'text-gray-300 hover:bg-slate-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Annuler
        </button>
        <button
          type="submit"
          className={`px-4 py-2 rounded-lg text-white ${
            isDarkMode
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-secondary hover:bg-secondary-light'
          }`}
        >
          Créer la réservation
        </button>
      </div>
    </form>
  );
};

export default ReservationForm;