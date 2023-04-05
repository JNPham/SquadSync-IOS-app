
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

const locations = ['United States', 'Mexico', 'Italy', 'Canada', 'Japan', 'India', 'Brazil', 'Indonesia', 'Turkey', 'United Kingdom', 'Germany']
const SPACING = 20

export default function locationTrends({route, navigation}) {

    return(
        <View>
            <ScrollView>
                <Text>{locations[1]}</Text>
            </ScrollView>

        </View>
    )

}

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        backgroundColor: 'white',
    },