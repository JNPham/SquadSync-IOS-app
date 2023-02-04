import { Button, StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { getDatabase, ref, set, onValue, push, update, remove } from "firebase/database";

export default function Notification() {
    return (
        <View style={styles.container}>
            <Text>Welcome to SquadSync Notification</Text>
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