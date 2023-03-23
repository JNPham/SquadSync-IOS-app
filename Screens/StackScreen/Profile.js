import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { BottomTabBarHeightCallbackContext } from '@react-navigation/bottom-tabs';

export default function Profile() {
    const defaultProfilePic = 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png';


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}> 
                <Image
                    source={{uri:defaultProfilePic}}
                    style={{ width: 200, height: 200, borderRadius: 200 / 2, borderWidth: 4, marginTop: 60 }}
                />
            </View>
        </SafeAreaView>


    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#23272D',
    },
    content: 
    {
        backgroundColor: 'white',
        flex: 1,
        alignItems:'center',
    }
}); 