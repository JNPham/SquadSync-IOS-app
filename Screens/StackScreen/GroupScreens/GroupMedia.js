import { StyleSheet, View, Text, Image, FlatList, SafeAreaView } from 'react-native';
import React from 'react';
import { Video } from 'expo-av';
import { TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { getDatabase, child, ref, set, get, onValue } from "firebase/database";
import * as ImagePicker from 'expo-image-picker';
import { getStorage, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ref as sRef } from 'firebase/storage';
import {Dimensions} from 'react-native';

export default function GroupMedia({route, navigation }) {
    const defaultGroupPic = 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png';
    const db = getDatabase();
    const storage = getStorage();
    const groupID = route.params.gID; //get group ID passed from Group Tab
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    //Caleb code start
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
    } //not used this func

    //listen to any change in image dictionary and re-render
    function unpackGroupImages(groupID) {
        const imageRef = ref(db, `groups/${groupID}/images/imgDictionary`);
        onValue(imageRef, (snapshot) => {
            var imgUrls = []; 
            snapshot.forEach((child) => {
                const imagelink = child.val();
                if ((imagelink !== undefined) && (imagelink !== "")) {
                    imgUrls.push(imagelink)
                }
            });
            setGroupChatImages(imgUrls);
        })
    }

     //listen to any change in video dictionary and re-render
    function unpackGroupVideos(groupID) {
        const vidRef = ref(db, `groups/${groupID}/video/vidDictionary`);
        onValue(vidRef, (snapshot) => {
            var vidUrls = []; 
            snapshot.forEach((child) => {
                const videolink = child.val();
                if ((videolink !== undefined) && (videolink !== "")) {
                    vidUrls.push(videolink)
                }
            });
          setGroupChatVideos(vidUrls);
        })
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
            const url = await uploadVideo(groupID, result.assets[0].uri);
            console.log(url);
            //setImageURL(url);
            videoUrls.push(url)
            
            const vidDictionary = createVideoDictionary(videoUrls);
            
            console.log(vidDictionary);

            const dbRef = ref(getDatabase());
           
            set(ref(db, '/groups/' + groupID+ '/video'), {
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
            const url = await uploadImage(groupID, result.assets[0].uri);
            console.log(url);
            //setImageURL(url);
            imageUrls.push(url)
            
            const imgDictionary = createImageDictionary(imageUrls);
            
            console.log(imgDictionary);

            const dbRef = ref(getDatabase());
           
            set(ref(db, '/groups/' + groupID+ '/images'), {
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
    //function to render images
    const renderImage = ({ item }) => {
        return (
            <View style ={{padding: '0.5%'}}>
                <Image source={{ uri: item }} style={{ width: windowWidth*3.25/10, height: windowWidth*3.25/10 }} />
            </View>
        );
    }

    //function to render videos
    const renderVideo = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => handleVideoPress(item)}>
                <View style ={{padding: '0.5%'}}>
                    <Video
                        source={{ uri: item }}
                        style={{ width: windowWidth*3.25/10, height: windowWidth*3.25/10}}
                        resizeMode="cover"
                        shouldPlay={item === selectedVideo}
                    />
                </View>
            </TouchableOpacity>
        );
    }

    useEffect(() => {
        //findGroup(groupID);
        unpackGroupImages(groupID);
        unpackGroupVideos(groupID);
    }, [])

    return(
        <SafeAreaView
            style={styles.container}
            behavior="padding">
            <Text style={styles.title}>Pictures</Text>
            <View style={styles.pic}>
                <FlatList
                    numColumns={3}
                    data={imageUrls}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderImage}
                />
            </View>

            <Text style={styles.title}>Videos</Text>
            <View style={styles.video}>
                <FlatList
                    data={videoUrls}
                    numColumns={3}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderVideo}
                />
            </View>
            <View style={styles.button}>
                <TouchableOpacity onPress={pickImage} >
                    <View style={styles.buttonContainer}>
                        <Text style={styles.text}>Send picture</Text>
                    </View> 
                </TouchableOpacity>
                <TouchableOpacity onPress={pickVideo} >
                    <View style={styles.buttonContainer}>
                        <Text style={styles.text}>Send video</Text>
                    </View> 
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
// Caleb code end
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    pic: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent:'center',
    },
    video: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    text: {
        fontStyle: 'normal',
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
        color: 'black',
    },
    title: {
        fontStyle: 'normal',
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'left',
        color: 'black',
        paddingTop: '1%',
        paddingBottom: '1%',
        paddingLeft: '2%'
    },
    line: {
        height: 5,
        backgroundColor: '#ccc',
        marginBottom: 10,
        marginTop: 10,
    },
    button: {
        paddingTop:'2%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    buttonContainer: {
        backgroundColor: '#F8C272',
        elevation: 8,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 12
    }
});