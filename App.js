import './config/firebase';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SignUp from "./Screens/SignUp";
import Login from "./Screens/Login";
import { TabNavigation } from './Screens/StackScreen/TabNavigation';
import { GroupNavigation } from './Screens/StackScreen/GroupScreens/GroupNavigation';
import PrivacySecurity from './Screens/StackScreen/PrivacySecurity';
import HelpCenter from './Screens/StackScreen/HelpCenter';
import AboutUs from './Screens/StackScreen/AboutUs';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login"> 
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="TabNavigation" component={TabNavigation} />
        <Stack.Screen name="GroupNavigation" component={GroupNavigation} />
        <Stack.Screen name='PrivacySecurity' component={PrivacySecurity} />
        <Stack.Screen name='HelpCenter' component={HelpCenter} />
        <Stack.Screen name='AboutUs' component={AboutUs} />
      </Stack.Navigator>
    </NavigationContainer>
  )
} 