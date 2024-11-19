import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Phone, 
  Video, 
  Image as ImageIcon,
  Smile,
  Send,
  MoreVertical,
  Filter
} from 'lucide-react';
import DataCard from '../components/DataCard';

interface MessagesPageProps {
  isDarkMode: boolean;
}

const MessagesPage: React.FC<MessagesPageProps> = ({ isDarkMode }) => {
  const [activeChat, setActiveChat] = useState('chat1');
  const [messageInput, setMessageInput] = useState('');

  const chats = [
    {
      id: 'chat1',
      name: 'Équipe Restaurant',
      platform: 'whatsapp',
      lastMessage: 'Planning du service de ce soir',
      time: '10:30',
      unread: 3,
      avatar: '👥'
    },
    {
      id: 'chat2',
      name: 'Service Technique',
      platform: 'telegram',
      lastMessage: 'Maintenance piscine effectuée',
      time: '09:15',
      unread: 0,
      avatar: '🔧'
    },
    {
      id: 'chat3',
      name: 'Reception',
      platform: 'imessage',
      lastMessage: 'Nouveau client arrivé en chambre 101',
      time: 'Hier',
      unread: 1,
      avatar: '🏨'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Chef Thomas',
      content: 'Le nouveau menu est prêt pour ce soir',
      time: '10:15',
      isMe: false
    },
    {
      id: 2,
      sender: 'Moi',
      content: 'Super ! Combien de couverts prévus ?',
      time: '10:20',
      isMe: true
    },
    {
      id: 3,
      sender: 'Marie',
      content: '45 réservations confirmées',
      time: '10:25',
      isMe: false
    }
  ];

  return (
    <div className="h-screen overflow-hidden p-4 lg:p-6">
      <div className="flex justify-between items-center mb-6 mt-12 lg:mt-0">
        <div>
          <h1 className={`text-xl lg:text-2xl font-bold ${
            isDarkMode ? 'text-gray-100' : 'text-luxury-brown'
          }`}>
            Messages
          </h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Toutes vos conversations au même endroit
          </p>
        </div>
        <button className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
          isDarkMode 
            ? 'bg-slate-800 hover:bg-slate-700' 
            : 'border border-gray-200 hover:bg-gray-50'
        }`}>
          <Filter className="w-5 h-5" />
          <span>Filtres</span>
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-180px)]">
        {/* Liste des conversations */}
        <div className="col-span-4 flex flex-col">
          <DataCard
            title="Conversations"
            isDarkMode={isDarkMode}
            className="flex-1"
          >
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className={`w-full pl-10 pr-4 py-2 rounded-lg ${
                    isDarkMode 
                      ? 'bg-slate-800 text-gray-100 placeholder-gray-500' 
                      : 'bg-gray-50 text-gray-900 placeholder-gray-500'
                  } border-0 focus:ring-2 focus:ring-blue-500`}
                />
                <Search className={`w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-400'
                }`} />
              </div>
            </div>

            <div className="space-y-2 overflow-y-auto">
              {chats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setActiveChat(chat.id)}
                  className={`w-full p-3 rounded-lg flex items-center gap-3 ${
                    activeChat === chat.id
                      ? isDarkMode
                        ? 'bg-blue-600 text-white'
                        : 'bg-indigo-600 text-white'
                      : isDarkMode
                      ? 'bg-slate-800 hover:bg-slate-700'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg">
                    {chat.avatar}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{chat.name}</h4>
                      <span className="text-xs">{chat.time}</span>
                    </div>
                    <p className={`text-sm truncate ${
                      activeChat === chat.id
                        ? 'text-gray-100'
                        : isDarkMode
                        ? 'text-gray-400'
                        : 'text-gray-500'
                    }`}>
                      {chat.lastMessage}
                    </p>
                  </div>
                  {chat.unread > 0 && (
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      activeChat === chat.id
                        ? 'bg-white text-indigo-600'
                        : isDarkMode
                        ? 'bg-blue-500 text-white'
                        : 'bg-indigo-500 text-white'
                    }`}>
                      {chat.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </DataCard>
        </div>

        {/* Conversation active */}
        <div className="col-span-8">
          <DataCard
            isDarkMode={isDarkMode}
            className="h-full flex flex-col"
          >
            {/* En-tête */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg bg-gray-100">
                  👥
                </div>
                <div>
                  <h3 className="font-medium">Équipe Restaurant</h3>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    8 participants
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className={`p-2 rounded-lg ${
                  isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'
                }`}>
                  <Phone className="w-5 h-5" />
                </button>
                <button className={`p-2 rounded-lg ${
                  isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'
                }`}>
                  <Video className="w-5 h-5" />
                </button>
                <button className={`p-2 rounded-lg ${
                  isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'
                }`}>
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] p-3 rounded-lg ${
                    message.isMe
                      ? isDarkMode
                        ? 'bg-blue-600 text-white'
                        : 'bg-indigo-600 text-white'
                      : isDarkMode
                      ? 'bg-slate-800'
                      : 'bg-gray-100'
                  }`}>
                    {!message.isMe && (
                      <span className={`text-sm font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {message.sender}
                      </span>
                    )}
                    <p className="mt-1">{message.content}</p>
                    <span className={`text-xs ${
                      message.isMe
                        ? 'text-gray-200'
                        : isDarkMode
                        ? 'text-gray-400'
                        : 'text-gray-500'
                    }`}>
                      {message.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <button className={`p-2 rounded-lg ${
                  isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'
                }`}>
                  <ImageIcon className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
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
          </DataCard>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;