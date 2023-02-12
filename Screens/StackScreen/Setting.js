import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, TextInput, Pressable } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { getDatabase, ref, set, onValue, push, update, remove } from "firebase/database";
import { color } from 'react-native-elements/dist/helpers';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';


export default function Setting({navigation}) {
    const [withoutFeedbackPressed, setWithoutFeedbackPressed] = useState(0);
    const [opacityPressed, setOpacityPressed] = useState(0);
    const [highlightPressed, setHighlightPressed] = useState(0);
    return (
        <View style={styles.screen}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
              <Text style={{fontSize: 30, textAlign: 'center', top: 73}}>User Settings</Text>
            </View>
          </SafeAreaView>
    
          <View style={styles.content}>
            <View style={styles.buttonRow}>
              <Pressable
                onPress={() => navigation.navigate('Permission')
                }
                style={() => [styles.button]}>
                <Text style={{top: 100, fontSize: 20, textAlign: 'center'}}>
                Edit User Permissions
              </Text>
              </Pressable>
            </View>
    
            
          </View>
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
    header: {
        fontSize: 25,
        textAlign: 'center'

    },
    text: {
        justifyContent: 'center',
        fontSize: 40,
        color: '#000000',  
    },
}); 