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
   E.g. when you run frontend you get something like this: Metro waiting on exp://xxx.xxx.xxx.xxx:8081
   Then run backend using
   ```bash
   python manage.py runserver xxx.xxx.xxx.xxx:8080
   ```
