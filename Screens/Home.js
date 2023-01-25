import { Button, StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { getDatabase, ref, set, onValue, push, update, remove } from "firebase/database";

export default function Home() {
    return (
        <View style={styles.container}>
            <Text>Welcome to SquadSync!</Text>
            <Pressable style={styles.button} onPress={logic()}>
                <Text style={styles.buttonText}>Send to Database</Text>
            </Pressable>
            <StatusBar style="auto" />
        </View>
    );
}

function logic() {
    //database.ref('names').set({'12345':'caleb'})
    const db = getDatabase();
    update(ref(db, 'devs/'), {
      '112233': 'Nhi Pham'
    });
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
}); 