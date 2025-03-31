from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import getMetodo, modificarEscanear, obtenerEscanear, vincularUsuario, setMetodo
from usuarios.tokens import token_required
from django.core.files.base import ContentFile
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import JSONParser, FormParser, MultiPartParser, FileUploadParser
from rest_framework.response import Response
from rest_framework import status
from django.core.files.base import ContentFile


@api_view(['POST'])
def obtenerMetodo(request):
    distancia =request.data.get('distancia')
    metodo = getMetodo('67c3b38a037f576fd63aa26f', distancia)
    return Response({"metodo":metodo}, status=status.HTTP_200_OK)

@api_view(['PUT'])
def modifEscanear(request):
    isModif =  modificarEscanear('67c3b38a037f576fd63aa26f')
    return Response({"modificado":isModif}, status=status.HTTP_200_OK)

@api_view(['GET'])
def obtenerEscan(request):
    isEscanTRUE = obtenerEscanear('67c3b38a037f576fd63aa26f')
    return Response({"escanear":isEscanTRUE}, status=status.HTTP_200_OK)

#vinvular el usuario a la maquina 
@api_view(['PUT'])
@token_required
def vincularUser(request):
    user_id = request.token_payload.get('user_id')
    datos = request.data
    vincularUsuario(datos.get('idMaquina'), user_id)
    return Response({'message': 'Usuario vinculado'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@parser_classes([JSONParser, FormParser, MultiPartParser, FileUploadParser])
def setImage(request):
    id = '67c3b38a037f576fd63aa26f'
    image = None
    
    # Manejo de diferentes tipos de carga de imagen
    if request.content_type and 'image/' in request.content_type:
        try:
            image = ContentFile(request.body, name='esp32_image.jpg')
        except Exception as e:
            return Response({'error': f'Error processing raw image: {str(e)}'}, 
                          status=status.HTTP_400_BAD_REQUEST)
    elif 'image' in request.FILES:
        image = request.FILES['image']
    
    # Validación de imagen
    if not image:
        return Response({'error': 'No image provided or unsupported format'}, 
                      status=status.HTTP_400_BAD_REQUEST)
    
    from maquinas.modelo.deteccion import clasificarImagen  

    # La función detectarObjeto ahora devuelve una tupla (detections, message)
    res, message = clasificarImagen(image)
    
    # Manejo de detecciones
    if not res:
        # Si no hay detecciones, usar "paper" por defecto
        respuesta = "paper"
        setMetodo(id, "paper")
    else:
        # Tomar la primera detección directamente
        respuesta = res[0]["class"]
        setMetodo(id, respuesta)
    
    return Response({
        'message': message or 'Imagen obtenida correctamente', 
        'class': respuesta
    }, status=status.HTTP_201_CREATED)