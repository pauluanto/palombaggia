import React, { useState } from 'react';
import { 
  Settings, 
  Hotel, 
  CreditCard, 
  Users, 
  Bell, 
  Lock,
  Palette,
  Globe,
  MessageSquare,
  Database,
  Plus,
  Mail,
  Phone,
  MapPin,
  Image as ImageIcon,
  Sun,
  Moon,
  Check
} from 'lucide-react';
import APIConfigurations from '../components/settings/APIConfigurations';
import SecuritySettings from '../components/settings/SecuritySettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import ThemeSelector from '../components/settings/ThemeSelector';
import LanguageSelector from '../components/settings/LanguageSelector';

const SettingsPage = ({ isDarkMode, setIsDarkMode }: { isDarkMode: boolean, setIsDarkMode: (value: boolean) => void }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [hotelInfo, setHotelInfo] = useState({
    name: 'Palombaggia Hotel',
    address: 'Plage de Palombaggia',
    city: 'Porto-Vecchio',
    postalCode: '20137',
    phone: '+33 4 95 70 00 00',
    email: 'contact@palombaggia-hotel.com',
    website: 'www.palombaggia-hotel.com'
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    reservations: true,
    messages: true,
    tasks: true,
    updates: false
  });

  const tabs = [
    { id: 'general', label: 'Général', icon: Settings },
    { id: 'integrations', label: 'Intégrations', icon: Database },
    { id: 'appearance', label: 'Apparence', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Sécurité', icon: Lock }
  ];

  return (
    <div className="h-screen overflow-y-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-bold ${
          isDarkMode ? 'text-gray-100' : 'text-luxury-brown'
        }`}>
          Paramètres
        </h1>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-3">
          <div className={`rounded-xl p-4 ${
            isDarkMode ? 'bg-slate-800' : 'bg-white/90'
          }`}>
            <nav className="space-y-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? isDarkMode
                        ? 'bg-blue-600 text-white'
                        : 'bg-secondary text-white'
                      : isDarkMode
                        ? 'text-gray-300 hover:bg-slate-700'
                        : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="col-span-9">
          {activeTab === 'general' && (
            <div className={`rounded-xl p-6 ${
              isDarkMode ? 'bg-slate-800' : 'bg-white/90'
            }`}>
              <h2 className="text-lg font-semibold mb-6">Informations de l'hôtel</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nom de l'établissement
                  </label>
                  <input
                    type="text"
                    value={hotelInfo.name}
                    onChange={(e) => setHotelInfo({ ...hotelInfo, name: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg ${
                      isDarkMode
                        ? 'bg-slate-700 text-gray-100'
                        : 'bg-gray-50 text-gray-900'
                    } border-0 focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Adresse email
                  </label>
                  <input
                    type="email"
                    value={hotelInfo.email}
                    onChange={(e) => setHotelInfo({ ...hotelInfo, email: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg ${
                      isDarkMode
                        ? 'bg-slate-700 text-gray-100'
                        : 'bg-gray-50 text-gray-900'
                    } border-0 focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={hotelInfo.phone}
                    onChange={(e) => setHotelInfo({ ...hotelInfo, phone: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg ${
                      isDarkMode
                        ? 'bg-slate-700 text-gray-100'
                        : 'bg-gray-50 text-gray-900'
                    } border-0 focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Site web
                  </label>
                  <input
                    type="url"
                    value={hotelInfo.website}
                    onChange={(e) => setHotelInfo({ ...hotelInfo, website: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg ${
                      isDarkMode
                        ? 'bg-slate-700 text-gray-100'
                        : 'bg-gray-50 text-gray-900'
                    } border-0 focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Adresse
                  </label>
                  <input
                    type="text"
                    value={hotelInfo.address}
                    onChange={(e) => setHotelInfo({ ...hotelInfo, address: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg ${
                      isDarkMode
                        ? 'bg-slate-700 text-gray-100'
                        : 'bg-gray-50 text-gray-900'
                    } border-0 focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Ville
                  </label>
                  <input
                    type="text"
                    value={hotelInfo.city}
                    onChange={(e) => setHotelInfo({ ...hotelInfo, city: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg ${
                      isDarkMode
                        ? 'bg-slate-700 text-gray-100'
                        : 'bg-gray-50 text-gray-900'
                    } border-0 focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Code postal
                  </label>
                  <input
                    type="text"
                    value={hotelInfo.postalCode}
                    onChange={(e) => setHotelInfo({ ...hotelInfo, postalCode: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg ${
                      isDarkMode
                        ? 'bg-slate-700 text-gray-100'
                        : 'bg-gray-50 text-gray-900'
                    } border-0 focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button className={`px-4 py-2 rounded-lg text-white ${
                  isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-secondary hover:bg-secondary-light'
                }`}>
                  Sauvegarder
                </button>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <APIConfigurations isDarkMode={isDarkMode} />
          )}

          {activeTab === 'appearance' && (
            <div className={`rounded-xl p-6 ${
              isDarkMode ? 'bg-slate-800' : 'bg-white/90'
            }`}>
              <h2 className="text-lg font-semibold mb-6">Apparence</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-4">Thème</h3>
                  <ThemeSelector isDarkMode={isDarkMode} onChange={setIsDarkMode} />
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-4">Langue</h3>
                  <LanguageSelector
                    value="fr"
                    onChange={(value) => console.log('Langue changée:', value)}
                    isDarkMode={isDarkMode}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className={`rounded-xl p-6 ${
              isDarkMode ? 'bg-slate-800' : 'bg-white/90'
            }`}>
              <NotificationSettings
                isDarkMode={isDarkMode}
                notifications={notifications}
                onNotificationChange={(key, value) => 
                  setNotifications(prev => ({ ...prev, [key]: value }))
                }
              />
            </div>
          )}

          {activeTab === 'security' && (
            <SecuritySettings isDarkMode={isDarkMode} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;