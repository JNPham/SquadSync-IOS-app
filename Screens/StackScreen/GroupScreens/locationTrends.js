
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GroupHomePage from './GroupChat';
import ActivityTracking from './ActivityTracking';
import GroupSettingPage from './GroupSettingPage';

import { StyleSheet, View, Text, TextInput, Image, Button, SafeAreaView, KeyboardAvoidingView, ScrollView } from 'react-native';
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

const locations = ['United States', 'Mexico', 'Italy', 'Canada', 'Japan', 'India', 'Brazil', 'Indonesia', 'Turkey', 'United Kingdom', 'Germany']
const SPACING = 20

export default function LocationTrends({route, navigation}) {

    return(
    <SafeAreaView style={styles.container}>
        <ScrollView >
                <Text style ={styles.text1}> Location Trends</Text>
                <Text style = {styles.box}>1. {locations[0]}</Text>
                <Text style = {styles.box}>2. {locations[1]}</Text>
                <Text style = {styles.box}>3. {locations[2]}</Text>
                <Text style = {styles.box}>4. {locations[3]}</Text>
                <Text style = {styles.box}>5. {locations[4]}</Text>
                <Text style = {styles.box}>6. {locations[5]}</Text>
                <Text style = {styles.box}>7. {locations[6]}</Text>
                <Text style = {styles.box}>8. {locations[7]}</Text>
                <Text style = {styles.box}>9. {locations[8]}</Text>
                <Text style = {styles.box}>10. {locations[9]}</Text>

        </ScrollView>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: '15%',
        //paddingLeft: '5%', 
    },
    scroll: {
        flex: 1,
        backgroundColor: 'white',
    },
    text1: {
        fontStyle: 'normal',
        fontSize: 25,
        fontWeight: '700',
        textAlign: 'center',
        color: 'black',
        paddingTop: '5%',
        paddingBottom: '5%',
        paddingLeft: '5%',
        paddingRight: '10%',
    },
    box:
    {
      fontSize: 20,
      padding: 20,
      marginLeft: 15,
      marginRight: 15,
      marginBottom: 15,
      //backgroundColor: '#C1D5C5',
      //backgroundColor: '#C1D5C5',
      borderRadius: 10,
      borderWidth: 7,
      borderColor: '#C1D5C5',
    }
})