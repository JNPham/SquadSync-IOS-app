import { Image, StyleSheet, Text, View, SafeAreaView, Switch, TouchableOpacity } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import { getDatabase, ref, update, get, child, remove } from "firebase/database";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { getAuth } from '@firebase/auth';

export default function PrivacySecurity({navigation}) {
    const [music, setMusic] = useState(true);
    const [location, setLocation] = useState(true);
    const [health, setHealth] = useState(true);
    
    const db = getDatabase();
    const dbRef = ref(db);
    const userId = getAuth().currentUser.uid;

    // Once the Setting page loads, it will get the value of music, health, location variables from the database
    useEffect(() => {
        get(child(dbRef, `users/${userId}`)).then((snapshot) => {
            if (snapshot.exists()) {
                var music = snapshot.val().allowTrackMusic;
                var health = snapshot.val().allowTrackHealth;
                var location = snapshot.val().allowTrackLocation;
                setMusic(music);
                setLocation(location);
                setHealth(health);
            } else {
                console.log("No data available");
            }
        });
    }, [])

    // Change boolean value of the music variable when toggle the switch
    const toggleMusicSwitch = () => {
        setMusic(previousState => !previousState);
    }

    //Change boolean value of the location variable when toggle the switch
    const toggleLocationSwitch = () => {
        setLocation(previousState => !previousState);
    }

    //Change boolean value of the health variable when toggle the switch
    const toggleHealthSwitch = () => {
        setHealth(previousState => !previousState);
    }

    //Update the values into database, then return back to the Setting page
    const updateData = () => {
        update(ref(db, 'users/' + userId), {
            allowTrackHealth: health,
            allowTrackLocation: location,
            allowTrackMusic: music
        });
        navigation.navigate('TabNavigation', { screen: 'Setting' });
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.header}>
                <TouchableOpacity onPress={updateData} style={{position: 'absolute', left: '3%'}}>
                    <Entypo name="align-left" size={35} color="white" />
                </TouchableOpacity>
                <View style={{alignItems:'center'}}>
                    <Text style={styles.title}>Privacy & Security</Text>
                </View>
            </SafeAreaView>
            <View style={styles.body}>
                <Text style={[styles.text1]}>Allow SquadSync to track your: </Text>
                <View style={{ flexDirection: "row", justifyContent:'space-between', paddingTop: '5%' }}>
                    <View style={{ flexDirection: "row", alignItems:'center'}}>
                        <MaterialCommunityIcons name="music" size={35} color="#FFB470" />
                        <Text style={[styles.text]}>Music Activity</Text>
                    </View>
                    <Switch
                        trackColor={{ false: '#767577', true: '#B5D0FF' }}
                        thumbColor={music ? '#F8C272' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleMusicSwitch}
                        value={music}
                    />
                </View>
                <View style={{ backgroundColor: "#B9B9B9", height: 1.5, marginTop: '5%' }} />
                
                <View style={{ flexDirection: "row", justifyContent:'space-between', paddingTop: '5%' }}>
                    <View style={{ flexDirection: "row", alignItems:'center'}}>
                        <Entypo name="location" size={35} color="#5DA9EF" />
                        <Text style={[styles.text]}>Location</Text>
                    </View>
                    <Switch
                        trackColor={{ false: '#767577', true: '#B5D0FF' }}
                        thumbColor={location ? '#F8C272' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleLocationSwitch}
                        value={location}
                    />
                </View>
                <View style={{ backgroundColor: "#B9B9B9", height: 1.5, marginTop: '5%' }} />

                <View style={{ flexDirection: "row", justifyContent:'space-between', paddingTop: '5%' }}>
                    <View style={{ flexDirection: "row", alignItems:'center'}}>
                        <MaterialCommunityIcons name="cards-heart" size={35} color="#DE4F4F" />
                        <Text style={[styles.text]}>Health</Text>
                    </View>
                    <Switch
                        trackColor={{ false: '#767577', true: '#B5D0FF' }}
                        thumbColor={health ? '#F8C272' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleHealthSwitch}
                        value={health}
                    />
                </View>
                <View style={{ backgroundColor: "#B9B9B9", height: 1.5, marginTop: '5%' }} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#23272D',
    },
    header: {
        flex: 0.38,
        backgroundColor: '#23272D',
        alignItems:'center',
        justifyContent: 'center',
        flexDirection: 'row'
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
    },
    text1: {
        fontSize: 18,
        fontWeight: '700',
        color: 'black',
        paddingTop: '5%'
    }
}); 