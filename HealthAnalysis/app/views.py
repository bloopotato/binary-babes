from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import HealthMetric, PredictedIllness
from .serializers import HealthMetricSerializer, PredictedIllnessSerializer
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from django.db import connection


#Initialise AI model
model = RandomForestClassifier(n_estimators=100, random_state=42)

def train_model():
    """
    Train AI model using historical data from the database
    """
    
    '''data = HealthMetric.objects.values(
        "avg_exercise_per_week", "avg_sleep_hours", "stress_level", "diet_quality", "most_freq_substance_used", "predicted_disease"
    )'''
    
    # Assuming each HealthMetric has a related PredictedIllness
    data = HealthMetric.objects.select_related('predictedillness').values(
        "avg_exercise_per_week",
        "avg_sleep_hours",
        "stress_level",
        "diet_quality",
        "most_freq_substance_used",
        "predictedillness__predicted_disease"  # Use the related name to access the field
    )

    if not data:
        return #No training data available

    df = pd.DataFrame.from_records(data)

    #Convert categorical to numeric
    mapping = {"Poor": 1, "Average": 2, "Good": 3, "Very good": 4}
    df["diet_quality"] = df["diet_quality"].map(mapping)
    
    substance_map = {"None": 0, "Caffeine": 1, "Alcohol": 2, "Tobacco": 3}
    df["most_freq_substance_used"] = df["most_freq_substance_used"].map(substance_map)
    
    X = df.drop(columns=["predicted_disease"])
    y = df["predicted_disease"]
    model.fit(X, y)

#Train model once on startup
train_model()


# Create your views here.
@api_view(["GET"])
def get_health_metrics(request, user_id):
    """
    Retrive all health metrics for a specific user
    """
    metrics = HealthMetric.objects.filter(user_id=user_id)
    if metrics.exists():
        serializer = HealthMetricSerializer(metrics, many=TRUE)
        return Response(serializer.data)
    return Response({"error":"No health metrics found for this user"}, status=404)

@api_view(["POST"])
def predict_illness(request):
    """
    Predict the potential illness based on user_submitted health metrics
    """
    serializer = HealthMetricSerializer(data=request.data)
    if serializer.is_valid():
        health_metric = serializer.save()

        #Convert input to dataframe
        input_data = pd.DataFrame([serializer.data])
        input_data.drop(columns=["id", "user_id"], inplace=True, errors='ignore')

        #Apply encoding
        input_data["diet_quality"] = input_data["diet_quality"].map({"Poor": 1, "Average": 2, "Good": 3, "Very good": 4})
        input_data["most_freq_substance_used"] = input_data["most_freq_substance_used"].map({"None": 0, "Caffeine": 1, "Alcohol": 2, "Tobacco": 3})

        # Ensure no NaN values (caused by missing mappings)
        input_data.fillna(0, inplace=True)

        # Predict
        if not input_data.empty:
            predicted_disease = model.predict(input_data)[0]
            confidence_score = np.max(model.predict_proba(input_data), axis=1)[0]
            risk_level = "High" if confidence_score > 0.8 else "Moderate" if confidence_score > 0.5 else "Low"

            # Store result
            prediction = PredictedIllness.objects.create(
                user=health_metric.user,  # Use ForeignKey user reference
                health_metric=health_metric,
                predicted_disease=predicted_disease,
                confidence_score=confidence_score,
                risk_level=risk_level
            )

            return Response({
                "predicted_disease": predicted_disease,
                "confidence_score": confidence_score,
                "risk_level": risk_level
            })
    return Response(serializer.errors, status=400)