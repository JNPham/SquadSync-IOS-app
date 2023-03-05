import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GroupSettingPage from "./GroupSettingPage";



const Stack = createStackNavigator();

// Stack Navigation that navigate to the Group Setting page
export function GroupSettingsNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}> 
      <Stack.Screen name="GroupSettingPage" component={GroupSettingPage} />
    </Stack.Navigator>
  )

} 