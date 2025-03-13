from django.contrib import admin

from .models import HealthMetric, PredictedIllness

# Register your models here.
admin.site.register(HealthMetric)
admin.site.register(PredictedIllness)
