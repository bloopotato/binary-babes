from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class CustomUser(AbstractUser):
    """Custom user model extending Django's AbstractUser"""
    
    # Example: Add custom fields if needed
    some_extra_field = models.CharField(max_length=100, blank=True, null=True)

    # Avoid conflicts by setting related_name for groups and permissions
    groups = models.ManyToManyField(Group, related_name="custom_user_groups")
    user_permissions = models.ManyToManyField(Permission, related_name="custom_user_permissions")
