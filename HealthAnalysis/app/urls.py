from django.urls import path
from .views import get_health_metrics, predict_illness

url_patterns = [
    path('health-metrics/<int:user_id>/', views.get_health_metrics, name='get_health_metrics'),
    path('predict-illness/', views.predict_illness, name='predict_illness'),
]