from django.urls import path
from . import views
from .views import get_health_metrics, lifestyle_planner

urlpatterns = [
    path('health-metrics/', views.get_health_metrics, name='get_health_metrics'),
    path('lifestyle-planner/', lifestyle_planner, name='lifestyle_planner'),
    # path('predict-illness/', views.predict_illness, name='predict_illness'),
]
