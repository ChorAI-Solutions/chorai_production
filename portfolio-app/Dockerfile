# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:22-alpine

WORKDIR /app

RUN npm install -g http-server

COPY --from=builder /app/dist/portfolio/browser ./dist

EXPOSE 3001

CMD ["http-server", "dist", "-p", "3001", "-c-1"]
