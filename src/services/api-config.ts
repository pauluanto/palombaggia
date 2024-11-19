import { z } from 'zod';

export const APIConfigSchema = z.object({
  thais: z.object({
    apiKey: z.string(),
    environment: z.enum(['production', 'sandbox'])
  }).optional(),
  
  pennylane: z.object({
    clientId: z.string(),
    clientSecret: z.string()
  }).optional(),
  
  chatgpt: z.object({
    apiKey: z.string(),
    model: z.enum(['gpt-4', 'gpt-3.5-turbo'])
  }).optional(),
  
  gmail: z.object({
    clientId: z.string(),
    clientSecret: z.string(),
    accessToken: z.string(),
    refreshToken: z.string()
  }).optional(),
  
  googleCalendar: z.object({
    clientId: z.string(),
    clientSecret: z.string(),
    accessToken: z.string(),
    refreshToken: z.string()
  }).optional()
});

export type APIConfig = z.infer<typeof APIConfigSchema>;

class APIConfigManager {
  private static instance: APIConfigManager;
  private config: APIConfig = {};

  private constructor() {
    this.loadConfig();
  }

  static getInstance(): APIConfigManager {
    if (!APIConfigManager.instance) {
      APIConfigManager.instance = new APIConfigManager();
    }
    return APIConfigManager.instance;
  }

  private loadConfig() {
    try {
      const savedConfig = localStorage.getItem('api_config');
      if (savedConfig) {
        this.config = APIConfigSchema.parse(JSON.parse(savedConfig));
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la configuration:', error);
    }
  }

  saveConfig(newConfig: APIConfig) {
    try {
      const validatedConfig = APIConfigSchema.parse(newConfig);
      this.config = validatedConfig;
      localStorage.setItem('api_config', JSON.stringify(validatedConfig));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la configuration:', error);
      throw error;
    }
  }

  getConfig<K extends keyof APIConfig>(api: K): APIConfig[K] | undefined {
    return this.config[api];
  }

  isConfigured(api: keyof APIConfig): boolean {
    return !!this.config[api];
  }

  clearConfig(api: keyof APIConfig) {
    const newConfig = { ...this.config };
    delete newConfig[api];
    this.saveConfig(newConfig);
  }
}

export const apiConfig = APIConfigManager.getInstance();