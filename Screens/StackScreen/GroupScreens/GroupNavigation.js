import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import GroupCreation from "./GroupCreation";
import GroupHomePage from "./GroupChat";
import {GroupTab} from "./GroupTab";
import GroupSettingPage from "./GroupSettingPage";
import LocationTrends from "./LocationTrends";
import MusicTrends from "./MusicTrends";
import HealthTrends from "./HealthTrends";


const Stack = createStackNavigator();

// Stack Navigation that navigate to the Group Setting page
export function GroupNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}> 
      <Stack.Screen name="GroupCreation" component={GroupCreation} />
      <Stack.Screen name="GroupTab" component={GroupTab} />
      <Stack.Screen name="GroupSettingPage" component={GroupSettingPage} />
      <Stack.Screen name="LocationTrends" component={LocationTrends} />
      <Stack.Screen name="MusicTrends" component={MusicTrends} />
      <Stack.Screen name="HealthTrends" component={HealthTrends} />
    </Stack.Navigator>
  )
} 