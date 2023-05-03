import { StyleSheet, Text, Keyboard, ScrollView, SafeAreaView, View, Button, Pressable, TextInput, Image, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, child, ref, set, get} from "firebase/database";
import { useState, useEffect, useContext } from 'react';
import themeContext from '../../theme/themeContext';

export default function GroupLeaderboard() {
  const theme = useContext(themeContext);
  const userId = getAuth().currentUser.uid;
  const db = getDatabase();
  const [groupData, setGroupData] = useState([]);

  

  useEffect(() => {
    getGroups();
}, []) 
  //function searchs from firebase using groupID and returns the currently selected group
  function getGroups() {
    const dbRef = ref(db);
    get(child(dbRef, `groups/`)).then((snapshot) => {
        console.log(snapshot.val());

        if (snapshot.exists()) {
            var sortedData = sortGroupsByScore(snapshot.val())
            setGroupData(addRank(sortedData));
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
} 
function addRank(entries) {
  // Sort entries by score in descending order
  const sortedEntries = entries.sort((a, b) => b.score - a.score);
  
  // Add rank to each entry
  return sortedEntries.map((entry, index) => ({
    ...entry,
    rank: index + 1
  }));
}

function sortGroupsByScore(groupsData) {
  const groupsArray = Object.entries(groupsData).map(([id, group]) => ({ id, ...group }));
  const sortedGroupsArray = groupsArray.sort((a, b) => {
    const scoreA = a.score || 0; // set score to 0 if it's undefined
    const scoreB = b.score || 0;
    return scoreB - scoreA;
  });
  const outputArray = sortedGroupsArray.map(group => ({ name: group.name, score: group.score || 0, url: group.url.groupURL }));
  return outputArray;
}

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Text style={styles.title}>Group Leaderboard</Text>
      </SafeAreaView>
      <View style={styles.body}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>  
          {groupData.map((group) => (
            <View key={group.rank} style={styles.row}>
                <Image source={{ uri: group.url }} style={{ width: 45, height: 45, borderRadius: 45 / 2, borderWidth: 1 }} />
                <Text style={styles.groupName}>     {group.name}</Text>
                <Text style={styles.groupRank}>{group.score+ " pts    "}</Text>
                <Text style={styles.groupRank}>{"["+group.rank+"]"}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={{flex: 0.4}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    //padding: 16,
  },
  header: {
    flex: 0.4,
    backgroundColor: '#23272D',
    alignItems:'center',
    justifyContent: 'center',
  },
  body: {
    flex: 3,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8
  },
  image: {
    width: 48,
    height: 48,
    paddingRight: 16,
  },
  groupName: {
    flex: 1,
    fontSize: 18,
  },
  groupRank: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});