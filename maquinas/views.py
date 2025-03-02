from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import getMetodo
# Create your views here.
@api_view(['GET'])
def obtenerMetodo(request):
    metodo = getMetodo('67c3b38a037f576fd63aa26f')
    return Response({"metodo":metodo}, status=status.HTTP_200_OK)
