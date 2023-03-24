import { Button, StyleSheet, Text, View, Pressable } from 'react-native';
import React, {useContext}from 'react';
import { StatusBar } from 'expo-status-bar';
import { getDatabase, ref, set, onValue, push, update, remove } from "firebase/database";
import themeContext from '../../theme/themeContext';

export default function Profile() {
    // Darkmode theme called here 
    const theme = useContext(themeContext);
    return (
        <View style={[styles.container, {backgroundColor: theme.background}]}>
            <Text style={{color: theme.color}}>Welcome to Profile page</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
}); 