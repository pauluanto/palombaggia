import React from 'react';
import { Bot } from 'lucide-react';
import DataCard from '../components/DataCard';
import AIAssistant from '../components/AIAssistant';

interface ChatbotPageProps {
  isDarkMode: boolean;
}

const ChatbotPage: React.FC<ChatbotPageProps> = ({ isDarkMode }) => {
  return (
    <div className="h-screen overflow-y-auto p-4 lg:p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className={`text-xl lg:text-2xl font-bold ${
            isDarkMode ? 'text-gray-100' : 'text-luxury-brown'
          }`}>
            Assistant IA
          </h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Votre assistant personnel pour la gestion de l'hôtel
          </p>
        </div>
      </div>

      <DataCard
        title="Conversation"
        icon={Bot}
        isDarkMode={isDarkMode}
      >
        <AIAssistant />
      </DataCard>
    </div>
  );
};

export default ChatbotPage;