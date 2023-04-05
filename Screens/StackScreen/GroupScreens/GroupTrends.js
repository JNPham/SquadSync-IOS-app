import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GroupHomePage from './GroupChat';
import ActivityTracking from './ActivityTracking';
import GroupSettingPage from './GroupSettingPage';

import { StyleSheet, View, Text, TextInput, Image, Button, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { getDatabase, child, ref, set, get, push } from "firebase/database";
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, uploadBytesResumable, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as sRef } from 'firebase/storage';
import { Ionicons } from "@expo/vector-icons";
import { getAuth } from '@firebase/auth';


export default function GroupTrends({route, navigation}) {
    const db = getDatabase();

    const [groupName, setGroupName] = useState();
    const [groupId, setGroupId] = useState();
    //function searchs from firebase using groupID and returns the currently selected group
    function findGroup(groupID) {
        const dbRef = ref(db);
        get(child(dbRef, `groups/${groupID}`)).then((snapshot) => {
            console.log(groupID);
            if (snapshot.exists()) {
                var gName = snapshot.val().name;
                console.log(gName);
                setGroupName(gName);

            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        findGroup("-NSEl3cpSnQhBLlkcdD1");
        setGroupId("-NSEl3cpSnQhBLlkcdD1");
    }, [])



    return(
        <View style={styles.container}>
                <Text style={styles.text1}>{groupName} Member Trends</Text>
            <TouchableOpacity onPress={() => navigation.navigate('locationTrends')}>
                <Text style={styles.location}>See where {groupName} members are located right now!</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('')} >
                <Text style={styles.music}>See what {groupName} members are listening to right now!</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={() => navigation.navigate('')}>
                <Text style={styles.health}>See how active {groupName} members right now!</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flex: .10,
        backgroundColor: '#23272D',
    },
    text1: {
        fontStyle: 'normal',
        fontSize: 25,
        fontWeight: '700',
        textAlign: 'center',
        color: 'black',
        paddingTop: '5%',
        paddingBottom: '5%',
    },
    location: {
        fontStyle: 'normal',
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
        color: 'black',
        paddingTop: '15%',
        paddingBottom: '10%',
        paddingLeft: '5%',
        paddingRight: '5%',
    },
    music: {
        fontStyle: 'normal',
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
        color: 'black',
        paddingTop: '15%',
        paddingBottom: '10%',
        paddingLeft: '5%',
        paddingRight: '5%',
    },
    health: {
        fontStyle: 'normal',
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
        color: 'black',
        paddingTop: '15%',
        paddingBottom: '10%',
        paddingLeft: '6%',
        paddingRight: '6%',
    },
    TextBoxes: { //search bar
        position: 'absolute',
        width: '95%',
        fontSize: 13,
        alignItems: 'center',
        padding: 13,
        backgroundColor: '#D9D9D9',
        marginVertical: 10,
        borderRadius: 35,
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 10,
        marginLeft: 13,
      }
});