import { Image, StyleSheet, Text, View, SafeAreaView, Switch, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect, useContext }  from 'react';
import { getDatabase, ref, update, get, child, remove, onValue } from "firebase/database";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getAuth } from '@firebase/auth';
import { StatusBar } from 'expo-status-bar';
import {EventRegister} from 'react-native-event-listeners'
import themeContext from '../../../theme/themeContext';
import { Dimensions } from 'react-native';

export default function ActivityLog({route, navigation}) {
    // darkmode 
    const theme = useContext(themeContext);
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [actLog, setActLog] = useState([]);
    const {groupID} = route.params;
    const db = getDatabase();
    const dbRef = ref(db);
    const userId = getAuth().currentUser.uid;

    //call function findUserName() once the Home page loads
    useEffect(() => {
        //findUserName(userId);
        loadActivityLog();
    }, [])

    //function called to load activity log from group database
    function loadActivityLog() {
        const actRef = ref(db, '/groups/' + groupID + '/activityLog');
        onValue(actRef, (snapshot) => {
            let log = []
            snapshot.forEach((child) => {
                let actData = {
                    id: child.key,
                    act: child.val().activity,
                    date: child.val().date,
                    time: child.val().time,
                };
                log.push(actData);
            });
            setActLog(log);
        })
    }

    function changeColor() {}

    // function to change the format of time
    function changeTimeFormat(time) {
        var formattedTime = "";
        for (let i = 0; i < time.length; i++) {
            if (time[i] == ' ') {
                break;
            }
            formattedTime += time[i];
        }
        var hour = formattedTime[0] + formattedTime[1]
        hour = Number(hour)
        if (hour >= 12) {
            formattedTime += ' PM';
        } else {
            formattedTime += ' AM'
        }
        return formattedTime
    }

    // function to render each activity log
    const renderItem = ({ item }) => {
        let act = item.act;
        let date = item.date;
        let time = changeTimeFormat(item.time);
        return (
            <View style={styles.actLog}>
                <View style={styles.circle}/>
                <View style={[styles.verticleLine, {borderColor: theme.borderColor}]} />
                <View style={{flex: 1, paddingLeft: '1%'}}>
                    <TouchableOpacity onPress={changeColor()}>
                        <View style={styles.datetime}>
                            <Text style={{fontWeight: '600', color: theme.color}}>{date}</Text>
                            <Text style={{fontWeight: '600', color: theme.color}}>{time}</Text>
                        </View>
                        
                        <View style={styles.activity}>
                            <Text style={{ fontWeight: '600', paddingTop: '1.5%', color: theme.color }}>{act}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }


    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.header}>
                <Text style={styles.title}>Group Activity</Text>
            </SafeAreaView>
           
            <View style={[styles.body, {backgroundColor: theme.background}]}>
                <FlatList
                    style={styles.display}
                    data={actLog.reverse()}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#23272D',
    },
    datetime: {
        flexDirection:'row',
        justifyContent: 'space-between',
        paddingTop: '2%'
    },
    activity: {
        backgroundColor: '#F4F4F4',
        borderRadius: '10%',
        alignItems:'left', 
        padding:'2%',
        justifyContent: 'center'
    },
    actLog: {
        flex: 1,
        flexDirection: 'row',
        alignItems:'center', 
        paddingTop:'2%',
    },
    circle: {
        backgroundColor: '#F8C272',
        width: 15,
        height: 15,
        borderRadius: 20/2,
        marginRight: '1%',
    },
    header: {
        flex: 0.4,
        backgroundColor: '#23272D',
        alignItems:'center',
        justifyContent: 'center',
    },
    body: {
        flex: 3,
        paddingLeft: '2%',
        paddingRight: '2%',
        backgroundColor: 'white',

    },
    title: {
        fontSize: 25,
        fontWeight: '800',
        color: '#FFFFFF',
    },
    text: {
        fontSize: 18,
        fontWeight: '700',
        paddingLeft: '3%'
    },
    verticleLine: {
        height: '90%',
        width: 1,
        paddingTop: '2%',
        borderWidth: 1,
        borderColor: "#B9B9B9",   
    }, 
    display: {
        height: '90%',
        flexGrow: 0
    }
}); 