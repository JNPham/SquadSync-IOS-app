import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GroupHomePage from './GroupChat';
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


export default function GroupMap({route, navigation}) {

    return(
        <View style={styles.container}>
          <MapboxGL.MapView style={styles.map}>
            
          </MapboxGL.MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    map: {
        flex: 1,
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