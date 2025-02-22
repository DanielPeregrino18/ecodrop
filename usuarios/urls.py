from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login, name='login'),
    path('registro/', views.registro, name='registro'), 
    path('getusuario/', views.getUsuario, name='getusuario'),
    path('getusuarioperfil/', views.getUsuarioPerfil, name='getusuarioperfil'), 
    path('actualizarperfil/', views.actualizarPerfil, name='actualizarperfil'), 
    path('actualizarpass/', views.actualizarPassword, name='actualizarpass'), 
    path('prueba/', views.prueba, name='prueba'), 
]