from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .models import getUserByEmail, registrarUsuario, getUsuarioById, getUsuarioPerfilbyId, actPerfil, validarPassword, actPass
import bcrypt
from .tokens import token_required, generate_token

@api_view(['POST'])
def login(request):
    try:
        if 'email' not in request.data:
            return Response({
                "error": "El campo email es requerido"
            }, status=status.HTTP_400_BAD_REQUEST)

        mongo_user = getUserByEmail(request.data['email'])
        hashed_password = mongo_user.get('password')
        
        password_matches = bcrypt.checkpw(
            request.data['password'].encode('utf-8'), 
            hashed_password
        )

        if not password_matches:
            return Response({
                "error": "Credenciales incorrectas"
            }, status=status.HTTP_401_UNAUTHORIZED)

        return Response({
            "token": generate_token(mongo_user['_id'])
        }, status=status.HTTP_200_OK)
    except ValueError as e:
        return Response({
            "error": str(e)
        }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({
            "error": str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(['POST'])
def registro(request):
    usuario = request.data
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(usuario['password'].encode('utf-8'), salt)
    usuario['password'] = hashed_password
    usuario['saldo'] = 0.0
    usuario['racha'] = 0
    usuario['nivel'] = 1
    usuario['exp'] = 0
    usuario['metaexp'] = 10
    usuario['historial'] = []
    usuario['telefono'] = ''
    try:
        res = registrarUsuario(usuario)
        return Response({
            "token": generate_token(res)
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            "error": "El correo electronico ya esta  vinculado a una cuenta."
        }, status=status.HTTP_200_OK)
    
@api_view(['POST'])
@token_required
def getUsuario(request):
    user_id = request.token_payload.get('user_id')
    user = getUsuarioById(user_id)
    return Response(user, status=status.HTTP_200_OK)

@api_view(['POST'])
@token_required
def getUsuarioPerfil(request):
    user_id = request.token_payload.get('user_id')
    user = getUsuarioPerfilbyId(user_id)
    return Response(user, status=status.HTTP_200_OK)

@api_view(['PUT'])
@token_required
def actualizarPerfil(request):
    user_id = request.token_payload.get('user_id')
    datos = request.data
   
    if validarPassword(user_id,datos.get('password')):
       if actPerfil(user_id, datos.get('username'), datos.get('telefono')):
           return Response({"mensaje":"Usuario actuallizado correctamente"}, status=status.HTTP_200_OK)
       return Response({"error":"No se pudo actualizar la información"}, status=status.HTTP_400_BAD_REQUEST)
    return Response({"error":"La contraseña es incorrecta"}, status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['PUT'])
@token_required
def actualizarPassword(request):
    user_id = request.token_payload.get('user_id')
    datos = request.data
    if validarPassword(user_id, datos.get('oldPassword')):
        if datos.get('oldPassword') !=  datos.get('newPassword'):
            if actPass(user_id, datos.get('newPassword')):
                return Response({"mensaje":"Contraseña actualizada correctamente"}, status=status.HTTP_200_OK)
            return Response({"error":"No se pudo actualizar la información"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error":"La contraseña nueva no puede ser igual a la anterior"}, status=status.HTTP_400_BAD_REQUEST)
    return Response({"error":"La contraseña es incorrecta"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def prueba(request):
    return Response({"mensaje":""}, status=status.HTTP_200_OK)