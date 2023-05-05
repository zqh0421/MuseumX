import {
    StyleSheet,
    Text,
    View,
    Button,
    Dimensions,
    Pressable
  } from 'react-native'
import React, { useState, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Appbar, List, MD3Colors } from 'react-native-paper';

const ListItem = (props) => {

    const onPressEdit = () => {
        // alert(props.title)
        // props.navigation.navigate('')
        switch (props.title) {
            case '用户名':
                props.navigation.navigate('EditUsername')
                break
            case '描述':
                props.navigation.navigate('EditDescription')
                break
            default: break
        }
    }

    return (
        <Pressable style={styles.listItem} onPress={onPressEdit}>
            <Text>{props.title}</Text>
            <View style={styles.listItemRight}>
                <Text>{props.content}</Text>
                <Text style={{ marginLeft: 20 }}>&gt;</Text>
            </View>
        </Pressable>
    )
}

const Person = (props) => {
    const [currentUser, setCurrentUser] = useState({})
    const fakeUserInfo = {
        username: '123',
        userInfo: '123456'
    }

    useEffect(() => {
        setCurrentUser(fakeUserInfo)
    }, [])
    return (
        <View>
            <Appbar.Header> 
                <Appbar.BackAction onPress={() => props.navigation.goBack()} />
                <Appbar.Content title="Title" />
            </Appbar.Header>
            <Text>账户信息</Text>
            <View style={styles.list}>
                <ListItem title="用户名" content={fakeUserInfo.username} navigation={props.navigation} />
                <ListItem title="描述" content={fakeUserInfo.userInfo} navigation={props.navigation} />
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    list: {
        alignItems: 'center'
    }, 
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    listItemRight: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default Person;