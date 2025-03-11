DROP DATABASE if exists `User_DB`;
CREATE DATABASE `User_DB`;
USE `User_DB`;

UNLOCK TABLES;
-- UserInfo table stores general info about user
CREATE TABLE UserInfo (
	user_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(1) NOT NULL,
    dob DATE NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(50) NOT NULL UNIQUE,
    PRIMARY KEY (user_id)
);

-- Populate UserInfo table
INSERT INTO UserInfo(first_name, last_name, age, gender, dob, email, password_hash)
VALUES
('Jane', 'Tan', '44', 'F', '1981-01-01', 'janetan@gmail.com', 'janetan123'),
('Richard', 'Lim', '67', 'M', '1958-06-06', 'richardlim@gmail.com', 'richardlim123'),
('Mary', 'Lee', '30', 'F', '1995-03-03', 'marylee@gmail.com', 'marylee123');

-- HealthMetrics table stores periodic (every 2 months?) health data input by the user
CREATE TABLE HealthMetrics (
	health_metric_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL, 
    date_recorded DATE NOT NULL,
    avg_exercise_per_week INT NOT NULL, 
    avg_sleep_hours INT NOT NULL,
    stress_level INT NOT NULL,
    diet_quality ENUM('Poor', 'Average', 'Good', 'Very good') NOT NULL, -- poor: (give eg of poor diets), average: (give eg), good: (give eg), excellent: (give eg)
    most_freq_substance_used VARCHAR(20),
    PRIMARY KEY (health_metric_id),
    FOREIGN KEY (user_id) REFERENCES UserInfo(user_id)
);

-- Populate HealthMetrics table
INSERT INTO HealthMetrics(user_id, date_recorded, avg_exercise_per_week, avg_sleep_hours, stress_level, diet_quality, most_freq_substance_used)
VALUES
(1, '2025-03-01', 0, 6, 7, 'Poor', 'Caffeine'),
(2, '2025-03-05', 2, 8, 5, 'Average', 'Alcohol'),
(3, '2025-03-10', 3, 8, 4, 'Good', 'Caffeine');


-- Medical history section -- 
-- Conditions table stores list of conditions users may input
CREATE TABLE Conditions (
	condition_id INT AUTO_INCREMENT, 
    condition_name VARCHAR(100),
    PRIMARY KEY (condition_id)
);

-- Populate Conditions table
INSERT INTO Conditions(condition_name)
VALUES
('Diabetes'),
('Hypertension'),
('Asthma');

-- Medications table stores list of medication users may input
CREATE TABLE Medications(
	medication_id INT AUTO_INCREMENT,
    medication_name VARCHAR(100),
    PRIMARY KEY (medication_id)
);

-- Populate Medications table
INSERT INTO Medications(medication_name)
VALUES
('Insulin'),
('Thiazide'),
('Inhaled corticosteroids');

-- ConditonsMedications table stores the conditions along with their corresponding medications
CREATE TABLE ConditionsMedications(
	condition_id INT,
    medication_id INT, 
    PRIMARY KEY (condition_id, medication_id), 
    FOREIGN KEY (condition_id) REFERENCES Conditions(condition_id),
    FOREIGN KEY (medication_id) REFERENCES Medications(medication_id)
);


-- UserConditions table storesexisting/ past user conditions
CREATE TABLE UserConditions (
    user_id INT NOT NULL,
    condition_id INT NOT NULL, 
    PRIMARY KEY (user_id, condition_id),
    FOREIGN KEY (user_id) REFERENCES UserInfo(user_id),
    FOREIGN KEY (condition_id) REFERENCES Conditions(condition_id)
);

-- Populate UserConditions table
SELECT user_id FROM Userinfo;
SELECT * FROM Conditions;
INSERT INTO UserConditions (user_id, condition_id)
VALUES
(1, 1), 
(1, 2),
(2, 2);

-- UserMedications table stores past/ current user medications alter
CREATE TABLE UserMedications (
	user_id INT NOT NULL, 
	medication_id INT NOT NULL, 
    PRIMARY KEY (user_id, medication_id),
    FOREIGN KEY (user_id) REFERENCES UserInfo(user_id),
    FOREIGN KEY (medication_id) REFERENCES Medications(medication_id)
);

-- Populate UserMedications table
SELECT user_id FROM UserInfo;
SELECT * FROM Medications;
INSERT INTO UserMedications (user_id, medication_id)
VALUES
(1, 1),
(1, 2),
(2, 2);


/*PredictedIllnesses table stores the potential illnesses users may encounter based on their current living habits
AI will predict illnesses and generate suggested changes and store the results in PredictedIllnesses table*/

-- SuggestedLifeStyleChanges table stores recommendations to living habits based on user health metrics and predicted illnesses
CREATE TABLE SuggestedLifestyleChanges (
	suggestion_id INT NOT NULL AUTO_INCREMENT,
    prediction_id INT NOT NULL, 
	lifestyle_changes VARCHAR(255) NOT NULL, 
    PRIMARY KEY (suggestion_id),
    FOREIGN KEY (prediction_id) REFERENCES HealthAnalysis_DB.PredictedIllnesses(prediction_id)
);



    
    
    
