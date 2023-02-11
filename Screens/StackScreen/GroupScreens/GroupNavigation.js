import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import GroupSetting from "./GroupSetting";

const Stack = createStackNavigator();

export function GroupNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}> 
      <Stack.Screen name="GroupSetting" component={GroupSetting} />
    </Stack.Navigator>
  )
} 