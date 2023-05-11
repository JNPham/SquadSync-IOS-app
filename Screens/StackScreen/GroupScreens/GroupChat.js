import { StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { getDatabase, child, ref, set, get, push, query, orderByChild, onValue} from "firebase/database";
import { GiftedChat } from 'react-native-gifted-chat';
import { getStorage} from "firebase/storage";
import { getAuth } from '@firebase/auth';
import { Avatar } from 'react-native-elements';

export default function GroupChat({route, navigation }) {
    const defaultGroupPic = 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png';
    const db = getDatabase();
    const userId = getAuth().currentuid;
    const groupID = route.params.gID; //get group ID passed from Group Tab
    const [userName, setUserName] = useState('');
    //const [userAvatar, setUserAvatar] = useState('');
    const [messages, setMessages] = useState([]);

    //Nhi code start
    //function searchs from firebase using uid and returns the currently logged in user's username
    function findUserName(userId) {
        const dbRef = ref(db);
        get(child(dbRef, `users/${userId}`)).then((snapshot) => {
            if (snapshot.exists()) {
                var userName = snapshot.val().username;
                setUserName(userName);
                
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        findUserName(userId);
    }, [])

    //function called when sending new message. 
    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        for (let i = 0; i < messages.length; i++) {
            const { _id, createdAt, text, user } = messages[i];
            console.log(user);
            var newChat = push(ref(db, 'groups/' + groupID + '/chat/'), {
                _id,
                text,
                createdAt: createdAt.toString(),
                user
            });  
        };
    }, []);

    // load messages from database and listen to any change
    useLayoutEffect(() => {
        const q = query(ref(db, 'groups/' + groupID + '/chat/'), orderByChild('createAt', 'desc'));
        onValue(q, (snapshot) => {
            let chat = [];
            snapshot.forEach((child) => {
                let messageData = {
                    _id: child.key,
                    createdAt: new Date(child.val().createdAt),
                    text: child.val().text,
                    user: {
                        _id: child.val().userId,
                        name: child.val().userName,
                    }
                };
                chat.push(messageData);
            });
            chat.reverse();
            setMessages(chat);
        });

    }, []);

    return(
        <SafeAreaView
            style={styles.container}
            behavior="padding">
            <GiftedChat
                messages={messages}
                showAvatarForEveryMessage={true}
                onSend={messages => onSend(messages)}
                user={{_id: userId,
                    name: userName}}
                // renderAvatar={() => {
                //     return (
                //         <Avatar
                //         rounded
                //         containerStyle={{ width: 40, height: 40 }}
                //         source={{ //todo: add user's avatar
                //             uri: 'https://i.mydramalist.com/EoPbW_5f.jpg'
                //         }}>
                //         </Avatar>
                //     )
                // }}
            />
        </SafeAreaView>
    )
}
// Caleb code end
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    text: {
        fontStyle: 'normal',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        color: 'black',
    },
    line: {
        height: 5,
        backgroundColor: '#ccc',
        marginBottom: 10,
        marginTop: 10,

    },

});