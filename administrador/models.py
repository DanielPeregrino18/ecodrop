from db_con import db
from bson import ObjectId
from usuarios.models import getUsuarioById

estadisticas = db['estadisticas']

def verificarAdministrador(id):
    user = getUsuarioById(id)
    return user.get('admin')

def obtenerEstadisticas():
    result = list(estadisticas.find({}))
    return convert_objectid(result) 

def convert_objectid(data):
    if isinstance(data, ObjectId):
        return str(data)
    elif isinstance(data, dict):
        return {k: convert_objectid(v) for k, v in data.items()}
    elif isinstance(data, list):
        return [convert_objectid(i) for i in data]
    return data
   