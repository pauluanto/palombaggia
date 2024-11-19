import React, { useState, useEffect } from 'react';
import { Bot, Send, Settings, X, Hotel, Briefcase, Wrench } from 'lucide-react';
import { initializeOpenAI } from '../services/chatgpt';
import { useChatGPT } from '../hooks/useChatGPT';
import { apiConfig } from '../services/api-config';
import DataCard from '../components/DataCard';

interface ChatGPTPageProps {
  isDarkMode: boolean;
}

const ChatGPTPage: React.FC<ChatGPTPageProps> = ({ isDarkMode }) => {
  const [showConfig, setShowConfig] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const { messages, isTyping, sendMessage } = useChatGPT();
  const [messageInput, setMessageInput] = useState('');
  const [selectedRole, setSelectedRole] = useState<'hotel' | 'concierge' | 'tech'>('hotel');
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');

  useEffect(() => {
    const config = apiConfig.getConfig('chatgpt');
    if (config?.apiKey) {
      setApiKey(config.apiKey);
      initializeOpenAI();
    }
  }, []);

  const handleSendMessage = async () => {
    if (!messageInput.trim()) return;
    await sendMessage(messageInput, selectedRole);
    setMessageInput('');
  };

  const handleTestConnection = async () => {
    if (!apiKey) {
      alert('Veuillez d\'abord entrer une clé API');
      return;
    }

    setTestStatus('testing');
    try {
      await apiConfig.saveConfig({
        chatgpt: {
          apiKey,
          model: 'gpt-3.5-turbo'
        }
      });
      
      if (initializeOpenAI()) {
        setTestStatus('success');
      } else {
        setTestStatus('error');
      }
    } catch (error) {
      setTestStatus('error');
      console.error('Erreur de test:', error);
    }
  };

  const handleSaveConfig = () => {
    if (!apiKey) {
      alert('Veuillez entrer une clé API');
      return;
    }

    try {
      apiConfig.saveConfig({
        chatgpt: {
          apiKey,
          model: 'gpt-3.5-turbo'
        }
      });
      
      if (initializeOpenAI()) {
        setShowConfig(false);
        setTestStatus('idle');
      } else {
        alert('Erreur lors de l\'initialisation de l\'API');
      }
    } catch (error) {
      console.error('Erreur de sauvegarde:', error);
      alert('Erreur lors de la sauvegarde de la configuration');
    }
  };

  const roles = [
    { id: 'hotel', name: 'Assistant Hôtelier', icon: Hotel },
    { id: 'concierge', name: 'Concierge', icon: Briefcase },
    { id: 'tech', name: 'Support Technique', icon: Wrench }
  ];

  return (
    <div className="h-screen overflow-y-auto p-4 lg:p-6">
      <div className="flex justify-between items-center mb-6 mt-12 lg:mt-0">
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
        <button
          onClick={() => setShowConfig(true)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            isDarkMode 
              ? 'bg-slate-800 hover:bg-slate-700' 
              : 'border border-gray-200 hover:bg-gray-50'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span>Configuration</span>
        </button>
      </div>

      {/* Sélection du rôle */}
      <div className="flex gap-4 mb-6">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => setSelectedRole(role.id as typeof selectedRole)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              selectedRole === role.id
                ? isDarkMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-secondary text-white'
                : isDarkMode
                ? 'bg-slate-800 text-gray-300'
                : 'bg-white text-gray-600'
            }`}
          >
            <role.icon className="w-5 h-5" />
            <span>{role.name}</span>
          </button>
        ))}
      </div>

      <DataCard
        title="Conversation"
        icon={Bot}
        isDarkMode={isDarkMode}
        className="h-[calc(100vh-280px)]"
      >
        <div className="flex flex-col h-full">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] p-3 rounded-lg ${
                  message.role === 'user'
                    ? isDarkMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-secondary text-white'
                    : isDarkMode
                    ? 'bg-slate-700'
                    : 'bg-gray-100'
                } ${message.error ? 'border-red-500 border' : ''}`}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <span className={`text-xs ${
                    message.role === 'user'
                      ? 'text-gray-200'
                      : isDarkMode
                      ? 'text-gray-400'
                      : 'text-gray-500'
                  }`}>
                    {message.timestamp}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className={`p-3 rounded-lg ${
                  isDarkMode ? 'bg-slate-700' : 'bg-gray-100'
                }`}>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100" />
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className={`p-4 border-t ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex gap-2">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Posez votre question..."
                className={`flex-1 px-4 py-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-slate-700 text-gray-100 placeholder-gray-400' 
                    : 'bg-gray-50 text-gray-900 placeholder-gray-500'
                } border-0 focus:ring-2 focus:ring-blue-500`}
              />
              <button
                onClick={handleSendMessage}
                disabled={!messageInput.trim() || isTyping}
                className={`p-2 rounded-lg text-white ${
                  isDarkMode 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-secondary hover:bg-secondary-light'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </DataCard>

      {/* Modal Configuration */}
      {showConfig && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className={`w-full max-w-md p-6 rounded-xl ${
            isDarkMode ? 'bg-slate-800' : 'bg-white'
          }`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Configuration OpenAI</h2>
              <button 
                onClick={() => setShowConfig(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Clé API OpenAI
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className={`w-full px-4 py-2 rounded-lg ${
                    isDarkMode
                      ? 'bg-slate-700 text-gray-100'
                      : 'bg-gray-50 text-gray-900'
                  } border-0 focus:ring-2 focus:ring-blue-500`}
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowConfig(false)}
                  className={`px-4 py-2 rounded-lg ${
                    isDarkMode
                      ? 'text-gray-300 hover:bg-slate-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Annuler
                </button>
                <button
                  onClick={handleTestConnection}
                  className={`px-4 py-2 rounded-lg ${
                    isDarkMode
                      ? 'bg-gray-600 hover:bg-gray-700'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  Tester la connexion
                </button>
                <button
                  onClick={handleSaveConfig}
                  className={`px-4 py-2 rounded-lg text-white ${
                    isDarkMode
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-secondary hover:bg-secondary-light'
                  }`}
                >
                  Sauvegarder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatGPTPage;