import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GroupChat from './GroupChat';
import ActivityTracking from './ActivityTracking';
import GroupSettingPage from './GroupSettingPage';

import { StyleSheet, View, Text, Image, SafeAreaView } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { getDatabase, child, ref, get} from "firebase/database";
import { Ionicons } from "@expo/vector-icons";
import { getAuth } from '@firebase/auth';

const Tab = createMaterialTopTabNavigator();

export function GroupTab({route, navigation}) {
    const defaultGroupPic = 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png';
    const db = getDatabase();

    const {groupID} = route.params;
    const [groupName, setGroupName] = useState();
    const [image, setImage] = useState(defaultGroupPic);
    const [memberLimit, setMemberLimit] = useState();
    const [tracking, setTracking] = useState('Music');
    const [competition, setCompetition] = useState(false); // for UI display

    //function searchs from firebase using groupID and returns the currently selected group
    function findGroup(groupID) {
        const dbRef = ref(db);
        get(child(dbRef, `groups/${groupID}`)).then((snapshot) => {
            if (snapshot.exists()) {
                var gName = snapshot.val().name;
                console.log(gName);
                setGroupName(gName);
                var gImage = snapshot.val().url.groupURL;
                setImage(gImage);
                var memLimit = snapshot.val().limit;
                setMemberLimit(memLimit);
                var gTracking = snapshot.val().tracking;
                setTracking(gTracking);
                var gCompetition = snapshot.val().competitionMode;
                setCompetition(gCompetition);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        findGroup(groupID);
    }, [])

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.header}>
                <TouchableOpacity style={{ position: 'absolute', right: '4%', top: '40%' }}
                    onPress={() => navigation.navigate('GroupNavigation', { screen: 'GroupSettingPage' })}>
                    <Ionicons name="ios-settings" size={32} color="white" />
                </TouchableOpacity>
                <Image
                    source={{ uri: image }}
                    style={{ width: 80, height: 80, borderRadius: 80 / 2, borderWidth: 2.5 }}
                />
                <View style={{ paddingLeft: '2%' }}>
                    <Text style={styles.title}>{groupName}</Text>
                    <Text style={styles.text}>Limit: {memberLimit} members</Text>
                </View>
            </SafeAreaView>
            
            <View style={styles.body}>
                <Tab.Navigator screenOptions={{ tabBarStyle: {
                                                borderBottomLeftRadius: 10,
                                                borderBottomRightRadius: 10,
                                                backgroundColor: '#FFEBCE',
                                                overflow:'hidden'
                                            },
                                            tabBarLabelStyle: {
                                                fontSize: 14,
                                                fontWeight: '600',
                                            },
                                            tabBarActiveTintColor: 'black',
                                            tabBarInactiveTintColor: '#B6B5B5',
                                            }}>
                    <Tab.Screen name="Chat" component={GroupChat} initialParams={{gID:groupID}}/>
                    <Tab.Screen name="Activity" component={ActivityTracking} initialParams={{gID: groupID}}/>
                </Tab.Navigator>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8C272',
    },
    header: {
        flex: .45,
        backgroundColor: '#F8C272',
        alignItems: 'center',
        flexDirection:'row', 
        justifyContent:'center',
    },
    title: {
        fontStyle: 'normal',
        fontSize: 25,
        fontWeight: '800',
        textAlign: 'center',
        color: 'black',
        //paddingTop: '5%',
        paddingBottom: '3%',
    },
    text: {
        fontStyle: 'normal',
        fontSize: 16,
        fontWeight: '7600',
        textAlign: 'center',
        color: 'black',
    },
    body: {
        flex: 3,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
});