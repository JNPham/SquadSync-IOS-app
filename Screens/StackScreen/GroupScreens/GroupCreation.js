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

export default function GroupCreation({ route, navigation }) {
    const defaultGroupPic = 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png';
    const memLimit = 5;

    const db = getDatabase();
    const dbRef = ref(db);
    const storage = getStorage();
    const userId = getAuth().currentUser.uid;
    const activity = [];

    //const user = route.params;
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState(defaultGroupPic);
    const [groupName, setGroupName] = useState('');
    const [publicity, setPublicity] = useState('Public'); //group is set to be public by default
    const [groupInfo, setGroupInfo] = useState('');
    const [admin, setAdmin] = useState(userName); //Admin is the one who is creating group
    const [memberLimit, setMemberLimit] = useState(memLimit); //todo: increase limit if needed
    const [tracking, setTracking] = useState('Music');
    const [competition, setCompetition] = useState(false);
    const [inviteCode, setInviteCode] = useState(''); //by default, the group is public so users do not need code to join
    //const [activityLog, setActivityLog] = useState([]); //Todo: add Activity log on Group Setting page

    //function searchs from firebase using uid and returns the currently logged in user's username
    function findUserName(userId){
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

    //Change boolean value of the competition variable when toggle the switch
    const toggleSwitch = () => setCompetition(previousState => !previousState);

    //Function called when "Save" is clicked. It checks to make sure the group name, admin, and member limit 
    // fields are not empty before create a group and save info to database (For now, it justs alert if the
    // fields are not empty)
    const saveGroupData = async () => {
        if (groupName.trim() != "" && memberLimit > 1) {
            //Upload new group's data into database
            var newGroup = push(ref(db, 'groups/'), {
                name: groupName,
                info: groupInfo,
                admin: userId,
                limit: memberLimit,
                competitionMode: competition,
                tracking: tracking,
                activity: activity,
            });
            //Add current user to group's member list
            set(ref(db, '/groups/' + newGroup.key + '/members/'), {          
                memberID: userId
            });
            //Add to user's profile the url to download the group avatar
            const url = await uploadImage(newGroup.key);
            //setImageURL(url);
            set(ref(db, '/groups/' + newGroup.key + '/url'), {
                groupURL: url,
            });
            //Add to user's profile the url to download the group avatar and group name
            set(ref(db, 'users/' + userId + '/groups/' + newGroup.key), {
                groupURL: url,
                groupName: groupName,
            });
            set(ref(db, '/groups/' + newGroup.key + '/chat/'), {          
                1: "SquadSync*Start of your new chat!"
            });
            //Add image url to group
            set(ref(db, '/groups/' + newGroup.key + '/images/imgDictionary'), {          
                1: ""
            });
            //Add video url to group
            set(ref(db, '/groups/' + newGroup.key + '/video/vidDictionary'), {          
                1: ""
            });
            alert('Your group has been successfully created!');
            navigation.navigate('TabNavigation', { screen: 'Home' });
        } else {
            alert('Unable to create goup! Please check the group name, admin and member limit fields!');
        }
    }

    // Function used to access user's image library, pick and display an image 
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    // Function used to upload the group's image into firebase storage
    const uploadImage = async (groupID) => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function () {
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', image, true);
            xhr.send(null);
        })
        const imageRef = sRef(storage, 'Groups/' + groupID);
        const snapshot = await uploadBytes(imageRef, blob);
        blob.close();
        return await getDownloadURL(imageRef);
    }

    //Group Creation front-end
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('TabNavigation', { screen: 'Home' })}>
                    <Text style={[styles.textButton, { position: 'absolute', top: '4%', left: '5%' }]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={saveGroupData}>
                    <Text style={[styles.textButton, { position: 'absolute', top: '4%', right: '5%' }]}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={pickImage} style={{ width: 140, height: 140, borderRadius: 140 / 2, top: '5%', left: '33%' }}>
                    <Image
                        source={{ uri: image }}
                        style={{ width: 140, height: 140, borderRadius: 140 / 2, borderWidth: 4 }}
                    />
                </TouchableOpacity>
            </SafeAreaView>
            <SafeAreaView style={styles.info}>
                <KeyboardAwareScrollView contentContainerStyle={{flexGrow:1,justifyContent:'space-between'}}>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity onPress={() => setPublicity("Public")} style={{ flexDirection: "row", alignItems: 'flex-end', paddingRight: '37%' }}>
                            <Text style={[styles.text, { paddingRight: '3%', paddingLeft: '8%' }]}>
                                Public:
                            </Text>
                            <Ionicons name={publicity === "Public" ? "radio-button-on" : "radio-button-off"} size={25} color="#F8C272" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setPublicity("Private")} style={{ flexDirection: "row", alignItems: 'flex-end' }}>
                            <Text style={[styles.text, { paddingRight: '3%' }]}>
                                Private:
                            </Text>
                            <Ionicons name={publicity === "Private" ? "radio-button-on" : "radio-button-off"} size={25} color="#F8C272" />
                        </TouchableOpacity>
                    </View> 

                    <Text style={styles.text}>Group's Name: </Text>
                    <TextInput value={groupName} onChangeText={(groupName) => { // Group's name
                        setGroupName(groupName)
                    }}
                        placeholder="Tab to enter you group's name" style={[styles.textInput]}></TextInput>

                    <Text style={styles.text}>Group's Info: </Text>
                    <TextInput value={groupInfo} onChangeText={(groupInfo) => { // Group's info
                        setGroupInfo(groupInfo)
                    }}
                        placeholder="Tell us a little bit about your group (Optional)"
                        style={[styles.textInput, { height: 100, lineHeight: 20 }]}
                        multiline
                        maxLength={160}></TextInput>

                    <Text style={styles.text}>Admin: </Text>
                    <TextInput value={admin} 
                        editable = {false}
                        placeholder={userName} 
                        style={[styles.textInput]}>
                    </TextInput>

                    <Text style={styles.text}>Member Limit: </Text>
                    <TextInput value={memberLimit} onChangeText={(memberLimit) => { // Member Limit
                        setMemberLimit(memberLimit)
                    }}
                        placeholder="Enter the limit number of group members" style={[styles.textInput]}></TextInput>
                    
                    <View style={{flexDirection: "row", alignItems:'flex-end', justifyContent:'space-between', marginRight: '5%', paddingTop:'3%'}}>
                        <Text style={[styles.text]}>Competition Mode:</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#B5D0FF' }}
                            thumbColor={competition ? '#F8C272' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={competition}
                        />
                    </View>

                    <View style={{marginRight:'5%'}}>
                        <TouchableOpacity onPress={() => setTracking('Music')} style={{flexDirection: "row", alignItems:'flex-end', justifyContent:'space-between', paddingTop:'1%'}}>
                            <Text style={[styles.text]}>
                                Track Music Activity
                            </Text>
                            <Ionicons name={tracking === 'Music' ? "radio-button-on" : "radio-button-off"} size={30} color="#F8C272"/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setTracking('Location')} style={{flexDirection: "row", alignItems:'flex-end', justifyContent:'space-between', paddingTop:'1%'}}>
                            <Text style={[styles.text]}>
                                Track Location 
                            </Text>
                            <Ionicons name={tracking === 'Location' ? "radio-button-on" : "radio-button-off"} size={30} color="#F8C272" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setTracking('Health')} style={{flexDirection: "row", alignItems:'flex-end', justifyContent:'space-between', paddingTop:'1%'}}>
                            <Text style={[styles.text]}>
                                Track Health 
                            </Text>
                            <Ionicons name={tracking === 'Health' ? "radio-button-on" : "radio-button-off"} size={30} color="#F8C272" />
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        </View>
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
        display: 'flex',
        color: 'black',
        paddingTop: '5%',
        paddingBottom: '1%',
        paddingLeft: '5%'
    },
    header: {
        flex: 0.8,
        backgroundColor: '#23272D',
    },
    info: {
        flex: 3,
        backgroundColor: 'white',
    },
    textInput: {
        width: '90%',
        fontSize: 16,
        padding: 10,
        marginTop: 2,
        backgroundColor: '#F4F4F4',
        borderRadius: 5,
        left: '5%'
    },
});