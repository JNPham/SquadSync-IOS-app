import './config/firebase';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//import Home from "./Screens/StackScreen/Home";
import SignUp from "./Screens/SignUp";
import { TabNavigation } from './Screens/StackScreen/TabNavigation';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SignUp"> 
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="TabNavigation" component={TabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  )
} 