import { Image, StyleSheet, Text, View, SafeAreaView, Switch, TouchableOpacity, Pressable } from 'react-native';
import React, { useState, useEffect, useContext }  from 'react';
import { getDatabase, ref, update, get, child, remove } from "firebase/database";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getAuth } from '@firebase/auth';
import { StatusBar } from 'expo-status-bar';
import {EventRegister} from 'react-native-event-listeners'
import themeContext from '../../theme/themeContext';

export default function Setting({navigation}) {
    // darkmode 
    const theme = useContext(themeContext);

    const [isEnabled, setIsEnabled] = useState(false);
    const [darkMode, setDarkMode, darkmodeInDB, setDarkModeInDB] = useState(false);
    const LogoImage = require('../../assets/squadsync.png');
    
    const db = getDatabase();
    const dbRef = ref(db);
    const userId = getAuth().currentUser.uid;

    // Once the Setting page loads, it will get the value of darkmode variable from the database
    useEffect(() => {
        get(child(dbRef, `users/${userId}`)).then((snapshot) => {
            if (snapshot.exists()) {
                var value = snapshot.val().darkmode;
                setDarkModeInDB(value);
            } else {
                console.log("No data available");
            }
        });
    }, [])

    // Change boolean value of the darkmode variable when toggle the switch, then save its value to database
    const toggleSwitch = () => {
        setDarkModeInDB(previousState => !previousState);
        update(ref(db, 'users/' + userId), {
            darkmodeInDB: !darkMode
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Settings</Text>
            </View>
           
            <View style={[styles.body, {backgroundColor: theme.background}]}>
                <View style={{ flexDirection: "row", justifyContent:'space-between', paddingTop: '5%', color:theme.color}}>
                    <View style={{ flexDirection: "row", alignItems:'center'}}>
                        <MaterialCommunityIcons name="theme-light-dark" size={35} color="black" style={{color:theme.color}}/>
                        <Text style={[styles.text, {color:theme.color}]}>Dark Mode</Text>
                    </View>
                    <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        // onValueChange={toggleSwitch}
                        value={darkMode}
                        checked={!!darkmodeInDB}
                        onValueChange={(value) => {
                            // toggleSwitch();
                            setDarkMode(value);
                            EventRegister.emit('ChangeTheme', value)
                        }}
                    />
                </View>
      
                <View style={[styles.hortizontalLine, {borderColor: theme.borderColor}]} />
                
                <TouchableOpacity style={styles.buttons}
                                onPress={() => navigation.navigate('PrivacySecurity')}>
                    <View style={{ flexDirection: "row", alignItems:'center'}}>
                        <MaterialCommunityIcons name="lock" size={35} color="black" style={{color:theme.color}}/>
                        <Text style={[styles.text, {color:theme.color}]}>Privacy & Security</Text>
                    </View>
                    <MaterialCommunityIcons name="chevron-right" size={35} color="black" style={{color:theme.color}}/>
                </TouchableOpacity>
                <View style={[styles.hortizontalLine, {borderColor: theme.borderColor}]} />
                
                <TouchableOpacity style={styles.buttons}
                                onPress={() => navigation.navigate('HelpCenter')}>
                    <View style={{ flexDirection: "row", alignItems:'center'}}>
                        <MaterialCommunityIcons name="headphones" size={35} color="black" style={{color:theme.color}}/>
                        <Text style={[styles.text, {color:theme.color}]}>Help Center</Text>
                    </View>
                    <MaterialCommunityIcons name="chevron-right" size={35} style={{color:theme.color}}/>
                </TouchableOpacity>
                <View style={[styles.hortizontalLine, {borderColor: theme.borderColor}]} />

                <TouchableOpacity style={styles.buttons}
                                onPress={() => navigation.navigate('AboutUs')}>
                    <View style={{ flexDirection: "row", alignItems:'center'}}>
                        <Image source={LogoImage} style={{width:35, height: 35}} />
                        <Text style={[styles.text, {color:theme.color}]}>About Us</Text>
                    </View>
                    <MaterialCommunityIcons name="chevron-right" size={35} color="black" style={{color:theme.color}}/>
                </TouchableOpacity>
                <View style={[styles.hortizontalLine, {borderColor: theme.borderColor}]} />
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#23272D',
    },
    chevronRight: {
    },
    header: {
        flex: 0.4,
        backgroundColor: '#23272D',
        alignItems:'center',
        justifyContent: 'center',
    },
    body: {
        flex: 3,
        paddingLeft: '5%',
        paddingRight: '5%',
        backgroundColor: "white"

    },
    title: {
        fontSize: 25,
        fontWeight: '800',
        color: '#FFFFFF',
    },
    text: {
        fontSize: 18,
        fontWeight: '700',
        // color: 'black',
        paddingLeft: '3%'
    },
    hortizontalLine: {
        marginTop: '5%',
        borderWidth: 1,
        borderColor: "#B9B9B9",   
    }, 
    buttons: {
        flexDirection: "row",
        justifyContent:'space-between',
        paddingTop: '5%',
    }
}); 