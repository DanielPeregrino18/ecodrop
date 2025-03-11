from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login, name='login'), #post
    path('registro/', views.registro, name='registro'), #post
    path('getusuario/', views.getUsuario, name='getusuario'), #post
    path('getusuarioperfil/', views.getUsuarioPerfil, name='getusuarioperfil'), #post
    path('actualizarperfil/', views.actualizarPerfil, name='actualizarperfil'), #put
    path('actualizarpass/', views.actualizarPassword, name='actualizarpass'), #put
    path('logrosobtenidos/', views.logrosObt, name='logrosobtenidos'), #get
    path('cambiarIcono/', views.cambiarIcono, name='cambiarIcono'), #put
]