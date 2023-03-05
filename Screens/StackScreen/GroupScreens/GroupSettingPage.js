import { StyleSheet, View, Text, TextInput, Switch, Image, Button, SafeAreaView, ScrollView, KeyboardAvoidingView } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { getDatabase, child, ref, set, get, push } from "firebase/database";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, uploadBytesResumable, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as sRef } from 'firebase/storage';
import { Ionicons } from "@expo/vector-icons";
import { getAuth } from '@firebase/auth';

export default function GroupSettingPage({ route, navigation }) {

    return(
        <SafeAreaView style = {styles.container}>
                <View style = {styles.header}>
                <Text style = {styles.text}>This is group settings page</Text>
                </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        flex: 0.75,
        backgroundColor: '#23272D',
        marginLeft: '5%',
    },
    text: {
        top: '5%',
        fontStyle: 'normal',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 19,
        height: 25,
        display: 'flex',
        letterSpacing: 0.5,
        color: '#FFFFFF',
        marginLeft: 60,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flex: .10,
        backgroundColor: '#23272D',
    },

});