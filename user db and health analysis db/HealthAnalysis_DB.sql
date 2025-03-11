DROP DATABASE IF EXISTS `HealthAnalysis_DB`;
CREATE DATABASE `HealthAnalysis_DB`;
USE `HealthAnalysis_DB`;

/*PredictedIllnesses table stores the potential illnesses users may encounter based on their current living habits
AI will predict illnesses and generate suggested changes and store the results in PredictedIllnesses table*/
CREATE TABLE PredictedIllnesses (
	prediction_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    health_metric_id INT NOT NULL,
    predicted_disease VARCHAR(50) NOT NULL,
    prediction_date DATETIME DEFAULT CURRENT_TIMESTAMP, 
    confidence_score FLOAT NOT NULL,
    risk_level ENUM('Low', 'Moderate', 'High') NOT NULL, 
    PRIMARY KEY (prediction_id), 
    FOREIGN KEY (user_id) REFERENCES User_DB.UserInfo (user_id),
    FOREIGN KEY (health_metric_id) REFERENCES User_DB.HealthMetrics (health_metric_id)
);



-- Populate PredictedIllnesses table

/*DiseaseRiskFactors table stores a list of risk factors for various diseases
AI model will match user health merics with known risk factors in DiseaseRiskFactors table and predict potential illnesses more accurately*/
CREATE TABLE DiseaseRiskFactors (
	disease_id INT NOT NULL AUTO_INCREMENT,
    disease_name VARCHAR(50) NOT NULL, 
    risk_factor VARCHAR(50) NOT NULL, 
    risk_level ENUM('Low', 'Moderate', 'High') NOT NULL,
    PRIMARY KEY (disease_id, risk_factor)
);

/* -- Populate DiseaseRiskFactors table
INSERT INTO DiseaseRiskFactors (disease_name, risk_factor, risk_level)
VALUES
-- Heart Disease
('Heart Disease', 'High Cholesterol', 'High'),
('Heart Disease', 'High Blood Pressure', 'High'),
('Heart Disease', 'Smoking', 'High'),
('Heart Disease', 'Obesity', 'Moderate'),
('Heart Disease', 'Lack of Exercise', 'Moderate'),
('Heart Disease', 'Diabetes', 'High'),
('Heart Disease', 'Unhealthy Diet', 'High'),
('Heart Disease', 'Stress', 'Moderate'),

-- Type 2 Diabetes
('Type 2 Diabetes', 'Obesity', 'High'),
('Type 2 Diabetes', 'Family History', 'Moderate'),
('Type 2 Diabetes', 'Lack of Exercise', 'High'),
('Type 2 Diabetes', 'High Sugar Diet', 'High'),
('Type 2 Diabetes', 'Insulin Resistance', 'High'),
('Type 2 Diabetes', 'High Blood Pressure', 'Moderate'),

-- Hypertension (high blood pressure)
('Hypertension', 'High Salt Diet', 'High'),
('Hypertension', 'Obesity', 'High'),
('Hypertension', 'Lack of Exercise', 'Moderate'),
('Hypertension', 'Smoking', 'High'),
('Hypertension', 'Chronic Stress', 'Moderate'),

-- Lung Cancer
('Lung Cancer', 'Smoking', 'High'),
('Lung Cancer', 'Exposure to Air Pollution', 'Moderate'),
('Lung Cancer', 'Exposure to Asbestos', 'High'),
('Lung Cancer', 'Family History', 'Moderate'),

-- Osteoporosis
('Osteoporosis', 'Calcium Deficiency', 'High'),
('Osteoporosis', 'Vitamin D Deficiency', 'Moderate'),
('Osteoporosis', 'Lack of Exercise', 'Moderate'),
('Osteoporosis', 'Smoking', 'Moderate'),
('Osteoporosis', 'Alcohol Consumption', 'Moderate'),

-- Depression
('Depression', 'Chronic Stress', 'High'),
('Depression', 'Social Isolation', 'High'),
('Depression', 'Poor Sleep', 'High'),
('Depression', 'Unhealthy Diet', 'Moderate'),
('Depression', 'Family History', 'Moderate'),
('Depression', 'Substance Abuse', 'Moderate'),

-- Stroke
('Stroke', 'High Blood Pressure', 'High'),
('Stroke', 'Obesity', 'High'),
('Stroke', 'Smoking', 'High'),
('Stroke', 'High Cholesterol', 'High'),
('Stroke', 'Lack of Exercise', 'Moderate'),
('Stroke', 'Diabetes', 'Moderate'),
('Stroke', 'Chronic Stress', 'Moderate'),

-- Liver Disease
('Liver Disease', 'Excessive Alcohol Consumption', 'High'),
('Liver Disease', 'Obesity', 'Moderate'),
('Liver Disease', 'Hepatitis B or C', 'High'),
('Liver Disease', 'High Sugar Diet', 'Moderate'),
('Liver Disease', 'Toxin Exposure', 'High');
*/ 


