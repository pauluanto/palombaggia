import React, { useState } from 'react';
import FormInput from '../forms/FormInput';
import FormSelect from '../forms/FormSelect';
import FormTextarea from '../forms/FormTextarea';

interface HousekeepingFormProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
  isDarkMode: boolean;
}

const HousekeepingForm: React.FC<HousekeepingFormProps> = ({
  onSubmit,
  onClose,
  isDarkMode
}) => {
  const [formData, setFormData] = useState({
    roomNumber: '',
    priority: '',
    assignedTo: '',
    notes: '',
    status: 'to-clean'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormInput
        label="Numéro de chambre"
        value={formData.roomNumber}
        onChange={(value) => setFormData({ ...formData, roomNumber: value })}
        required
        isDarkMode={isDarkMode}
      />

      <FormSelect
        label="Priorité"
        value={formData.priority}
        onChange={(value) => setFormData({ ...formData, priority: value })}
        options={[
          { value: 'high', label: 'Haute' },
          { value: 'medium', label: 'Moyenne' },
          { value: 'low', label: 'Basse' }
        ]}
        required
        isDarkMode={isDarkMode}
      />

      <FormSelect
        label="Assigné à"
        value={formData.assignedTo}
        onChange={(value) => setFormData({ ...formData, assignedTo: value })}
        options={[
          { value: 'marie', label: 'Marie D.' },
          { value: 'sophie', label: 'Sophie B.' },
          { value: 'thomas', label: 'Thomas R.' }
        ]}
        required
        isDarkMode={isDarkMode}
      />

      <FormTextarea
        label="Notes"
        value={formData.notes}
        onChange={(value) => setFormData({ ...formData, notes: value })}
        placeholder="Instructions spéciales, demandes particulières..."
        isDarkMode={isDarkMode}
      />

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
          Créer la tâche
        </button>
      </div>
    </form>
  );
};

export default HousekeepingForm;