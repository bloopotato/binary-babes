import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#432C81',
                tabBarInactiveTintColor: '#A095C1',
                headerStyle: {
                    backgroundColor: '#25292e',
                },
                headerShadowVisible: false,
                headerTintColor: '#fff',
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                },
            }}
        >
        <Tabs.Screen 
            name="home" 
            options={{ 
                title: 'Home',
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
                )
            }} 
        />
        <Tabs.Screen 
            name="notifications" 
            options={{ 
                title: 'Notifications',
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24}/>
                )
            }} 
        />
        <Tabs.Screen 
            name="settings" 
            options={{ 
                title: 'Settings',
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24}/>
                )
            }} 
        />
        </Tabs>
        
  );
}
