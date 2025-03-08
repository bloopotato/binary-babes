import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#432C81',
                tabBarInactiveTintColor: '#A095C1',
                headerStyle: {
                    backgroundColor: '#FFFFFF',
                },
                headerShadowVisible: false,
                headerTintColor: '#432C81',
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                },
                tabBarLabelStyle: {
                    fontFamily: 'Raleway'
                },
                headerTitleStyle: {
                    fontFamily: 'Raleway-Bold'
                }
            }}
        >
        <Tabs.Screen 
            name='home' 
            options={{ 
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
                )
            }} 
        />
        <Tabs.Screen 
            name='stats' 
            options={{ 
                title: 'Statistics',
                headerShown: false,
                headerShadowVisible: false,
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? 'bar-chart' : 'bar-chart-outline'} color={color} size={24}/>
                )
            }} 
        />
        <Tabs.Screen 
            name='notifications'
            options={{ 
                title: 'Notifications',
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? 'notifications' : 'notifications-outline'} color={color} size={24}/>
                )
            }} 
        />
        <Tabs.Screen 
            name='settings' 
            options={{ 
                title: 'Settings',
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? 'settings' : 'settings-outline'} color={color} size={24}/>
                )
            }} 
        />
        
        </Tabs>
        
        
  );
}
