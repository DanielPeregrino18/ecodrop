from django.db import models
from db_con import db
from bson import ObjectId

maquinas = db["maquinas"]

# ingresar imagen y clasificar, modificar el metodo dependiendo el objeto
def getMetodo(id):
    maquina = maquinas.find_one({'_id': ObjectId(id)})
    res = maquina['metodo']
    if res != 0:
         maquinas.update_one(
             {'_id': ObjectId(id)},
             {
                '$set': {
                    'metodo': "0",
                }
            } 
         )
    return res


#lo manejara desde la app movil
def modificarEscanear(id):
    try:
        maquinas.update_one(
            {'_id': ObjectId(id)},
            {
                '$set': {
                    'escanear': "1",
                }
            } 
        )
        return True
    except Exception as e:
        return False

#lo consultara el esp32
def obtenerEscanear(id):
    try:
        maquina = maquinas.find_one({'_id': ObjectId(id)})
        res = maquina['escanear']
        if res != 0:
            maquinas.update_one(
                {'_id': ObjectId(id)},
                {
                    '$set': {
                        'escanear': "0",
                    }
                } 
            )
        return res
    except Exception as e:
        return "0"
    
#vincular usuario
def vincularUsuario(id, idUsuario):
    try:
        maquinas.update_one(
            {'_id': ObjectId(id)},
            {
                '$set': {
                    'idLastUser': idUsuario,
                }
            } 
        )
        return True
    except Exception as e:
        return False