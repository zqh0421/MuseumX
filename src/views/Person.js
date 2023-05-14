import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  BackHandler
} from 'react-native'
import React, { useState, useEffect, useCallback} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appbar, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { current } from '../api/currentUserInterface'
const ListItem = (props) => {

  const onPressEdit = () => {
    // alert(props.title)
    // props.navigation.navigate('')
    switch (props.title) {
    case '用户名':
      props.navigation.navigate('EditUsername')
      break
    case '密码':
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

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData')
      return jsonValue !== null ? JSON.parse(jsonValue) : null
    } catch (e) {
      // error reading value
    }
  }

  useEffect(() => {
    getData().then(res => {
      console.log('res: ')
      console.log(res)
      if (res) {
        current(res.data).then(resp => {
          console.log('current-res:')
          console.log(resp.data)
          setCurrentUser({
            username: resp.data.userAccount,
            userInfo: '*******'
          })
        })
      }
    })
  }, [])
  const handleLogout = useCallback(async () => {
    try {
      // 使用AsyncStorage清空本地存储的用户登录信息
      await AsyncStorage.removeItem('userData');
      console.log('User token has been cleared!');
      props.navigation.navigate('Home')
    } catch (error) {
      // 如果清空本地存储的用户登录信息失败，打印错误信息
      console.error(`Failed to remove user token: ${error}`);
      return;
    }
  }, []);
  return (
    <View style={{ flex: 1}}>
      <Appbar.Header style={{ backgroundColor: '#3a3a3a'}}>
        <Appbar.BackAction color='white' onPress={() => props.navigation.goBack()} />
        <Appbar.Content title="Edit" color='white'/>
      </Appbar.Header>
      <LinearGradient
        style={styles.background}
        colors={['#727480', '#454653']}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.inputStyle}>编辑账户信息</Text>
        </View>
        <View style={styles.list}>
          <ListItem title="用户名" content={currentUser.username} navigation={props.navigation}/>
          <ListItem title="密码" content={currentUser.userInfo} navigation={props.navigation} />
        </View>
        <View style = {styles.buttonStyle}>
          <Button mode={'elevated'}  onPress={handleLogout}>退出登录</Button>
        </View>
      </LinearGradient>
    </View>
  )

}

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  inputStyle:{
    top: 10,
    fontSize: 20,
    left:10,
    color: 'white'
  },
  list: {
    alignItems: 'center',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: 30,
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
    left: 20,
    width: '90%',
    borderRadius: 10,
    color:'#fffaf0',
    // borderColor: '#dcdcdc'
  }
})

export default Person;