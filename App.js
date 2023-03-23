import './config/firebase';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import * as ImagePicker from 'expo-image-picker'

import SignUp from "./Screens/SignUp";
import Login from "./Screens/Login";
import { TabNavigation } from './Screens/StackScreen/TabNavigation';
import { GroupNavigation } from './Screens/StackScreen/GroupScreens/GroupNavigation';
import {GroupSettingsNavigation} from './Screens/StackScreen/GroupScreens/GroupSettings/GroupSettingsNavigation';
import { async } from '@firebase/util';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login"> 
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="TabNavigation" component={TabNavigation} />
        <Stack.Screen name="GroupNavigation" component={GroupNavigation} />
        <Stack.Screen name="GroupSettingsNavigation" component={GroupSettingsNavigation}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
} 