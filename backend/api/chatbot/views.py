from django.shortcuts import render
from .models import ChatSession, ChatMessage
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .serializers import ChatSessionSerializer, ChatMessageSerializer
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.http import JsonResponse


def index(request):
    return JsonResponse({"chatbot okay"})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
#retieve all chat sessions obtained w a certain user
def get_chat_session(request):
    user=request.user
    history=ChatSession.objects.filter(user=user)
    serializer=ChatSessionSerializer(history, many=True)
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
#store a new chat session
def create_chat_session(request):
    user = request.user
    session = ChatSession.objects.create(user=user)
    serializer = ChatSessionSerializer(session)
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
#all messages from a certain session
def get_chat_message(request,session_id):
    user=request.user
    session = get_object_or_404(ChatSession, session_id=session_id, user=user)
    messages=ChatMessage.objects.filter(session=session)
    serializer=ChatMessageSerializer(messages, many=True)
    return Response(serializer.data)

@api_view(["POST"]) 
@permission_classes([IsAuthenticated]) 
def create_chat_message(request, session_id): 
    user = request.user 
    sender = request.data.get("sender")
    session = get_object_or_404(ChatSession, session_id=session_id, user=user) 
    content_of_message = request.data.get("message") 
    message = ChatMessage.objects.create(session=session, sender=sender,message=content_of_message) 
    serializer = ChatMessageSerializer(message) 
    return Response(serializer.data)


