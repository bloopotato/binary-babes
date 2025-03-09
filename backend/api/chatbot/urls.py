from django.urls import path
from .views import get_chat_session, get_chat_message, index

urlpatterns = [ 
    path("chat_sessions/", get_chat_session, name="chat_sessions"),
    path("chat_message/<int:session_id>/", get_chat_message, name="chat_messages"),
]