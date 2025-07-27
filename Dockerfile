# Backend Dockerfile
FROM node:20-alpine AS backend

WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --only=production

COPY backend/src ./src
COPY backend/tsconfig.json ./
RUN npm run build

# Frontend Dockerfile  
FROM node:20-alpine AS frontend-build

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci

COPY frontend/src ./src
COPY frontend/public ./public
COPY frontend/tsconfig.json ./
RUN npm run build

# Production image
FROM node:20-alpine AS production

WORKDIR /app

# Copy backend
COPY --from=backend /app/backend/dist ./backend/dist
COPY --from=backend /app/backend/package*.json ./backend/
COPY --from=backend /app/backend/node_modules ./backend/node_modules

# Copy frontend build
COPY --from=frontend-build /app/frontend/build ./frontend/build

# Install serve for frontend
RUN npm install -g serve

# Expose ports
EXPOSE 3000 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/api/health || exit 1

# Start script
COPY docker-start.sh ./
RUN chmod +x docker-start.sh

CMD ["./docker-start.sh"]
