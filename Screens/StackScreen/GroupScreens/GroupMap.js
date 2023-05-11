import { StyleSheet, View, Text, TextInput, Image, Button, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { MapMarker } from 'react-native-maps/lib/MapMarker';
import * as Location from 'expo-location';
import { getAuth } from '@firebase/auth';
import { getDatabase, child, ref, set, get, push, query, orderByChild, onValue} from "firebase/database";
import { GiftedChat } from 'react-native-gifted-chat';
import { getStorage} from "firebase/storage";
import { withTheme } from 'react-native-elements';



export default function GroupMap({route, navigation}) {


    let {status} = Location.requestForegroundPermissionsAsync();
    const userId = getAuth().currentuid;
    const [userName, setUserName] = useState('');
    const db = getDatabase();

    function findUserName(userId) {
        const dbRef = ref(db);
        get(child(dbRef, `users/${userId}`)).then((snapshot) => {
            if (snapshot.exists()) {
                var userName = snapshot.val().username;
                setUserName(userName);
                
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        findUserName(userId);
    }, [])



    return(

        <View style={styles.container}>
        <MapView style={styles.map}
         initialRegion={
            {"latitude": 33.76683749463469, 
            "latitudeDelta": 0.4682094028239874, 
            "longitude": -118.19993747644791, 
            "longitudeDelta": 0.3595034963782098}
        }
        showsUserLocation={true}
        onDoublePress={ (event) => console.log(event.nativeEvent.coordinate)}
        >
            
        </MapView>
          

      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    header: {
        flex: .10,
        backgroundColor: '#23272D',
    },
    button: {
        textAlign: 'center',
        backgroundColor: 'white',
      },
    text1: {
        fontStyle: 'normal',
        fontSize: 25,
        fontWeight: '700',
        textAlign: 'center',
        color: 'black',
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
      }
});