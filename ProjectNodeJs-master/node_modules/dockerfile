# Dockerfile pour Node.js
FROM node:20-alpine

# Dossier de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le projet
COPY . .

# Exposer le port sur lequel l'app tourne
EXPOSE 3000

# Lancer l'application
CMD ["node", "scripts.js"]
