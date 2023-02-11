import { StyleSheet, View, Text, TextInput, StatusBar, Image, Button, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function GroupSetting(props) {
  const defaultGroupPic = require('../../../assets/avaGroup.jpg');

  const [groupName, setGroupName] = useState('');

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity>
                <Text style={[styles.textButton, {position:'absolute', top: '4%', left:'5%'}]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={[styles.textButton, {position:'absolute', top:'4%', right:'5%'}]}>Save</Text>
            </TouchableOpacity>
            <Image 
                source={defaultGroupPic}  
                style={{width: 130, height: 130, borderRadius: 130/ 2, borderWidth:5, top:'5%', left: '33%'}} 
            />
        </View>
        <View style={styles.info}>
            <ScrollView contentContainerStyle={styles.info}>
                <Text style={styles.text}>Group's Name: </Text>
                <TextInput value={groupName} onChangeText={(groupName) => { // Group's name
                    setGroupName(groupName)}
                } 
                placeholder="Group's Name" style={[styles.textInput, {top: '53%'}]}></TextInput>
            </ScrollView>
        </View>
            
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#23272D',
    },
    textButton: {
        fontStyle: 'normal',
        fontSize: 18,
        fontWeight: '700',
        height: 25,
        display: 'flex',
        letterSpacing: 0.5,
        color: '#DE4F4F'
    },
    text: {
        fontStyle: 'normal',
        fontSize: 16,
        fontWeight: '700',
        //height: 25,
        display: 'flex',
        color: 'black',
        padding: '5%'
    },
    header: {
        flex: 0.85,
        backgroundColor: '#23272D',
    },
    info: {
        flex: 3,
        backgroundColor: 'white',
        //alignItems: 'center',
        //justifyContent: 'center',
    }, 
    textInput: {
        alignSelf: 'stretch',
        paddingLeft: 18,
        //borderBottomWidth: 2,
        marginVertical: 8,
        backgroundColor: 'orange'
    },   
});