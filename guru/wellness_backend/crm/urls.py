from django.urls import path
from .views import register_user, MyTokenObtainPairView, dashboard
from rest_framework_simplejwt.views import TokenRefreshView, TokenBlacklistView

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', MyTokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('dashboard/', dashboard, name = 'dashboard'),
    path('api/logout/', TokenBlacklistView.as_view(), name='token_blacklist'),
]










