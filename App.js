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

import React, {useState, useEffect} from 'react';
import theme from './theme/theme';
import themeContext from './theme/themeContext';
import {EventRegister} from 'react-native-event-listeners'
import MapboxGL from "@react-native-mapbox-gl/maps";


const Stack = createStackNavigator();
MapboxGL.setAccessToken("pk.eyJ1Ijoiam9jZWxybyIsImEiOiJjbGd3amRzMGYwMG9uM2ZteWV1eDJ1cGVjIn0.2gKVgYQEDFpxGRwQ_LCYHg");

export default function App() {
  const [darkMode, setDarkMode] = useState(false)
  useEffect(() => {
    const listener = EventRegister.addEventListener('ChangeTheme', (data) =>{
    setDarkMode(data)
    console.log(data)
    })
    return ()=> {
      EventRegister.removeAllListeners(listener)
    }
  }, [darkMode])
  return (
    <themeContext.Provider value={darkMode === true ? theme.dark : theme.light}>
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
    </themeContext.Provider>
    
  );
}

   
