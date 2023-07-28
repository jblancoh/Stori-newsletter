from django.urls import path
from . import views

urlpatterns = [
    path('upload_newsletter/', views.upload_newsletter, name='upload_newsletter'),
    path('send_newsletter/', views.send_newsletter, name='send_newsletter'),
    path('unsubscribe/<str:email>/', views.unsubscribe, name='unsubscribe'),
    path('add_subscriber/', views.add_subscriber, name='add_subscriber'),
]