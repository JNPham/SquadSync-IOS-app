import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Pressable } from 'react-native';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { getDatabase, ref, set } from "firebase/database";

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
const database = getDatabase();

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Pressable style={styles.button} onPress={logic()}>
          <Text style={styles.buttonText}>Send to Database</Text>
        </Pressable>
      
      <StatusBar style="auto" />
    </View>
  );
}
function logic() {
  //database.ref('names').set({'12345':'caleb'})
  const db = getDatabase();
  set(ref(db, 'names/'), {
    '1234': 'Caleb Lee'
    });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
