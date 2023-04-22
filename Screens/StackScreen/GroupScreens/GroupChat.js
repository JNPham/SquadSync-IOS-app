import { StyleSheet, View, Text, TextInput, Image, FlatList, Button, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import React from 'react';
import { Video } from 'expo-av';
import { TouchableOpacity } from 'react-native';
import { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { getDatabase, child, ref, set, get, push, query, orderByChild, onValue, serverTimestamp } from "firebase/database";
import { GiftedChat } from 'react-native-gifted-chat';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, uploadBytesResumable, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as sRef } from 'firebase/storage';
import { Ionicons } from "@expo/vector-icons";
import { getAuth } from '@firebase/auth';
import { Avatar } from 'react-native-elements';

export default function GroupChat({route, navigation }) {
    const defaultGroupPic = 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png';
    const db = getDatabase();
    const storage = getStorage();
    const userId = getAuth().currentUser.uid;
    const groupID = route.params.gID; //get group ID passed from Group Tab
    const [userName, setUserName] = useState('');
    //Caleb code start
    const [image, setImage] = useState(defaultGroupPic);
    const [imageAdding, setImageAdding] = useState();
    const [messages, setMessages] = useState([]);
    const [imageUrls, setGroupChatImages] = useState();
    const [videoUrls, setGroupChatVideos] = useState();
    const [selectedVideo, setSelectedVideo] = React.useState(null);
    
    const handleVideoPress = (videoUrl) => {
        setSelectedVideo(videoUrl);
      };

    //function searchs from firebase using groupID and returns the currently selected group
    function findGroup(groupID) {
        const dbRef = ref(db);
        get(child(dbRef, `groups/${groupID}`)).then((snapshot) => {
            if (snapshot.exists()) {

                /*var groupChatRaw = snapshot.val().chat;
                unpackChatData(groupChatRaw);

                var groupChatImages = snapshot.val().images.imgDictionary;
                unpackGroupImages(groupChatImages);

                var groupChatVideos = snapshot.val().video.vidDictionary;
                unpackGroupVideos(groupChatVideos); */

            } else {
                console.log("No data available 1111");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    /*function unpackChatData(rawChatData) {
        var messageString = "";
        for (let i = 0; i < rawChatData.length; i++) {
            const message = rawChatData[i];
            if (message !== undefined) {
              var twoValue = message.split("*");
              messageString += twoValue[0] + ": " + twoValue[1] + "\n\n";
            }
          }
          setGroupChat(messageString);
    } */

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
    // Caleb code end

    //Nhi code start
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

    useEffect(() => {
        findUserName(userId);
        findGroup(groupID);
        //findGroup("-NRFdT4ZeDQoMIQu8uaj");
    }, [])

    //function called when sending new message. 
    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        for (let i = 0; i < messages.length; i++) {
            const { _id, createdAt, text, user } = messages[i];
            console.log(user);
            var newChat = push(ref(db, 'groups/' + groupID + '/chat/'), {
                _id,
                text,
                user,
                createdAt: createdAt.toString(),
            });  
        };
    }, []);

    // load messages from database
    useLayoutEffect(() => {
        const q = query(ref(db, 'groups/' + groupID + '/chat/'), orderByChild('createAt', 'desc'));
        onValue(q, (snapshot) => {
            let chat = [];
            snapshot.forEach((child) => {
                let messageData = {
                    _id: child.key,
                    createdAt: new Date(child.val().createdAt),
                    text: child.val().text,
                    user: child.val().user,
                };
                chat.push(messageData);
            });
            chat.reverse() //.map((chat) => ({

            // }));
            setMessages(chat);
        });

    }, []);

    return(
        <SafeAreaView
            style={styles.container}
            behavior="padding">
            {/* <TouchableOpacity onPress={pickImage} > 
                <Text>Tap to add Group Image</Text>
            </TouchableOpacity>
            <View style={styles.line} />

            <FlatList
                data={imageUrls}
                numColumns={4}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style ={{padding: '0.5%'}}>
                        <Image source={{ uri: item }} style={{ width: 90, height: 90 }} />
                    </View>
                 )}
            />

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
                    <View style ={{padding: '0.5%'}}>
                        <Video
                            source={{ uri: item }}
                            style={{ width: 90, height: 90}}
                            resizeMode="cover"
                            shouldPlay={item === selectedVideo}
                        />
                    </View>
                </TouchableOpacity>)}
            /> */}

            <GiftedChat
                messages={messages}
                showAvatarForEveryMessage={true}
                onSend={messages => onSend(messages)}
                user={{id: userId,
                    name: userName}}
                renderAvatar={() => {
                    return (
                        <Avatar
                        rounded
                        containerStyle={{ width: 40, height: 40 }}
                        source={{ //todo: add user's avatar
                            uri: 'https://i.mydramalist.com/EoPbW_5f.jpg'
                        }}>
                        </Avatar>
                    )
                }}
            />
        </SafeAreaView>
    )
}
// Caleb code end
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