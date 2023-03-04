import { StyleSheet, Text, View, Pressable, TextInput, Image, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, child, ref, set, get} from "firebase/database";
import { useState, useEffect } from 'react';

export default function Health({ navigation }) {
    const [stepGoal, setStepGoal] = useState('');
    const [stepToday, setStepToday] = useState('');
    const userId = getAuth().currentUser.uid;
    const db = getDatabase();

    function saveStepsTaken() {
        set(ref(db, `users/${userId}/health`), { 
            stepGoal: stepGoal,         
            stepsToday: stepToday
          })
          alert('Steps Today Saved!')
    }


    function saveStepsGoal() {
        set(ref(db, `users/${userId}/health`), {          
            stepGoal: stepGoal,
            stepsToday: stepToday
          })
          
          if (Number(stepGoal) <= Number(stepsToday)){
            alert('Step Goal Met Congrats!')

          } else {
            alert('Step Goal Saved!')
          }
    }


    function getStepGoal(userId) {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${userId}/health`)).then((snapshot) => {
            if (snapshot.exists()) {
                var value = snapshot.val().stepGoal;
                alert('Step Goal found: ' + value)
                setStepGoal(value);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);   
        }); 
    }
    
    useEffect(() => {
        getStepGoal(userId);
    }, []) 

    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>

            <Text> Current Step Goal: {stepGoal}</Text>
            <TextInput value={stepGoal} onChangeText={(stepGoal) => { // enter step numbers 
                setStepGoal(stepGoal)
                }
            } 
            placeholder='Enter your daily step goal!' style={[styles.TextBoxes]}></TextInput>

            <Pressable>
              <Text onPress={saveStepsGoal} 
                    style={{fontWeight: '800',
                            fontSize: 19,
                            lineHeight: 19,
                            display: 'flex',
                            alignItems: 'center',
                            textAlign: 'center',
                            color: '#1D91FC',
                            letterSpacing: 0.05,}}>Save Goal</Text>
            </Pressable> 


            <Text> Current Steps Taken: {stepToday}</Text>
            <TextInput value={stepToday} onChangeText={(stepToday) => { // steps taken today
                setStepToday(stepToday)
                }
            } 
            placeholder='Enter Steps Taken Today' style={[styles.TextBoxes]}></TextInput>

            <Pressable>
              <Text onPress={saveStepsTaken} 
                    style={{fontWeight: '800',
                            fontSize: 19,
                            lineHeight: 19,
                            display: 'flex',
                            alignItems: 'center',
                            textAlign: 'center',
                            color: '#1D91FC',
                            letterSpacing: 0.05,}}>Save Steps</Text>
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
  text: {
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
