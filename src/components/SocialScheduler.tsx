import React from 'react';
import { Calendar, Clock, Image as ImageIcon, Send } from 'lucide-react';
import DataCard from './DataCard';

interface SocialSchedulerProps {
  isDarkMode: boolean;
}

const scheduledPosts = [
  {
    id: 1,
    content: 'Découvrez notre brunch du dimanche ! 🍳',
    date: '2024-03-24',
    time: '10:00',
    networks: ['instagram', 'facebook']
  },
  {
    id: 2,
    content: 'Offre spéciale : -20% sur les réservations de dernière minute',
    date: '2024-03-25',
    time: '15:30',
    networks: ['facebook', 'twitter']
  }
];

const SocialScheduler: React.FC<SocialSchedulerProps> = ({ isDarkMode }) => {
  return (
    <DataCard
      title="Planification"
      isDarkMode={isDarkMode}
      action={{
        label: 'Nouveau post',
        onClick: () => console.log('Créer un nouveau post')
      }}
    >
      <div className="space-y-4">
        {/* Nouveau post rapide */}
        <div className={`p-4 rounded-lg ${
          isDarkMode ? 'bg-slate-800' : 'bg-gray-50'
        }`}>
          <textarea
            placeholder="Que souhaitez-vous partager ?"
            className={`w-full p-2 rounded-lg resize-none ${
              isDarkMode 
                ? 'bg-slate-700 text-gray-100 placeholder-gray-400' 
                : 'bg-white text-gray-900 placeholder-gray-500'
            } border-0 focus:ring-2 focus:ring-blue-500`}
            rows={3}
          />
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-2">
              <button className={`p-2 rounded-lg ${
                isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200'
              }`}>
                <ImageIcon className="w-5 h-5" />
              </button>
              <button className={`p-2 rounded-lg ${
                isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200'
              }`}>
                <Calendar className="w-5 h-5" />
              </button>
            </div>
            <button className={`px-4 py-2 rounded-lg ${
              isDarkMode 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-indigo-600 hover:bg-indigo-700'
            } text-white`}>
              Planifier
            </button>
          </div>
        </div>

        {/* Posts planifiés */}
        <div className="space-y-4">
          <h4 className={`font-medium ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Posts planifiés
          </h4>
          {scheduledPosts.map((post) => (
            <div
              key={post.id}
              className={`p-4 rounded-lg ${
                isDarkMode 
                  ? 'bg-slate-800 hover:bg-slate-700' 
                  : 'bg-gray-50 hover:bg-gray-100'
              } transition-colors`}
            >
              <p className="mb-3">{post.content}</p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.time}</span>
                  </div>
                </div>
                <button className={`p-1 rounded-lg ${
                  isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-gray-200'
                }`}>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DataCard>
  );
};

export default SocialScheduler;