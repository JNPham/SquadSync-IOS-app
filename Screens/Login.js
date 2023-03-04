import { getDatabase, ref, set, onValue, push, update, remove } from "firebase/database";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity} from "react-native";
import { authentication } from "../config/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// For later: Google Sign in Authentication Information 
// https://blog.jscrambler.com/how-to-integrate-firebase-authentication-with-an-expo-app#:~:text=From%20the%20left%20side%20menu,it%2C%20and%20then%20click%20Save.
// https://www.youtube.com/watch?v=MBMWiTsqnck&t=1s&ab_channel=CodewithBeto


// Han - all this is my code
export default function Login({navigation}) {
    // Initializing the state for email and password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // firebase things 
    const auth = getAuth();
    const db = getDatabase();

    // images 
    const LogoImage = require('../assets/squadsync.png');
    const GoogleImage = require('../assets/google.png');
    const AppleImage = require('../assets/apple.png');
    const RecImage = require('../assets/rec-decor-background.png');
    const TriImage = require('../assets/tria-decor-background.png');

    //  this is a function that navigates to the Sign Up page when the user click a button 
    const onPressSignUp = () => {
        navigation.navigate('SignUp');
      };

    // Sign In Function
    function signIn() {
        signInWithEmailAndPassword(authentication, email, password)
        .then((userCredential) => {
          // Signed in if the user's credientials are valid 
          const user = userCredential.user;
          console.log('Logged in with:', user.email);
          alert('Login successful!');
          navigation.navigate('TabNavigation', {screen: 'Home'}); 
        
        })
        // If the user's credientials aren't valid, result in error 
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage)
          alert('Login not successful. Try Again');
        })

    }

    // // todo: Sign up with Google Account
    function googleAcct() {
        //code here
    }
    // todo: Sign up with Apple ID
    function appleAcct() {
        //code here
    }

    return (
        // Here is the skelton of the login page 
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>
            <Image source={RecImage} style={styles.recImage} />
            <Image source={TriImage} style={styles.triImage} />
            <Image source={LogoImage} style={styles.logo} />
            <View style={styles.smallerContainer}>
            <TouchableOpacity onPress={googleAcct} style={styles.google}> 
              <Image source={GoogleImage} />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={appleAcct} style={styles.apple}>
              <Image source={AppleImage} />
            </TouchableOpacity>
            </View>
            
            <TextInput 
                    placeholder="Email" 
                    value={email} 
                    style={styles.textBoxes}
                    onChangeText={(Text) => {setEmail(Text)}}
                    ></TextInput>
            <TextInput 
                    secureTextEntry={true}
                    placeholder="Password"
                    value={password} 
                    style={styles.textBoxes}
                    onChangeText={(Text) => {setPassword(Text)}}
            ></TextInput>
            
            <TouchableOpacity onPress={signIn} style={styles.optionsBtn}>
                <Text style={[styles.optionsBtn, {color: '#1D91FC'}]}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onPressSignUp} style={styles.optionsBtn}>
                <Text style={styles.optionsBtn}>Sign Up</Text>
            </TouchableOpacity>
            
            <StatusBar style="auto" />
    </View>
    </KeyboardAwareScrollView>
    );
}

// Here is the styling for the Login page 
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000000',
      alignItems: 'center',
      justifyContent: 'center',
    },
    smallerContainer: {
        display: "flex",
        flexDirection: "row",
        marginBottom: "8%",
    },
    textBoxes: {
        width: 350,
        // maxWidth: 350,  
        fontSize:18,
        alignItems: 'center',
        textAlign: 'center',
        padding:13,
        marginBottom: 13,
        backgroundColor: 'white',
        borderRadius: 35,
    },
    signInBtn: {
        marginTop: 10,
        fontSize: 18,
        // position: 'absolute',
        // width:'90%',
        alignItems: 'center',
        textAlign: 'center',
    },
    optionsBtn: {
        marginTop: 10,
        fontSize: 19,
        // position: 'absolute',
        // width:'90%',
        alignItems: 'center',
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: '800',
        fontSize: 19,
        letterSpacing: 0.05,
    },
    // text: {
    //     // position: 'absolute',
    //     // width: 348,
    //     // height: 42,
    //     fontStyle: 'normal',
    //     fontWeight: '400',
    //     fontSize: 15,
    //     lineHeight: 19,
    //     display: 'flex',
    //     alignItems: 'center',
    //     textAlign: 'center',
    //     letterSpacing: 0.05,
    //     color: '#FFFFFF',

    // }, 
    logo: {
        width: 250,
        height: 250,
        marginBottom: 20
    }, 
    recImage: {
        position: "absolute",
        top: "5%",
        left: "30%"
    },
    triImage: {
        position: "absolute",
        right: "30%", 
        bottom: "2%"
    },
    google: {
        paddingRight: 25,
      },

      apple: {
        paddingLeft: 25,
      },

}); 
