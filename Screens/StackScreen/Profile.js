import {StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { BottomTabBarHeightCallbackContext } from '@react-navigation/bottom-tabs';
import DialogInput from 'react-native-dialog-input';



const Nickname = () => {
    const defaultProfilePic = 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png';
    const [visible, setVisible] = React.useState(false);
    const [visible2, setVisible2] = React.useState(false);
    const [input, setInput] = React.useState('');
    const [jg, setjg] = React.useState('');
    return (
        <View style={styles.container}>
            <Image
                    source={{uri:defaultProfilePic}}
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
                hintInput ={"Enter Text"}
                submitInput={ (inputText) => {
                    setInput(inputText),
                    setVisible(false);
                }}
                closeDialog={() => setVisible(false)}>
            </DialogInput>
            <Button 
                title='Add Nickname'
                onPress={() => setVisible(true)}
            />
            {jg ? 
                <Text style={styles.title}>{jg}</Text>
                :
                <Text style={styles.title}>Group</Text>
            }
            
            <DialogInput 
                isDialogVisible={visible2}
                title={"Join Group"}
                message={"Which group would you like to join?"}
                hintInput ={"Enter Text"}
                submitInput={ (inputText) => {
                    setjg(inputText),
                    setVisible(false);
                }}
                closeDialog={() => setVisible2(false)}>
            </DialogInput>
            <Button 
                style = {styles.button1}
                title='Join Group'
                color = 'Blue'
                onPress={() => setVisible2(true)}
            />
              <Button 
                style = {styles.button2}
                title='Leave Group'
                color = 'Blue'
                onPress={() => alert("Leaving Group")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        bottom: 50
    },
    title: {
        fontSize:20, 
        marginBottom:20,
        backgroundColor:'red',
        color:'white',
        padding:15,
        borderRadius:30,
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