# Configuration des variables d'environnement

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
# THAIS PMS
THAIS_API_KEY=votre_cle_api
THAIS_API_URL=https://api.thais.fr

# Pennylane
PENNYLANE_CLIENT_ID=votre_client_id
PENNYLANE_CLIENT_SECRET=votre_client_secret
PENNYLANE_API_URL=https://api.pennylane.tech

# Crédit Agricole
CA_CLIENT_ID=votre_client_id
CA_CLIENT_SECRET=votre_client_secret
CA_API_URL=https://api.credit-agricole.fr

# OpenAI (ChatGPT)
OPENAI_API_KEY=votre_cle_api

# Google Drive
GOOGLE_DRIVE_CLIENT_ID=votre_client_id
GOOGLE_DRIVE_CLIENT_SECRET=votre_client_secret
GOOGLE_DRIVE_REDIRECT_URI=http://localhost:3000/auth/google/callback

# Autres configurations
NODE_ENV=development
PORT=3000
```

⚠️ IMPORTANT : Ne jamais commiter le fichier .env dans Git !