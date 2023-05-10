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
    const [input, setInput] = React.useState('');
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
            <Button 
                style = {styles.button1}
                title='Join Group'
                color = 'Blue'
                onPress={() => alert("Joining Group")}
            />
              <Button 
                style = {styles.button1}
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
        marginBottom: 50
    }
});

export default Nickname;