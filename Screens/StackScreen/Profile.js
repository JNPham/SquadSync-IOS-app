import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Image } from 'react-native-elements';
import React, { useState, useContext } from 'react';
import { Avatar, Button } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { getDatabase, ref, set, onValue, push, update, remove } from "firebase/database";
import { BottomTabBarHeightCallbackContext } from '@react-navigation/bottom-tabs';
import themeContext from '../../theme/themeContext';
import DialogInput from 'react-native-dialog-input';
import { createStackNavigator } from '@react-navigation/stack';
import Health from './Health';

const Stack = createStackNavigator();

const Nickname = ({ navigation }) => {
    // Darkmode theme called here 
    const theme = useContext(themeContext);
    const defaultProfilePic = 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png';
    const [visible, setVisible] = React.useState(false);
    const [visible2, setVisible2] = React.useState(false);
    const [input, setInput] = React.useState('');
    const [jg, setjg] = React.useState('');
    const db = getDatabase();
    
    const handleJoinGroup = (inputText) => {
        const dbRef = ref(db, "groups");
        let foundGroup = false;
        onValue(dbRef, (snapshot) => {
          const groups = snapshot.val();
          for (const [key, value] of Object.entries(groups)) {
            if (value.name === inputText) {
              foundGroup = true;
              alert(`Joined group ${inputText}`);
              setjg(inputText); // set the joined group name
              break;
            }
          }
          if (!foundGroup) {
            alert(`Group ${inputText} not found`);
          }
        });
        setVisible2(false);
      };
      
      
    
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: defaultProfilePic }}
                style={{ width: 200, height: 200, borderRadius: 200 / 2, borderWidth: 4, marginTop: 60 }}
            />
            {input ?
                <Text style={styles.title}>{input}</Text>
                :
                <Text style={styles.title}>Nickname</Text>
            }

            <DialogInput
                isDialogVisible={visible}
                title={"Nickname"}
                message={"Enter Nickname"}
                hintInput={"Enter Text"}
                submitInput={(inputText) => {
                    setInput(inputText),
                        setVisible(false);
                }}
                closeDialog={() => setVisible(false)}>
            </DialogInput>
            <Button
                title='Add Nickname'
                onPress={() => setVisible(true)}
            />

            <DialogInput
                isDialogVisible={visible2}
                title={"Join Group"}
                message={"Which group would you like to join?"}
                hintInput={"Enter Text"}
                submitInput={handleJoinGroup}
                closeDialog={() => setVisible2(false)}>
            </DialogInput>
            <Button
                style={styles.button1}
                title='Join Group'
                color='Blue'
                onPress={() => setVisible2(true)}
            />
            <Button
                style={styles.button2}
                title='Leave Group'
                color='Blue'
                onPress={() => alert("Leaving Group")}
            />
            <Button
                style={styles.button2}
                title='Health Stat'
                color='Blue'
                onPress={() => navigation.navigate('Health')}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 50
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        backgroundColor: 'red',
        color: 'white',
        padding: 15,
        borderRadius: 30,
    },

    button1: {
        marginBottom: 50,
        bottom: 40
    },

    button2: {
        marginBottom: 50,
        top: 40
    }
});

export default Nickname;
