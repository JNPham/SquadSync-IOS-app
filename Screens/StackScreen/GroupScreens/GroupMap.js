import { StyleSheet, View, Text, TextInput, Image, Button, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { MapMarker } from 'react-native-maps/lib/MapMarker';

//import MapView from 'react-native-maps';


let locationOfInterest = [
    {
        title: "Caleb",
        location: {
            latitude: 33.76683749463469,
            longitude: -118.19993747644791
        },
        description: "location of Caleb, last refreshed 5m ago"
    },
    {
        title: "Nhi",
        location: {
            latitude: 33.76683749463469,
            longitude: -118.19993747644791
        },
        description: "location of Nhi, last refreshed 3m ago"
    },
    {
        title: "Han",
        location: {
            latitude: 33.76683749463469,
            longitude: -118.19993747644791
        },
        description: "location of Han, last refreshed 7m ago"
    },
    {
        title: "Dimpal",
        location: {
            latitude: 33.76683749463469,
            longitude: -118.19993747644791
        },
        description: "location of Dimpal, last refreshed 6m ago"
    },
    {
        title: "Jocelyn",
        location: {
            latitude: 33.76683749463469,
            longitude: -118.19993747644791
        },
        description: "location of Jocelyn, last refreshed 1m ago"
    }
]

export default function GroupMap({route, navigation}) {

var initialElements = [
    {
        title: "Caleb",
        location: {
            latitude: 33.76683749463469,
            longitude: -118.19993747644791
        },
        description: "location of Caleb, last refreshed 5m ago"
    }
    ]



//shows coordinates change in console as the user moves the map around
const onRegionChange = (region) => {
    console.log(region);
}


//creates a MapMarker on the map with the data from the LocationOfInterest list
const showLocationOfInterest = () => {
    return locationOfInterest.map((item, index) => {
        return(
            <MapMarker 
            draggable
            key={index}
            coordinate={item.location}
            title={item.title}
            description={item.description}/>
        )
    });
};

 
const{draggableMarkerCoord, setDraggableMarkerCord} = useState({
  latitude: 33.76683749463469,
    longitude: -118.19993747644791
});


    return(
        <View style={styles.container}>
        <Button
        //onPress={addMarker}
        title="Add Your Location"
        color="#841584"
        />
        <MapView style={styles.map}
        onRegionChange={onRegionChange}
        initialRegion={
            {"latitude": 33.76683749463469, 
            "latitudeDelta": 0.4682094028239874, 
            "longitude": -118.19993747644791, 
            "longitudeDelta": 0.3595034963782098}
        }
        >
            {showLocationOfInterest()}

            <MapMarker
            draggable
            coordinate={draggableMarkerCoord}
            pinColor='#0000ff'
            onDragEnd={(e) => setDraggableMarkerCord(e.nativeEvent.coordinate)}
            />

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