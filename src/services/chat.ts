import api from './api';
import { io, Socket } from 'socket.io-client';

export interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: string;
  read: boolean;
  attachments?: Array<{
    type: 'image' | 'file';
    url: string;
    name: string;
  }>;
}

export interface Chat {
  id: string;
  type: 'direct' | 'group';
  name?: string;
  participants: Array<{
    id: string;
    name: string;
    avatar?: string;
  }>;
  lastMessage?: Message;
  unreadCount: number;
}

class ChatService {
  private socket: Socket | null = null;
  private messageHandlers: Array<(message: Message) => void> = [];

  constructor() {
    this.initializeSocket();
  }

  private initializeSocket() {
    this.socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001', {
      auth: {
        token: localStorage.getItem('auth_token')
      }
    });

    this.socket.on('message', (message: Message) => {
      this.messageHandlers.forEach(handler => handler(message));
    });
  }

  onMessage(handler: (message: Message) => void) {
    this.messageHandlers.push(handler);
    return () => {
      this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
    };
  }

  async getChats(): Promise<Chat[]> {
    const { data } = await api.get('/chats');
    return data;
  }

  async getMessages(chatId: string, page: number = 1): Promise<Message[]> {
    const { data } = await api.get(`/chats/${chatId}/messages`, {
      params: { page }
    });
    return data;
  }

  async sendMessage(chatId: string, content: string, attachments?: File[]): Promise<Message> {
    const formData = new FormData();
    formData.append('content', content);
    
    if (attachments) {
      attachments.forEach(file => {
        formData.append('attachments', file);
      });
    }

    const { data } = await api.post(`/chats/${chatId}/messages`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return data;
  }

  async createGroupChat(name: string, participantIds: string[]): Promise<Chat> {
    const { data } = await api.post('/chats/group', {
      name,
      participantIds
    });
    return data;
  }

  async addParticipants(chatId: string, participantIds: string[]): Promise<Chat> {
    const { data } = await api.post(`/chats/${chatId}/participants`, {
      participantIds
    });
    return data;
  }

  async removeParticipant(chatId: string, participantId: string): Promise<Chat> {
    const { data } = await api.delete(`/chats/${chatId}/participants/${participantId}`);
    return data;
  }

  async markAsRead(chatId: string): Promise<void> {
    await api.post(`/chats/${chatId}/read`);
  }
}

export const chatService = new ChatService();