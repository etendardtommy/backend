# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies if needed (e.g. for bcrypt or other native modules)
RUN apk add --no-cache python3 make g++

COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies (incluants les devDependencies pour le build)
RUN npm install

# Copier le reste du code
COPY . .

# Définir Prisma pour générer le client
RUN npx prisma generate

# Build l'application NestJS
RUN npm run build

# ---
# Production stage
FROM node:20-alpine

WORKDIR /app

# Variables d'environnement pour la production
ENV NODE_ENV=production

# Copier les fichiers critiques depuis le builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Dossier pour les uploads (s'il y en a)
RUN mkdir -p /app/uploads

EXPOSE 3000

CMD ["npx", "prisma", "migrate", "deploy", "&&", "node", "dist/main"]
