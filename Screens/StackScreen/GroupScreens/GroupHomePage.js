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

export default function GroupHomePage({route, navigation }) {
    const defaultGroupPic = 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png';
    const db = getDatabase();

    const {groupID} = route.params;
    const [groupName, setGroupName] = useState();
    const [image, setImage] = useState(defaultGroupPic);
    const [memberLimit, setMemberLimit] = useState();
    const [tracking, setTracking] = useState('Music');
    const [competition, setCompetition] = useState(false); // for UI display

    //function searchs from firebase using groupID and returns the currently selected group
    function findGroup(groupID) {
        const dbRef = ref(db);
        get(child(dbRef, `groups/${groupID}`)).then((snapshot) => {
            console.log(groupID);
            if (snapshot.exists()) {
                var gName = snapshot.val().name;
                console.log(gName);
                setGroupName(gName);
                var gImage = snapshot.val().url.groupURL;
                setImage(gImage);
                var memLimit = snapshot.val().limit;
                setMemberLimit(memLimit);
                var gTracking = snapshot.val().tracking;
                setTracking(gTracking);
                var gCompetition = snapshot.val().competitionMode;
                setCompetition(gCompetition);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        findGroup(groupID);
    }, [])

    return(
        <View
            style={styles.container}
            behavior="padding">
            <SafeAreaView style = {styles.header}>
                <TouchableOpacity style={{position:'absolute', right:'4%', top:'30%'}}
                    onPress={() => navigation.navigate('GroupNavigation', { screen: 'GroupSettingPage' })}>
                    <Ionicons name="ios-settings" size={38} color="white" />
                </TouchableOpacity>
                <Image
                    source={{ uri: image }}
                    style={{ width: 100, height: 100, borderRadius: 100 / 2, borderWidth: 3 }}
                />
                <View style={{ paddingLeft: '2%' }}>
                    <Text style={styles.title}>{groupName}</Text>
                    <Text style={styles.text}>Limit: {memberLimit} members</Text>
                </View>
            </SafeAreaView>
            <KeyboardAvoidingView style = {styles.body}>
                <TextInput
                    style={styles.TextBoxes}
                    keyboardType="ascii-capable"
                    />
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8C272',
    },
    header: {
        flex: .75,
        backgroundColor: '#F8C272',
        alignItems: 'center',
        flexDirection:'row', 
        justifyContent:'center',
    },
    title: {
        fontStyle: 'normal',
        fontSize: 25,
        fontWeight: '800',
        textAlign: 'center',
        color: 'black',
        //paddingTop: '5%',
        paddingBottom: '3%',
    },
    text: {
        fontStyle: 'normal',
        fontSize: 16,
        fontWeight: '7600',
        textAlign: 'center',
        color: 'black',
    },
    TextBoxes: {
        width: '95%',
        fontSize: 13,
        alignItems: 'center',
        padding: 13,
        backgroundColor: '#D9D9D9',
        marginVertical: 10,
        borderRadius: 35,
    },
    body: {
        flex: 3,
        justifyContent: 'center',
        backgroundColor: 'white',
      }
});