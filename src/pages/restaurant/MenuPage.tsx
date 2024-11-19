import React, { useState } from 'react';
import { Wine, Plus, Filter, Euro, Tag, Edit, Trash2 } from 'lucide-react';
import DataCard from '../../components/DataCard';
import FormModal from '../../components/forms/FormModal';
import FormInput from '../../components/forms/FormInput';
import FormSelect from '../../components/forms/FormSelect';
import FormTextarea from '../../components/forms/FormTextarea';

interface RestaurantMenuPageProps {
  isDarkMode: boolean;
}

interface MenuItem {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  available: boolean;
  allergens: string[];
}

const RestaurantMenuPage: React.FC<RestaurantMenuPageProps> = ({ isDarkMode }) => {
  const [showNewItemForm, setShowNewItemForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    allergens: ''
  });

  const menuItems = [
    {
      id: 1,
      name: 'Langouste grillée',
      category: 'Plats',
      description: 'Langouste fraîche grillée, beurre aux herbes',
      price: 85,
      available: true,
      allergens: ['Crustacés', 'Lactose']
    },
    {
      id: 2,
      name: 'Carpaccio de Daurade',
      category: 'Entrées',
      description: 'Daurade royale, huile d\'olive vierge, citron',
      price: 28,
      available: true,
      allergens: ['Poisson']
    },
    {
      id: 3,
      name: 'Tiramisu Maison',
      category: 'Desserts',
      description: 'Café, mascarpone, cacao',
      price: 14,
      available: false,
      allergens: ['Lactose', 'Œufs', 'Gluten']
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add new menu item logic here
    console.log('New menu item:', formData);
    setShowNewItemForm(false);
    setFormData({
      name: '',
      category: '',
      description: '',
      price: '',
      allergens: ''
    });
  };

  return (
    <div className="h-screen overflow-y-auto p-4 lg:p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className={`text-xl lg:text-2xl font-bold ${
            isDarkMode ? 'text-gray-100' : 'text-luxury-brown'
          }`}>
            Carte Restaurant
          </h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Gestion de la carte et des menus
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
            onClick={() => setShowNewItemForm(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white ${
              isDarkMode 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-secondary hover:bg-secondary-light'
            }`}
          >
            <Plus className="w-5 h-5" />
            <span>Nouveau plat</span>
          </button>
        </div>
      </div>

      <DataCard
        title="Carte"
        icon={Wine}
        isDarkMode={isDarkMode}
      >
        <div className="space-y-6">
          {['Entrées', 'Plats', 'Desserts'].map((category) => (
            <div key={category}>
              <h3 className={`text-lg font-semibold mb-4 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                {category}
              </h3>
              <div className="space-y-4">
                {menuItems
                  .filter(item => item.category === category)
                  .map((item) => (
                    <div
                      key={item.id}
                      className={`p-4 rounded-lg ${
                        isDarkMode 
                          ? 'bg-slate-800 hover:bg-slate-700' 
                          : 'bg-gray-50 hover:bg-gray-100'
                      } transition-colors`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{item.name}</h4>
                            {!item.available && (
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                isDarkMode
                                  ? 'bg-red-500/20 text-red-400'
                                  : 'bg-red-100 text-red-600'
                              }`}>
                                Non disponible
                              </span>
                            )}
                          </div>
                          <p className={`text-sm mt-1 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {item.description}
                          </p>
                          {item.allergens.length > 0 && (
                            <div className="flex items-center gap-2 mt-2">
                              <Tag className="w-4 h-4 text-yellow-500" />
                              <p className="text-sm text-yellow-500">
                                Allergènes: {item.allergens.join(', ')}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-medium">{item.price} €</span>
                          <div className="flex items-center gap-2">
                            <button className={`p-2 rounded-lg ${
                              isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-gray-200'
                            }`}>
                              <Edit className="w-4 h-4 text-blue-500" />
                            </button>
                            <button className={`p-2 rounded-lg ${
                              isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-gray-200'
                            }`}>
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </DataCard>

      {showNewItemForm && (
        <FormModal
          title="Nouveau plat"
          onClose={() => setShowNewItemForm(false)}
          isDarkMode={isDarkMode}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              label="Nom du plat"
              value={formData.name}
              onChange={(value) => setFormData({ ...formData, name: value })}
              required
              isDarkMode={isDarkMode}
            />

            <FormSelect
              label="Catégorie"
              value={formData.category}
              onChange={(value) => setFormData({ ...formData, category: value })}
              options={[
                { value: 'Entrées', label: 'Entrées' },
                { value: 'Plats', label: 'Plats' },
                { value: 'Desserts', label: 'Desserts' }
              ]}
              required
              isDarkMode={isDarkMode}
            />

            <FormTextarea
              label="Description"
              value={formData.description}
              onChange={(value) => setFormData({ ...formData, description: value })}
              required
              isDarkMode={isDarkMode}
            />

            <FormInput
              label="Prix (€)"
              type="number"
              value={formData.price}
              onChange={(value) => setFormData({ ...formData, price: value })}
              required
              isDarkMode={isDarkMode}
            />

            <FormInput
              label="Allergènes (séparés par des virgules)"
              value={formData.allergens}
              onChange={(value) => setFormData({ ...formData, allergens: value })}
              placeholder="Ex: Gluten, Lactose, Fruits à coque"
              isDarkMode={isDarkMode}
            />

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowNewItemForm(false)}
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
                Ajouter
              </button>
            </div>
          </form>
        </FormModal>
      )}
    </div>
  );
};

export default RestaurantMenuPage;