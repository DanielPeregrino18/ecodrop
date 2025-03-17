from db_con import db
from bson import ObjectId
from usuarios.models import getUsuarioById
import datetime
import pytz

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
   
def actualizarEstadisticas(material):
    est = obtenerEstadisticas()
    mexico_tz = pytz.timezone('America/Mexico_City')
    fecha_mexico = datetime.datetime.now(mexico_tz)
    anio_actual = fecha_mexico.year
    numero_mes = fecha_mexico.month

    dia = fecha_mexico.day
    if 1 <= dia <= 7:
        semana_del_mes = 1
    elif 8 <= dia <= 14:
        semana_del_mes = 2
    elif 15 <= dia <= 21:
        semana_del_mes = 3
    else:
        semana_del_mes = 4

    campo_ruta = f"meses.{numero_mes-1}.{semana_del_mes-1}.{material}"
    if len(est[0]['meses']) < numero_mes:
        estadisticas.update_one(
            {'anio': anio_actual},
            {'$push': {'meses': [
                {
                    'plastic': 0,
                    'metal': 0,
                    'paper': 0
                }
            ]}}
        )
    else:
        if len(est[0]['meses'][numero_mes-1]) < semana_del_mes:
            estadisticas.update_one(
                {'anio': anio_actual},
                {'$push': {f"meses.{numero_mes-1}": { 
                        "plastic": 0,
                        "metal": 0,
                        "paper": 0
                        }}}
            )

    estadisticas.update_one(
            {'anio': anio_actual},
             {"$inc": {campo_ruta: 1}}
        )
