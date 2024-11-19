import api from './api';

export interface Email {
  id: string;
  subject: string;
  from: string;
  to: string[];
  content: string;
  attachments?: Array<{
    filename: string;
    content: string;
  }>;
  date: string;
  read: boolean;
  important: boolean;
  labels: string[];
}

export const emailService = {
  async getEmails(folder: string = 'inbox', page: number = 1): Promise<Email[]> {
    const { data } = await api.get(`/emails/${folder}`, { params: { page } });
    return data;
  },

  async sendEmail(email: Omit<Email, 'id' | 'date' | 'read'>): Promise<Email> {
    const { data } = await api.post('/emails', email);
    return data;
  },

  async markAsRead(id: string): Promise<void> {
    await api.patch(`/emails/${id}/read`);
  },

  async toggleImportant(id: string): Promise<void> {
    await api.patch(`/emails/${id}/important`);
  },

  async addLabel(id: string, label: string): Promise<void> {
    await api.post(`/emails/${id}/labels`, { label });
  },

  async removeLabel(id: string, label: string): Promise<void> {
    await api.delete(`/emails/${id}/labels/${label}`);
  },

  async deleteEmail(id: string): Promise<void> {
    await api.delete(`/emails/${id}`);
  }
};