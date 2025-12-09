# Deployment Guide

## Vercel Deployment

### Prerequisites
- Vercel account (https://vercel.com)
- GitHub repository with your code
- Environment variables configured

### Environment Variables

Set these in Vercel Project Settings → Environment Variables:

```env
# Database Configuration
DB_HOST=your-mysql-host
DB_PORT=3306
DB_USER=your-db-user
DB_PASSWORD=your-secure-password
DB_NAME=task_manager

# Node.js Configuration
NODE_ENV=production
PORT=3000
```

**Note:** For MySQL, you can use:
- Vercel's managed databases (if available)
- AWS RDS
- DigitalOcean Managed Databases
- Other cloud MySQL providers

### Automatic Deployment (Recommended)

1. **Connect GitHub Repository:**
   - Go to Vercel → Add New Project
   - Select your GitHub repository (wael-khadraoui/devops)
   - Import

2. **Configure Build Settings:**
   - **Framework Preset:** Other
   - **Build Command:** `npm install && npm test`
   - **Output Directory:** (leave empty)
   - **Install Command:** `npm install`

3. **Deploy:**
   - Vercel auto-deploys on every push to `main`
   - Preview deployments for pull requests
   - Automatic rollback on failures

### Manual Deployment via GitLab CI/CD

Deployment is triggered via webhook from GitLab CI/CD:

1. **Get Vercel Deploy Hook:**
   - Vercel Project → Settings → Git → Deploy Hooks
   - Create hook for `main` branch
   - Copy the URL

2. **Set GitLab CI Variable:**
   - GitLab Project → Settings → CI/CD → Variables
   - Add `VERCEL_DEPLOY_HOOK` with the webhook URL
   - Mark as **Masked**

3. **Pipeline Trigger:**
   - Push to `main` branch
   - Pipeline runs: Build → Test → Deploy
   - `deploy_vercel` job triggers Vercel webhook
   - Vercel builds and deploys your app

### Deployment with Docker (Alternative)

If using your own server instead of Vercel:

1. **Cloner le projet**
```bash
git clone https://gitlab.com/rawaaaa/projet-devops-2025.git
cd projet-devops-2025
```

2. **Configurer les variables d'environnement**
```bash
cp .env.example .env
# Éditez .env avec vos configurations
```

3. **Lancer l'application**
```bash
docker-compose up -d
```

4. **Accéder à l'application**
- App: http://localhost:3000
- Base de données: localhost:3306

### Sans Docker (Développement local)

```bash
npm install
npm run dev
```

## 📁 Structure du projet

```
.
├── routes/              # API routes
│   ├── users.js
│   └── tasks.js
├── models/              # Database models
│   └── db.js
├── public/              # Frontend files
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── profil.html
│   ├── tasks.html
│   ├── script.js
│   └── styles.css
├── middlewares/         # Express middleware
│   └── auth.js
├── Dockerfile           # Docker image config
├── docker-compose.yml   # Multi-container config
├── init.sql            # Database initialization
├── deploy.sh           # Deployment script
├── server.js           # Main application
├── package.json        # Dependencies
└── .gitlab-ci.yml      # CI/CD pipeline
```

## 🔧 Configuration

### Variables d'environnement (.env)

```env
# Base de données
DB_HOST=mysql
DB_USER=taskuser
DB_PASSWORD=your_secure_password
DB_NAME=task_manager

# JWT
JWT_SECRET=your_jwt_secret

# Application
NODE_ENV=production
PORT=3000
```

## 🔄 CI/CD Pipeline

Le pipeline GitLab effectue automatiquement:

1. **Build** - Construction de l'image Docker
2. **Test** - Exécution des tests
3. **Deploy** - Déploiement en production

### Statut du pipeline
https://gitlab.com/rawaaaa/projet-devops-2025/-/pipelines

## 📦 Dépendances

- **Express.js** - Framework web
- **MySQL2** - Driver MySQL
- **Socket.io** - Communication temps réel
- **JWT** - Authentification
- **bcryptjs** - Hachage de mots de passe
- **CORS** - Gestion des requêtes cross-origin

## 🚢 Déploiement sur serveur

### Méthode 1: VPS (Recommended)

```bash
# Sur le serveur
git clone <repo> /var/www/task-manager
cd /var/www/task-manager
chmod +x deploy.sh
./deploy.sh
```

### Méthode 2: Render.com

1. Connectez votre repo GitLab
2. Configurez les variables d'environnement
3. Déployement automatique à chaque push sur `main`

### Méthode 3: Heroku

```bash
heroku login
heroku create
git push heroku develop:main
```

## 🔒 Sécurité

- Les mots de passe sont hashés avec bcryptjs
- JWT pour l'authentification
- CORS configuré
- Variables sensibles dans `.env` (non versionné)

## 📝 Commandes utiles

```bash
# Développement
npm run dev          # Démarrer avec nodemon

# Production
npm start            # Démarrer l'application

# Tests
npm test             # Exécuter les tests

# Docker
docker-compose up    # Démarrer les containers
docker-compose down  # Arrêter les containers
docker-compose logs  # Voir les logs
```

## 🐛 Dépannage

### La base de données ne se connecte pas
```bash
# Vérifier que MySQL est en cours d'exécution
docker-compose logs mysql

# Redémarrer les containers
docker-compose restart
```

### Port déjà utilisé
```bash
# Modifier le port dans docker-compose.yml
# Ou arrêter l'application qui utilise le port
docker ps
docker stop <container_id>
```

## 📧 Support

Pour toute question, créez une issue sur GitLab:
https://gitlab.com/rawaaaa/projet-devops-2025/-/issues

## 📄 License

ISC
