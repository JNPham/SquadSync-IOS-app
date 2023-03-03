import { Image, StyleSheet, Text, View, SafeAreaView, Switch, TouchableOpacity } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import { getDatabase, ref, update, get, child, remove } from "firebase/database";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getAuth } from '@firebase/auth';

export default function Setting() {
    const [darkMode, setDarkMode] = useState(false);
    const LogoImage = require('../../assets/squadsync.png');
    
    const db = getDatabase();
    const dbRef = ref(db);
    const userId = getAuth().currentUser.uid;

    useEffect(() => {
        get(child(dbRef, `users/${userId}`)).then((snapshot) => {
            if (snapshot.exists()) {
                var value = snapshot.val().darkmode;
                setDarkMode(value);
            } else {
                console.log("No data available");
            }
        });
    }, [])

    const toggleSwitch = () => {
        setDarkMode(previousState => !previousState);
        update(ref(db, 'users/' + userId), {
            darkmode: !darkMode
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Settings</Text>
            </View>
            <View style={styles.body}>
                <View style={{ flexDirection: "row", justifyContent:'space-between', paddingTop: '5%' }}>
                    <View style={{ flexDirection: "row", alignItems:'center'}}>
                        <MaterialCommunityIcons name="theme-light-dark" size={35} color="black" />
                        <Text style={[styles.text]}>Dark Mode</Text>
                    </View>
                    <Switch
                        trackColor={{ false: '#767577', true: '#B5D0FF' }}
                        thumbColor={darkMode ? '#F8C272' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={darkMode}
                        checked={!!darkMode}
                    />
                </View>
                <View style={{ backgroundColor: "#B9B9B9", height: 1.5, marginTop: '5%' }} />
                
                <TouchableOpacity style={{ flexDirection: "row", justifyContent:'space-between', paddingTop: '5%' }}>
                    <View style={{ flexDirection: "row", alignItems:'center'}}>
                        <MaterialCommunityIcons name="lock" size={35} color="black" />
                        <Text style={[styles.text]}>Private & Security</Text>
                    </View>
                    <MaterialCommunityIcons name="chevron-right" size={35} color="black" />
                </TouchableOpacity>
                <View style={{ backgroundColor: "#B9B9B9", height: 1.5, marginTop: '5%' }} />
                
                <TouchableOpacity style={{ flexDirection: "row", justifyContent:'space-between', paddingTop: '5%' }}>
                    <View style={{ flexDirection: "row", alignItems:'center'}}>
                        <MaterialCommunityIcons name="headphones" size={35} color="black" />
                        <Text style={[styles.text]}>Help Center</Text>
                    </View>
                    <MaterialCommunityIcons name="chevron-right" size={35} color="black" />
                </TouchableOpacity>
                <View style={{ backgroundColor: "#B9B9B9", height: 1.5, marginTop: '5%' }} />

                <TouchableOpacity style={{ flexDirection: "row", justifyContent:'space-between', paddingTop: '5%' }}>
                    <View style={{ flexDirection: "row", alignItems:'center'}}>
                        <Image source={LogoImage} style={{width:35, height: 35}} />
                        <Text style={[styles.text]}>About Us</Text>
                    </View>
                    <MaterialCommunityIcons name="chevron-right" size={35} color="black" />
                </TouchableOpacity>
                <View style={{ backgroundColor: "#B9B9B9", height: 1.5, marginTop: '5%' }} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#23272D',
    },
    header: {
        flex: 0.4,
        backgroundColor: '#23272D',
        alignItems:'center',
        justifyContent: 'center',
    },
    body: {
        flex: 3,
        backgroundColor: 'white',
        paddingLeft: '5%',
        paddingRight: '5%'
        //alignItems: 'stretch',
    },
    title: {
        fontSize: 25,
        fontWeight: '800',
        color: '#FFFFFF',
    },
    text: {
        fontSize: 18,
        fontWeight: '700',
        color: 'black',
        paddingLeft: '3%'
    }
}); 