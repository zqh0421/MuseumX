import { View, Text, StyleSheet, AppRegistry, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Appbar, List, MD3Colors, TextInput } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { editPassword } from '../api/editPassword'

const EditPassword = (props) => {
  const [newpassword, setnewpassword] = useState('')
  const [oldname, setoldname] = useState('')
  const [password, setpassword] = useState('')
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData')
      console.log('json', jsonValue)
      return jsonValue !== null ? JSON.parse(jsonValue) : null
    } catch (e) {
      // error reading value
    }
  }
  const onPressSave = async () => {
    // 提交到后端
    // alert(newpassword)
    console.log('test')
    getData().then((userData) => {
      console.log(userData)
      if (userData) {
        editPassword(userData.data, newpassword, oldname, password)
          .then((res) => {
            if (res && res.code && res.code === 0) {
              // 数据获取成功
              console.log(res.data.data)
              console.log('修改密码成功')
              props.navigation.goBack()
            } else {
              // 获取失败
            }
          })
          .catch((err) => {
            alert(err)
          })
      } else {
        props.navigation.navigate('Login')
      }
    })
  }
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#727480', '#454653']} style={styles.background}>
        <Text style={styles.back} onPress={() => props.navigation.goBack()}>
          Cancel
        </Text>
        <Text style={styles.Name}> EditPassword</Text>
        <Text style={styles.save} onPress={onPressSave}>
          Save
        </Text>
        <TextInput
          mode="outlined"
          // right={<TextInput.Affix text="/100" />}
          // right={<TextInput.Icon icon="eye" />}
          style={styles.inputStyle}
          placeholder="新的密码"
          placeholderTextColor={'#808080'}
          textColor="#CCCCCC"
          outlineStyle={{ borderRadius: 7 }}
          contentStyle={{ paddingLeft: 15 }}
          outlineColor={'#CCCCCC'}
          activeOutlineColor={'#CCCCCC'}
          value={newpassword}
          onChangeText={(val) => setnewpassword(val)}
        />
        <TextInput
          mode="outlined"
          // right={<TextInput.Affix text="/100" />}
          // right={<TextInput.Icon icon="eye" />}
          style={styles.inputStyle}
          placeholder="旧的用户名"
          placeholderTextColor={'#808080'}
          textColor="#CCCCCC"
          outlineStyle={{ borderRadius: 7 }}
          contentStyle={{ paddingLeft: 15 }}
          outlineColor={'#CCCCCC'}
          activeOutlineColor={'#CCCCCC'}
          value={oldname}
          onChangeText={(val) => setoldname(val)}
        />
        <TextInput
          mode="outlined"
          // right={<TextInput.Affix text="/100" />}
          // right={<TextInput.Icon icon="eye" />}
          style={styles.inputStyle}
          placeholder="密码"
          placeholderTextColor={'#808080'}
          textColor="#CCCCCC"
          outlineStyle={{ borderRadius: 7 }}
          contentStyle={{ paddingLeft: 15 }}
          outlineColor={'#CCCCCC'}
          activeOutlineColor={'#CCCCCC'}
          value={password}
          onChangeText={(val) => setpassword(val)}
        />
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#696969',
    // alignItems: 'center',
    justifyContent: 'center',
    // alignContent:'center',
    alignItems: 'center',
    flex: 1
  },
  background: {
    // justifyContent:'center',
    // alignContent:'center',
    // alignItems:'center',
    flex: 1
  },
  back: {
    fontSize: 15,
    position: 'absolute',
    color: '#CCCCCC',
    top: 20,
    left: 20
  },
  Name: {
    fontSize: 15,
    justifyContent: 'center',
    position: 'absolute',
    color: '#CCCCCC',
    top: 20,
    left: 125,
    alignItems: 'center'
  },
  save: {
    fontSize: 15,
    color: '#CCCCCC',
    position: 'absolute',
    top: 20,
    right: 20
  },

  inputStyle: {
    top: 100,
    width: Dimensions.get('window').width - 20,
    margin: 10,
    color: '#CCCCCC',
    paddingHorizontal: 5
  }
})
export default EditPassword
