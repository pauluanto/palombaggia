import React, { useState } from 'react';
import { 
  Plus, 
  X, 
  CalendarPlus, 
  Mail, 
  FileText, 
  Bell, 
  MessageSquare,
  CreditCard
} from 'lucide-react';

const QuickActions = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      id: 1,
      icon: CalendarPlus,
      label: 'Nouvelle réservation',
      color: 'bg-blue-500',
      onClick: () => console.log('Nouvelle réservation')
    },
    {
      id: 2,
      icon: Mail,
      label: 'Nouvel email',
      color: 'bg-purple-500',
      onClick: () => console.log('Nouvel email')
    },
    {
      id: 3,
      icon: Bell,
      label: 'Créer un rappel',
      color: 'bg-yellow-500',
      onClick: () => console.log('Créer un rappel')
    },
    {
      id: 4,
      icon: FileText,
      label: 'Nouveau document',
      color: 'bg-green-500',
      onClick: () => console.log('Nouveau document')
    },
    {
      id: 5,
      icon: MessageSquare,
      label: 'Message à l\'équipe',
      color: 'bg-pink-500',
      onClick: () => console.log('Message équipe')
    },
    {
      id: 6,
      icon: CreditCard,
      label: 'Nouvelle facture',
      color: 'bg-orange-500',
      onClick: () => console.log('Nouvelle facture')
    }
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Quick Actions Menu */}
      <div className={`fixed right-4 bottom-20 z-50 transition-all duration-200 ${isOpen ? 'scale-100' : 'scale-0'}`}>
        <div className="bg-white rounded-lg shadow-xl p-4 mb-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full sm:w-auto">
            {actions.map((action) => (
              <button
                key={action.id}
                onClick={() => {
                  action.onClick();
                  setIsOpen(false);
                }}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className={`p-3 ${action.color} rounded-full text-white`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm text-gray-700 text-center">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed right-4 bottom-4 sm:right-6 sm:bottom-6 p-4 rounded-full shadow-lg transition-all duration-200 z-50
          ${isOpen 
            ? 'bg-red-500 hover:bg-red-600 rotate-45' 
            : 'bg-secondary hover:bg-secondary-light'
          }`}
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <Plus className="w-6 h-6 text-white" />}
      </button>
    </>
  );
};

export default QuickActions;