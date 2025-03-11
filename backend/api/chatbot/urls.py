from django.urls import path
from . import views

urlpatterns = [
    path('index/', views.index, name='index'),
    path('get_chat_session/', views.get_chat_session, name='get_chat_session'),
    path('get_chat_message/<int:session_id>/', views.get_chat_message, name='get_chat_message'),
    path('create_chat_session/', views.create_chat_session, name='create_chat_session'),
    path('create_chat_message/<int:session_id>/', views.create_chat_message, name='create_chat_message'),
]
