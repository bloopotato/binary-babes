from rest_framework import serializers
from .models import HealthMetric, LifestylePlan #PredictedIllness

class HealthMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthMetric
        fields = "__all__"

class LifestylePlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = LifestylePlan
        fields = "__all__"

'''
class PredictedIllnessSerializer(serializers.ModelSerializer):
    class Meta:
        model = PredictedIllness
        fields = "__all__"
'''