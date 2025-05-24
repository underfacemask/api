# Sintaxe multistage para imagem mais enxuta
FROM node:18-alpine AS builder

WORKDIR /app

# Copia package.json e package-lock para instalar deps
COPY package*.json ./

RUN npm install --legacy-peer-deps

# Copia o resto do código
COPY . .

# Transpila ou prepara build se for o caso (não obrigatório para JS puro)
# RUN npm run build

# Imagem final
FROM node:18-alpine

WORKDIR /app

# Apenas as dependências de produção
COPY package*.json ./
RUN npm install --only=production --legacy-peer-deps

# Copia código do estágio builder
COPY --from=builder /app ./

# Expõe porta onde o Express vai rodar
EXPOSE 3000

# Variáveis de ambiente
ENV NODE_ENV=production

# Comando para iniciar
CMD ["node", "src/server.js"]
