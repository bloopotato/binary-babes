import { Stack } from 'expo-router';

export default function MainLayout() {

  return (
    <Stack>
      <Stack.Screen 
        name='signup' 
        options={{
          headerTitle: '', 
          headerShadowVisible: false,
          headerTintColor: '#432C81',
        }}
      />
      <Stack.Screen 
        name='login' 
        options={{
          headerTitle: '', 
          headerShadowVisible: false,
          headerTintColor: '#432C81',
        }}
      />
    </Stack>
  );
}
