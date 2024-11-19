import React, { useState } from 'react';
import { MessageSquare, Send, Loader, Sparkles } from 'lucide-react';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Bonjour! Je suis votre assistant IA. Comment puis-je vous aider dans la gestion de l\'hôtel aujourd\'hui?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setIsLoading(true);
    
    // Simulation de réponse
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Je comprends votre demande. Je vais vous aider avec la gestion des réservations.'
      }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="card h-[400px] flex flex-col relative overflow-hidden group">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#0EA5E9,transparent_70%)]"></div>
      </div>

      <div className="flex items-center gap-3 p-4 border-b border-surface-border">
        <div className="p-2 rounded-lg bg-secondary/10 float">
          <Sparkles className="w-5 h-5 text-secondary" />
        </div>
        <h3 className="text-lg font-semibold text-primary">Assistant IA</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg transition-all duration-300 ${
                message.role === 'user'
                  ? 'bg-secondary text-white shadow-soft'
                  : 'bg-surface-hover text-primary'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-surface-hover p-3 rounded-lg">
              <Loader className="w-4 h-4 animate-spin text-secondary" />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-surface-border bg-surface-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez votre question..."
            className="input flex-1"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="btn btn-primary p-2"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;