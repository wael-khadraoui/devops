# Railway Deployment Guide

## 🚀 Déploiement automatique via GitLab CI/CD

### Étape 1: Créer un projet Railway

1. Allez sur https://railway.app
2. Connectez-vous avec GitHub ou email
3. Créez un nouveau projet: **Empty Project**
4. Ajoutez votre application depuis GitLab

### Étape 2: Obtenir le Railway Token

```bash
# Installez Railway CLI
npm install -g @railway/cli

# Connectez-vous
railway login

# Obtenez votre token
railway whoami --token
```

Copiez le token affiché.

### Étape 3: Obtenir le Project ID

```bash
# Dans votre dossier projet
railway link

# Affichez l'ID du projet
railway status
```

Ou trouvez-le dans l'URL Railway: `https://railway.app/project/{PROJECT_ID}`

### Étape 4: Configurer GitLab CI/CD Variables

Allez à: https://gitlab.com/rawaaaa/projet-devops-2025/-/settings/ci_cd

Ajoutez ces variables:

```
Key: RAILWAY_TOKEN
Value: (votre token Railway)
Type: Variable
Protected: Non
Masked: Oui

Key: RAILWAY_PROJECT_ID  
Value: (votre project ID)
Type: Variable
Protected: Non
Masked: Non
```

### Étape 5: Ajouter MySQL sur Railway

1. Dans votre projet Railway, cliquez **"New"**
2. Sélectionnez **"Database"** → **"MySQL"**
3. Railway créera automatiquement la base de données

### Étape 6: Variables d'environnement Railway

Dans Railway, ajoutez:

```
NODE_ENV=production
PORT=${{PORT}}
DB_HOST=${{MYSQL_HOST}}
DB_PORT=${{MYSQL_PORT}}
DB_USER=${{MYSQL_USER}}
DB_PASSWORD=${{MYSQL_PASSWORD}}
DB_NAME=${{MYSQL_DATABASE}}
JWT_SECRET=your-secret-key-change-this
```

Railway injecte automatiquement les variables MySQL avec `${{...}}`.

### Étape 7: Déployer

1. Pushez votre code sur la branche `main`:
   ```bash
   git checkout main
   git merge develop
   git push origin main
   ```

2. Allez dans GitLab: **CI/CD → Pipelines**

3. Cliquez sur le bouton **"Play"** (▶) du job `deploy_railway`

4. Le pipeline déploiera automatiquement votre app sur Railway!

### Étape 8: Vérifier le déploiement

Une fois le déploiement terminé:
- Allez sur Railway Dashboard
- Cliquez sur **"Settings"** → **"Domains"**
- Copiez votre URL: `https://your-app.up.railway.app`

## 🔧 Commandes utiles

```bash
# Vérifier les logs
railway logs

# Redéployer manuellement
railway up

# Voir les variables d'environnement
railway variables

# Ouvrir l'app dans le navigateur
railway open
```

## 📊 Pipeline CI/CD complet

```
┌─────────────┐
│   BUILD     │ → Construire l'image Docker
│             │   Pousser vers Docker Hub
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   TEST      │ → Installer les dépendances
│             │   Exécuter les tests
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   DEPLOY    │ → Déployer sur Railway
│  (Manual)   │   Disponible sur internet
└─────────────┘
```

## ❓ Dépannage

### Erreur: "RAILWAY_TOKEN not found"
- Vérifiez que vous avez ajouté `RAILWAY_TOKEN` dans GitLab CI/CD Variables

### Erreur: "Project not found"
- Vérifiez le `RAILWAY_PROJECT_ID`
- Assurez-vous d'avoir créé le projet sur Railway

### L'app ne démarre pas
- Vérifiez les logs Railway: `railway logs`
- Vérifiez que toutes les variables d'environnement sont configurées
- Assurez-vous que MySQL est connecté

## 🎉 Félicitations!

Votre application est maintenant déployée automatiquement via CI/CD GitLab → Railway!

Chaque push sur `main` déclenchera le pipeline et déploiera votre app.
