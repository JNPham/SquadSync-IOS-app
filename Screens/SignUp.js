import { StyleSheet, Text, View, Pressable, TextInput, Image, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, child, ref, set, get} from "firebase/database";
import { useState } from 'react';

export default function SignUp({ navigation }) {
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullName] = useState('');
    
    //const auth = getAuth();
    const db = getDatabase();
    const LogoImage = require('../assets/squadsync.png');
    const GoogleImage = require('../assets/google.png');
    const AppleImage = require('../assets/apple.png');
    const ConsoleImage = require('../assets/console.png');
    const RankImage = require('../assets/Decor.png');
    
    function createAccount() {
        // TODO check email contains @ and is valid email
        const auth = getAuth();
        if (username.trim() != "" && email.trim() != "" && password.trim() != ""){
          createUserWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            // Signed in
            const user = userCredential.user;
            const userId = user.uid;
            // Store the user ID and basic info
            set(ref(db, 'users/' + userId), {          
              email: email,
              username: username,
              fullname: fullname,
              password: password,
            })
            // Store into our just created user ID our group structure (dummy data)
            set(ref(db, 'users/' + userId + '/groups/'), {          
              defaultGroup: "defaultGroupName"
            })
            // Store into our just created user ID user profile structure (empty string for now)
            set(ref(db, 'users/' + userId + '/profile/'), {          
              profilePicUrl: ""
            })
            alert('Your account has been successfully created! Userid: ' + userId)
            // Navigate to the Home page after signing up
            navigation.navigate('TabNavigation', {screen: 'Home'}); 
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          })
        } else {
          alert('Unable to create user, check the username, email and password fields!');    
        } 
    }
    
    // todo: Sign up with Google Account
    function googleAcct() {
        //code here
    }
    // todo: Sign up with Apple ID
    function appleAcct() {
        //code here
    }

    function getData() {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${username}`)).then((snapshot) => {
            if (snapshot.exists()) {
                var data = snapshot.val()
                console.log(data);
                alert('data: ' + JSON.stringify(data))
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);   
        });  
    }

    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>
            <Image source={LogoImage} style={styles.logo} />
            <Image source={ConsoleImage} style={{position: 'absolute', width: 170, height: 130, left:'-60%', top:'-2%'}} />
            <Image source={RankImage} style={{position: 'absolute', width: 210, height: 190, right: '-50%', bottom:'0%'}} />

            <Text style={[styles.text, {top:'26%'}]}>Register using a third party account</Text>
            
            <TouchableOpacity onPress={googleAcct} style={styles.google}> 
              <Image source={GoogleImage} />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={appleAcct} style={styles.apple}>
              <Image source={AppleImage} />
            </TouchableOpacity>

            <Text style={[styles.text, {top:'40%'}]}>Or simply fill out the information below</Text>

            <TextInput value={fullname} onChangeText={(fullname) => { // FULLNAME
                setFullName(fullname)
                }
            } 
            placeholder='Enter Full Name' style={[styles.TextBoxes, {top:'45%'}]}></TextInput>

            <TextInput value={email} onChangeText={(email) => { // EMAIL
                setEmail(email)
                }
            } 
            placeholder='Enter Email' style={[styles.TextBoxes, {top: '53%'}]}></TextInput>

            <TextInput value={username} onChangeText={(username) => { // USERNAME 
                setName(username)
                }
            } 
            placeholder='Enter Username' style={[styles.TextBoxes, {top: '61%'}]}></TextInput>

            <TextInput value={password} onChangeText={(password) => { // PASSWORD
                setPassword(password)
                }
            } 
            placeholder='Enter Password' style={[styles.TextBoxes, {top: '69%'}]}></TextInput>

            <Text style={[styles.text, {top:'80%'}]}>By signing up, you agree to our Terms and Conditions.</Text>

            <Pressable style={{position: 'absolute', top: '90%'}}>
              <Text onPress={createAccount} 
                    style={{fontWeight: '800',
                            fontSize: 19,
                            lineHeight: 19,
                            display: 'flex',
                            alignItems: 'center',
                            textAlign: 'center',
                            color: '#1D91FC',
                            letterSpacing: 0.05,}}>Sign Up</Text>
            </Pressable> 
        </View>
      </KeyboardAwareScrollView>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    position: 'absolute',
    width: 150,
    height: 150,
    top: '3%',
  },
  google: {
    position: 'absolute',
    width: 47,
    height: 47,
    left: '-20%',
    top: '31%',
  },
  apple: {
    position: 'absolute',
    width: 47,
    height: 47.89,
    left: '10%',
    top: '31%',
  },
  text: {
    position: 'absolute',
    width: 348,
    height: 42,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 19,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: 0.05,
    color: '#FFFFFF',
  },
  TextBoxes: {
    position: 'absolute',
    width:'90%',
    fontSize:18,
    alignItems: 'center',
    textAlign: 'center',
    padding:13,
    backgroundColor: 'white',
    marginVertical:10,
    borderRadius: 35,
  },
});
