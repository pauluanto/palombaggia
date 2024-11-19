import OpenAI from 'openai';
import { apiConfig } from './api-config';

let openai: OpenAI | null = null;

export const initializeOpenAI = () => {
  const config = apiConfig.getConfig('chatgpt');
  if (!config?.apiKey) {
    throw new Error('Clé API OpenAI non configurée');
  }

  try {
    openai = new OpenAI({
      apiKey: config.apiKey,
      dangerouslyAllowBrowser: true
    });
    return true;
  } catch (error) {
    console.error('Erreur d\'initialisation OpenAI:', error);
    return false;
  }
};

export const generateResponse = async (message: string, role = 'hotel') => {
  if (!openai) {
    initializeOpenAI();
  }

  if (!openai) {
    throw new Error('OpenAI n\'est pas initialisé. Veuillez configurer votre clé API.');
  }

  const systemMessages = {
    hotel: "Vous êtes un assistant hôtelier expert pour l'hôtel Palombaggia. Répondez de manière professionnelle et précise aux questions concernant l'hôtel, les réservations, et les services.",
    concierge: "Vous êtes le concierge de l'hôtel Palombaggia. Votre rôle est de fournir des recommandations personnalisées sur les activités, restaurants et expériences locales.",
    tech: "Vous êtes l'assistant technique de l'hôtel Palombaggia. Vous aidez à résoudre les problèmes techniques, de maintenance et d'équipement."
  };

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemMessages[role as keyof typeof systemMessages]
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
      presence_penalty: 0.1,
      frequency_penalty: 0.1
    });

    return completion.choices[0].message.content;
  } catch (error: any) {
    console.error('Erreur OpenAI:', error);
    
    if (error.status === 401) {
      throw new Error('Clé API invalide ou expirée');
    }
    if (error.status === 429) {
      throw new Error('Quota dépassé. Veuillez vérifier votre abonnement OpenAI.');
    }
    if (error.status === 404) {
      throw new Error('Le modèle spécifié n\'est pas disponible. Utilisation de gpt-3.5-turbo.');
    }
    
    throw new Error(error.message || 'Erreur de communication avec OpenAI');
  }
};