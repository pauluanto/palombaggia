import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface RoomFormProps {
  isDarkMode: boolean;
  onClose: () => void;
}

const RoomForm: React.FC<RoomFormProps> = ({ isDarkMode, onClose }) => {
  const [formData, setFormData] = useState({
    number: '',
    type: '',
    floor: '',
    price: '',
    capacity: '',
    amenities: [] as string[],
    description: ''
  });

  const amenitiesOptions = [
    { id: 'wifi', label: 'Wi-Fi' },
    { id: 'tv', label: 'TV' },
    { id: 'minibar', label: 'Minibar' },
    { id: 'vue-mer', label: 'Vue mer' },
    { id: 'balcon', label: 'Balcon' },
    { id: 'jacuzzi', label: 'Jacuzzi' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nouvelle chambre:', formData);
    onClose();
  };

  const toggleAmenity = (amenityId: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(id => id !== amenityId)
        : [...prev.amenities, amenityId]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Numéro de chambre
          </label>
          <input
            type="text"
            value={formData.number}
            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
            className={`w-full px-4 py-2 rounded-lg ${
              isDarkMode
                ? 'bg-slate-700 text-gray-100'
                : 'bg-gray-50 text-gray-900'
            } border-0 focus:ring-2 focus:ring-secondary`}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Type de chambre
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className={`w-full px-4 py-2 rounded-lg ${
              isDarkMode
                ? 'bg-slate-700 text-gray-100'
                : 'bg-gray-50 text-gray-900'
            } border-0 focus:ring-2 focus:ring-secondary`}
            required
          >
            <option value="">Sélectionnez un type</option>
            <option value="suite-presidentielle">Suite Présidentielle</option>
            <option value="suite-deluxe">Suite Deluxe</option>
            <option value="chambre-vue-mer">Chambre Vue Mer</option>
            <option value="chambre-standard">Chambre Standard</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Étage
          </label>
          <input
            type="number"
            value={formData.floor}
            onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
            className={`w-full px-4 py-2 rounded-lg ${
              isDarkMode
                ? 'bg-slate-700 text-gray-100'
                : 'bg-gray-50 text-gray-900'
            } border-0 focus:ring-2 focus:ring-secondary`}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Prix par nuit
          </label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className={`w-full px-4 py-2 rounded-lg ${
              isDarkMode
                ? 'bg-slate-700 text-gray-100'
                : 'bg-gray-50 text-gray-900'
            } border-0 focus:ring-2 focus:ring-secondary`}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Équipements
        </label>
        <div className="grid grid-cols-3 gap-4">
          {amenitiesOptions.map(amenity => (
            <label
              key={amenity.id}
              className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer ${
                formData.amenities.includes(amenity.id)
                  ? isDarkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-secondary text-white'
                  : isDarkMode
                    ? 'bg-slate-700'
                    : 'bg-gray-50'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.amenities.includes(amenity.id)}
                onChange={() => toggleAmenity(amenity.id)}
                className="hidden"
              />
              <span>{amenity.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
          Créer la chambre
        </button>
      </div>
    </form>
  );
};

export default RoomForm;