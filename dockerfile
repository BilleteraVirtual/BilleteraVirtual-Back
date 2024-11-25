# Etapa 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Definir argumentos de construcción para las variables de entorno
ARG APP_ENV
ARG DB_HOST
ARG DB_USER
ARG DB_PASSWORD
ARG DB_NAME
ARG DB_PORT

# Copiar los archivos de configuración e instalar dependencias
COPY ./package*.json ./
RUN npm install

# Copiar el resto de los archivos y construir la aplicación
COPY . .

# Crear archivo .env con las variables de entorno proporcionadas
RUN mkdir -p ./env && \
    echo "APP_ENV=$APP_ENV" > ./env/production.env && \
    echo "DB_HOST=$DB_HOST" >> ./env/production.env && \
    echo "DB_USER=$DB_USER" >> ./env/production.env && \
    echo "DB_PASSWORD=$DB_PASSWORD" >> ./env/production.env && \
    echo "DB_NAME=$DB_NAME" >> ./env/production.env && \
    echo "DB_PORT=$DB_PORT" >> ./env/production.env

# Construir la aplicación
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
