#!/bin/bash

# Usage: ./deploy.sh user@hostname

if [ -z "$1" ]; then
    echo "Please provide the target server (e.g., user@hostname)"
    exit 1
fi

TARGET=$1
PROJECT_NAME="koppen"

echo "Deploying to $TARGET..."

# Create .env file for production if it doesn't exist
if [ ! -f ".env.prod" ]; then
    echo "Creating .env.prod file..."
    echo "POSTGRES_PASSWORD=$(openssl rand -base64 32)" > .env.prod
fi

# Copy files to the server
echo "Copying files to server..."
ssh $TARGET "mkdir -p ~/$PROJECT_NAME"
scp -r Dockerfile docker-compose.prod.yml .env.prod koppen/ $TARGET:~/$PROJECT_NAME/

# Setup and start the application
echo "Starting application..."
ssh $TARGET "cd ~/$PROJECT_NAME && \
    docker compose -f docker-compose.prod.yml down && \
    docker compose -f docker-compose.prod.yml pull && \
    docker compose -f docker-compose.prod.yml up -d --build"

echo "Deployment completed!"
