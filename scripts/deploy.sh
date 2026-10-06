#!/bin/bash

echo "Iniciando deploy da aplicação..."

# Parar serviço atual (se existir)
echo "Parando serviço atual..."
sudo systemctl stop task-api || true

# Atualizar código do repositório
echo "Atualizando código..."
git pull origin main

# Instalar dependências
npm ci --only=production

# Build da aplicação
npm run build

# Reiniciar serviço
sudo systemctl start task-api
sudo systemctl enable task-api

echo "Deploy concluído com sucesso!"
