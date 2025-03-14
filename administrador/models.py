from db_con import db
from bson import ObjectId
from usuarios.models import getUsuarioById

estadisticas = db['estadisticas']

def verificarAdministrador(id):
    user = getUsuarioById(id)
    return user.get('admin')

def obtenerEstadisticas():
    return list(estadisticas.find({}))
   