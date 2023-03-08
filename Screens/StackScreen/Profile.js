import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { Avatar } from 'react-native-elements';

export default function Profile() {
    return (
            <View>
                <Image
                    style={{width: 100, height: 100}}  // required Dimensions and styling of Image
                    source={'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png'} // enter your avatar image path 
   />
            </View>


    );
}

const styles = StyleSheet.create({

}); 