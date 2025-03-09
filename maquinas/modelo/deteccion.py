from ultralytics import YOLO
import cv2
import argparse
import os
import numpy as np

def detectarObjeto(image):
    model_path = os.path.join(os.path.dirname(__file__), "../modelo/best.pt")
    confidence_threshold=0.7
    try:
        model = YOLO(model_path)
    except Exception as e:
        return None, f"Error al cargar el modelo: {str(e)}"
    
    img_array = cv2.imdecode(np.frombuffer(image.read(), np.uint8), cv2.IMREAD_COLOR)
    if not isinstance(img_array, np.ndarray):
        return None, "Error: La imagen proporcionada no es válida."
    
    try:
        results = model(img_array)
    except Exception as e:
        return None, f"Error durante la detección: {str(e)}"
    
    detections = []
    annotated_image = img_array.copy()
    
    if results[0].boxes.conf is not None and len(results[0].boxes.conf) > 0:
        high_conf_mask = results[0].boxes.conf > confidence_threshold
        
        if high_conf_mask.any():
            annotated_image = results[0].plot()
            
            for box, conf, cls in zip(
                results[0].boxes.xyxy[high_conf_mask].cpu().numpy(), 
                results[0].boxes.conf[high_conf_mask].cpu().numpy(),
                results[0].boxes.cls[high_conf_mask].cpu().numpy()
            ):
                class_name = results[0].names[int(cls)]
                detections.append({
                    "class": class_name,
                    "confidence": float(conf),
                    "bbox": [float(x) for x in box]
                })
    
    if not detections:
        result_message = "No se detectaron objetos con suficiente confianza."
    else:
        result_message = f"Se detectaron {len(detections)} objetos:"
        for i, det in enumerate(detections, 1):
            result_message += f"\n{i}. {det['class']} (confianza: {det['confidence']:.2f})"
    
    return detections#annotated_image, result_message, detections