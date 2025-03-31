from django.urls import path
from . import views

urlpatterns = [
     path('metodo/', views.obtenerMetodo, name='metodo'),#get
     path('modificarEscanear/', views.modifEscanear, name='modificarEscanear'),#put
     path('obtenerEscanear/', views.obtenerEscan, name='obtenerEscanear'),#get
     path('setImagen/', views.setImage, name='setImagen'),#post
     path('vincularUsuario/', views.vincularUser, name='vincularUsuario'),#put
     path('depositoRFID/', views.depositoPorRFID, name='depositoRFID'),#put

]