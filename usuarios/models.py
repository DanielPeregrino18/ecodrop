from db_con import db
from bson import ObjectId
from datetime import datetime, timedelta, timezone
from dateutil.parser import parse
import bcrypt
import pytz

usuariosDB = db["usuarios"]
logrosDB = db["logros"]
def getUserByEmail(email):
    mongo_user = usuariosDB.find_one({"email": email})
    if not mongo_user:
        raise ValueError("No se encontro el usuario")
    mongo_user['_id'] = str(mongo_user['_id'])
    return mongo_user

def registrarUsuario(usuario):
    try:
        getUserByEmail(usuario['email'])
    except Exception:
        reg = usuariosDB.insert_one(usuario)
        return str(reg.inserted_id)
    raise ValueError("El correo electronico ya esta vinculado a una cuenta.")


def getUsuarioById(id):
    usuario = usuariosDB.find_one({'_id': ObjectId(id)})

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
                fecha_deposito = None
                if isinstance(deposito['fecha'], datetime):
                    fecha_deposito = deposito['fecha']
                    if fecha_deposito.tzinfo is None:
                        fecha_deposito = fecha_deposito.replace(tzinfo=timezone.utc)
                elif isinstance(deposito['fecha'], dict) and '$date' in deposito['fecha']:
                    fecha_str = deposito['fecha']['$date']
                    fecha_str = fecha_str.rstrip('Z')
                    fecha_deposito = parse(fecha_str)
                    if fecha_deposito.tzinfo is None:
                        fecha_deposito = fecha_deposito.replace(tzinfo=timezone.utc)
                    else:
                        fecha_deposito = fecha_deposito.astimezone(timezone.utc)
                
                if fecha_deposito and fecha_deposito >= inicio_semana:
                    depositos_semana += 1
            except (KeyError, ValueError, TypeError) as e:
                print(f"Error procesando fecha: {e}")
                continue
    usuario['historial'] = list(reversed(usuario['historial']))
    usuario['depTotales'] = total_depositos
    usuario['depSemana'] = depositos_semana

    usuario.pop('_id', None)
    usuario.pop('password', None)

    return usuario

def getUsuarioPerfilbyId(id):
    usuario = usuariosDB.find_one({'_id': ObjectId(id)})
    usuario.pop('_id', None)
    usuario.pop('password', None)
    return usuario

def getIdUsuarioByRFID(tag):
    usuario = usuariosDB.find_one({ "tag": tag })
    if usuario:
        return str(usuario["_id"])
    return None 

def actPerfil(id, username, telefono):
    try:
        usuariosDB.update_one(
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
        usuariosDB.update_one(
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
    user = usuariosDB.find_one({'_id': ObjectId(id)})
    hashed_password = user.get('password')
    password_matches = bcrypt.checkpw(
            password.encode('utf-8'), 
            hashed_password
        )
    return password_matches

"""
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
        
        resultado = usuariosDB.update_one(
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
    """

def getLogrosUsuario(id):
    user = getUsuarioById(id)
    logrosObtenidosIds = user.get("logros", [])

    logrosObtenidos = list(logrosDB.find({'_id': {'$in': logrosObtenidosIds}}))
    logrosNoObtenidos = list(logrosDB.find({'_id': {'$nin': logrosObtenidosIds}}))
    
    for logro in logrosObtenidos:
        logro["tipo"] = "obtenido"
    
    for logro in logrosNoObtenidos:
        logro["tipo"] = "no obtenido"

    res = {
        "obtenidos": logrosObtenidos,
        "no_obtenidos": logrosNoObtenidos,
    }
    
    return res

def cambiarIconoDB(id , icono):
    try:
        usuariosDB.update_one(
                {'_id': ObjectId(id)},
                {
                    '$set': {
                        'icono': icono ,
                    }
                }
            )
        return True
    except Exception as e:
        return False
    
    
def getAllUsuarios():
    campos = {
        "username": 1,
        "saldo": 1,
        "racha": 1, 
        "exp": 1,
        "icono": 1,
        "email": 1,
        "_id": 0  
    }
    
    lista_usuarios = list(usuariosDB.find({}, campos).sort("exp", -1).limit(5))
    
    return lista_usuarios


# METODOS QUE SE USARAN EN MAQUINAS

def agregarDep(id, material):
    user = usuariosDB.find_one({'_id': ObjectId(id)})
    user['depTotales'] = len(user['historial'])
    precios = {"plastic": 0.10, "metal": 0.20, "paper": 0}
    valorExp = {"plastic": 2, "metal": 3, "paper": 1}
    
    mexico_timezone = pytz.timezone('America/Mexico_City')
    fecha_actual = datetime.now(mexico_timezone)
    fecha_actual = fecha_actual.replace(hour=6, minute=0, second=0, microsecond=0)
    
    sumaSaldo = precios[material]
    sumaExp = valorExp[material]+user['exp']
    incrementarMeta = 0
    incrementarNivel = 0
    if sumaExp >= user['metaexp']:
        incrementarMeta = 10
        sumaExp = 0
        incrementarNivel = 1
        user['nivel'] +=1
    nuevoDeposito = {"fecha": fecha_actual, "tipo": material}

    #verificar si se obtuvo un logro
    logrosObtenidosIds = user.get("logros", [])
    logrosNoObtenidos = list(logrosDB.find({'_id': {'$nin': logrosObtenidosIds}}))
    addLogro = []
    for logro in logrosNoObtenidos:
        tipo = logro['criterio']['tipo']
        if user[tipo] >= logro['criterio']['cantidad']: #logro obtenido
            addLogro.append(logro['_id'])

    #verificar si se aumenta la racha:
    dia_anterior = fecha_actual - timedelta(days=1)
    historial = list(user['historial'])
    sumRacha = 0
    if user["racha"] == 0:
        sumRacha = 1
    else:
        for deposito in historial:
            if deposito["fecha"].date() == fecha_actual.date():
                sumRacha = 0
                break
            if deposito["fecha"].date() == dia_anterior.date():
                sumRacha = 1
    update_query = {
        "$push": {"historial": nuevoDeposito}, 
        "$inc": {
            "saldo": sumaSaldo,  
            "metaexp": incrementarMeta,
            "nivel": incrementarNivel,
            "racha": sumRacha
        },
        "$set": {
            "exp": sumaExp  
        }
    }
    if addLogro:
        update_query["$push"]["logros"] = {"$each": addLogro}

    usuariosDB.update_one(
        {'_id': ObjectId(id)},
        update_query
    )
   #exp = user['exp']
   #metaExp = user['metaexp']
 
