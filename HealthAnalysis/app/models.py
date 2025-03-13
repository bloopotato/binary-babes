from django.db import models

from django.db import models

class MyModel(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)



class HealthMetric(models.Model):
    user_id = models.IntegerField()
    avg_exercise_per_week = models.IntegerField()
    avg_sleep_hours = models.FloatField()
    stress_level = models.IntegerField()
    diet_quality = models.CharField(max_length=10)  # Poor, Average, Good, Very good
    most_freq_substance_used = models.CharField(max_length=10)  # None, Caffeine, Alcohol, Tobacco

    '''def __str__(self):
        return f"HealthMetric(user_id={self.user_id}, avg_exercise={self.avg_exercise_per_week})"
    '''
class PredictedIllness(models.Model):
    user_id = models.IntegerField()
    health_metric = models.ForeignKey(HealthMetric, on_delete=models.CASCADE, related_name='predictedillness')
    predicted_disease = models.CharField(max_length=50)
    confidence_score = models.FloatField()
    risk_level = models.CharField(max_length=10)  # High, Moderate, Low
    '''
    def __str__(self):
        return f"PredictedIllness(user_id={self.user_id}, predicted_disease={self.predicted_disease})"
    '''
