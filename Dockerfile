FROM node:22.11.0 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build
RUN npm prune --production

# Etapa 2: Imagem final para produção
FROM node:22.11.0-alpine
WORKDIR /app

# Copia os arquivos do build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package*.json ./

EXPOSE 3000
CMD ["node", "dist/main.js"]