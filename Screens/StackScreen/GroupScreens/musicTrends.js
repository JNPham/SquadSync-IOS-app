
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

const music = ['Indie', 'Pop', 'Rock', 'Country', 'Jazz', 'R&B', 'EDM', 'Hip-Hop/Rap', 'Classical', 'Techno', 'Lo-Fi']
const SPACING = 20

export default function MusicTrends({route, navigation}) {

    return(
    <SafeAreaView style={styles.container}>
        <ScrollView >
                <Text style ={styles.text1}> Music Trends</Text>
                <Text style = {styles.box}>1. {music[0]}</Text>
                <Text style = {styles.box}>2. {music[1]}</Text>
                <Text style = {styles.box}>3. {music[2]}</Text>
                <Text style = {styles.box}>4. {music[3]}</Text>
                <Text style = {styles.box}>5. {music[4]}</Text>
                <Text style = {styles.box}>6. {music[5]}</Text>
                <Text style = {styles.box}>7. {music[6]}</Text>
                <Text style = {styles.box}>8. {music[7]}</Text>
                <Text style = {styles.box}>9. {music[8]}</Text>
                <Text style = {styles.box}>10. {music[9]}</Text>

                

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
      borderColor: '#BD756E',
    }
})