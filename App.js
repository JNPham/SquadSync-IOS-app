import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, button, Pressable, TextInput } from 'react-native';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, User } from 'firebase/auth';
import { getDatabase, child, ref, set, get, update, onValue, remove } from "firebase/database";
import { useState } from 'react';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcZPES1scPyTYH6iY3quPBvzcRRLGSCO8",
  authDomain: "squadsync-57f7c.firebaseapp.com",
  projectId: "squadsync-57f7c",
  storageBucket: "squadsync-57f7c.appspot.com",
  messagingSenderId: "972118175875",
  appId: "1:972118175875:web:79afb3c32de0325357ebb6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

export default function App() {


  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lastUserName, setLastUserName] = useState('');

  


  return (

  <View style={styles.container}>
      <Text>SquadSync</Text>
       
      <TextInput value={username} onChangeText={(username) => { // USERNAME
          setName(username) 
          setLastUserName(username) // add this line
        }
      } 
      placeholder='Username' style={styles.TextBoxes}></TextInput>

      <TextInput value={email} onChangeText={(email) => { // EMAIL
        setEmail(email)
        }
      } placeholder='Email' style={styles.TextBoxes}></TextInput>

    <TextInput value={password} onChangeText={(password) => { // PASSWORD
          setPassword(password)
        }
      } 
      placeholder='Password' style={styles.TextBoxes}></TextInput>
      
      <Button title='Create Account' onPress={createAccount}></Button> 

      
    </View>
  );

  function createAccount() {
    const auth = getAuth();
    // TODO check email contains @ and is valid email
    if (username.trim() != "" && email.trim() != "" && password.trim() != ""){
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const userId = user.uid
        // Make sure we store our user in our database
        storeUser(userId)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    } else {
      alert('Unable to create user, check the username, email and password fields!');    
    }
  }

  function storeUser(userId) {
    // Store the user ID and basic info
    set(ref(db, 'users/' + userId), {          
      email: email,
      username: username,
      nickname: username
    })
    // Store into our just created user ID our group structure (dummy data)
    set(ref(db, 'users/' + userId + '/groups/'), {          
      defaultGroup: "defaultGroupName"
    })
    // Store into our just created user ID user profile structure (empty string for now)
    set(ref(db, 'users/' + userId + '/profile/'), {          
      profilePicUrl: ""
    })
    alert('User Created! Userid: ' + userId)
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

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    marginTop: 10,
    marginBottom: 10,
    height: 47,
    borderRadius:5,
    backgroundColor: '#788ecc',
    width:200,
    alignItems:'center',
    justifyContent:'center',
 },
 buttonText:{
    color:'white',
    fontSize:15,
 },
 TextBoxes: {
  width:'90%',
  fontSize:18,
  padding:12,
  backgroundColor:'grey',
  marginVertical:10,
}

});