import { Button, StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { getDatabase, ref, set, onValue, push, update, remove } from "firebase/database";
import { SafeAreaView } from 'react-native';
import { View } from "react-native";
import { Avatar } from "./Avatar";
import { Image, ImageProps, StyleSheet, TouchableOpacity } from "react-native";
import ImagePicker from "react-native-image-crop-picker";

export default function Profile() {




    return (
        <SafeAreaView>
        <View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}
                    style={{ position: 'absolute', top: '5%' }}>
                    <Avatar
                        rounded
                        containerStyle={{ width: 40, height: 40 }}
                        source={{ //add user's avatar
                            uri: 'https://i.mydramalist.com/EoPbW_5f.jpg'
                        }}>
                    </Avatar>
                </TouchableOpacity>
        </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: '#fff',
    },
    top:{
        flex: 0.15,
        justifyContent: 'flex-end',
        backgroundColor: '#23272D',

    }
}); 