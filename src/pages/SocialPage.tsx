import React, { useState } from 'react';
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Globe, 
  MessageSquare, 
  Star, 
  Share2,
  ThumbsUp,
  Eye,
  BarChart2
} from 'lucide-react';
import DataCard from '../components/DataCard';
import SocialFeed from '../components/SocialFeed';
import SocialMetrics from '../components/SocialMetrics';
import SocialScheduler from '../components/SocialScheduler';

interface SocialPageProps {
  isDarkMode: boolean;
}

const SocialPage: React.FC<SocialPageProps> = ({ isDarkMode }) => {
  const [activeNetwork, setActiveNetwork] = useState('all');

  const networks = [
    { id: 'all', name: 'Tous les réseaux', icon: Globe },
    { id: 'instagram', name: 'Instagram', icon: Instagram },
    { id: 'facebook', name: 'Facebook', icon: Facebook },
    { id: 'twitter', name: 'Twitter', icon: Twitter }
  ];

  const metrics = [
    {
      id: 1,
      title: 'Abonnés',
      value: '12.5K',
      trend: '+15%',
      icon: Eye,
      color: 'blue'
    },
    {
      id: 2,
      title: 'Engagement',
      value: '8.2%',
      trend: '+2.5%',
      icon: ThumbsUp,
      color: 'green'
    },
    {
      id: 3,
      title: 'Mentions',
      value: '234',
      trend: '+12%',
      icon: MessageSquare,
      color: 'purple'
    },
    {
      id: 4,
      title: 'Portée',
      value: '45.2K',
      trend: '+18%',
      icon: Share2,
      color: 'yellow'
    }
  ];

  return (
    <div className="h-screen overflow-y-auto p-4 lg:p-6">
      <div className="flex justify-between items-center mb-6 mt-12 lg:mt-0">
        <div>
          <h1 className={`text-xl lg:text-2xl font-bold ${
            isDarkMode ? 'text-gray-100' : 'text-luxury-brown'
          }`}>
            Réseaux Sociaux
          </h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Gérez votre présence en ligne
          </p>
        </div>
      </div>

      {/* Filtres réseaux sociaux */}
      <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
        {networks.map((network) => (
          <button
            key={network.id}
            onClick={() => setActiveNetwork(network.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeNetwork === network.id
                ? isDarkMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-indigo-600 text-white'
                : isDarkMode
                ? 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <network.icon className="w-5 h-5" />
            <span>{network.name}</span>
          </button>
        ))}
      </div>

      {/* Métriques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
        {metrics.map((metric) => (
          <DataCard
            key={metric.id}
            title={metric.title}
            icon={metric.icon}
            isDarkMode={isDarkMode}
          >
            <div className="mt-2">
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className={`text-sm ${
                metric.trend.startsWith('+')
                  ? isDarkMode ? 'text-green-400' : 'text-green-600'
                  : isDarkMode ? 'text-red-400' : 'text-red-600'
              }`}>
                {metric.trend} vs mois dernier
              </div>
            </div>
          </DataCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Feed et analyses */}
        <div className="lg:col-span-8 space-y-6">
          <SocialFeed isDarkMode={isDarkMode} activeNetwork={activeNetwork} />
          <SocialMetrics isDarkMode={isDarkMode} activeNetwork={activeNetwork} />
        </div>

        {/* Planification et suggestions */}
        <div className="lg:col-span-4 space-y-6">
          <SocialScheduler isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
};

export default SocialPage;