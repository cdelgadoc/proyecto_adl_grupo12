from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
from PIL import Image
import numpy as np
import io
import cv2
import os

# Crear la aplicación FastAPI
app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cargar el modelo YOLO
model = YOLO("model/best.pt")

CLASS_COLORS = {
    0: (0, 0, 204),      
    1: (0, 128, 255),    
    2: (0, 255, 255),    
    3: (255, 0, 255),    
    4: (255, 255, 0),    
    5: (204, 0, 0),      
    6: (255, 128, 0),    
    7: (128, 0, 128),    
    8: (128, 128, 0),    
    9: (0, 128, 128),    
    10: (128, 128, 128), 
    11: (0, 0, 0),       
    12: (255, 165, 0),   
    13: (64, 224, 208),  
    14: (75, 0, 130),    
    15: (255, 20, 147),  
    16: (0, 255, 127),   
    17: (127, 255, 212), 
    18: (255, 105, 180), 
    19: (255, 69, 0),    
    20: (34, 139, 34),   
    21: (173, 255, 47),  
    22: (220, 20, 60)    
}

def get_text_color(background_color):
    """Determina si el color del texto debe ser blanco o negro basado en el brillo del fondo."""
    brightness = (background_color[0] * 0.299 + background_color[1] * 0.587 + background_color[2] * 0.114)
    return (255, 255, 255) if brightness < 128 else (0, 0, 0)

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    """
    Recibe una imagen, realiza detección de objetos y devuelve la imagen procesada.
    """
    try:
        # Leer la imagen subida
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        np_image = np.array(image)

        # Convertir la imagen de RGB a BGR para usarla con OpenCV
        np_image_bgr = cv2.cvtColor(np_image, cv2.COLOR_RGB2BGR)

        # Realizar la predicción con YOLO
        results = model.predict(np_image_bgr, conf=0.5)

        # Dibujar las detecciones en la imagen utilizando OpenCV
        for result in results:
            boxes = result.boxes.xyxy  # Coordenadas de las cajas delimitadoras (x1, y1, x2, y2)
            confs = result.boxes.conf  # Confianzas (probabilidades)
            classes = result.boxes.cls  # Índices de clase

            # Dibujar cada caja en la imagen
            for box, conf, cls in zip(boxes, confs, classes):
                x1, y1, x2, y2 = map(int, box)  # Extraer coordenadas y convertir a enteros
                class_id = int(cls)

                # Obtener el color para la clase
                color = CLASS_COLORS.get(class_id, (0, 255, 0))  # Por defecto usa verde si la clase no está en el diccionario
                label = f"{model.names[class_id]} {conf:.2f}"  # Obtener la etiqueta y la confianza

                # Dibujar la caja delimitadora con un borde más grueso
                box_thickness = 4  # Incrementar el grosor del borde
                cv2.rectangle(np_image_bgr, (x1, y1), (x2, y2), color, box_thickness)

                # Obtener el color del texto basado en el brillo del color del fondo
                text_color = get_text_color(color)

                # Dibujar la etiqueta de la detección con un tamaño de letra más grande
                font_scale = 1.0  # Incrementar el tamaño de la fuente
                label_thickness = 3
                label_size, _ = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, font_scale, label_thickness)
                label_ymin = max(y1, label_size[1] + 10)
                cv2.rectangle(np_image_bgr, (x1, label_ymin - label_size[1] - 10),
                              (x1 + label_size[0], label_ymin + 4), color, cv2.FILLED)
                cv2.putText(np_image_bgr, label, (x1, label_ymin), cv2.FONT_HERSHEY_SIMPLEX, font_scale, text_color, label_thickness)

        # Convertir la imagen procesada de nuevo a RGB para guardar y enviar
        processed_image_rgb = cv2.cvtColor(np_image_bgr, cv2.COLOR_BGR2RGB)

        # Guardar la imagen procesada temporalmente
        output_path = "processed_image.jpg"
        Image.fromarray(processed_image_rgb).save(output_path)
        
        # Devolver la imagen procesada al cliente
        return FileResponse(output_path, media_type="image/jpeg")

    except Exception as e:
        # Manejo de errores
        return {"error": str(e)}
