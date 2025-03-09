import jwt
import datetime
from django.http import JsonResponse
from functools import wraps

def generate_token(user_id):
    payload = {
        'user_id': str(user_id),
        'exp': datetime.datetime.now(datetime.UTC) + datetime.timedelta(days=1),
        'iat': datetime.datetime.now(datetime.UTC)
    }
    token = jwt.encode(payload, 'tu_clave_secreta', algorithm='HS256')
    return token

def verify_token(token):
    try:
        payload = jwt.decode(token, 'tu_clave_secreta', algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
    


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        request = args[0]
        token = request.headers.get('Authorization')
        
        if not token:
            return JsonResponse({'message': 'Token faltante'}, status=401)
            
        try:

            if token.startswith('Bearer '):
                token = token[7:]
                
            payload = verify_token(token)
            if payload is None:
                return JsonResponse({'message': 'Token inválido'}, status=401)
                
    
            request.token_payload = payload
            
        except Exception as e:
            return JsonResponse({'message': str(e)}, status=401)
            
        return f(*args, **kwargs)
    return decorated