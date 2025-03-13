import sqlite3

conn = sqlite3.connect('db.sqlite3')
cursor = conn.cursor()

cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()

print("Tables in database:", tables)

conn.close()




from django.db import connection

# Run some queries (example)
from app.models import HealthMetric
HealthMetric.objects.all()

# Print last executed query
print(connection.queries[-1])
