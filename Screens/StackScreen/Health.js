import { StyleSheet, Text, Keyboard, View, Button, Pressable, TextInput, Image, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, child, ref, set, get} from "firebase/database";
import { useState, useEffect, useContext } from 'react';
import themeContext from '../../theme/themeContext';

export default function Health({ navigation }) {
    // Darkmode theme called here 
    const theme = useContext(themeContext);

    const [stepGoal, setStepGoal] = useState('');
    const [stepToday, setStepToday] = useState('');
    const userId = getAuth().currentUser.uid;
    const db = getDatabase();

    const percentage = stepGoal > 0 ? Math.round((stepToday / stepGoal) * 100) : 0;


    function handleSave() {
      Keyboard.dismiss()
      set(ref(db, `users/${userId}/health`), { 
        stepGoal: stepGoal,         
        stepsToday: stepToday
      })
      set(ref(db, `users/${userId}/health`), {          
        stepGoal: stepGoal,
        stepsToday: stepToday
      })
      alert('Health Data Saved!')
    }
    
    function handleReset() {
      Keyboard.dismiss()
      set(ref(db, `users/${userId}/health`), { 
        stepGoal: 0,         
        stepsToday: 0
      })
      set(ref(db, `users/${userId}/health`), {          
        stepGoal: 0,
        stepsToday: 0
      })
      setStepGoal(0);
      setStepToday(0);
      alert('Health Data Reset!')
    }




    function getStepGoal(userId) {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${userId}/health`)).then((snapshot) => {
            if (snapshot.exists()) {
                var value = snapshot.val().stepGoal;
                setStepGoal(value);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);   
        }); 
    }

    function getStepsToday(userId) {
      const dbRef = ref(getDatabase());
      get(child(dbRef, `users/${userId}/health`)).then((snapshot) => {
          if (snapshot.exists()) {
              var value = snapshot.val().stepsToday;
              setStepToday(value);
          } else {
              console.log("No data available");
          }
      }).catch((error) => {
          console.error(error);   
      }); 
  }
    
    useEffect(() => {
        getStepGoal(userId);
        getStepsToday(userId);
    }, []) 

    return (
      <View style={[styles.container, {backgroundColor: theme.background}]}>
      <Text style={[styles.label, {color:theme.color}]}>Set your daily goal:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={stepGoal.toString()}
        onChangeText={(text) => setStepGoal(parseInt(text) || 0)}
      />
      <Text style={[styles.label, {color:theme.color}]}>Today's steps so far:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={stepToday.toString()}
        onChangeText={(text) => setStepToday(parseInt(text) || 0)}
      />
      <View style={styles.progressContainer}>
        <Text style={[styles.label, {color:theme.color}]}>Today's progress:</Text>
        <Text style={[styles.progressText, {color:theme.color}]}>
          {stepToday} / {stepGoal}
        </Text>
        <Text style={[styles.percentText, {color:theme.color}]}>
          {percentage}% of goal achieved
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.resetButton]}
        onPress={handleReset}
      >
        <Text style={styles.buttonText}>Reset Data</Text>
      </TouchableOpacity>
    </View>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 80,
    backgroundColor: '#F2F2F2',
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 10,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  progressContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  progressText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  percentText: {
    fontSize: 20,
  },
  button: {
    backgroundColor: '#4EBDEF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginVertical: 8,
  },
  resetButton: {
    backgroundColor: '#DD5044',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
