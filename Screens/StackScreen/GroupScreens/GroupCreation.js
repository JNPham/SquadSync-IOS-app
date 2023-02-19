import { StyleSheet, View, Text, TextInput, StatusBar, Image, Button, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { getDatabase, child, ref, set, get, push} from "firebase/database";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, uploadBytesResumable, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as sRef } from 'firebase/storage';


export default function GroupCreation({route, navigation}) {
    const defaultGroupPic = 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png';
    const memLimit = 5;

    const db = getDatabase();
    const storage = getStorage();

    //const user = route.params;
    const [image, setImage] = useState(defaultGroupPic);
    const [groupName, setGroupName] = useState('');
    const [publicity, setPublicity] = useState(true); //group is set to be public by default
    const [groupInfo, setGroupInfo] = useState('');
    const [admin, setAdmin] = useState("");
    const [memberLimit, setMemberLimit] = useState(memLimit); //todo: increase limit if needed
    const [trackHealth, setTrackHealth] = useState(false);
    const [trackMusic, setTrackMusic] = useState(false);
    const [trackLocation, setTrackLocation] = useState(false);
    const [competition, setCompetition] = useState(false);
    const [inviteCode, setInviteCode] = useState(''); //by default, the group is public so users do not need code to join
    const [activityLog, setActivityLog] = useState('');

    //Function called when "Save" is clicked. It checks to make sure the group name, admin, and member limit 
    // fields are not empty before create a group and save info to database (For now, it justs alert if the
    // fields are not empty)
    const saveGroupData = () => {
        if (groupName.trim() != "" && admin.trim() != "" && memberLimit.trim() != ""){
            var newGroup = push(ref(db, 'Groups/'), {
                name: groupName,
                info: groupInfo,
                admin: admin,
                limit: memberLimit,
            });
            console.log("Group ID: " + newGroup.key);
            UploadAvatar(newGroup.key);
            alert('Your group has been successfully created!');
            navigation.navigate('TabNavigation', {screen: 'Home'});
        } else {
            alert('Unable to create goup! Please check the group name, admin and member limit fields!');    
        }
    }

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

    const UploadAvatar = (groupID) => {
        const imageRef = sRef(storage, 'Groups/' + groupID);
        uploadBytes(imageRef, image)
            .catch((error) => {
                console.log(error.message);
            }); 
    };

    //Group Setting front-end
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('TabNavigation', {screen: 'Home'})}>
                    <Text style={[styles.textButton, {position:'absolute', top: '4%', left:'5%'}]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={saveGroupData}>
                    <Text style={[styles.textButton, {position:'absolute', top:'4%', right:'5%'}]}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={pickImage} style={{width: 140, height: 140, borderRadius: 140/ 2, top:'5%', left: '33%'}}>
                    <Image 
                        source={{ uri: image }}  
                        style={{width: 140, height: 140, borderRadius: 140/ 2, borderWidth:4}} 
                    />
                </TouchableOpacity>
            </SafeAreaView>
            <View style={styles.info}>
                <KeyboardAwareScrollView contentContainerStyle={styles.info}>
                    <Text style={styles.text}>Group's Name: </Text>
                    <TextInput value={groupName} onChangeText={(groupName) => { // Group's name
                        setGroupName(groupName)}} 
                        placeholder="Tab to enter you group's name" style={[styles.textInput]}></TextInput>
                    
                    <Text style={styles.text}>Group's Info: </Text>
                    <TextInput value={groupInfo} onChangeText={(groupInfo) => { // Group's info
                        setGroupInfo(groupInfo)}} 
                        placeholder="Tell us a little bit about your group (Optional)" 
                        style={[styles.textInput, {height:100, lineHeight: 20}]} 
                        multiline 
                        maxLength={160}></TextInput>
                    
                    <Text style={styles.text}>Admin: </Text>
                    <TextInput value={admin} onChangeText={(admin) => { // Admin --> todo: change code to choose admin from a list of members
                        setAdmin(admin)}} 
                        placeholder= "Who is the group admin?" style={[styles.textInput]}></TextInput>

                    <Text style={styles.text}>Member Limit: </Text>
                    <TextInput value={memberLimit} onChangeText={(memberLimit) => { // Member Limit
                        setMemberLimit(memberLimit)}} 
                        placeholder="Enter the limit number of group members" style={[styles.textInput]}></TextInput>
                </KeyboardAwareScrollView>
            </View>
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
        //alignItems: 'center',
        //justifyContent: 'center',
    }, 
    textInput: {
        width: '90%',
        fontSize: 16,
        padding: 10,
        //borderBottomWidth: 2,
        //marginVertical: 8,
        marginTop: 2,
        backgroundColor: '#F4F4F4',
        borderRadius: 5,
        left: '5%'
    },   
});