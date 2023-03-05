import { StyleSheet, View, Text, TextInput, Switch, Image, Button, SafeAreaView, ScrollView } from 'react-native';
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

export default function GroupHomePage({ route, navigation }) {
    return(
        <SafeAreaView>
            <Text style={styles.text}> This is the group home </Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#23272D',
    },
    text: {
        fontStyle: 'normal',
        fontSize: 16,
        fontWeight: '700',
        display: 'flex',
        color: 'black',
        paddingTop: '5%',
        paddingBottom: '1%',
        paddingLeft: '5%'
    },
});