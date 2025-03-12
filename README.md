# binary-babes

## Frontend:
1. Install dependencies
   ```bash
   npm install
   ```
2. Start the app
   ```bash
    npx expo start
   ```
3. Open in Expo Go app (Android) or Camera (IOS)

## Backend:
1. Edit backend settings
   - Add your ip address to ALLOWED_HOSTS

2. Run backend using the ip address on different port
   E.g. when you run frontend you get something like this: Metro waiting on exp://192.168.1.103:8081
   Then run backend using python manage.py runserver 192.168.1.103:8080 (same api diff port)
