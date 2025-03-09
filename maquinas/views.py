from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import getMetodo, modificarEscanear, obtenerEscanear, vincularUsuario
from maquinas.modelo.deteccion import detectarObjeto
from usuarios.tokens import token_required

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

@api_view(['POST'])
def setImage(request):
        image = request.FILES.get('image')
        if not image:
            return Response({'error': 'No image provided'}, status=status.HTTP_400_BAD_REQUEST)
        res = detectarObjeto(image=image)
        print(res)
        if not res:
              return Response({'message': 'Imagen obtenida correctamente', 'class': "vacio"}, status=status.HTTP_201_CREATED)
        return Response({'message': 'Imagen obtenida correctamente', 'class': res[0].get("class")}, status=status.HTTP_201_CREATED)

#vinvular el usuario a la maquina 
@api_view(['PUT'])
@token_required
def vincularUser(request):
    user_id = request.token_payload.get('user_id')
    datos = request.data
    vincularUsuario(datos.get('idMaquina'), user_id)
    return Response({'message': 'Usuario vinculado'}, status=status.HTTP_201_CREATED)