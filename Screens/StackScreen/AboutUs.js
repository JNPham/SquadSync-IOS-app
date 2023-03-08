import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';

export default function PrivacySecurity({navigation}) {
    const LogoImage = require('../../assets/squadsync.png');

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.header}>
                <TouchableOpacity onPress={() =>navigation.navigate('TabNavigation', { screen: 'Setting' })} style={{position: 'absolute', left: '3%'}}>
                    <Entypo name="align-left" size={35} color="white" />
                </TouchableOpacity>
                <View style={{alignItems:'center'}}>
                    <Text style={styles.title}>About Us</Text>
                </View>
            </SafeAreaView>
            <View style={styles.body}>
                <Image source={LogoImage} style={{width:120, height: 120}} />
                <Text style={styles.text}>  SquadSync is a mobile application that allows users to create and join groups with friends. 
                    These groups or 'Squads' can then display a wide variety of daily fun and interesting information about the joined members.</Text>
                <Text style={styles.text}>  As people grow older they tend to get more busy with their lives. It is during these times that staying connected in a meaningful 
                    way with ones' friends tends to become more difficult and often a second thought. Although social media allows us to stay “socially 
                    connected” much of the existing platforms display info and data that others want you to see when they want you to see it and have 
                    very little to no depth behind them. Furthermore, unrestricted followers/following numbers on these social media platforms leads to 
                    a bloated spam of posts from users you may not even remember or interact with on a daily basis. </Text>
                <Text style={styles.text}>  SquadSync aims to fix this issue and provide a solution to those friend groups who would like a unique way to stay connected into 
                    their friends' daily lives. Through the multiple and interesting friend group settings SquadSync offers such as location, music status, 
                    and health tracking, users of the app will find themselves being involved with their friends through categories they choose and want to see!</Text>
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
        paddingLeft: '4%',
        paddingRight: '4%',
        paddingTop:'3%',
        alignItems: 'center',
    },
    title: {
        fontSize: 25,
        fontWeight: '800',
        color: '#FFFFFF',
    },
    text: {
        fontSize: 15,
        fontWeight: '450',
        color: 'black',
        paddingTop: '3%'
    },
}); 