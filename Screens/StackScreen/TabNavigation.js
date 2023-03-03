import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';

import Home from './Home';
import Profile from './Profile';
import Notification from './Notification';
import Friends from './Friends';
import Setting from './Setting';
import Health from './Health';

const Tab = createBottomTabNavigator();

//Create tab navigation bar that linking to Profile page, Notification page, Home page, Friends page, and Setting page
export function TabNavigation() {
    return (
        <Tab.Navigator screenOptions={{ tabBarStyle: {
                                            left: 0,
                                            bottom: 0,
                                            right: 0,
                                            padding:7,
                                            borderTopLeftRadius: 20,
                                            borderTopRightRadius: 20,
                                            position: 'absolute',
                                            backgroundColor: 'grey',
                                            overflow:'hidden'
                                        },
                                        tabBarActiveTintColor: '#B6B5B5',
                                        tabBarInactiveTintColor: 'black',
                                        tabBarShowLabel: false,
                                        headerShown: false }}>
            <Tab.Screen name="Profile" component={Profile} 
                        options={{
                            tabBarIcon: ({ focused, color }) => (
                                <Avatar
                                    rounded
                                    containerStyle={{width:38, height:38}}
                                    source={{ //add user's avatar
                                        uri:'https://i.mydramalist.com/EoPbW_5f.jpg'
                                    }}>
                                </Avatar>
                            ),
                        }}/>
            <Tab.Screen name="Notification" component={Notification} 
                        options={{
                            tabBarIcon: ({ focused, color }) => (
                                <Ionicons name="notifications" size={35} color={focused ? "#B6B5B5" : "black"} />
                            ),
                            tabBarBadge: 3 // demo badge -> need to fix
                        }}/>
            <Tab.Screen name="Home" component={Home} 
                        options={{
                            tabBarIcon: ({ focused, color }) => (
                                <MaterialCommunityIcons name="home-circle" size={45} color={focused ? "#B6B5B5" : "black"}/>
                            ),
                        }}/>
            <Tab.Screen name="Friends" component={Friends} 
                        options={{
                            tabBarIcon: ({ focused, color }) => (
                                <MaterialCommunityIcons name="account-group" size={35} color={focused ? "#B6B5B5" : "black"}/>
                            ),
                        }}/>
            <Tab.Screen name="Setting" component={Health} 
                        options={{
                            tabBarIcon: ({ focused, color }) => (
                                <Ionicons name="ios-settings" size={35} color={focused ? "#B6B5B5" : "black"}/>
                            ),
                        }}/>
        </Tab.Navigator>
    );
}

