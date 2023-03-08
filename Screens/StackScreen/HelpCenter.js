import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';

export default function PrivacySecurity({navigation}) {

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.header}>
                <TouchableOpacity onPress={() =>navigation.navigate('TabNavigation', { screen: 'Setting' })} style={{position: 'absolute', left: '3%'}}>
                    <Entypo name="align-left" size={35} color="white" />
                </TouchableOpacity>
                <View style={{alignItems:'center'}}>
                    <Text style={styles.title}>Help Center</Text>
                </View>
            </SafeAreaView>
            <View style={styles.body}>
                <Text style={styles.text}>  The SquadSync Help Center will support you as you learn about and use SquadSync. Ask questions, get answers!</Text>
                <Text></Text>
                <Text style={styles.text}>If you encounter any problem, you can send an email or call our support team for futher assistance.</Text>
                <Text></Text>
                <Text style={styles.text}>Contact Us:</Text>
                <Text style={styles.text1}>     Email: squadSync-support@gmail.com</Text>
                <Text style={styles.text1}>     Phone Number: (714)-123-9876</Text>
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
        paddingRight: '5%',
        paddingTop:'3%'
        //alignItems: 'stretch',
    },
    title: {
        fontSize: 25,
        fontWeight: '800',
        color: '#FFFFFF',
    },
    text: {
        fontSize: 18,
        fontWeight: '600',
        color: 'black',
        //paddingLeft: '3%'
    },
    text1: {
        fontSize: 15,
        fontWeight: '400',
        color: 'black',
        paddingTop: '2%'
    }
}); 