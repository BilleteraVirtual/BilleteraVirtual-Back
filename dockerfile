# Etapa 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar los archivos de configuración e instalar dependencias
COPY ./package*.json ./
RUN npm install

# Copiar el resto de los archivos y construir la aplicación
COPY . .
RUN npm run build

# Etapa 2: Run
FROM node:18-alpine AS runner

WORKDIR /app

# Copiar el build generado en la etapa anterior
COPY --from=builder /app/dist ./dist
COPY ./package*.json ./

# Instalar solo dependencias necesarias para producción
RUN npm install

# Exponer el puerto
EXPOSE 8081

# Comando para ejecutar la aplicación
CMD ["npm", "start"]