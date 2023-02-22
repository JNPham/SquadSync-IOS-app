import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, TextInput, Pressable } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { getDatabase, child, ref, set, get} from "firebase/database";
import { color } from 'react-native-elements/dist/helpers';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import { getAuth } from '@firebase/auth';

export default function Home({navigation}) {
    const groupLimit = 10;
    const userId = getAuth().currentUser.uid;
    let group = [];
    const [userName, setUserName] = useState('');
    const [search, setSearch] = useState('');
    const [groupList, setGroupList] = useState([]);

    //todo
    //search and return group that match Group Name
    function searchGroup(groupName) { 
        setSearch(groupName)
    }
    
    //function searchs from firebase using uid and returns the currently logged in user's username
    function findUserName(userId){
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${userId}`)).then((snapshot) => {
            if (snapshot.exists()) {
                var value = snapshot.val().username;
                setUserName(value);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);   
        }); 
    }
    
    //call function findUserName() once the Home page loads
    useEffect(() => {
        findUserName(userId);
    }, []) 

    //Home page front-end
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text}>Hello {userName}!</Text>
                <Text style={styles.text}>How are you doing today?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Notification')} 
                                style={{position: 'absolute', right: '5%', top: '5%'}}>
                    <Ionicons name="notifications-circle" size={45} color="#D9D9D9"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}
                                style={{position: 'absolute', top: '5%'}}>
                    <Avatar
                        rounded
                        containerStyle={{width:40, height:40}}
                        source={{ //add user's avatar
                            uri:'https://i.mydramalist.com/EoPbW_5f.jpg'
                        }}>
                    </Avatar>
                </TouchableOpacity>
                <TextInput style={styles.TextBoxes}
                    placeholder="Looking for a group? Enter the code here."
                    onChangeText={(groupName) => {searchGroup(groupName)}}
                    value={search}
                ></TextInput>
                <Pressable>
                    <Text style={{color:'white', fontSize:'14', fontWeight: '600', 
                                position: 'absolute', top: 73, left:'17%',
                                textDecorationLine: 'underline'}}>Explore our public groups here!</Text>
                </Pressable>
            </View>
            <View style={styles.content}>
                <Text style={styles.groupNumber}>Your Groups: {group.length}/{groupLimit}</Text>
                <ScrollView>
                    
                    
                </ScrollView>
                <TouchableOpacity style={{position: 'absolute', left:'43.5%', bottom:'9%'}}
                                    onPress={() => navigation.navigate('GroupNavigation', {screen: 'GroupCreation' })}>
                    <Ionicons name="add-circle" size={50} color="#E57A7A"/>
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    );
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#23272D',
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
    header: {
        flex: 0.85,
        backgroundColor: '#23272D',
        marginLeft: '5%',
    },
    content: {
        flex: 3,
        backgroundColor: 'white',
        alignItems: 'center',
        //justifyContent: 'center',
    },    
    TextBoxes: { //search bar
        position: 'absolute',
        width:'95%',
        top: '35%',
        fontSize:13,
        alignItems: 'center',
        padding:13,
        backgroundColor: '#D9D9D9',
        marginVertical:10,
        borderRadius: 35,
    },
    groupNumber:{
        fontStyle: 'normal',
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 19,
        height: 30,
        letterSpacing: 0.5,
        color: 'black',
        paddingTop:'3%'
    }
}); 

