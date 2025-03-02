from django.db import models
from db_con import db
from bson import ObjectId

maquinas = db["maquinas"]

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

# Create your models here.
