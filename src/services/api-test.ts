import { OpenAI } from 'openai';
import axios from 'axios';
import { apiConfig } from './api-config';

export const testAPIConnection = async (api: string): Promise<{ success: boolean; error?: string }> => {
  try {
    switch (api) {
      case 'chatgpt':
        return await testOpenAI();
      case 'gmail':
        return await testGmailREST();
      case 'googleCalendar':
        return await testGoogleCalendarREST();
      case 'thais':
        return await testThais();
      case 'pennylane':
        return await testPennylane();
      default:
        throw new Error('API non supportée');
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Erreur de connexion'
    };
  }
};

const testOpenAI = async () => {
  const config = apiConfig.getConfig('chatgpt');
  if (!config?.apiKey) {
    throw new Error('Clé API OpenAI non configurée');
  }

  const openai = new OpenAI({
    apiKey: config.apiKey,
    dangerouslyAllowBrowser: true
  });

  try {
    await openai.chat.completions.create({
      model: config.model || 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Test de connexion' }],
      max_tokens: 5
    });
    return { success: true };
  } catch (error: any) {
    throw new Error(`Erreur OpenAI: ${error.message}`);
  }
};

const testGmailREST = async () => {
  const config = apiConfig.getConfig('gmail');
  if (!config) {
    throw new Error('Configuration Gmail manquante');
  }

  try {
    const response = await axios.get('https://gmail.googleapis.com/gmail/v1/users/me/profile', {
      headers: {
        'Authorization': `Bearer ${config.accessToken}`
      }
    });
    return { success: response.status === 200 };
  } catch (error: any) {
    throw new Error(`Erreur Gmail: ${error.message}`);
  }
};

const testGoogleCalendarREST = async () => {
  const config = apiConfig.getConfig('googleCalendar');
  if (!config) {
    throw new Error('Configuration Google Calendar manquante');
  }

  try {
    const response = await axios.get('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
      headers: {
        'Authorization': `Bearer ${config.accessToken}`
      }
    });
    return { success: response.status === 200 };
  } catch (error: any) {
    throw new Error(`Erreur Google Calendar: ${error.message}`);
  }
};

const testThais = async () => {
  const config = apiConfig.getConfig('thais');
  if (!config?.apiKey) {
    throw new Error('Clé API THAIS non configurée');
  }

  try {
    const response = await axios.get('https://api.thais.fr/v1/test', {
      headers: {
        'Authorization': `Bearer ${config.apiKey}`
      }
    });
    return { success: response.status === 200 };
  } catch (error: any) {
    throw new Error(`Erreur THAIS: ${error.message}`);
  }
};

const testPennylane = async () => {
  const config = apiConfig.getConfig('pennylane');
  if (!config) {
    throw new Error('Configuration Pennylane manquante');
  }

  try {
    const response = await axios.get('https://api.pennylane.tech/test', {
      auth: {
        username: config.clientId,
        password: config.clientSecret
      }
    });
    return { success: response.status === 200 };
  } catch (error: any) {
    throw new Error(`Erreur Pennylane: ${error.message}`);
  }
};