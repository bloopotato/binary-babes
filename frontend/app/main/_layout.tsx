import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MainLayout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen 
        name="signup" 
        options={{
          headerTitle: "", 
          headerShadowVisible: false,
          headerTintColor: '#432C81'
        }}
      />
      <Stack.Screen 
        name="login" 
        options={{
          headerTitle: "", 
          headerShadowVisible: false,
          headerTintColor: '#432C81',
        }}
      />
    </Stack>
  );
}
