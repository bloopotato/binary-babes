import { Stack  } from 'expo-router';

export default function MainLayout() {

  return (
    <Stack>
      <Stack.Screen 
        name='chatbot'
        options={{
          headerTitle: 'Chatbot',
          headerShadowVisible: false,
          headerTintColor: '#432C81'
        }}
      />
      <Stack.Screen 
        name='lifestyle-medical' 
        options={{
          headerTitle: '', 
          headerShadowVisible: false,
          headerTintColor: '#432C81',
        }}
      />
      <Stack.Screen 
        name='appointments' 
        options={{
          headerTitle: 'Appointments & Medications', 
          headerShadowVisible: false,
          headerTintColor: '#432C81',
        }}
      />
      <Stack.Screen 
        name='treatment' 
        options={{
          headerTitle: '', 
          headerShadowVisible: false,
          headerTintColor: '#432C81',
        }}
      />
      <Stack.Screen 
        name='customised-plan' 
        options={{
          headerTitle: 'Customised Plan', 
          headerShadowVisible: false,
          headerTintColor: '#432C81',
        }}
      />
    </Stack>
  );
}
