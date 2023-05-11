import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Image } from 'react-native-elements';
import React, { useState, useContext } from 'react';
import { Avatar, Button } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { getDatabase, ref, set, onValue, push, update, remove, get, child} from "firebase/database";
import { getAuth } from 'firebase/auth';
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
    const [visible3, setVisible3] = React.useState(false);
    const [input, setInput] = React.useState('');
    const [jg, setjg] = React.useState('');
    const [rg, setrg] = React.useState('');
    const db = getDatabase();
    const userId = getAuth().currentUser.uid;
    
    const handleJoinGroup = (inputText) => {
        const dbRef = ref(db, "/groups");
        let foundGroup = false;
        get(dbRef).then((snapshot) => {
          const groups = snapshot.val();
          const groupList = Object.entries(groups);            
          for (const [key, value] of groupList) {
            if (value.name === inputText) {
              foundGroup = true;
              alert(`Joined group ${inputText}`);
              setjg(inputText); // set the joined group name
              const userId = getAuth().currentUser.uid;
              push(ref(db, `groups/${key}/members`), { memberID: userId});
              break;
            }
          }
          if (!foundGroup) {
            alert(`Group ${inputText} not found`);
          }
        }).catch((error) => {
          console.error(error);
        });
        setVisible2(false);
      };
      
      const handleLeaveGroup = (inputText) => {
        const dbRef = ref(db, "/groups");
        let foundGroup = false;
        get(dbRef).then((snapshot) => {
          const groups = snapshot.val();
          const groupList = Object.entries(groups);            
          for (const [key, value] of groupList) {
            if (value.name === inputText) {
              foundGroup = true;
              const userId = getAuth().currentUser.uid;
              const memberRef = ref(db, `groups/${key}/members`);
              get(memberRef).then((snapshot) => {
                const members = snapshot.val();
                if (members) {
                  const memberList = Object.entries(members);
                  for (const [memberKey, memberValue] of memberList) {
                    if (memberValue.memberID === userId) {
                      remove(ref(db, `groups/${key}/members/${memberKey}`));
                      setrg(inputText); // set the left group name
                      alert(`You have left group ${inputText}`);
                      break;
                    }
                  }
                }
              });
              break;
            }
          }
          if (!foundGroup) {
            alert(`Group ${inputText} not found`);
          }
        }).catch((error) => {
          console.error(error);
        });
        setVisible3(false);
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
            <DialogInput
            isDialogVisible={visible3}
            title={"Leave Group"}
            message={"Which group would you like to leave?"}
            hintInput={"Enter Text"}
            submitInput={handleLeaveGroup}
            closeDialog={() => setVisible3(false)}>
            </DialogInput>
            <Button
                style={styles.button1}
                title='Leave Group'
                color='Blue'
                onPress={() => setVisible3(true)}
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