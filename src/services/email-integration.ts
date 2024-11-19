import axios from 'axios';
import { apiConfig } from './api-config';

export interface EmailConfig {
  clientId: string;
  clientSecret: string;
  accessToken?: string;
  refreshToken?: string;
}

class EmailIntegration {
  private baseUrl = 'https://gmail.googleapis.com/gmail/v1/users/me';
  private accessToken: string | null = null;

  constructor() {
    this.initializeClient();
  }

  private initializeClient() {
    const config = apiConfig.getConfig('gmail');
    if (config?.accessToken) {
      this.accessToken = config.accessToken;
    }
  }

  getAuthUrl(): string {
    const config = apiConfig.getConfig('gmail');
    if (!config?.clientId) {
      throw new Error('Configuration Gmail non disponible');
    }

    const params = new URLSearchParams({
      client_id: config.clientId,
      redirect_uri: `${window.location.origin}/auth/google/callback`,
      response_type: 'code',
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/gmail.modify',
      prompt: 'consent'
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  async handleAuthCallback(code: string): Promise<any> {
    const config = apiConfig.getConfig('gmail');
    if (!config?.clientId || !config?.clientSecret) {
      throw new Error('Configuration Gmail incomplète');
    }

    try {
      const response = await axios.post(
        'https://oauth2.googleapis.com/token',
        {
          code,
          client_id: config.clientId,
          client_secret: config.clientSecret,
          redirect_uri: `${window.location.origin}/auth/google/callback`,
          grant_type: 'authorization_code'
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      const { access_token, refresh_token } = response.data;
      this.accessToken = access_token;

      apiConfig.saveConfig({
        gmail: {
          ...config,
          accessToken: access_token,
          refreshToken: refresh_token
        }
      });

      return response.data;
    } catch (error) {
      console.error('Erreur d\'authentification Gmail:', error);
      throw error;
    }
  }

  private async request<T>(endpoint: string, options: any = {}): Promise<T> {
    if (!this.accessToken) {
      throw new Error('Non authentifié');
    }

    try {
      const response = await axios({
        url: `${this.baseUrl}${endpoint}`,
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        },
        ...options
      });

      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        await this.refreshAccessToken();
        return this.request(endpoint, options);
      }
      throw error;
    }
  }

  private async refreshAccessToken(): Promise<void> {
    const config = apiConfig.getConfig('gmail');
    if (!config?.clientId || !config?.clientSecret || !config?.refreshToken) {
      throw new Error('Configuration de rafraîchissement manquante');
    }

    try {
      const response = await axios.post(
        'https://oauth2.googleapis.com/token',
        {
          client_id: config.clientId,
          client_secret: config.clientSecret,
          refresh_token: config.refreshToken,
          grant_type: 'refresh_token'
        }
      );

      this.accessToken = response.data.access_token;
      apiConfig.saveConfig({
        gmail: {
          ...config,
          accessToken: response.data.access_token
        }
      });
    } catch (error) {
      console.error('Erreur lors du rafraîchissement du token:', error);
      throw error;
    }
  }

  async listEmails(maxResults: number = 10): Promise<any[]> {
    try {
      const response = await this.request<any>('/messages', {
        params: {
          maxResults,
          labelIds: ['INBOX']
        }
      });

      const emails = await Promise.all(
        response.messages.map(async (message: any) => {
          const details = await this.request<any>(`/messages/${message.id}`);
          const headers = details.payload.headers;
          
          return {
            id: message.id,
            subject: headers.find((h: any) => h.name === 'Subject')?.value,
            from: headers.find((h: any) => h.name === 'From')?.value,
            date: headers.find((h: any) => h.name === 'Date')?.value,
            snippet: details.snippet
          };
        })
      );

      return emails;
    } catch (error) {
      console.error('Erreur lors de la récupération des emails:', error);
      throw error;
    }
  }

  async markAsRead(messageId: string): Promise<void> {
    await this.request(`/messages/${messageId}/modify`, {
      method: 'POST',
      data: {
        removeLabelIds: ['UNREAD']
      }
    });
  }

  async archiveEmail(messageId: string): Promise<void> {
    await this.request(`/messages/${messageId}/modify`, {
      method: 'POST',
      data: {
        removeLabelIds: ['INBOX']
      }
    });
  }
}

export const emailIntegration = new EmailIntegration();