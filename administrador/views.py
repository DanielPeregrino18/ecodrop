from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from usuarios.tokens import token_required
from rest_framework import status
from .models import verificarAdministrador, obtenerEstadisticas

@api_view(['GET'])
@token_required
def getEstadisticas(request):  
    user_id = request.token_payload.get('user_id')
    if verificarAdministrador(user_id):
        res = obtenerEstadisticas()
        return Response({'estadisticas': res}, status=status.HTTP_201_CREATED)
    else:
        return Response({'message': 'El usuario no es administrador'}, status=status.HTTP_401_UNAUTHORIZED)