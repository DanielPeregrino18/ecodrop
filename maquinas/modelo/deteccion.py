"""from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
import os
import cv2
import numpy as np
from ultralytics import YOLO

class SetImageView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        try:
            image = request.FILES.get('imagen')
            if not image:
                return Response({"error": "No se proporcionó imagen"}, status=status.HTTP_400_BAD_REQUEST)
            
            # La función detectarObjeto ahora devuelve una tupla (detections, message)
            detections, message = detectarObjeto(image=image)
            
            # Si no hay detecciones, devolver un mensaje apropiado
            if not detections:
                return Response({
                    "message": "No se detectaron objetos",
                    "detections": []
                }, status=status.HTTP_200_OK)
            
            # Si hay detecciones, procesar el primer objeto
            first_detection = detections[0]
            
            return Response({
                "message": message,
                "class": first_detection["class"],
                "confidence": first_detection["confidence"]
            }, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({
                "error": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def detectarObjeto(image):
    model_path = os.path.join(os.path.dirname(__file__), "../modelo/best.pt")
    confidence_threshold = 0.4
    
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
    
    if results[0].boxes.conf is not None and len(results[0].boxes.conf) > 0:
        high_conf_mask = results[0].boxes.conf > confidence_threshold
        
        if high_conf_mask.any():
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
    
    print(detections)
    
    return detections, result_message"""
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
import os
import cv2
import numpy as np
from ultralytics import YOLO

class SetImageView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        try:
            image = request.FILES.get('imagen')
            if not image:
                return Response({"error": "No se proporcionó imagen"}, status=status.HTTP_400_BAD_REQUEST)
            
            # La función clasificarImagen ahora devuelve una tupla (predictions, message)
            predictions, message = clasificarImagen(image=image)
            
            # Si no hay predicciones, devolver un mensaje apropiado
            if not predictions:
                return Response({
                    "message": "No se pudo clasificar la imagen",
                    "predictions": []
                }, status=status.HTTP_200_OK)
            
            # Si hay predicciones, procesar la primera (la de mayor confianza)
            first_prediction = predictions[0]
            
            return Response({
                "message": message,
                "class": first_prediction["class"],
                "confidence": first_prediction["confidence"]
            }, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({
                "error": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def clasificarImagen(image):
    model_path = os.path.join(os.path.dirname(__file__), "../modelo/best929.pt")
    confidence_threshold = 0.45
    
    try:
        model = YOLO(model_path)
    except Exception as e:
        return None, f"Error al cargar el modelo: {str(e)}"
    
    img_array = cv2.imdecode(np.frombuffer(image.read(), np.uint8), cv2.IMREAD_COLOR)
    if not isinstance(img_array, np.ndarray):
        return None, "Error: La imagen proporcionada no es válida."
    
    try:
        # Para modelos de clasificación, usa el parámetro task
        results = model(img_array, task='classify')
    except Exception as e:
        return None, f"Error durante la clasificación: {str(e)}"
    
    predictions = []
    
    # La estructura de resultados es diferente para tareas de clasificación
    if len(results) > 0 and hasattr(results[0], 'probs'):
        # Obtener las probabilidades
        probs = results[0].probs
        
        # Obtener las clases con mayor confianza
        top_indices = probs.top5
        top_confs = probs.top5conf.cpu().numpy()
        
        for idx, conf in zip(top_indices, top_confs):
            if conf > confidence_threshold:
                class_name = results[0].names[int(idx)]
                predictions.append({
                    "class": class_name,
                    "confidence": float(conf)
                    # No hay bbox en clasificación
                })
    
    if not predictions:
        result_message = "No se pudo clasificar la imagen con suficiente confianza."
    else:
        result_message = f"Clasificación exitosa:"
        for i, pred in enumerate(predictions, 1):
            result_message += f"\n{i}. {pred['class']} (confianza: {pred['confidence']:.2f})"
    
    print(predictions)
    
    return predictions, result_message