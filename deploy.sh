#!/bin/bash

# Deploy script for task-manager application
# Usage: ./deploy.sh

set -e

echo "🚀 Starting deployment..."

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
APP_DIR="/var/www/task-manager"
DOCKER_COMPOSE_FILE="docker-compose.yml"
ENV_FILE=".env"

echo -e "${BLUE}Step 1: Pulling latest code...${NC}"
cd $APP_DIR
git pull origin develop

echo -e "${BLUE}Step 2: Copying .env file...${NC}"
if [ ! -f $ENV_FILE ]; then
    cp .env.example $ENV_FILE
    echo -e "${RED}⚠️  .env file created. Please configure it with your secrets!${NC}"
fi

echo -e "${BLUE}Step 3: Building and starting Docker containers...${NC}"
docker-compose down
docker-compose build --no-cache
docker-compose up -d

echo -e "${BLUE}Step 4: Running database migrations...${NC}"
docker-compose exec -T app npm run migrate 2>/dev/null || echo "No migrations to run"

echo -e "${BLUE}Step 5: Checking application health...${NC}"
sleep 5
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Application is running!${NC}"
else
    echo -e "${RED}❌ Application health check failed!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${GREEN}Application is running at: http://localhost:3000${NC}"
