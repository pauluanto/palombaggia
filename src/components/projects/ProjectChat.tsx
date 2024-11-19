import React, { useState } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';
import DataCard from '../DataCard';

interface ProjectChatProps {
  isDarkMode: boolean;
  projectId: string;
}

interface Message {
  id: number;
  sender: string;
  content: string;
  time: string;
  avatar: string;
}

const messages: Message[] = [
  {
    id: 1,
    sender: 'Marie D.',
    content: 'Les échantillons de peinture sont arrivés',
    time: '10:30',
    avatar: 'MD'
  },
  {
    id: 2,
    sender: 'Thomas R.',
    content: 'Super, on peut commencer les tests demain matin',
    time: '10:35',
    avatar: 'TR'
  },
  {
    id: 3,
    sender: 'Paul A.',
    content: 'N\'oubliez pas de prendre des photos avant/après',
    time: '10:40',
    avatar: 'PA'
  }
];

const ProjectChat: React.FC<ProjectChatProps> = ({ isDarkMode, projectId }) => {
  const [newMessage, setNewMessage] = useState('');

  return (
    <DataCard
      title="Discussion du projet"
      isDarkMode={isDarkMode}
      className="h-[calc(100vh-280px)]"
    >
      <div className="flex flex-col h-full">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 p-4">
          {messages.map(message => (
            <div key={message.id} className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                isDarkMode ? 'bg-slate-700' : 'bg-gray-100'
              }`}>
                {message.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{message.sender}</span>
                  <span className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {message.time}
                  </span>
                </div>
                <p className={`mt-1 text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {message.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className={`p-4 border-t ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center gap-2">
            <button className={`p-2 rounded-lg ${
              isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'
            }`}>
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Écrivez votre message..."
              className={`flex-1 px-4 py-2 rounded-lg ${
                isDarkMode 
                  ? 'bg-slate-800 text-gray-100 placeholder-gray-500' 
                  : 'bg-gray-50 text-gray-900 placeholder-gray-500'
              } border-0 focus:ring-2 focus:ring-blue-500`}
            />
            <button className={`p-2 rounded-lg ${
              isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'
            }`}>
              <Smile className="w-5 h-5" />
            </button>
            <button className={`p-2 rounded-lg text-white ${
              isDarkMode 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}>
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </DataCard>
  );
};

export default ProjectChat;