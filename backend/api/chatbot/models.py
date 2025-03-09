from django.db import models
from django.contrib.auth.models import User



class ChatSession(models.Model):
    session_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    time_ended = models.DateTimeField(null=True, blank=True,)


class ChatMessage(models.Model):
    message_id = models.AutoField(primary_key=True)
    session = models.ForeignKey(ChatSession, on_delete=models.CASCADE, related_name='messages')
    sender = models.CharField(max_length=4) 
    message = models.TextField(max_length=10000)
    time_sent = models.DateTimeField(auto_now_add=True)


