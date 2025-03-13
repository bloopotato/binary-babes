from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import HealthMetric, LifestylePlan #PredictedIllness
from .serializers import HealthMetricSerializer #PredictedIllnessSerializer
'''
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
'''
from django.db import connection

import os
import requests

'''
# Initialise AI model
model = RandomForestClassifier(n_estimators=100, random_state=42)

def train_model():
    """
    Train AI model using historical data from the database
    """
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
        return  # No training data available

    df = pd.DataFrame.from_records(data)
    df.rename(columns={"predictedillness__predicted_disease": "predicted_disease"}, inplace=True)

    # Convert categorical to numeric
    mapping = {"Poor": 1, "Average": 2, "Good": 3, "Very good": 4}
    df["diet_quality"] = df["diet_quality"].map(mapping)
    
    substance_map = {"None": 0, "Caffeine": 1, "Alcohol": 2, "Tobacco": 3}
    df["most_freq_substance_used"] = df["most_freq_substance_used"].map(substance_map)
    
    X = df.drop(columns=["predicted_disease"])
    y = df["predicted_disease"]
    model.fit(X, y)

# Comment out the following line to prevent the model from training at import time.
train_model()
'''
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_health_metrics(request):
    """
    Retrieve all health metrics for a specific user
    """
    metrics = HealthMetric.objects.filter(user_id=request.user.username)
    if metrics.exists():
        serializer = HealthMetricSerializer(metrics, many=True)  # Corrected TRUE -> True
        return Response(serializer.data)
    return Response({"error": "No health metrics found for this user"}, status=404)

# Get your token from environment variables
HF_API_TOKEN = os.environ.get("HF_API_TOKEN_1")
# Choose a model hosted on Hugging Face (e.g., GPT-2 or any conversational model)
#MODEL_ID = "gpt2"  # Replace with your desired model id
MODEL_ID = "facebook/opt-1.3b"

@api_view(["POST"])
def lifestyle_planner(request):
    try:
        print("Received request:", request.data)  # Debugging step
        data = request.data

        if not data:
            return Response({"error": "Empty request body"}, status=400)

        prompt = (
            f"Create a personalized lifestyle plan for a person with the following metrics:\n"
            f"- Exercise per week: {data.get('avg_exercise_per_week')}\n"
            f"- Sleep hours: {data.get('avg_sleep_hours')}\n"
            f"- Stress level (1-5): {data.get('stress_level')}\n"
            f"- Diet quality: {data.get('diet_quality')}\n"
            f"- Most frequent substance used: {data.get('most_freq_substance_used')}\n\n"
            "Provide recommendations on exercise, sleep, nutrition, and stress management."
        )

        #print("Generated prompt:", prompt)  # Debugging step

        HF_API_TOKEN = "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"
        headers = {"Authorization": f"Bearer {HF_API_TOKEN}"}

        payload = {"inputs": prompt, "options": {"wait_for_model": True}}
        api_url = f"https://api-inference.huggingface.co/models/{MODEL_ID}"

        response = requests.post(api_url, headers=headers, json=payload, timeout=500)
        print("HF API Response:", response.status_code, response.text)  # Debugging step

        response.raise_for_status()
        result = response.json()

        # Extract text safely
        generated_text = (
            result[0]["generated_text"]
            if isinstance(result, list) and "generated_text" in result[0]
            else "No output generated."
        )

        return Response({"lifestyle_plan": generated_text})

    except Exception as e:
        print("Error:", str(e))  # Debugging step
        return Response({"error": str(e)}, status=500)


'''
@api_view(["POST"])
def predict_illness(request):
    """
    Predict the potential illness based on user-submitted health metrics
    """
    serializer = HealthMetricSerializer(data=request.data)
    if serializer.is_valid():
        health_metric = serializer.save()

        # Convert input to dataframe
        input_data = pd.DataFrame([serializer.data])
        input_data.drop(columns=["id", "user_id"], inplace=True, errors='ignore')

        # Apply encoding
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
'''