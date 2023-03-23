import { StyleSheet, View, Text, TextInput, Switch, Image, Button, SafeAreaView, ScrollView, KeyboardAvoidingView, FlatList } from 'react-native';
import React, {useState, useEffect, useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { getDatabase, child, ref, set, get, push } from "firebase/database";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, uploadBytesResumable, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as sRef } from 'firebase/storage';
import { Ionicons } from "@expo/vector-icons";
import { getAuth } from '@firebase/auth';
import themeContext from '../../../theme/themeContext';
import { color } from 'react-native-elements/dist/helpers';

const items = [];
function getDataAndFormat(items) {
    const db = getDatabase();
    const dbRef = ref(db);
    get(child(dbRef, `users`)).then((snapshot) => {
    
        snapshot.forEach((child) => {
            child.forEach((grandchild) => {
                let healthVal = grandchild.val().stepsToday;
                if (healthVal != undefined){
                    items.push({
                        name: child.val().fullname,
                        avatar: require('../../../assets/pfp.jpeg'),
                        score: healthVal
                    });
                }
            }); 
                
    });
    console.log(items);
    console.log("");
    console.log("arrdata");
    console.log(posts)
    });
}

getDataAndFormat(items)

    
export default function GroupSettingPage({ navigation })  {
    const db = getDatabase();
    const theme = useContext(themeContext);
    
    const userId = getAuth().currentUser.uid;


    renderPost = post => {
        
        return (
            <View style={styles.feedItem}>
                <Image source={post.avatar} style={styles.avatar}/>
                <View style={{flex:1}}>
                    <View style={{flexDirection:"row", justifyContent:"space-between", alignItems: "center"}}></View>
                    <Text style={styles.flatlistText}>{post.name}</Text>
                    <Text style={styles.flatlistText}>Steps: {post.score}</Text>
                </View>
            </View>
        );
    };


    return (
        <View style={[styles.container, {backgroundColor: theme.background}]}>
            
            <FlatList 
             style={styles.feed}
             data={items}
             renderItem={({item}) => renderPost(item)}
             keyExtractor={item => item.id}
             showsVerticalScrollIndicator = {false}
             />
        </View>
    );

}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#DCDCDD',
    },
    header: {
        flex: .10,
        backgroundColor: '#23272D',
    },
    text: {
        fontStyle: 'normal',
        fontSize: 25,
        fontWeight: '700',
        textAlign: 'center',
        color: 'green',
        paddingTop: '5%',
        paddingBottom: '5%',
    },
    TextBoxes: { //search bar
        position: 'absolute',
        width: '95%',
        fontSize: 13,
        alignItems: 'center',
        padding: 13,
        backgroundColor: '#D9D9D9',
        marginVertical: 10,
        borderRadius: 35,
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 10,
        marginLeft: 13,
      },
    feed: {
        marginHorizontal: 16,
    }, 
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 18,
        marginRight: 16,
        color: "red",
    },
    feedItem: {
        backgroundColor: '#EBEBEF',
        borderRadius: 5,
        padding: 8,
        flexDirection: 'row',
        marginVertical: 8,
        height: 80,
    },
    flatlistText: {
        fontSize: 20,
    }
});

const posts = [
    {
        id: 1,
        name: "Han Pham",
        score: 10000,
        avatar: require('../../../assets/pfp.jpeg'),
    },
    {
        id: 2,
        name: "Another Person",
        score: 8000,
        avatar: require('../../../assets/pfp.jpeg'),
    },
];
// posts = [];









