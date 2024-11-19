import React from 'react';
import { User, UserPlus, Shield, Mail, Phone } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastActive: string;
}

interface UserManagementProps {
  isDarkMode: boolean;
}

const users: User[] = [
  {
    id: '1',
    name: 'Paul-Antoine',
    email: 'paul@palombaggia.com',
    role: 'Administrateur',
    status: 'active',
    lastActive: 'Maintenant'
  },
  {
    id: '2',
    name: 'Marie Dubois',
    email: 'marie@palombaggia.com',
    role: 'Manager',
    status: 'active',
    lastActive: 'Il y a 1 heure'
  }
];

const UserManagement: React.FC<UserManagementProps> = ({ isDarkMode }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Utilisateurs</h3>
        <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white ${
          isDarkMode 
            ? 'bg-blue-600 hover:bg-blue-700' 
            : 'bg-secondary hover:bg-secondary-light'
        }`}>
          <UserPlus className="w-5 h-5" />
          <span>Ajouter un utilisateur</span>
        </button>
      </div>

      <div className="space-y-4">
        {users.map(user => (
          <div
            key={user.id}
            className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-slate-700' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isDarkMode ? 'bg-slate-600' : 'bg-white'
                }`}>
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium">{user.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Shield className="w-4 h-4" />
                      <span>{user.role}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  user.status === 'active'
                    ? isDarkMode
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-green-100 text-green-600'
                    : isDarkMode
                      ? 'bg-gray-600 text-gray-300'
                      : 'bg-gray-100 text-gray-600'
                }`}>
                  {user.status === 'active' ? 'Actif' : 'Inactif'}
                </span>
                <button className={`text-sm ${
                  isDarkMode ? 'text-blue-400' : 'text-secondary'
                }`}>
                  Modifier
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;