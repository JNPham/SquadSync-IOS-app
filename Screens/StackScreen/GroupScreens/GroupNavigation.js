import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import GroupCreation from "./GroupCreation";
import GroupHomePage from "./GroupHomePage";
import GroupSettingPage from "./GroupSettingPage";

const Stack = createStackNavigator();

// Stack Navigation that navigate to the Group Setting page
export function GroupNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}> 
      <Stack.Screen name="GroupCreation" component={GroupCreation} />
      <Stack.Screen name="GroupHomePage" component={GroupHomePage} />
      <Stack.Screen name="GroupSettingPage" component={GroupSettingPage} />
    </Stack.Navigator>
  )
} 