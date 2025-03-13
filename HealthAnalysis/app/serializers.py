from rest_framework import serializers
from .models import HealthMetric, PredictedIllness

class HealthMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthMetric
        fields = "__all__"

class PredictedIllnessSerializer(serializers.ModelSerializer):
    class Meta:
        model = PredictedIllness
        fields = "__all__"

