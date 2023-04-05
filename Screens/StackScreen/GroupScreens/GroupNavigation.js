import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import GroupCreation from "./GroupCreation";
import GroupHomePage from "./GroupChat";
import {GroupTab} from "./GroupTab";
import GroupSettingPage from "./GroupSettingPage";
import locationTrends from "./locationTrends";
import musicTrends from "./musicTrends";
import healthTrends from "./healthTrends";

const Stack = createStackNavigator();

// Stack Navigation that navigate to the Group Setting page
export function GroupNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}> 
      <Stack.Screen name="GroupCreation" component={GroupCreation} />
      <Stack.Screen name="GroupTab" component={GroupTab} />
      <Stack.Screen name="GroupSettingPage" component={GroupSettingPage} />
      <Stack.Screen name="locationTrends" component={locationTrends} />
      <Stack.Screen name="musicTrends" component={musicTrends} />
      <Stack.Screen name="healthTrends" component={healthTrends} />
    </Stack.Navigator>
  )
} 