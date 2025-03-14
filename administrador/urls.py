from django.urls import path
from . import views

urlpatterns = [
    path('getEstadisticas/', views.getEstadisticas, name='getEstadisticas'),#get
]