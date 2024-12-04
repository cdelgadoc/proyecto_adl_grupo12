# Imagen base
FROM nginx:alpine

# Copiar archivos de producción de Angular al servidor NGINX
COPY dist/animal-detection-app/ /usr/share/nginx/html

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 4200
EXPOSE 4200

# Comando para iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]
