from django.db import models
from db_con import db
from bson import ObjectId

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
    del usuario['_id']
    del usuario['password']
    return usuario