import {
    StyleSheet,
    Text,
    View,
    Button,
    Dimensions,
    Pressable,
    BackHandler
  } from 'react-native'
import React, { useState, useEffect, useCallback} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage';
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
                props.navigation.navigate('EditPassword')
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
    const handleLogout = useCallback(async () => {
        try {
          // 使用AsyncStorage清空本地存储的用户登录信息
          await AsyncStorage.removeItem('userData');
          console.log('User token has been cleared!');
        } catch (error) {
          // 如果清空本地存储的用户登录信息失败，打印错误信息
          console.error(`Failed to remove user token: ${error}`);
          return;
        }
        BackHandler.exitApp();
      }, []);
    return (
        <View>
            <Appbar.Header> 
                <Appbar.BackAction onPress={() => props.navigation.goBack()} />
                <Appbar.Content title="Title" />
            </Appbar.Header>
            <Text>账户信息</Text>
            <View style={styles.list}>
                <ListItem title="用户名" content={fakeUserInfo.username} navigation={props.navigation} />
                <ListItem title="密码" content={fakeUserInfo.userInfo} navigation={props.navigation} />
                <View style = {styles.buttonStyle}>
                    <Button title="退出登录"  borderColor= '#fffaf0' onPress={handleLogout} />
                </View>
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
    },
    buttonStyle: {
        top: 30,
        width: '90%',
        borderRadius: 10,
        color:'#fffaf0',
       // borderColor: '#dcdcdc'
    }
})

export default Person;