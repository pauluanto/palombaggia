import { useState, useCallback } from 'react';
import { generateResponse } from '../services/chatgpt';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  error?: boolean;
}

export const useChatGPT = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback(async (content: string, role: string = 'hotel') => {
    try {
      setIsTyping(true);
      
      // Ajouter le message de l'utilisateur
      const userMessage: Message = {
        id: Date.now(),
        role: 'user',
        content,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, userMessage]);

      // Obtenir la réponse
      const response = await generateResponse(content, role);
      
      // Ajouter la réponse de l'assistant
      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response || 'Désolé, je n\'ai pas pu générer une réponse.',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      // Gérer l'erreur
      const errorMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `Erreur: ${error.message}`,
        timestamp: new Date().toLocaleTimeString(),
        error: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, []);

  return {
    messages,
    isTyping,
    sendMessage
  };
};