import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, button, Pressable, TextInput } from 'react-native';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { getDatabase, ref, set, update, onValue, remove } from "firebase/database";
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
  const [lastUserName, setLastUserName] = useState('');

  function createData() {

    set(ref(db, 'users/' + username), {          
      username: username,
      email: email  
    }).then(() => {
      // Data saved successfully!
      alert('data created!');    
  })  
      .catch((error) => {
          // The write failed...
          alert(error);
      });
}


  return (

  <View style={styles.container}>
      <Text>firebase</Text>
      <TextInput value={username} 
      onChangeText={(username) => {
          setName(username)
          setLastUserName(username) // add this line
        }
      } 
      placeholder='Username' style={styles.TextBoxes}></TextInput>
      <TextInput value={email} onChangeText={(email) => {setEmail(email)}} placeholder='Email' style={styles.TextBoxes}></TextInput>
      <Button title='create data' onPress={createData}></Button>
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