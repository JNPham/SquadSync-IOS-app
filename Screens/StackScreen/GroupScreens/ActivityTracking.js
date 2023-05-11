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

items = [];
sortedItems = []; 
// streakScore = [];


// const db = getDatabase();

const flameImage = require('../../../assets/flame.png');




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
    console.log("sorting now");
    console.log("");
    console.log("new items");
    sortedItems = sortObj(items);
    console.log(sortedItems);

    });

};


function sortObj(items){
        return Object.values( items ).sort( (a, b) => b.score - a.score );
    };



  
getDataAndFormat(items);


    
export default function GroupSettingPage({ navigation })  {

    const db = getDatabase();
    const theme = useContext(themeContext);

    const userId = getAuth().currentUser.uid;
    const streakRef = ref(db,  "users/" + userId+ "/streak");

    const [streakScore, setStreakScore] = useState();

    function getScore(userId){
        const db = getDatabase();
        const dbRef = ref(db);
        get(child(dbRef, `users/${userId}/streak/`)).then((snapshot) => {
            if (snapshot.exists()) {
                var score = snapshot.val().streak;
                setStreakScore(score); 
            }
        });
        console.log(streakScore);
    };

    getScore(userId);
    
    renderPost = post => {
        
        return (
            <View style={styles.feedItem}>
                <Image source={post.avatar} style={styles.avatar}/>
                <View style={{flex:1, marginLeft: 10, marginTop: 5}}>
                    {/* <View style={{flexDirection:"row", alignItems: "center"}}></View> */}
                    <Text style={styles.flatlistText}>{post.name}</Text>
                    <Text style={styles.flatlistText}>Steps: {post.score}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={[styles.container, {backgroundColor: theme.background}]}>
            
            <View style={styles.scoreItem}>
                <Image source={flameImage} style={styles.avatar}/>
                <View style={{flex:1, marginLeft: 10, marginTop: 18}}>
                    <Text style={styles.flatlistText}>Streak Score: {streakScore}</Text>
                </View>
            </View>

            
            <FlatList 
             style={styles.feed}
             data={sortedItems}
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
    scoreItem: {
        backgroundColor: '#FFEBCE',
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

