import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { BottomTabBarHeightCallbackContext } from '@react-navigation/bottom-tabs';

export default function Profile() {
    const [image, setImage]=useState(null);

    const pickImage = async () =>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Image,
            quality: 1,
            allowsEditing: true
        });

        if(!result.cancelled){
            setImage(result.uri)}
        else{
            //set image to default}
    }
}
    return (
            <View style={styles.container}> 
                <Image source={{uri:image}} style ={{flex:1, width:600}}/>
                <Button title="Pick Image" onPress={pickImage}/>
                <Text>hello</Text>
            </View>


    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#23272D',
    },
    text:{
        color: blue,
        justifyContent: center,
    }

}); 