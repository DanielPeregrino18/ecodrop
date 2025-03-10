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


@api_view(['GET'])
def obtenerMetodo(request):
    metodo = getMetodo('67c3b38a037f576fd63aa26f')
    return Response({"metodo":metodo}, status=status.HTTP_200_OK)

@api_view(['PUT'])
def modifEscanear(request):
    isModif =  modificarEscanear('67c3b38a037f576fd63aa26f')
    return Response({"modificado":isModif}, status=status.HTTP_200_OK)

@api_view(['GET'])
def obtenerEscan(request):
    isEscanTRUE = obtenerEscanear('67c3b38a037f576fd63aa26f')
    return Response({"escanear":isEscanTRUE}, status=status.HTTP_200_OK)
"""
@api_view(['POST'])
def setImage(request):
        print(request.data)
        print(request.Files)
        image = request.FILES.get('image')
        if not image:
            return Response({'error': 'No image provided'}, status=status.HTTP_400_BAD_REQUEST)
        res = detectarObjeto(image=image)
        print(res)
        if not res:
              return Response({'message': 'Imagen obtenida correctamente', 'class': "vacio"}, status=status.HTTP_201_CREATED)
        return Response({'message': 'Imagen obtenida correctamente', 'class': res[0].get("class")}, status=status.HTTP_201_CREATED)
"""
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
    image = None
    
    # Caso para ESP32: imagen enviada como datos binarios directos con content-type image/jpeg
    if request.content_type and 'image/' in request.content_type:
        try:
            # Guardar los datos binarios directamente como archivo
            image = ContentFile(request.body, name='esp32_image.jpg')
        except Exception as e:
            return Response({'error': f'Error processing raw image: {str(e)}'}, 
                          status=status.HTTP_400_BAD_REQUEST)
    # Caso normal: multipart/form-data
    elif 'image' in request.FILES:
        image = request.FILES['image']
    
    # Verifica si se obtuvo la imagen
    if not image:
        return Response({'error': 'No image provided or unsupported format'}, 
                      status=status.HTTP_400_BAD_REQUEST)
    from maquinas.modelo.deteccion import detectarObjeto

    # Procesa la imagen
    res = detectarObjeto(image=image)
    
    if not res:
     #   setMetodo("paper")
        return Response({'message': 'Imagen obtenida correctamente', 'class': "papelvacio"}, status=status.HTTP_201_CREATED) 
    setMetodo('67c3b38a037f576fd63aa26f',material=res[0].get("class"))
    return Response({'message': 'Imagen obtenida correctamente', 'class': res[0].get("class")}, 
                  status=status.HTTP_201_CREATED)