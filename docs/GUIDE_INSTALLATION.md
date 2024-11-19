# Guide d'installation Palombaggia 360°

## Table des matières
1. [THAIS PMS - Gestion des réservations](#1-thais-pms)
2. [Pennylane - Comptabilité](#2-pennylane)
3. [Crédit Agricole - Banque](#3-credit-agricole)
4. [ChatGPT - Assistant IA](#4-chatgpt)
5. [Google Drive - Documents](#5-google-drive)

## 1. THAIS PMS

### Étape 1 : Obtenir les accès THAIS
1. Connectez-vous à votre compte THAIS : https://thais.fr
2. Allez dans "Paramètres" > "API & Intégrations"
3. Cliquez sur "Générer une nouvelle clé API"
4. Copiez la clé API

### Étape 2 : Configuration dans Palombaggia 360°
1. Dans l'application, allez dans "Paramètres"
2. Sélectionnez "Intégrations" > "THAIS PMS"
3. Collez votre clé API
4. Cliquez sur "Tester la connexion"
5. Sauvegardez

## 2. Pennylane

### Étape 1 : Configuration Pennylane
1. Connectez-vous à Pennylane : https://app.pennylane.com
2. Accédez à "Paramètres" > "Intégrations"
3. Créez une nouvelle clé API
4. Notez l'ID client et la clé secrète

### Étape 2 : Connexion dans Palombaggia 360°
1. Dans Paramètres > "Intégrations" > "Pennylane"
2. Remplissez :
   - ID Client
   - Clé secrète
3. Cliquez sur "Connecter"
4. Validez les autorisations demandées

## 3. Crédit Agricole

### Étape 1 : Activation API Bancaire
1. Contactez votre conseiller Crédit Agricole Corse
2. Demandez l'activation de l'API professionnelle
3. Récupérez vos identifiants API :
   - Client ID
   - Client Secret
   - Numéro de compte

### Étape 2 : Configuration dans l'application
1. Dans Paramètres > "Intégrations" > "Crédit Agricole"
2. Entrez :
   - Client ID
   - Client Secret
   - IBAN
3. Validez la connexion

## 4. ChatGPT

### Étape 1 : Création compte OpenAI
1. Allez sur https://platform.openai.com
2. Créez un compte ou connectez-vous
3. Accédez à "API Keys"
4. Cliquez sur "Create new secret key"
5. Copiez la clé (elle ne sera plus visible après)

### Étape 2 : Activation Assistant IA
1. Dans Paramètres > "Intégrations" > "ChatGPT"
2. Collez votre clé API OpenAI
3. Choisissez le modèle (GPT-4 recommandé)
4. Activez les fonctionnalités souhaitées

## 5. Google Drive

### Étape 1 : Configuration Google Cloud
1. Visitez https://console.cloud.google.com
2. Créez un nouveau projet
3. Activez l'API Google Drive
4. Créez des identifiants OAuth 2.0
5. Téléchargez le fichier credentials.json

### Étape 2 : Configuration dans l'application
1. Dans Paramètres > "Intégrations" > "Google Drive"
2. Importez le fichier credentials.json
3. Autorisez l'accès à votre Drive
4. Sélectionnez le dossier principal

## Vérification finale

Pour chaque intégration, vérifiez que :
- Les données s'affichent correctement
- Les synchronisations fonctionnent
- Les erreurs sont signalées

## Support

En cas de problème :
- Email : support@palombaggia360.com
- Téléphone : +33 4 XX XX XX XX
- Documentation : https://docs.palombaggia360.com