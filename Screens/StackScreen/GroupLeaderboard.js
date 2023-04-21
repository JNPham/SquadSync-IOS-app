import { StyleSheet, Text, Keyboard, View, Button, Pressable, TextInput, Image, TouchableOpacity } from 'react-native';
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
  const sortedGroupsArray = groupsArray.sort((a, b) => b.score - a.score);
  const outputArray = sortedGroupsArray.map(group => ({ name: group.name, score: group.score }));
  return outputArray;
}
  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Group Leaderboard</Text>
      {groupData.map((group) => (
        <View key={group.rank} style={styles.row}>
            <Image source={{ uri: 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png' }} style={{ width: 30, height: 30, borderRadius: 30 / 2, borderWidth: 1.5 }} />
          <Text style={styles.groupName}>     {group.name}</Text>
          <Text style={styles.groupRank}>{group.score+ "pts    "}</Text>
          <Text style={styles.groupRank}>{"["+group.rank+"]"}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginBottom: 8,
  },
  image: {
    width: 48,
    height: 48,
    marginRight: 16,
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