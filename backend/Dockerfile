# Imagen base de Python 3.12
FROM python:3.12-slim

# Instala las dependencias del sistema necesarias
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo requirements.txt al directorio de trabajo
COPY requirements.txt .

# Instala las dependencias de la aplicación
RUN pip install --no-cache-dir -r requirements.txt

# Copia el resto de los archivos al directorio de trabajo
COPY . .

# Expone el puerto 8000 en el contenedor
EXPOSE 8000

# Comando para ejecutar la aplicación
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
