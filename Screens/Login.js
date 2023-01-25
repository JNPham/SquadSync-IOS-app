import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, button, Pressable, TextInput } from 'react-native';
import { getDatabase, ref, set, update, onValue, remove, get, child } from "firebase/database";
import { useState } from 'react';

export default function Login() {
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [lastUserName, setLastUserName] = useState('');

    function createData() {
        const db = getDatabase();
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
        <View style={styles.container}>
            <Text>firebase</Text>
            <TextInput value={username} 
                onChangeText={(username) => {
                    setName(username)
                    setLastUserName(username) // add this line
                }} 
                placeholder='Username' style={styles.TextBoxes}>
            </TextInput>
            <TextInput value={email} onChangeText={(email) => {setEmail(email)}} placeholder='Email' style={styles.TextBoxes}></TextInput>
            <Button title='Create Data' onPress={createData}></Button>
            <Button title='Get Data' onPress={getData}></Button>
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
