import { StyleSheet, View, Text, TextInput, Image, FlatList, Button, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import React from 'react';
import { Video } from 'expo-av';
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
    const storage = getStorage();

    //const {groupID} = route.params.params;
    const [groupName, setGroupName] = useState();
    const [groupId, setGroupId] = useState();
    const [image, setImage] = useState(defaultGroupPic);
    const [imageAdding, setImageAdding] = useState();
    const [memberLimit, setMemberLimit] = useState();
    const [tracking, setTracking] = useState('Music');
    const [competition, setCompetition] = useState(false); // for UI display
    const [groupChat, setGroupChat] = useState('');
    const [imageUrls, setGroupChatImages] = useState();
    const [videoUrls, setGroupChatVideos] = useState();

    // const imageUrls = [
    //     'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png',
    //     'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png',
    //     'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png',
    //     'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png'
    //   ];
    // const videoUrls = [
    //     'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    //     'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    // ];



    const [selectedVideo, setSelectedVideo] = React.useState(null);
    const handleVideoPress = (videoUrl) => {
        setSelectedVideo(videoUrl);
      };



    //function searchs from firebase using groupID and returns the currently selected group
    function findGroup(groupID) {
        const dbRef = ref(db);
        get(child(dbRef, `groups/${groupID}`)).then((snapshot) => {
            console.log(groupID);
            console.log(snapshot.val());

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


                var groupChatRaw = snapshot.val().chat;
                unpackChatData(groupChatRaw);

                var groupChatImages = snapshot.val().images.imgDictionary;
                unpackGroupImages(groupChatImages);

                var groupChatVideos = snapshot.val().video.vidDictionary;
                unpackGroupVideos(groupChatVideos);

            } else {
                console.log("No data available 1111");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    function unpackChatData(rawChatData) {
        var messageString = "";
        for (let i = 0; i < rawChatData.length; i++) {
            const message = rawChatData[i];
            if (message !== undefined) {
              var twoValue = message.split("*");
              messageString += twoValue[0] + ": " + twoValue[1] + "\n\n";
            }
          }
          setGroupChat(messageString);
    }

    function unpackGroupImages(rawImageData) {
        var imgUrls = []; 
        for (let i = 0; i < rawImageData.length; i++) {
            const imagelink = rawImageData[i];
            if ((imagelink !== undefined) && (imagelink !== "")) {
              imgUrls.push(imagelink)
            }
          }
          setGroupChatImages(imgUrls);
    }

    function unpackGroupVideos(rawVideoData) {
        var vidUrls = []; 
        for (let i = 0; i < rawVideoData.length; i++) {
            const videolink = rawVideoData[i];
            if ((videolink !== undefined) && (videolink !== "")) {
              vidUrls.push(videolink)
            }
          }
          setGroupChatVideos(vidUrls);
    }
    
    const pickVideo = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            const url = await uploadVideo(groupId, result.assets[0].uri);
            console.log(url);
            //setImageURL(url);
            videoUrls.push(url)
            
            const vidDictionary = createVideoDictionary(videoUrls);
            
            console.log(vidDictionary);

            const dbRef = ref(getDatabase());
           
            set(ref(db, '/groups/' + groupId+ '/video'), {
                vidDictionary
            });
            console.log("Video uploaded!");  
        }
    };

    

    // Function used to access user's image library, pick and display an image 
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            const url = await uploadImage(groupId, result.assets[0].uri);
            console.log(url);
            //setImageURL(url);
            imageUrls.push(url)
            
            const imgDictionary = createImageDictionary(imageUrls);
            
            console.log(imgDictionary);

            const dbRef = ref(getDatabase());
           
            set(ref(db, '/groups/' + groupId+ '/images'), {
                imgDictionary
            });
            console.log("Image uploaded!");  
        }
    };

    function createImageDictionary(imgData) {
        const imageDict = {};
        imgData.forEach((value, index) => {
          imageDict[index + 1] = value;
        });
        console.log(imageDict);
        return imageDict;
      }

    function createVideoDictionary(vidData) {
        const videoDict = {};
        vidData.forEach((value, index) => {
          videoDict[index + 1] = value;
        });
        console.log(videoDict);
        return videoDict;
    }

    // Function used to upload the group's image into firebase storage
    const uploadImage = async (groupID, imageValue) => {
        console.log("our result");
        console.log(imageValue);
        let uri = imageValue;
        let uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        try {
            const response = await fetch(uploadUri);
            const blobFile = await response.blob();
            let randNum = Math.floor(Math.random() * 10000) + 1 ;
            const imageRef = sRef(storage, 'GroupImages/' + groupID + '/images/' + randNum);
            await uploadBytesResumable(imageRef, blobFile);
            return await getDownloadURL(imageRef);
        } catch (e) {
            console.log(e);
        }
             
    }
    // Function used to upload the group's video into firebase storage
    const uploadVideo = async (groupID, videoValue) => {
        console.log("our result");
        console.log(videoValue);
        let uri = videoValue;
        let uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        try {
            const response = await fetch(uploadUri);
            const blobFile = await response.blob();
            let randNum = Math.floor(Math.random() * 10000) + 1 ;
            const videoRef = sRef(storage, 'GroupVideos/' + groupID + '/video/' + randNum);
            await uploadBytesResumable(videoRef, blobFile);
            return await getDownloadURL(videoRef);
        } catch (e) {
            console.log(e);
        }
             
    }


    useEffect(() => {
        //findGroup(groupID);
        findGroup("-NRFdT4ZeDQoMIQu8uaj");
        setGroupId("-NRFdT4ZeDQoMIQu8uaj");
    }, [])

    return(
        <View
            style={styles.container}
            behavior="padding">
            {/* <SafeAreaView style = {styles.header}>
                <TouchableOpacity style={{position:'absolute', right:'4%', top:'30%'}}
                    onPress={() => navigation.navigate('GroupNavigation', { screen: 'GroupSettingPage' })}>
                    <Ionicons name="ios-settings" size={38} color="white" />
                </TouchableOpacity>
                <Image
                    source={{ uri: image }}
                    style={{ width: 100, height: 100, borderRadius: 100 / 2, borderWidth: 3 }}
                />
                <View style={{ paddingLeft: '2%' }}>
                    <Text style={styles.title}>Somename</Text>
                    <Text style={styles.text}>Limit: {memberLimit} members</Text>
                </View>
            </SafeAreaView>
            <KeyboardAvoidingView style = {styles.body}>
                <TextInput
                    style={styles.TextBoxes}
                    keyboardType="ascii-capable"
                    />
            </KeyboardAvoidingView> */}
            <Text>Group Chat Page</Text>
            <Text>{groupChat}</Text>
            <TouchableOpacity onPress={pickImage} > 
            <Text>Tap to add Group Image</Text>
            </TouchableOpacity>
            <View style={styles.line} />

            <FlatList
                data={imageUrls}
                numColumns={4}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
            <Image source={{ uri: item }} style={{ width: 80, height: 80, borderRadius: 80 / 2, borderWidth: 1.5 }} />
                 )}/>

            <TouchableOpacity onPress={pickVideo} > 
            <Text>Tap to add Group Video</Text>
            </TouchableOpacity>
            <View style={styles.line} />
            <FlatList
            data={videoUrls}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleVideoPress(item)}>
                <Video
                source={{ uri: item }}
                style={{ width: 80, height: 80, borderRadius: 80 / 2, borderWidth: 1.5 }}
                resizeMode="cover"
                shouldPlay={item === selectedVideo}
                />
            </TouchableOpacity>)}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
    line: {
        height: 5,
        backgroundColor: '#ccc',
        marginBottom: 10,
        marginTop: 10,

      },
    body: {
        flex: 3,
        justifyContent: 'center',
        backgroundColor: 'white',
      }
});