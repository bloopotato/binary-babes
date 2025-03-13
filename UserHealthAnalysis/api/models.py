from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class HealthMetric(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    avg_exercise_per_week = models.IntegerField()
    avg_sleep_hours = models.FloatField()
    stress_level = models.IntegerField()
    diet_quality = models.CharField(max_length=10)  # Poor, Average, Good, Very good
    most_freq_substance_used = models.CharField(max_length=10)  # None, Caffeine, Alcohol, Tobacco

class LifestylePlan(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    health_metric = models.ForeignKey(HealthMetric, on_delete=models.CASCADE)
    plan_text = models.TextField()  # The generated lifestyle plan
    created_at = models.DateTimeField(auto_now_add=True)

'''
class PredictedIllness(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    health_metric = models.ForeignKey(HealthMetric, on_delete=models.CASCADE, related_name='predictedillness')
    predicted_disease = models.CharField(max_length=50)
    confidence_score = models.FloatField()
    risk_level = models.CharField(max_length=10)  # High, Moderate, Low
'''

