from db_con import db
from bson import ObjectId
from datetime import datetime, timedelta, timezone
from dateutil.parser import parse
import bcrypt

miColeccion = db["usuarios"]

def getUserByEmail(email):
    mongo_user = miColeccion.find_one({"email": email})
    if not mongo_user:
        raise ValueError("No se encontro el usuario")
    mongo_user['_id'] = str(mongo_user['_id'])
    return mongo_user

def registrarUsuario(usuario):
    try:
        getUserByEmail(usuario['email'])
    except Exception:
        reg = miColeccion.insert_one(usuario)
        return str(reg.inserted_id)
    raise ValueError("El correo electronico ya esta vinculado a una cuenta.")


def getUsuarioById(id):
    usuario = miColeccion.find_one({'_id': ObjectId(id)})

    if not usuario:
        return None

    fecha_actual = datetime.now(timezone.utc)
    inicio_semana = fecha_actual - timedelta(days=fecha_actual.weekday())
    inicio_semana = inicio_semana.replace(hour=0, minute=0, second=0, microsecond=0)

    total_depositos = len(usuario.get('historial', []))
    depositos_semana = 0

    if 'historial' in usuario:
        for deposito in usuario['historial']:
            try:
                fecha_str = deposito['fecha']['$date']
                fecha_str = fecha_str.rstrip('Z')
                fecha_deposito = parse(fecha_str).astimezone(timezone.utc)
                if fecha_deposito >= inicio_semana:
                    depositos_semana += 1
            except (KeyError, ValueError, TypeError) as e:
                print(f"Error procesando fecha: {e}")
                continue

    usuario['depTotales'] = total_depositos
    usuario['depSemana'] = depositos_semana

    usuario.pop('_id', None)
    usuario.pop('password', None)

    return usuario

def getUsuarioPerfilbyId(id):
    usuario = miColeccion.find_one({'_id': ObjectId(id)})
    usuario.pop('_id', None)
    usuario.pop('password', None)
    return usuario

def actPerfil(id, username, telefono):
    try:
        miColeccion.update_one(
            {'_id': ObjectId(id)},
            {
                '$set': {
                    'username': username,
                    'telefono': telefono
                }
            }
        )
        return True
    except Exception as e:
        return False

#actualizar contraseña
def actPass(id, password):
    try:
        salt = bcrypt.gensalt()
        miColeccion.update_one(
            {'_id': ObjectId(id)},
            {
                '$set': {
                    'password': bcrypt.hashpw(password.encode('utf-8'), salt),
                }
            }
        )
        return True
    except Exception as e:
        print("error: ")
        return False
    
def validarPassword(id, password):
    user = miColeccion.find_one({'_id': ObjectId(id)})
    hashed_password = user.get('password')
    password_matches = bcrypt.checkpw(
            password.encode('utf-8'), 
            hashed_password
        )
    return password_matches

#puede que se mueva a otra aplicacion
def agregarDeposito(usuario_id, material):
    try:
        id_objeto = ObjectId(usuario_id)
        
        fecha_actual = datetime.now(timezone.utc).isoformat() + "Z"
        
        nuevo_deposito = {
            "fecha": {
                "$date": fecha_actual
            },
            "material": material
        }
        
        resultado = miColeccion.update_one(
            {"_id": id_objeto},
            {"$push": {"historial": nuevo_deposito}}
        )
        
        if resultado.modified_count > 0:
            return True
        else:
            print(f"No se pudo actualizar el usuario {usuario_id}")
            return False
            
    except Exception as e:
        print(f"Error al agregar depósito: {str(e)}")
        return False
    


