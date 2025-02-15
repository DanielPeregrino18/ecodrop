from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
import pymongo
from django.contrib.auth.hashers import make_password

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
db = myclient['ecodrop']

#falta poner validacion si viene vacio el request o no existe el username
@api_view(['POST'])
def login(request):
    try:
        user = User.objects.get(email=request.data['email'])
    except User.DoesNotExist:
        return Response({"error": "No existe usuario con este email"}, status=status.HTTP_404_NOT_FOUND)

    if not user.check_password(request.data['password']):
        return Response({"error": "Contraseña inválida"}, status=status.HTTP_400_BAD_REQUEST)

    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)
    return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    try:
        user = User.objects.get(email=request.data['email'])
        return Response({"error": "El email ya esta registrado"})
    except User.DoesNotExist:
        if serializer.is_valid():
            serializer.save()
            user = User.objects.get(username=serializer.data['username'])
            password = serializer.validated_data['password']
            user.set_password(password)
            user.save()
            mycol = db["usuarios"]
            user_data = serializer.validated_data
            user_data['password'] = make_password(password)
            mycol.insert_one(user_data)
            token = Token.objects.create(user=user)
            return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_201_CREATED)
    return Response({"error":"El nombre de usaurio ya esta registrado."})

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def profile(request):
    django_user = request.user

    mycol = db["usuarios"]
    mongo_user = mycol.find_one({"email": django_user.email})  

    if not mongo_user:
        return Response({"error": "Usuario no encontrado en MongoDB"}, status=status.HTTP_404_NOT_FOUND)

    mongo_user['_id'] = str(mongo_user['_id'])
    return Response(mongo_user, status=status.HTTP_200_OK)
    
    
    #mycol = db["usuarios"]
    #users = list(mycol.find())  
    #serializer = UserSerializer(users, many=True)   
    #return Response(serializer.data)
    
    #return Response("You are loggin whit {}".format(request.user.username), status=status.HTTP_200_OK)
    #serializer = UserSerializer(instance = request.user)
    #return Response(serializer.data, status=status.HTTP_200_OK)
    #return Response({"usuario":"prueba"})
