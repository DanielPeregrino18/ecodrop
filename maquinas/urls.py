from django.urls import path
from . import views

urlpatterns = [
     path('metodo/', views.obtenerMetodo, name='metodo'),
]