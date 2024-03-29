import { StyleSheet, Text, FlatList, Image, View, ScrollView, SafeAreaView, TouchableOpacity, TextInput, ActivityIndicator, Pressable } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { getDatabase, child, ref, set, get, onValue } from "firebase/database";
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import { getAuth } from '@firebase/auth';
import { getStorage, getDownloadURL } from "firebase/storage";
import { ref as sRef } from 'firebase/storage';
import themeContext from '../../theme/themeContext';
import {Dimensions} from 'react-native';

export default function Home({ navigation }) {
    const theme = useContext(themeContext);


    const db = getDatabase();
    const storage = getStorage();
    const groupLimit = 20;
    const userId = getAuth().currentUser.uid;
    const windowWidth = Dimensions.get('window').width;

    const [userName, setUserName] = useState('');
    const [search, setSearch] = useState('');
    const [groupList, setGroupList] = useState([]);
    const [numGroup, setNumGroup] = useState(0);
    //const [urlGroup, setUrlGroup] = useState('https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png');

    //todo
    //search and return group that match Group Name -> Search bar function
    function searchGroup(groupName) {
        setSearch(groupName)
    }

    //function searchs from firebase using uid and returns the currently logged in user's username
    function findUserName(userId) {
        const dbRef = ref(db);
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
        loadGroup();
    }, [])

    function loadGroup() {
        const groupRef = ref(db, `users/${userId}/groups`);
        onValue(groupRef, (snapshot) => {
            let groups = []
            setGroupList(groups);
            snapshot.forEach((child) => {
                let groupData = {
                    id: child.key,
                    name: child.val().groupName,
                    url: child.val().groupURL,
                };
                groups.push(groupData);
            });
            setNumGroup(groups.length);
            setGroupList(groups);
        })
    }

    const renderItem = ({ item }) => {
        let urlGroup = item.url;
        return (
            <View style={{alignItems:'center', paddingTop:'2%', paddingLeft: '2%', paddingRight: '2%'}}>
                <TouchableOpacity style={{alignItems:'center'}} 
                                onPress={() => navigation.navigate('GroupNavigation', { screen: 'GroupTab', 
                                                                                        params: { groupID: item.id}})}>
                    <Image
                        source={{ uri: urlGroup }}
                        style={{ width: 160, height: 140, borderRadius: 60 / 2}}
                    />
                    <Text style={{fontWeight: '600', paddingTop: '1.5%', color: theme.color}}>{item.name}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    function showGroups() {
        return (
            <View style={[styles.content, {backgroundColor:theme.background}]}>
                <Text style={[styles.groupNumber, {color: theme.color}]}>Your Groups: {groupList.length}/{groupLimit}</Text>
                <FlatList
                    style={styles.groupDisplay}
                    data={groupList}
                    // onRefresh={() => {
                    //     loadGroup();
                    // }}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    extraData={groupList}
                    horizontal={false}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        );
    }

    //Home page front-end
    return (
        <SafeAreaView style={[styles.container]}>
            <View style={styles.header}>
                <Text style={styles.text}>Hello {userName}!</Text>
                <Text style={styles.text}>How are you doing today?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Notification')}
                    style={{ position: 'absolute', right: '5%', top: '5%' }}>
                    <Ionicons name="notifications-circle" size={45} color="#D9D9D9" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}
                    style={{ position: 'absolute', top: '5%', left: '5%' }}>
                    <Avatar
                        rounded
                        containerStyle={{ width: 40, height: 40 }}
                        source={{ //todo: add user's avatar
                            uri: 'https://i.mydramalist.com/EoPbW_5f.jpg'
                        }}>
                    </Avatar>
                </TouchableOpacity>
                <TextInput style={[styles.TextBoxes, {left: '5%'}]}
                    placeholder="Looking for a group? Enter the name here."
                    onChangeText={(groupName) => { searchGroup(groupName) }}
                    value={search}
                ></TextInput>
                <TouchableOpacity>
                    <Text style={{
                        color: 'white', fontSize: 14, fontWeight: '600',
                        position: 'absolute', top:65, left: '17%',
                        textDecorationLine: 'underline'
                    }}>Explore our public groups here!</Text>
                </TouchableOpacity>
            </View>
            
            <View style={[{backgroundColor:theme.background}, styles.content]}>
                <View style={{backgroundColor:theme.background}}>
                    {/* {isLoading ? <ActivityIndicator size="large" /> : showGroups()} */}
                    {showGroups()}
                </View>
                <TouchableOpacity style={{ left: windowWidth*0.007, bottom: '18%'}}
                    onPress={() => navigation.navigate('GroupNavigation', { screen: 'GroupCreation' })}>
                    <Ionicons name="add-circle" size={50} color="#E57A7A" />
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
        flex: 0.75,
        backgroundColor: '#23272D',
        paddingLeft: '5%'
    },
    content: {
        flex: 3,
        color: 'white',
        alignItems: 'center',

    },
    TextBoxes: { //search bar
        position: 'absolute',
        width: '95%',
        top: '35%',
        fontSize: 13,
        alignItems: 'center',
        padding: 13,
        backgroundColor: '#D9D9D9',
        marginVertical: 10,
        borderRadius: 35,
    },
    groupNumber: {
        fontStyle: 'normal',
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 19,
        height: 30,
        letterSpacing: 0.5,
        color: 'black',
        paddingTop: '3%',
    },
    groupDisplay: {
        height: '86.7%',
        flexGrow: 0
    }
});